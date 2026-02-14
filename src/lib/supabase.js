const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const apiBaseUrl = import.meta.env.VITE_AHNAJAK_API_BASE_URL || 'https://api.ahnajak.com';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

const STORAGE_KEY = 'ahnajak_session';

function isConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

async function requestJson(url, options, fallbackMessage) {
  try {
    const response = await fetch(url, options);
    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      return { data, error: { message: data.msg || data.message || data.error_description || data.error || fallbackMessage } };
    }

    return { data, error: null };
  } catch {
    return { data: null, error: { message: 'Network error. Check Supabase URL/keys and internet access.' } };
  }
}

function baseHeaders(token) {
  return {
    apikey: supabaseAnonKey,
    Authorization: token ? `Bearer ${token}` : `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
  };
}

export const supabaseLite = {
  isConfigured,
  getSession() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setSession(session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },
  clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  },
  async signUp(email, password) {
    if (!isConfigured()) return { data: null, error: { message: 'Supabase config missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' } };
    return requestJson(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: baseHeaders(),
      body: JSON.stringify({ email, password }),
    }, 'Failed to sign up');
  },
  async signIn(email, password) {
    if (!isConfigured()) return { data: null, error: { message: 'Supabase config missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' } };
    const result = await requestJson(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: baseHeaders(),
      body: JSON.stringify({ email, password }),
    }, 'Failed to login');
    if (result.data?.access_token) this.setSession(result.data);
    return result;
  },
  async getUser(token) {
    if (!isConfigured()) return { data: null, error: { message: 'Supabase config missing.' } };
    return requestJson(`${supabaseUrl}/auth/v1/user`, {
      headers: baseHeaders(token),
    }, 'Failed to fetch user');
  },
  async upsertMerchantConfig(token, payload) {
    if (!isConfigured()) return { data: null, error: { message: 'Supabase config missing.' } };
    return requestJson(`${supabaseUrl}/rest/v1/merchant_configs?on_conflict=user_id`, {
      method: 'POST',
      headers: {
        ...baseHeaders(token),
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    }, 'Failed to save config');
  },
  async getMerchantConfig(token, userId) {
    if (!isConfigured()) return { data: [], error: { message: 'Supabase config missing.' } };
    return requestJson(`${supabaseUrl}/rest/v1/merchant_configs?user_id=eq.${userId}&select=*`, {
      headers: baseHeaders(token),
    }, 'Failed to fetch config');
  },
  async getTransactions(token, userId) {
    if (!isConfigured()) return { data: [], error: { message: 'Supabase config missing.' } };
    return requestJson(`${supabaseUrl}/rest/v1/transactions?user_id=eq.${userId}&select=id,amount,status,created_at&order=created_at.desc&limit=5`, {
      headers: baseHeaders(token),
    }, 'Failed to fetch transactions');
  },
  async testPaymentAction(token, type, apiKey) {
    const endpoint = type === 'card' ? '/test/credit-card' : '/test/generate-qr';

    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mode: 'sandbox' }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = { message: response.ok ? 'Request sent.' : 'Failed to parse API response.' };
      }

      return {
        data,
        error: response.ok ? null : { message: data.message || 'Test request failed' },
      };
    } catch {
      return { data: null, error: { message: 'Unable to reach API endpoint. Check VITE_AHNAJAK_API_BASE_URL.' } };
    }
  },
};
