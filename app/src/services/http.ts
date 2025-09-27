import { buildApiUrl } from '../config/env';

export interface HttpError extends Error {
  status?: number;
  details?: unknown;
}

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : buildApiUrl(path);
  if (typeof console !== 'undefined') {
    try { console.debug('[http] fetch', url, init); } catch {}
  }
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(init?.headers as Record<string, string>),
  };
  const body = init?.body;
  const needsJson = body && typeof body === 'object' && !(body instanceof FormData);
  if (needsJson && !headers['Content-Type']) headers['Content-Type'] = 'application/json';

  const resp = await fetch(url, { ...init, headers, body: needsJson ? JSON.stringify(body) : body });

  const isJson = resp.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await resp.json().catch(() => undefined) : await resp.text().catch(() => undefined);

  if (!resp.ok) {
    const err: HttpError = new Error((payload as any)?.message || (payload as any)?.error || `Request failed: ${resp.status}`);
    err.status = resp.status;
    err.details = payload;
    throw err;
  }

  return payload as T;
}




