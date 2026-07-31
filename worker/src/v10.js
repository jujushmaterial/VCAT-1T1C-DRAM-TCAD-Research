import v9 from "./v9.js";

const SPREADSHEET_EXTENSIONS = new Set(["csv", "tsv", "xls", "xlsx"]);
const SPREADSHEET_MIME_TYPES = {
  csv: "text/csv; charset=utf-8",
  tsv: "text/tab-separated-values; charset=utf-8",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
};

export default {
  async fetch(request, env, ctx) {
    const response = await v9.fetch(request, env, ctx);
    const url = new URL(request.url);
    if (request.method !== "GET" || !/^\/api\/submissions\/[A-Za-z0-9_-]+\/manifest$/.test(url.pathname) || !response.ok) {
      return response;
    }

    const payload = await response.clone().json().catch(() => null);
    if (!payload?.files) return response;
    payload.files = payload.files.map((file) => classifySpreadsheet(file));
    return jsonFromResponse(payload, response);
  }
};

function classifySpreadsheet(file) {
  const extension = String(file?.extension || file?.name?.split(".").pop() || "").toLowerCase();
  if (!SPREADSHEET_EXTENSIONS.has(extension)) return file;
  return {
    ...file,
    extension,
    kind: "spreadsheet",
    language: null,
    mimeType: SPREADSHEET_MIME_TYPES[extension],
    previewSupported: true
  };
}

function jsonFromResponse(payload, response) {
  const headers = new Headers(response.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.delete("Content-Length");
  return new Response(JSON.stringify(payload), {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export const __test = { classifySpreadsheet };
