"""Download public topo/photo URLs into web/assets/media."""
import hashlib
import json
import re
import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "web"
OUT = WEB / "assets" / "media"
OUT.mkdir(parents=True, exist_ok=True)

ctx = ssl.create_default_context()
UA = "Mozilla/5.0 (compatible; StrawberryExpress/1.0)"

urls = set()
for name in ("data.js", "extras.js"):
    text = (WEB / name).read_text(encoding="utf-8")
    urls.update(re.findall(r"https://[^\"'\s]+", text))

# skip non-images
skip = (".html", ".htm", "/tour/", "/klettern/", "/area/", "/location/", "openstreetmap", "google.com/maps")
img_urls = []
for u in sorted(urls):
    low = u.lower()
    if any(s in low for s in skip) and not any(low.endswith(ext) for ext in (".jpg", ".jpeg", ".png", ".webp", ".gif")):
        if "image" not in low and "img" not in low and "csm_" not in low and "orig" not in low:
            continue
    img_urls.append(u)

mapping = {}
for url in img_urls:
    ext = Path(url.split("?")[0]).suffix.lower()
    if ext not in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
        ext = ".jpg"
    digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:12]
    dest = OUT / f"{digest}{ext}"
    if dest.exists() and dest.stat().st_size > 800:
        mapping[url] = f"assets/media/{dest.name}"
        print("have", dest.name)
        continue
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/*"})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=40) as res:
            data = res.read()
            ctype = (res.headers.get("Content-Type") or "").lower()
        if "html" in ctype or len(data) < 800:
            print("skip", url, "len", len(data), ctype)
            continue
        if "png" in ctype:
            dest = dest.with_suffix(".png")
        elif "webp" in ctype:
            dest = dest.with_suffix(".webp")
        dest.write_bytes(data)
        mapping[url] = f"assets/media/{dest.name}"
        print("ok", dest.name, len(data))
    except Exception as e:
        print("fail", url, e)

(WEB / "media-map.js").write_text(
    "window.MEDIA_MAP = " + json.dumps(mapping, indent=2, ensure_ascii=False) + ";\n",
    encoding="utf-8",
)
print("mapped", len(mapping), "of", len(img_urls))
