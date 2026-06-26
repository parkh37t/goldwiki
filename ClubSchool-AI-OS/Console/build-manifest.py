#!/usr/bin/env python3
"""ClubSchool AI OS Console - manifest 생성기.

ClubSchool-AI-OS 디렉터리를 스캔해 Console/manifest.json 을 생성한다.
웹 콘솔(app.js)이 이 manifest를 fetch 하여 에이전트/커맨드/워크플로우/문서/예시 목록을 렌더링한다.
실행: ClubSchool-AI-OS/ 에서  python3 Console/build-manifest.py
"""
import json, os, re, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # ClubSchool-AI-OS/

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def strip_fm(text):
    return re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.S)


def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    fm = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                fm[k.strip()] = v.strip()
    return fm

def first_h1(text):
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return ""

def rel(p):
    return os.path.relpath(p, ROOT).replace(os.sep, "/")

def title_from(path, text):
    return first_h1(text) or os.path.splitext(os.path.basename(path))[0]

manifest = {
    "product": "ClubSchool AI OS",
    "version": "1.0.0",
    "generatedFrom": "ClubSchool-AI-OS",
    "agents": [],
    "commands": [],
    "workflows": [],
    "templates": [],
    "examples": [],
    "goldwiki": {"numbered": [], "topics": {}},
    "teams": [],
}

# 활성 서브에이전트
for p in sorted(glob.glob(os.path.join(ROOT, ".claude/agents/*.md"))):
    t = read(p); fm = frontmatter(t)
    manifest["agents"].append({
        "name": fm.get("name", os.path.splitext(os.path.basename(p))[0]),
        "description": fm.get("description", ""),
        "tools": fm.get("tools", ""),
        "path": rel(p),
        # 본문 내장: 정적 호스트(Vercel/Pages)에서 .claude 폴더가 서빙되지 않아도 동작하도록
        "systemPrompt": strip_fm(t).strip(),
    })

# 슬래시 커맨드
for p in sorted(glob.glob(os.path.join(ROOT, ".claude/commands/*.md"))):
    t = read(p); fm = frontmatter(t)
    manifest["commands"].append({
        "name": "/" + os.path.splitext(os.path.basename(p))[0],
        "description": fm.get("description", title_from(p, t)),
        "argumentHint": fm.get("argument-hint", ""),
        "path": rel(p),
        "body": strip_fm(t).strip(),
    })

# 워크플로우 (사람용 런북)
for p in sorted(glob.glob(os.path.join(ROOT, "Workflows/*.md"))):
    t = read(p)
    manifest["workflows"].append({"title": title_from(p, t), "path": rel(p)})

# 템플릿
for p in sorted(glob.glob(os.path.join(ROOT, "Templates/*.md"))):
    t = read(p)
    manifest["templates"].append({"title": title_from(p, t), "path": rel(p)})

# 예시 산출물
for p in sorted(glob.glob(os.path.join(ROOT, "Examples/*.md"))):
    t = read(p)
    manifest["examples"].append({"title": title_from(p, t), "path": rel(p)})

# 팀 역할 카탈로그
for p in sorted(glob.glob(os.path.join(ROOT, "Agents/*.md"))):
    t = read(p)
    manifest["teams"].append({"title": title_from(p, t), "path": rel(p)})

# GoldWiki 번호형 문서
for p in sorted(glob.glob(os.path.join(ROOT, "GoldWiki/*.md"))):
    t = read(p)
    manifest["goldwiki"]["numbered"].append({"title": title_from(p, t), "path": rel(p)})

# GoldWiki 토픽 폴더
for d in sorted(glob.glob(os.path.join(ROOT, "GoldWiki/*/"))):
    folder = os.path.basename(d.rstrip("/"))
    docs = []
    for p in sorted(glob.glob(os.path.join(d, "*.md"))):
        t = read(p)
        docs.append({"title": title_from(p, t), "path": rel(p)})
    manifest["goldwiki"]["topics"][folder] = docs

out = os.path.join(ROOT, "Console", "manifest.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"manifest.json 생성 완료: {rel(out)}")
print(f"  agents={len(manifest['agents'])} commands={len(manifest['commands'])} "
      f"workflows={len(manifest['workflows'])} templates={len(manifest['templates'])} "
      f"examples={len(manifest['examples'])} teams={len(manifest['teams'])} "
      f"goldwiki(번호형)={len(manifest['goldwiki']['numbered'])} "
      f"goldwiki(토픽폴더)={len(manifest['goldwiki']['topics'])}")
