// Environment configuration with profiles for API domains
// Profiles: 'local' | 'dev' | 'prod'

export type AppProfile = 'local' | 'dev' | 'prod';

function detectProfile(): AppProfile {
  // Prefer explicit env var if provided (Expo uses EXPO_PUBLIC_*)
  const explicit = (process.env.EXPO_PUBLIC_PROFILE || process.env.NODE_ENV) as string | undefined;
  if (explicit) {
    const norm = explicit.toLowerCase();
    if (norm.includes('local')) return 'local';
    if (norm.includes('dev')) return 'dev';
    if (norm.includes('prod')) return 'prod';
  }
  // Heuristic based on hostname
  try {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'local';
  } catch {}
  return 'prod';
}

const PROFILE: AppProfile = detectProfile();

// Allow override via EXPO_PUBLIC_API_BASE_URL. Otherwise choose sensible defaults.
const explicitBase = (process.env.EXPO_PUBLIC_API_BASE_URL || '').trim();

const defaultsByProfile: Record<AppProfile, string> = {
  // Local Expo/Web during development. Adjust port if your local API differs.
  local: 'http://localhost:8081/api/v1',
  // Deployed behind reverse-proxy (nginx) where /api proxies to backend
  dev: '/api/v1',
  prod: '/api/v1',
};

const apiBaseFromProfile = explicitBase || defaultsByProfile[PROFILE];

export const ENV = {
  profile: PROFILE,
  apiBaseUrl: apiBaseFromProfile,
};

export function buildApiUrl(path: string): string {
  const base = (ENV.apiBaseUrl || '').replace(/\/+$/, '');
  const tail = (path || '').replace(/^\/+/, '');
  return `${base}/${tail}`;
}





