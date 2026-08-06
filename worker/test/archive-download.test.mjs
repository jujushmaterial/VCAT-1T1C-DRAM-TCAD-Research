import assert from "node:assert/strict";
import test from "node:test";
import {
  buildArchiveFilename,
  contentDisposition,
  createZipStream,
  manifestFingerprint,
  sanitizeArchiveName,
  uniqueArchiveNames
} from "../src/archive-zip.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

test("archive names remove paths, preserve Korean, and resolve duplicates", () => {
  assert.equal(sanitizeArchiveName("../folder/결과:그래프.png"), "결과_그래프.png");
  assert.deepEqual(
    uniqueArchiveNames(["image.png", "IMAGE.PNG", "image.png", "../note.txt"]),
    ["image.png", "IMAGE_2.PNG", "image_3.png", "note.txt"]
  );
});

test("streamed ZIP stores all files with valid UTF-8 names and contents", async () => {
  const inputs = [
    { name: "결과.png", body: encoder.encode("first-file") },
    { name: "결과.png", body: encoder.encode("second-file") },
    { name: "table.csv", body: encoder.encode("x,y\n1,2\n") }
  ];
  const stream = createZipStream(inputs, async (file) => new Response(file.body), {
    modifiedAt: "2026-08-06T07:00:00Z"
  });
  const zip = new Uint8Array(await new Response(stream).arrayBuffer());
  const entries = readStoredZip(zip);

  assert.deepEqual(entries.map((entry) => entry.name), ["결과.png", "결과_2.png", "table.csv"]);
  assert.deepEqual(entries.map((entry) => decoder.decode(entry.data)), ["first-file", "second-file", "x,y\n1,2\n"]);
});

test("manifest fingerprint is stable and changes when the file manifest changes", async () => {
  const manifest = {
    outputId: "P01-T10-O01",
    submission: { submissionId: "abc", uploadedAt: "2026-08-06T07:00:00Z" },
    files: [{ id: "f0", name: "a.png", path: "docs/a.png", size: 10 }]
  };
  const first = await manifestFingerprint(manifest);
  const second = await manifestFingerprint(structuredClone(manifest));
  const changed = await manifestFingerprint({ ...manifest, files: [{ ...manifest.files[0], size: 11 }] });
  assert.equal(first, second);
  assert.notEqual(first, changed);
  assert.match(first, /^[a-f0-9]{64}$/);
});

test("archive response filenames are safe and expose an RFC 5987 UTF-8 name", () => {
  const filename = buildArchiveFilename({
    outputId: "P01-T10-O01",
    submission: { memberName: "승민호/테스트" }
  });
  assert.equal(filename, "P01-T10-O01_승민호_테스트_전체제출물.zip");
  const header = contentDisposition(filename);
  assert.match(header, /^attachment; filename="/);
  assert.match(header, /filename\*=UTF-8''P01-T10-O01_/);
});

function readStoredZip(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const eocd = findSignature(bytes, 0x06054b50, bytes.length - 22);
  assert.notEqual(eocd, -1, "EOCD signature must exist");
  const count = view.getUint16(eocd + 10, true);
  let cursor = view.getUint32(eocd + 16, true);
  const entries = [];

  for (let index = 0; index < count; index += 1) {
    assert.equal(view.getUint32(cursor, true), 0x02014b50, "central directory signature");
    const size = view.getUint32(cursor + 24, true);
    const nameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localOffset = view.getUint32(cursor + 42, true);
    const name = decoder.decode(bytes.slice(cursor + 46, cursor + 46 + nameLength));

    assert.equal(view.getUint32(localOffset, true), 0x04034b50, "local file signature");
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    entries.push({ name, data: bytes.slice(dataStart, dataStart + size) });
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function findSignature(bytes, signature, start) {
  for (let index = Math.max(0, start); index >= 0; index -= 1) {
    if (bytes[index] === (signature & 0xff)
      && bytes[index + 1] === ((signature >>> 8) & 0xff)
      && bytes[index + 2] === ((signature >>> 16) & 0xff)
      && bytes[index + 3] === ((signature >>> 24) & 0xff)) return index;
  }
  return -1;
}
