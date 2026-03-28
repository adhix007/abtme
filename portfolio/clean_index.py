import sys

with open(r"c:\Users\adhit\OneDrive\Documents\Adhi!!\portfolio\index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

# find line 640.
duplicates_start = None
for i in range(len(lines)):
    if "@media (hover: none) and (pointer: coarse) {" in lines[i]:
        if "@media (hover: none) and (pointer: coarse) {" in lines[i+4]:
            lines[i+4] = ""
            lines[i+5] = ""
            lines[i+6] = ""
            lines[i+7] = ""

with open(r"c:\Users\adhit\OneDrive\Documents\Adhi!!\portfolio\index.html", "w", encoding="utf-8") as f:
    f.writelines(lines)
