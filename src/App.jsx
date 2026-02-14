import { useEffect, useMemo, useState } from 'react';
import { Copy, CreditCard, QrCode, Rocket, ShieldCheck, Terminal, Zap } from 'lucide-react';
import { supabaseLite } from './lib/supabase';

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const onChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setPathname(to);
  };

  return { pathname, navigate };
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed right-4 top-4 z-50 rounded-md border border-white/20 bg-black/80 px-4 py-2 text-sm text-white shadow-lg">
      {message}
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#030308] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.2),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(56,189,248,0.12),transparent_40%)]" />
      {children}
    </div>
  );
}

function Navbar({ user, navigate }) {
  return (
    <header className="border-b border-white/10 bg-[#030308]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button onClick={() => navigate('/')} className="text-xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">Ahnajak Pay</span>
        </button>
        <nav className="flex items-center gap-4 md:gap-6">
          <button className="text-sm text-slate-300 hover:text-white" onClick={() => navigate('/docs')}>Docs</button>
          <button className="text-sm text-slate-300 hover:text-white" onClick={() => navigate('/pricing')}>Pricing</button>
          {user ? (
            <button className="rounded-md bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm font-medium" onClick={() => navigate('/dashboard')}>Dashboard</button>
          ) : (
            <button className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5" onClick={() => navigate('/login')}>Login</button>
          )}
        </nav>
      </div>
    </header>
  );
}

function LandingPage({ user, navigate }) {
  const features = [
    { icon: ShieldCheck, title: 'Secure Encryption', body: 'Protect merchant credentials with server-side encryption best practices and strict access controls.' },
    { icon: Terminal, title: 'Developer Friendly', body: 'Simple API patterns with x-api-key auth and copy-paste examples for Node.js integrations.' },
    { icon: Rocket, title: 'Instant Setup', body: 'Sign up, save ACLEDA config, and start test calls in minutes from your dashboard.' },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="rounded-2xl border border-white/10 bg-black/30 p-10 text-center shadow-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-violet-300">SaaS Payment Gateway</p>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Accept ACLEDA Payments with <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">One API.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-slate-300">Launch your payment flow in minutes with a cyberpunk-styled developer dashboard, secured configs, and real-time transaction visibility.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="rounded-md bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 font-medium" onClick={() => navigate(user ? '/dashboard' : '/signup')}>Start Building</button>
          <button className="rounded-md border border-white/20 px-5 py-3 font-medium" onClick={() => navigate('/docs')}>Read API Docs</button>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {features.map((item) => (
          <article key={item.title} className="rounded-xl border border-white/10 bg-black/25 p-6">
            <item.icon className="mb-3 h-6 w-6 text-violet-300" />
            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-slate-300">{item.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function AuthPage({ mode, navigate, showToast, setUser, setSession }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isSignup = mode === 'signup';

  async function onSubmit(e) {
    e.preventDefault();

    if (isSignup) {
      const { error } = await supabaseLite.signUp(email, password);
      if (error) return showToast(error.message);
      showToast('Account created. Please verify email if required.');
      navigate('/login');
      return;
    }

    const { data, error } = await supabaseLite.signIn(email, password);
    if (error) return showToast(error.message);

    const userRes = await supabaseLite.getUser(data.access_token);
    setSession(data);
    setUser(userRes.data);
    showToast('Login successful. Redirecting to dashboard...');
    navigate('/dashboard');
  }

  return (
    <div className="mx-auto mt-12 max-w-md px-4">
      <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-black/30 p-8">
        <h1 className="text-2xl font-semibold">{isSignup ? 'Create your account' : 'Login to Ahnajak Pay'}</h1>
        <p className="mt-2 text-sm text-slate-400">Secure login with Supabase Auth.</p>
        <div className="mt-6 space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@company.com" className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} placeholder="••••••••" className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2" />
          <button className="w-full rounded-md bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 font-medium">{isSignup ? 'Sign Up' : 'Login'}</button>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" className="text-sky-300" onClick={() => navigate(isSignup ? '/login' : '/signup')}>{isSignup ? 'Login' : 'Sign Up'}</button>
        </p>
      </form>
    </div>
  );
}

function DocsPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[250px_1fr]">
      <aside className="h-fit rounded-xl border border-white/10 bg-black/25 p-4 text-sm">
        <p className="mb-2 font-semibold">Docs Navigation</p>
        <ul className="space-y-2 text-slate-300">
          <li>Installation</li>
          <li>Initialization</li>
          <li>Create Checkout</li>
          <li>Check Status</li>
          <li>Verify Webhooks</li>
        </ul>
      </aside>
      <section className="rounded-xl border border-white/10 bg-black/25 p-6">
        <h1 className="text-3xl font-semibold">API Documentation</h1>
        <p className="mt-3 text-slate-300">Use your dashboard API key as <code>x-api-key</code> in every request.</p>

        <h2 className="mt-6 text-xl font-semibold">1) Installation</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black p-4 text-sm text-sky-200">{`npm install axios crypto`}</pre>

        <h2 className="mt-6 text-xl font-semibold">2) Initialization (Node.js client)</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black p-4 text-sm text-violet-200">{`const axios = require('axios');
const crypto = require('crypto');

const client = axios.create({
  baseURL: 'https://api.ahnajak.com',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.AHNAJAK_API_KEY,
  },
});`}</pre>

        <h2 className="mt-6 text-xl font-semibold">3) Create checkout</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black p-4 text-sm text-sky-200">{`const checkout = await client.post('/checkout', {
  order_id: 'INV-1201',
  amount: 15.5,
  currency: 'USD',
  customer_name: 'Sok Dara',
  customer_email: 'sok@example.com'
});

console.log(checkout.data);`}</pre>

        <h2 className="mt-6 text-xl font-semibold">4) Check payment status</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black p-4 text-sm text-violet-200">{`const status = await client.get('/payments/INV-1201/status');
console.log(status.data);`}</pre>

        <h2 className="mt-6 text-xl font-semibold">5) Webhook signature verification</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black p-4 text-sm text-sky-200">{`// Express route example
app.post('/webhooks/ahnajak', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-ahnajak-signature'];
  const expected = crypto
    .createHmac('sha256', process.env.AHNAJAK_WEBHOOK_SECRET)
    .update(req.body)
    .digest('hex');

  if (signature !== expected) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const event = JSON.parse(req.body.toString());
  console.log('Webhook event:', event.type, event.data);
  res.json({ received: true });
});`}</pre>
      </section>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded-xl border border-white/10 bg-black/25 p-6">
        <h1 className="text-3xl font-semibold">Pricing</h1>
        <p className="mt-3 text-slate-300">Starter plans available soon. Contact sales for enterprise ACLEDA routing and custom limits.</p>
      </section>
    </div>
  );
}

function randomApiKey() {
  return `aj_live_${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`;
}

function Dashboard({ user, session, showToast, setUser, navigate }) {
  const [config, setConfig] = useState({ acleda_merchant_id: '', acleda_store_id: '', encrypted_secret_key: '', api_key: randomApiKey() });
  const [transactions, setTransactions] = useState([]);
  const [copiedAfterLogin, setCopiedAfterLogin] = useState(false);

  useEffect(() => {
    async function load() {
      const cfg = await supabaseLite.getMerchantConfig(session.access_token, user.id);
      if (cfg.data?.[0]) {
        setConfig(cfg.data[0]);
      }

      const tx = await supabaseLite.getTransactions(session.access_token, user.id);
      setTransactions((tx.data || []).slice(0, 5));
    }
    load();
  }, [session.access_token, user.id]);

  const canRunPaymentTests = useMemo(
    () => Boolean(config.acleda_merchant_id && config.acleda_store_id && config.encrypted_secret_key),
    [config.acleda_merchant_id, config.acleda_store_id, config.encrypted_secret_key]
  );

  useEffect(() => {
    async function copyAfterLogin() {
      if (!config.api_key || copiedAfterLogin) return;
      try {
        await navigator.clipboard.writeText(config.api_key);
        showToast('API Key Copied');
      } catch {
        showToast('Logged in. Use Copy button to copy API key.');
      }
      setCopiedAfterLogin(true);
    }
    copyAfterLogin();
  }, [config.api_key, copiedAfterLogin, showToast]);

  async function saveConfig() {
    const payload = {
      user_id: user.id,
      acleda_merchant_id: config.acleda_merchant_id,
      acleda_store_id: config.acleda_store_id,
      encrypted_secret_key: config.encrypted_secret_key,
      api_key: config.api_key || randomApiKey(),
    };

    const { error } = await supabaseLite.upsertMerchantConfig(session.access_token, payload);
    if (error) return showToast(error.message);
    showToast('Configuration Saved');
  }

  async function copyApiKey() {
    try {
      await navigator.clipboard.writeText(config.api_key);
      showToast('API Key Copied');
    } catch {
      showToast('Clipboard blocked. Copy manually.');
    }
  }

  async function testGenerateQr() {
    if (!canRunPaymentTests) {
      showToast('Save ACLEDA configuration first.');
      return;
    }
    const { data, error } = await supabaseLite.testPaymentAction(session.access_token, 'qr', config.api_key);
    if (error) return showToast(error.message);
    showToast(data?.message || 'QR generation test sent');
  }

  async function testCreditCard() {
    if (!canRunPaymentTests) {
      showToast('Save ACLEDA configuration first.');
      return;
    }
    const { data, error } = await supabaseLite.testPaymentAction(session.access_token, 'card', config.api_key);
    if (error) return showToast(error.message);
    showToast(data?.message || 'Credit card test sent');
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Developer Dashboard</h1>
        <button
          onClick={() => {
            supabaseLite.clearSession();
            setUser(null);
            navigate('/');
          }}
          className="rounded-md border border-white/20 px-3 py-2 text-sm"
        >
          Sign Out
        </button>
      </div>

      <section className="rounded-xl border border-white/10 bg-black/25 p-6">
        <p className="text-sm text-slate-400">API Key</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-sm text-sky-200">{config.api_key}</p>
          <button onClick={copyApiKey} className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm"><Copy className="h-4 w-4" />Copy</button>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-white/10 bg-black/25 p-6">
        <h2 className="mb-2 text-xl font-semibold">Merchant Configuration</h2>
        <p className="mb-4 text-sm text-slate-400">Save your ACLEDA merchant credentials. For production security, encrypt the secret key server-side before storage.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input value={config.acleda_merchant_id || ''} onChange={(e) => setConfig((c) => ({ ...c, acleda_merchant_id: e.target.value }))} placeholder="ACLEDA Merchant ID" className="rounded-md border border-white/15 bg-transparent px-3 py-2" />
          <input value={config.acleda_store_id || ''} onChange={(e) => setConfig((c) => ({ ...c, acleda_store_id: e.target.value }))} placeholder="ACLEDA Store ID" className="rounded-md border border-white/15 bg-transparent px-3 py-2" />
          <input value={config.encrypted_secret_key || ''} onChange={(e) => setConfig((c) => ({ ...c, encrypted_secret_key: e.target.value }))} placeholder="Encrypted Secret Key" className="md:col-span-2 rounded-md border border-white/15 bg-transparent px-3 py-2" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={saveConfig} className="rounded-md bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 font-medium">Save Configuration</button>
          <button onClick={testGenerateQr} className="inline-flex items-center gap-2 rounded-md border border-sky-400/50 px-4 py-2 text-sm"><QrCode className="h-4 w-4" />Test Generate QR</button>
          <button onClick={testCreditCard} className="inline-flex items-center gap-2 rounded-md border border-violet-400/50 px-4 py-2 text-sm"><CreditCard className="h-4 w-4" />Test Credit Card</button>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-white/10 bg-black/25 p-6">
        <h2 className="mb-4 text-xl font-semibold">Recent Transactions (Last 5)</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr><th className="py-2">ID</th><th>Amount</th><th>Status</th><th>Created</th></tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td className="py-4 text-slate-500" colSpan={4}>No transactions yet.</td></tr>
            ) : (
              transactions.map((row) => (
                <tr key={row.id} className="border-t border-white/5">
                  <td className="py-2 font-mono text-xs">{row.id.slice(0, 10)}...</td>
                  <td>${Number(row.amount).toFixed(2)}</td>
                  <td>{row.status}</td>
                  <td>{new Date(row.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default function App() {
  const { pathname, navigate } = usePathname();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [toast, setToast] = useState('');

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  }

  useEffect(() => {
    const existing = supabaseLite.getSession();
    if (!existing?.access_token) return;
    setSession(existing);
    supabaseLite.getUser(existing.access_token).then((res) => setUser(res.data?.id ? res.data : null));
  }, []);

  useEffect(() => {
    if (pathname === '/dashboard' && !user) navigate('/login');
  }, [pathname, user, navigate]);

  return (
    <Layout>
      <Toast message={toast} />
      <Navbar user={user} navigate={navigate} />
      {pathname === '/' && <LandingPage user={user} navigate={navigate} />}
      {pathname === '/docs' && <DocsPage />}
      {pathname === '/pricing' && <PricingPage />}
      {pathname === '/login' && <AuthPage mode="login" navigate={navigate} showToast={showToast} setUser={setUser} setSession={setSession} />}
      {pathname === '/signup' && <AuthPage mode="signup" navigate={navigate} showToast={showToast} setUser={setUser} setSession={setSession} />}
      {pathname === '/dashboard' && user && session && <Dashboard user={user} session={session} showToast={showToast} setUser={setUser} navigate={navigate} />}
      {!['/', '/docs', '/pricing', '/login', '/signup', '/dashboard'].includes(pathname) && <div className="p-10">Page not found</div>}
      {!user && pathname === '/dashboard' && <div className="flex min-h-[40vh] items-center justify-center text-slate-300"><Zap className="mr-2 h-5 w-5 animate-pulse" /> Redirecting...</div>}
    </Layout>
  );
}
