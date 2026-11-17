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
            <BrandLogo size="lg" variant="light" showTagline={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-surface text-gold text-xs font-bold border border-gold/40">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Executive Admin Gateway</span>
          </div>
        </div>

        {/* Admin Card */}
        <div className="bg-navy-card rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-2xl text-white space-y-5">
          
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              System Administrator Sign In
            </h2>
            <p className="text-xs text-estate-300 leading-relaxed">
              Restricted portal for the platform owner to manage inventory, moderation desk, and Clean Slate toggle.
            </p>
          </div>

          {/* Feedback error */}
          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl flex items-center gap-2 text-xs text-rose-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Administrator Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vettedhomes.ng"
                  className="w-full pl-9 pr-3 py-2.5 border border-navy-border rounded-xl text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Master Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 border border-navy-border rounded-xl text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
                />
              </div>
            </div>

            {/* Quick Helper Credentials */}
            <div className="p-3 bg-navy-surface/80 rounded-2xl border border-navy-border text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gold uppercase tracking-wider">Default Master Credentials</span>
                <button
                  type="button"
                  onClick={handleFillCredentials}
                  className="text-[10px] text-gold hover:underline font-bold"
                >
                  Auto-Fill
                </button>
              </div>
              <div className="text-[11px] font-mono text-estate-300 space-y-0.5">
                <div>Email: <strong className="text-white">admin@vettedhomes.ng</strong></div>
                <div>Pass: <strong className="text-white">AdminMaster2026!</strong></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep rounded-xl text-xs sm:text-sm font-black shadow-gold transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70 tracking-wide"
            >
              <KeyRound className="w-4 h-4 text-navy-deep" />
              <span>{loading ? 'Authenticating Admin...' : 'Enter Admin Console'}</span>
              {!loading && <ArrowRight className="w-4 h-4 text-navy-deep" />}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-3 border-t border-navy-border text-center">
            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 text-xs text-estate-400 hover:text-gold transition font-medium"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to Public Marketplace</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
