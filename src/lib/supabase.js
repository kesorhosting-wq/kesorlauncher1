const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const apiBaseUrl = import.meta.env.VITE_AHNAJAK_API_BASE_URL || 'https://api.ahnajak.com';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

const STORAGE_KEY = 'ahnajak_session';

function baseHeaders(token) {
  return {
    apikey: supabaseAnonKey,
    Authorization: token ? `Bearer ${token}` : `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
  };
}

export const supabaseLite = {
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
    const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: baseHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return {
      data,
      error: data.error ? { message: data.msg || data.error_description || data.error } : null,
    };
  },
  async signIn(email, password) {
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: baseHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.access_token) {
      this.setSession(data);
    }
    return {
      data,
      error: data.error ? { message: data.error_description || data.error } : null,
    };
  },
  async getUser(token) {
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: baseHeaders(token),
    });
    const data = await response.json();
    return {
      data,
      error: data.error ? { message: data.msg || data.error_description || data.error } : null,
    };
  },
  async upsertMerchantConfig(token, payload) {
    const response = await fetch(`${supabaseUrl}/rest/v1/merchant_configs?on_conflict=user_id`, {
      method: 'POST',
      headers: {
        ...baseHeaders(token),
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return {
      data,
      error: response.ok ? null : { message: data.message || 'Failed to save config' },
    };
  },
  async getMerchantConfig(token, userId) {
    const response = await fetch(`${supabaseUrl}/rest/v1/merchant_configs?user_id=eq.${userId}&select=*`, {
      headers: baseHeaders(token),
    });
    const data = await response.json();
    return {
      data,
      error: response.ok ? null : { message: data.message || 'Failed to fetch config' },
    };
  },
  async getTransactions(token, userId) {
    const response = await fetch(`${supabaseUrl}/rest/v1/transactions?user_id=eq.${userId}&select=id,amount,status,created_at&order=created_at.desc&limit=5`, {
      headers: baseHeaders(token),
    });
    const data = await response.json();
    return {
      data,
      error: response.ok ? null : { message: data.message || 'Failed to fetch transactions' },
    };
  },
  async testPaymentAction(token, type, apiKey) {
    const endpoint = type === 'card' ? '/test/credit-card' : '/test/generate-qr';
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
  },
};
