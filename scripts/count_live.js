const fs = require("fs");
const vm = require("vm");
const ctx = { window: {}, console };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["web/data.js", "web/extras.js", "web/more.js", "web/score.js"]) {
  vm.runInContext(fs.readFileSync(f, "utf8"), ctx);
}
const routes = ctx.window.ROUTES;
const scored = ctx.window.scoreAll(routes);
console.log("n", routes.length);
console.log("unique", new Set(routes.map((r) => r.id)).size);
console.log("top12");
scored.slice(0, 12).forEach((x, i) => {
  console.log(String(i + 1).padStart(2), x.match.total + "%", x.r.name, x.r.aspect, x.r.grade, x.r.drive);
});
