import { put, list } from "@vercel/blob";

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
  const listed = await list({ prefix: PATH, limit: 10 });
  const hit = (listed.blobs || []).find((b) => b.pathname === PATH);
  if (!hit) return emptyState();
  const res = await fetch(hit.url);
  if (!res.ok) return emptyState();
  return normalize(await res.json());
}

async function saveState(state) {
  await put(PATH, JSON.stringify(state), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json"
  });
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return json(res, 200, await loadState());
    }
    if (req.method !== "POST") {
      return json(res, 405, { error: "method" });
    }
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const person = String(body.person || "");
    const routeId = String(body.route_id || "");
    const vote = body.vote === "like" || body.vote === "reject" ? body.vote : null;
    if (!PEOPLE.includes(person) || !routeId) {
      return json(res, 400, { error: "bad vote" });
    }
    const state = await loadState();
    state[person].liked = state[person].liked.filter((id) => id !== routeId);
    state[person].rejected = state[person].rejected.filter((id) => id !== routeId);
    if (vote === "like") state[person].liked.push(routeId);
    if (vote === "reject") state[person].rejected.push(routeId);
    await saveState(state);
    return json(res, 200, state);
  } catch (err) {
    return json(res, 500, { error: String(err && err.message ? err.message : err) });
  }
}
