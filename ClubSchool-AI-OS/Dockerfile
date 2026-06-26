# ClubSchool AI OS — 콘솔 + 백엔드 (의존성 없는 단일 컨테이너)
FROM python:3.12-slim

WORKDIR /app
# 저장소(ClubSchool-AI-OS) 전체를 복사 — 콘솔이 GoldWiki/.claude/Agents 등을 서빙한다
COPY . /app

# manifest 선빌드(런타임에도 자동 생성되지만 이미지에 포함해 둔다)
RUN python3 Console/build-manifest.py || true

ENV PORT=8000
EXPOSE 8000

# ANTHROPIC_API_KEY 는 런타임 환경변수로 주입 (이미지에 굽지 않는다)
CMD ["python3", "server/app.py"]
