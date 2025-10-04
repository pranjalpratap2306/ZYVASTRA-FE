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
  // Local development server
  local: 'http://localhost:8081/api/v1',
  // Development environment
  dev: 'http://localhost:8081/api/v1',
  // Production environment
  prod: 'https://zyvastra.netlify.app/api/v1',
};

const apiBaseFromProfile = explicitBase || defaultsByProfile[PROFILE];

export const ENV = {
  profile: PROFILE,
  apiBaseUrl: apiBaseFromProfile,
};

export function buildApiUrl(path: string): string {
  const base = (ENV.apiBaseUrl || '').replace(/\/+$/, '');
  const tail = (path || '').replace(/^\/+/, '');
  console.log(`Built API URL: ${base}/${tail}`);
  return `${base}/${tail}`;
}





