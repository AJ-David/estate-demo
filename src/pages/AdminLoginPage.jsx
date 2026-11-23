import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  KeyRound,
  CheckCircle2,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/common/BrandLogo';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState('admin@vettedhomes.ng');
  const [password, setPassword] = useState('AdminMaster2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated as admin, redirect directly to /admin
  useEffect(() => {
    if (isAuthenticated && user?.roles?.includes('admin')) {
      navigate('/admin');
    }
  }, [isAuthenticated, user, navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your administrator email.');
      return;
    }
    if (!password) {
      setError('Please enter your administrator password.');
      return;
    }

    setLoading(true);
    const res = await login(email.trim(), password, 'admin');
    setLoading(false);

    if (res.success) {
      if (res.user?.roles?.includes('admin')) {
        navigate('/admin');
      } else {
        setError('This account does not have administrator clearance.');
      }
    } else {
      setError(res.error || 'Invalid administrator credentials. Access denied.');
    }
  };

  const handleFillCredentials = () => {
    setEmail('admin@vettedhomes.ng');
    setPassword('AdminMaster2026!');
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <BrandLogo size="lg" variant="dark" showTagline={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-black text-xs font-bold border border-zinc-200">
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>Executive Admin Gateway</span>
          </div>
        </div>

        {/* Admin Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 text-zinc-900 space-y-5">
          
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-black font-display">
              System Administrator Sign In
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Restricted portal for the platform owner to manage inventory, moderation desk, and Clean Slate toggle.
            </p>
          </div>

          {/* Feedback error */}
          {error && (
            <div className="p-3 bg-zinc-100 border border-zinc-300 rounded-xl flex items-center gap-2 text-xs text-black animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-black" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Administrator Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vettedhomes.ng"
                  className="w-full pl-9 pr-3 py-2.5 border border-zinc-300 rounded-xl text-xs bg-white text-black placeholder-zinc-400 focus:outline-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Master Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 border border-zinc-300 rounded-xl text-xs bg-white text-black placeholder-zinc-400 focus:outline-black"
                />
              </div>
            </div>

            {/* Quick Helper Credentials */}
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-black uppercase tracking-wider">Default Master Credentials</span>
                <button
                  type="button"
                  onClick={handleFillCredentials}
                  className="text-[10px] text-black hover:underline font-bold cursor-pointer"
                >
                  Auto-Fill
                </button>
              </div>
              <div className="text-[11px] font-mono text-zinc-600 space-y-0.5">
                <div>Email: <strong className="text-black">admin@vettedhomes.ng</strong></div>
                <div>Pass: <strong className="text-black">AdminMaster2026!</strong></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70 tracking-wide cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-white" />
              <span>{loading ? 'Authenticating Admin...' : 'Enter Admin Console'}</span>
              {!loading && <ArrowRight className="w-4 h-4 text-white" />}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-3 border-t border-zinc-200 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-black transition font-medium"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Go to Member Sign In / Sign Up</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
