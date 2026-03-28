import re

with open(r"c:\Users\adhit\OneDrive\Documents\Adhi!!\portfolio\index.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

style_match = re.search(r'<style>(.*?)</style>', text, re.DOTALL)
if style_match:
    style = style_match.group(1)
    with open(r"c:\Users\adhit\OneDrive\Documents\Adhi!!\portfolio\style_extracted.css", "w", encoding="utf-8") as out:
        out.write(style)
