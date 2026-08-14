import re
from pathlib import Path

root = Path("web")
text = ""
for name in ("data.js", "extras.js", "more.js"):
    text += (root / name).read_text(encoding="utf-8")
ids = re.findall(r'id: "([^"]+)"', text)
print("count", len(ids), "unique", len(set(ids)))
dups = sorted({i for i in ids if ids.count(i) > 1})
print("dupes", dups)
