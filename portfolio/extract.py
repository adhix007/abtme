import re

with open(r"c:\Users\adhit\OneDrive\Documents\Adhi!!\portfolio\index.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

script_match = re.search(r'<script>(.*?)</script>', text, re.DOTALL)
if script_match:
    script = script_match.group(1)
    script = re.sub(r'const IMGS = \{.*?\};', 'const IMGS = {};', script, flags=re.DOTALL)
    with open(r"c:\Users\adhit\OneDrive\Documents\Adhi!!\portfolio\script_extracted.js", "w", encoding="utf-8") as out:
        out.write(script)
