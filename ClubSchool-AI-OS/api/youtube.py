"""Vercel 서버리스 함수 — /api/youtube.

유튜브 URL을 받아 자막(transcript)과 메타데이터를 추출해 반환한다.
콘솔의 '유튜브 인사이트' 기능이 이 자막을 받아 LLM 엔진으로 인사이트를 생성한다.
브라우저에서 직접 유튜브를 호출하면 CORS로 막히므로 서버에서 대신 가져온다.

POST { "url": "<youtube url 또는 id>" }  →  { ok, videoId, title, lang, transcript, source }
의존성: youtube-transcript-api (requirements.txt). 미설치/실패 시 명확한 오류 반환.
"""
import json
import re
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler


def _video_id(s):
    s = (s or "").strip()
    if not s:
        return None
    # 순수 11자리 ID
    if re.fullmatch(r"[0-9A-Za-z_-]{11}", s):
        return s
    patterns = [
        r"(?:v=|/v/|youtu\.be/|/embed/|/shorts/|/live/)([0-9A-Za-z_-]{11})",
    ]
    for p in patterns:
        m = re.search(p, s)
        if m:
            return m.group(1)
    return None


def _title(vid):
    try:
        url = "https://www.youtube.com/oembed?" + urllib.parse.urlencode(
            {"url": "https://www.youtube.com/watch?v=" + vid, "format": "json"})
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as r:
            d = json.loads(r.read().decode("utf-8"))
            return d.get("title"), d.get("author_name")
    except Exception:
        return None, None


def _transcript(vid):
    """youtube-transcript-api 로 자막 추출. (ko 우선, 없으면 en, 그 외 첫 언어)"""
    from youtube_transcript_api import YouTubeTranscriptApi
    langs = ["ko", "ko-KR", "en", "en-US", "en-GB"]
    try:
        items = YouTubeTranscriptApi.get_transcript(vid, languages=langs)
        return items, "preferred"
    except Exception:
        # 사용 가능한 아무 자막(자동생성 포함)
        listing = YouTubeTranscriptApi.list_transcripts(vid)
        for tr in listing:
            try:
                return tr.fetch(), tr.language_code
            except Exception:
                continue
        raise


class handler(BaseHTTPRequestHandler):
    def _send(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        try:
            n = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(n) or b"{}")
        except (ValueError, json.JSONDecodeError):
            return self._send(400, {"ok": False, "error": "invalid JSON"})

        vid = _video_id(payload.get("url") or payload.get("id"))
        if not vid:
            return self._send(400, {"ok": False, "error": "유튜브 URL에서 영상 ID를 찾지 못했습니다."})

        title, author = _title(vid)
        try:
            items, lang = _transcript(vid)
        except ImportError:
            return self._send(500, {"ok": False, "videoId": vid, "title": title,
                                    "error": "서버에 youtube-transcript-api가 설치되지 않았습니다. requirements.txt 배포를 확인하세요."})
        except Exception as e:  # noqa: BLE001
            msg = str(e) or e.__class__.__name__
            return self._send(502, {"ok": False, "videoId": vid, "title": title,
                                    "error": "자막을 가져오지 못했습니다(비공개/자막없음/차단 가능). 자막을 직접 붙여넣어 분석하세요. [%s]" % msg[:160]})

        def _txt(x):
            return x.get("text") if isinstance(x, dict) else getattr(x, "text", "")
        transcript = " ".join((_txt(x) or "").strip() for x in items).strip()
        transcript = re.sub(r"\s+", " ", transcript)
        if not transcript:
            return self._send(502, {"ok": False, "videoId": vid, "title": title,
                                    "error": "자막이 비어 있습니다. 자막을 직접 붙여넣어 분석하세요."})

        return self._send(200, {
            "ok": True, "videoId": vid, "title": title, "author": author,
            "lang": lang, "chars": len(transcript), "transcript": transcript,
            "url": "https://www.youtube.com/watch?v=" + vid, "source": "youtube-transcript-api",
        })
