const { put, list } = require("@vercel/blob");

const PATH = "sx-picks.json";
const PEOPLE = ["martin", "antonia"];

function emptyPerson() {
  return { liked: [], rejected: [] };
}

function emptyState() {
  return { martin: emptyPerson(), antonia: emptyPerson() };
}

function cleanList(arr) {
  return Array.isArray(arr) ? arr.filter((x) => typeof x === "string" && x) : [];
}

function normalize(raw) {
  const state = emptyState();
  for (const who of PEOPLE) {
    const block = (raw && raw[who]) || {};
    state[who] = {
      liked: cleanList(block.liked),
      rejected: cleanList(block.rejected)
    };
  }
  return state;
}

async function loadState() {
  const listed = await list({ prefix: "sx-picks", limit: 30 });
  const hits = (listed.blobs || []).slice().sort((a, b) => {
    const tb = new Date(b.uploadedAt || b.uploaded_at || 0).getTime();
    const ta = new Date(a.uploadedAt || a.uploaded_at || 0).getTime();
    return tb - ta;
  });
  const hit = hits[0];
  if (!hit) return emptyState();
  const res = await fetch(hit.downloadUrl || hit.url, { cache: "no-store" });
  if (!res.ok) return emptyState();
  return normalize(await res.json());
}

async function saveState(state) {
  await put(PATH, JSON.stringify(state), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0
  });
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
      return resolve(req.body);
    }
    if (typeof req.body === "string") {
      try {
        return resolve(JSON.parse(req.body || "{}"));
      } catch (err) {
        return reject(err);
      }
    }
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return send(res, 200, await loadState());
    }
    if (req.method !== "POST") {
      return send(res, 405, { error: "method" });
    }
    const body = await readBody(req);
    const person = String(body.person || "");
    const routeId = String(body.route_id || "");
    const vote = body.vote === "like" || body.vote === "reject" ? body.vote : null;
    if (!PEOPLE.includes(person) || !routeId) {
      return send(res, 400, { error: "bad vote" });
    }
    const state = await loadState();
    state[person].liked = state[person].liked.filter((id) => id !== routeId);
    state[person].rejected = state[person].rejected.filter((id) => id !== routeId);
    if (vote === "like") state[person].liked.push(routeId);
    if (vote === "reject") state[person].rejected.push(routeId);
    await saveState(state);
    return send(res, 200, state);
  } catch (err) {
    return send(res, 500, { error: String(err && err.message ? err.message : err) });
  }
};
