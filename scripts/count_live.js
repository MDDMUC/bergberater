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
const rec = scored.filter((x) => x.r.overGrade !== true && !x.match.tooLong);
console.log("recommendable", rec.length);
console.log("tooLong", scored.filter((x) => x.match.tooLong).map((x) => x.r.name + " " + x.match.pitches));
console.log("top12 rec");
rec.slice(0, 12).forEach((x, i) => {
  console.log(String(i + 1).padStart(2), x.match.total + "%", x.match.pitches + "p", x.r.name, x.r.grade);
});
const over = rec.filter((x) => x.match.pitches > 10);
console.log("leaks", over.map((x) => x.r.name + " " + x.match.pitches));
