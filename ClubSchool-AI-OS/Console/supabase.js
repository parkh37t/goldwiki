/* ClubSchool AI OS — 경량 Supabase 클라이언트 (SDK 불필요, fetch 기반)
 * - 인증: GoTrue REST (/auth/v1)
 * - 데이터: PostgREST (/rest/v1) — 사용자 JWT로 RLS 적용
 * - RAG: 서버 /api/rag (임베딩은 서버사이드)
 * 설정값(URL/anonKey)은 콘솔이 /api/config 에서 받아 CSDB.configure() 로 주입한다.
 */
'use strict';

const CSDB = (() => {
  let URL_ = '', ANON = '';
  const SK = 'cs.session';

  const cfg = () => ({ url: URL_, anon: ANON, enabled: !!(URL_ && ANON) });
  function configure(url, anon) { URL_ = (url || '').replace(/\/$/, ''); ANON = anon || ''; }

  function session() { try { return JSON.parse(localStorage.getItem(SK)); } catch { return null; } }
  function setSession(s) { s ? localStorage.setItem(SK, JSON.stringify(s)) : localStorage.removeItem(SK); }
  function user() { const s = session(); return s && s.user ? s.user : null; }

  function authHeaders(json = true) {
    const s = session();
    const h = { apikey: ANON };
    if (json) h['Content-Type'] = 'application/json';
    h['Authorization'] = 'Bearer ' + (s && s.access_token ? s.access_token : ANON);
    return h;
  }

  async function _auth(path, body) {
    const r = await fetch(`${URL_}/auth/v1/${path}`, {
      method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error_description || data.msg || data.error || ('HTTP ' + r.status));
    return data;
  }

  async function signIn(email, password) {
    const d = await _auth('token?grant_type=password', { email, password });
    setSession(d); return d.user;
  }
  async function signUp(email, password) {
    const d = await _auth('signup', { email, password });
    if (d.access_token) setSession(d);     // 이메일 확인 비활성 시 즉시 세션
    return d;
  }
  async function signOut() {
    try { await fetch(`${URL_}/auth/v1/logout`, { method: 'POST', headers: authHeaders() }); } catch {}
    setSession(null);
  }

  // PostgREST
  async function insert(table, row) {
    const r = await fetch(`${URL_}/rest/v1/${table}`, {
      method: 'POST', headers: { ...authHeaders(), Prefer: 'return=representation' },
      body: JSON.stringify(row),
    });
    const data = await r.json().catch(() => ([]));
    if (!r.ok) throw new Error((data && data.message) || ('insert 실패 HTTP ' + r.status));
    return Array.isArray(data) ? data[0] : data;
  }
  async function select(table, query = '') {
    const r = await fetch(`${URL_}/rest/v1/${table}${query ? '?' + query : ''}`, { headers: authHeaders(false) });
    const data = await r.json().catch(() => ([]));
    if (!r.ok) throw new Error((data && data.message) || ('select 실패 HTTP ' + r.status));
    return data;
  }

  return { configure, cfg, session, user, signIn, signUp, signOut, insert, select };
})();

window.CSDB = CSDB;
