import re
from pathlib import Path

root = Path("web")
text = (root / "data.js").read_text(encoding="utf-8") + (root / "extras.js").read_text(encoding="utf-8")
ids = re.findall(r'id: "([^"]+)"', text)
ranks = [int(x) for x in re.findall(r"rank: (\d+)", text)]
print("count", len(ids), "unique", len(set(ids)))
print("ranks", sorted(ranks))
print("dupes", sorted({i for i in ids if ids.count(i) > 1}))
print("missing ranks", sorted(set(range(1, 31)) - set(ranks)))
print("ids", ids)
