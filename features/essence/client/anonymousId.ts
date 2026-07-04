const ANONYMOUS_ID_STORAGE_KEY = "mysticstudio.anonymousId";
const ANONYMOUS_ID_COOKIE_KEY = "mysticstudio.anonymousId";
const ANONYMOUS_ID_COOKIE_MAX_AGE_DAYS = 365;

function createAnonymousId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  if (!cookie) return null;

  return decodeURIComponent(cookie.split("=")[1] ?? "");
}

function setCookieValue(name: string, value: string) {
  if (typeof document === "undefined") {
    return;
  }

  const maxAge = ANONYMOUS_ID_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;

  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function persistAnonymousId(anonymousId: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ANONYMOUS_ID_STORAGE_KEY, anonymousId);
  setCookieValue(ANONYMOUS_ID_COOKIE_KEY, anonymousId);
}

export function getOrCreateAnonymousId() {
  if (typeof window === "undefined") {
    return null;
  }

  const existingLocalId = localStorage.getItem(ANONYMOUS_ID_STORAGE_KEY);

  if (existingLocalId) {
    setCookieValue(ANONYMOUS_ID_COOKIE_KEY, existingLocalId);
    return existingLocalId;
  }

  const existingCookieId = getCookieValue(ANONYMOUS_ID_COOKIE_KEY);

  if (existingCookieId) {
    localStorage.setItem(ANONYMOUS_ID_STORAGE_KEY, existingCookieId);
    return existingCookieId;
  }

  const newId = createAnonymousId();

  persistAnonymousId(newId);

  return newId;
}

export function getAnonymousId() {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem(ANONYMOUS_ID_STORAGE_KEY) ??
    getCookieValue(ANONYMOUS_ID_COOKIE_KEY)
  );
}