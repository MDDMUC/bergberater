const { put, get } = require("@vercel/blob");

const PATH = "sx-picks.json";
const PEOPLE = ["martin", "antonia"];

function blobAuth() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    const err = new Error("BLOB_READ_WRITE_TOKEN is not set on this deploy");
    err.code = "NO_TOKEN";
    throw err;
  }
  return { token };
}

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
  const file = await get(PATH, Object.assign({ access: "private", useCache: false }, blobAuth()));
  if (!file || !file.stream) return emptyState();
  const chunks = [];
  for await (const chunk of file.stream) chunks.push(chunk);
  const raw = Buffer.concat(chunks.map((c) => Buffer.from(c))).toString("utf8");
  if (!raw) return emptyState();
  return normalize(JSON.parse(raw));
}

async function saveState(state) {
  await put(
    PATH,
    JSON.stringify(state),
    Object.assign(
      {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
        cacheControlMaxAge: 0
      },
      blobAuth()
    )
  );
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
      const state = await loadState();
      state.connected = true;
      return send(res, 200, state);
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
    state.connected = true;
    return send(res, 200, state);
  } catch (err) {
    const status = err && err.code === "NO_TOKEN" ? 503 : 500;
    return send(res, status, {
      connected: false,
      error: String(err && err.message ? err.message : err)
    });
  }
};
