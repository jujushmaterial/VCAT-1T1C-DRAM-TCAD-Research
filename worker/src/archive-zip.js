const ARCHIVE_CACHE_ORIGIN = "https://vcat-archive-cache.invalid";
const ZIP_UTF8_DATA_DESCRIPTOR_FLAGS = 0x0808;
const ZIP_STORE_METHOD = 0;
const CRC32_TABLE = createCrc32Table();

function createCrc32Table() {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value >>> 1) ^ (value & 1 ? 0xedb88320 : 0);
    }
    table[index] = value >>> 0;
  }
  return table;
}

export function createZipStream(files, loadFile, options = {}) {
  const names = uniqueArchiveNames(files.map((file) => file.name));
  const dateTime = dosDateTime(options.modifiedAt);
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      const centralEntries = [];
      let offset = 0;
      let totalBytes = 0;
      const emit = (chunk) => {
        const bytes = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk);
        controller.enqueue(bytes);
        offset += bytes.byteLength;
        totalBytes += bytes.byteLength;
      };

      try {
        for (let index = 0; index < files.length; index += 1) {
          const file = files[index];
          const nameBytes = encoder.encode(names[index]);
          const localOffset = offset;
          emit(localHeader(nameBytes, dateTime));

          const response = await loadFile(file, index);
          if (!response?.body) throw zipError(502, `${file.name || "파일"} 원본을 읽지 못했습니다.`, "ARCHIVE_FILE_BODY_MISSING");
          const reader = response.body.getReader();
          let crc = 0xffffffff;
          let size = 0;
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            if (!value?.byteLength) continue;
            const chunk = value instanceof Uint8Array ? value : new Uint8Array(value);
            crc = crc32Update(crc, chunk);
            size += chunk.byteLength;
            if (size > 0xffffffff) throw zipError(413, "ZIP32 제한을 초과한 파일입니다.", "ARCHIVE_FILE_TOO_LARGE");
            emit(chunk);
          }
          crc = (crc ^ 0xffffffff) >>> 0;
          emit(dataDescriptor(crc, size));
          centralEntries.push({ nameBytes, dateTime, crc, size, localOffset });
        }

        const centralOffset = offset;
        for (const entry of centralEntries) emit(centralHeader(entry));
        const centralSize = offset - centralOffset;
        emit(endOfCentralDirectory(centralEntries.length, centralSize, centralOffset));
        controller.close();
        options.onComplete?.({ totalBytes, fileCount: centralEntries.length });
      } catch (error) {
        options.onError?.(error);
        controller.error(error);
      }
    }
  });
}

function localHeader(nameBytes, dateTime) {
  const header = new Uint8Array(30 + nameBytes.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, ZIP_UTF8_DATA_DESCRIPTOR_FLAGS, true);
  view.setUint16(8, ZIP_STORE_METHOD, true);
  view.setUint16(10, dateTime.time, true);
  view.setUint16(12, dateTime.date, true);
  view.setUint32(14, 0, true);
  view.setUint32(18, 0, true);
  view.setUint32(22, 0, true);
  view.setUint16(26, nameBytes.length, true);
  view.setUint16(28, 0, true);
  header.set(nameBytes, 30);
  return header;
}

function dataDescriptor(crc, size) {
  const descriptor = new Uint8Array(16);
  const view = new DataView(descriptor.buffer);
  view.setUint32(0, 0x08074b50, true);
  view.setUint32(4, crc >>> 0, true);
  view.setUint32(8, size >>> 0, true);
  view.setUint32(12, size >>> 0, true);
  return descriptor;
}

function centralHeader(entry) {
  const header = new Uint8Array(46 + entry.nameBytes.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint16(8, ZIP_UTF8_DATA_DESCRIPTOR_FLAGS, true);
  view.setUint16(10, ZIP_STORE_METHOD, true);
  view.setUint16(12, entry.dateTime.time, true);
  view.setUint16(14, entry.dateTime.date, true);
  view.setUint32(16, entry.crc >>> 0, true);
  view.setUint32(20, entry.size >>> 0, true);
  view.setUint32(24, entry.size >>> 0, true);
  view.setUint16(28, entry.nameBytes.length, true);
  view.setUint16(30, 0, true);
  view.setUint16(32, 0, true);
  view.setUint16(34, 0, true);
  view.setUint16(36, 0, true);
  view.setUint32(38, 0, true);
  view.setUint32(42, entry.localOffset >>> 0, true);
  header.set(entry.nameBytes, 46);
  return header;
}

function endOfCentralDirectory(entryCount, centralSize, centralOffset) {
  if (entryCount > 0xffff || centralSize > 0xffffffff || centralOffset > 0xffffffff) {
    throw zipError(413, "ZIP32 제한을 초과한 제출물입니다.", "ARCHIVE_TOO_LARGE");
  }
  const footer = new Uint8Array(22);
  const view = new DataView(footer.buffer);
  view.setUint32(0, 0x06054b50, true);
  view.setUint16(4, 0, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, entryCount, true);
  view.setUint16(10, entryCount, true);
  view.setUint32(12, centralSize >>> 0, true);
  view.setUint32(16, centralOffset >>> 0, true);
  view.setUint16(20, 0, true);
  return footer;
}

export function crc32Update(crc, bytes) {
  let value = crc >>> 0;
  for (const byte of bytes) {
    value = (value >>> 8) ^ CRC32_TABLE[(value ^ byte) & 0xff];
  }
  return value >>> 0;
}

export function uniqueArchiveNames(names) {
  const used = new Set();
  return names.map((name, index) => {
    const sanitized = sanitizeArchiveName(name, index);
    let candidate = sanitized;
    let sequence = 1;
    while (used.has(candidate.toLocaleLowerCase())) {
      sequence += 1;
      candidate = appendSequence(sanitized, sequence);
    }
    used.add(candidate.toLocaleLowerCase());
    return candidate;
  });
}

function appendSequence(filename, sequence) {
  const dot = filename.lastIndexOf(".");
  const hasExtension = dot > 0;
  const stem = hasExtension ? filename.slice(0, dot) : filename;
  const extension = hasExtension ? filename.slice(dot) : "";
  return `${stem}_${sequence}${extension}`;
}

export function sanitizeArchiveName(name, index = 0) {
  const basename = String(name || "")
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    .replace(/[\u0000-\u001f\u007f<>:"/\\|?*]/g, "_")
    .replace(/[. ]+$/g, "")
    .trim();
  const fallback = `file_${index + 1}`;
  return truncateFilename(basename || fallback, 180);
}

function truncateFilename(name, maxLength) {
  const characters = Array.from(name);
  if (characters.length <= maxLength) return name;
  const dot = name.lastIndexOf(".");
  const extension = dot > 0 && name.length - dot <= 20 ? name.slice(dot) : "";
  const extensionLength = Array.from(extension).length;
  const stemLength = Math.max(1, maxLength - extensionLength);
  return `${characters.slice(0, stemLength).join("")}${extension}`;
}

export async function manifestFingerprint(manifest) {
  const canonical = JSON.stringify({
    outputId: manifest.outputId || "",
    submissionId: manifest.submission?.submissionId || "",
    uploadedAt: manifest.submission?.uploadedAt || "",
    files: (manifest.files || []).map((file) => ({
      id: file.id || "",
      name: file.name || "",
      path: file.path || "",
      size: Number(file.size || 0)
    }))
  });
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function archiveCacheKey(env, manifest, fingerprint) {
  const repository = encodeURIComponent(String(env.REPOSITORY || "repository"));
  const submissionId = encodeURIComponent(String(manifest.submission?.submissionId || "submission"));
  const outputId = encodeURIComponent(String(manifest.outputId || "output"));
  return new Request(`${ARCHIVE_CACHE_ORIGIN}/${repository}/${outputId}/${submissionId}/${fingerprint}.zip`, { method: "GET" });
}

export function buildArchiveFilename(manifest) {
  const outputId = sanitizeFilenamePart(manifest.outputId || manifest.submission?.outputId || "output");
  const member = sanitizeFilenamePart(
    manifest.submission?.memberName
      || manifest.submission?.uploader
      || manifest.submission?.memberFolder
      || "submission"
  );
  return `${outputId}_${member}_전체제출물.zip`;
}

function sanitizeFilenamePart(value) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f<>:"/\\|?*]/g, "_")
    .replace(/[. ]+$/g, "")
    .trim()
    .slice(0, 80) || "submission";
}

export function contentDisposition(filename) {
  const ascii = filename
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "_")
    .replace(/["\\]/g, "_");
  return `attachment; filename="${ascii || "submission-files.zip"}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

export function dosDateTime(value) {
  const parsed = value ? new Date(value) : new Date();
  const date = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  const year = Math.min(2107, Math.max(1980, date.getFullYear()));
  return {
    time: ((date.getHours() & 0x1f) << 11) | ((date.getMinutes() & 0x3f) << 5) | (Math.floor(date.getSeconds() / 2) & 0x1f),
    date: (((year - 1980) & 0x7f) << 9) | (((date.getMonth() + 1) & 0x0f) << 5) | (date.getDate() & 0x1f)
  };
}

function zipError(status, message, code) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}
