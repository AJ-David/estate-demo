import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Home, 
  Briefcase, 
  KeyRound, 
  AlertCircle,
  Database,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/common/BrandLogo';

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { 
    login, 
    register, 
    forgotPassword, 
    updatePassword, 
    isAuthenticated, 
    isConfigured, 
    recoveryMode 
  } = useAuth();

  const location = useLocation();

  const getInitialTab = () => {
    if (recoveryMode) return 'reset';
    if (searchParams.get('tab')) return searchParams.get('tab');
    if (location.pathname === '/signup' || location.pathname === '/register') return 'register';
    return 'login';
  };

  const initialTab = getInitialTab();
  const initialRole = searchParams.get('role') || 'buyer_tenant';
  const redirectPath = searchParams.get('redirect');

  const [activeTab, setActiveTab] = useState(initialTab); // 'login', 'register', 'forgot', 'reset', 'verify_email'
  const [selectedRole, setSelectedRole] = useState(initialRole);

  useEffect(() => {
    if (location.pathname === '/signup' || location.pathname === '/register') {
      setActiveTab('register');
    } else if (location.pathname === '/login') {
      setActiveTab('login');
    } else if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab'));
    }
  }, [location.pathname, searchParams]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab'));
    }
    if (searchParams.get('role')) {
      setSelectedRole(searchParams.get('role'));
    }
  }, [searchParams]);

  // If already authenticated and not resetting password, redirect to appropriate portal
  useEffect(() => {
    if (isAuthenticated && activeTab !== 'reset' && !recoveryMode) {
      if (redirectPath && redirectPath !== '/' && redirectPath !== '/login' && redirectPath !== '/signup') {
        navigate(redirectPath);
      } else {
        const dest = (selectedRole === 'landlord_owner' || selectedRole === 'agent') ? '/dashboard/landlord' : '/dashboard/buyer';
        navigate(dest);
      }
    }
  }, [isAuthenticated, redirectPath, activeTab, recoveryMode, navigate, selectedRole]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    const isAdminEmail = email.trim().toLowerCase() === 'admin@vettedhomes.ng';
    const roleToLogin = isAdminEmail ? 'admin' : selectedRole;
    const res = await login(email.trim(), password, roleToLogin);
    setLoading(false);

    if (res.success) {
      const isSpecificDeepLink = redirectPath && redirectPath !== '/' && redirectPath !== '/login' && redirectPath !== '/signup';
      const defaultDashboard = (selectedRole === 'landlord_owner' || selectedRole === 'agent' ? '/dashboard/landlord' : '/dashboard/buyer');
      const destination = isSpecificDeepLink ? redirectPath : (isAdminEmail ? '/admin' : defaultDashboard);
      navigate(destination);
    } else {
      setError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleAdminQuickSignIn = async () => {
    setError('');
    setLoading(true);
    setEmail('admin@vettedhomes.ng');
    setPassword('AdminMaster2026!');
    setSelectedRole('admin');
    const res = await login('admin@vettedhomes.ng', 'AdminMaster2026!', 'admin');
    setLoading(false);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Failed to authenticate administrator.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter a secure password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const res = await register({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      role: selectedRole
    });
    setLoading(false);

    if (res.success) {
      if (res.requiresVerification) {
        setActiveTab('verify_email');
      } else {
        setSuccessMessage('Account registered successfully! Welcome to your VettedHomes dashboard.');
        setTimeout(() => {
          const isSpecificDeepLink = redirectPath && redirectPath !== '/' && redirectPath !== '/login' && redirectPath !== '/signup';
          const defaultDashboard = (selectedRole === 'landlord_owner' || selectedRole === 'agent' ? '/dashboard/landlord' : '/dashboard/buyer');
          const destination = isSpecificDeepLink ? redirectPath : defaultDashboard;
          navigate(destination);
        }, 1200);
      }
    } else {
      setError(res.error || 'Registration failed. Please try again.');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    const res = await forgotPassword(email.trim());
    setLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || 'Password reset link sent to your email.');
    } else {
      setError(res.error || 'Failed to send password reset link.');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!newResetPassword || newResetPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await updatePassword(newResetPassword);
    setLoading(false);

    if (res.success) {
      setSuccessMessage('Password has been successfully updated! You can now sign in.');
      setTimeout(() => {
        setActiveTab('login');
        setSuccessMessage('');
      }, 2000);
    } else {
      setError(res.error || 'Failed to update password.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <BrandLogo size="lg" variant="light" showTagline={false} />
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Nigeria's Verified Property & Sovereign Neighbourhood Platform
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-navy-card rounded-3xl p-6 sm:p-8 border border-navy-border shadow-2xl text-white">
          
          {/* Tab Switcher (Visible on login and register) */}
          {(activeTab === 'login' || activeTab === 'register') && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-navy-deep rounded-2xl mb-6 text-xs font-bold border border-navy-border">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(''); setSuccessMessage(''); }}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'login' ? 'bg-gradient-to-r from-gold to-gold-light text-navy-deep font-bold shadow-gold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(''); setSuccessMessage(''); }}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'register' ? 'bg-gradient-to-r from-gold to-gold-light text-navy-deep font-bold shadow-gold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Context Alert when redirected from a protected route */}
          {redirectPath && (
            <div className="p-3.5 mb-4 bg-navy-surface border border-gold/40 rounded-2xl flex items-start gap-2.5 text-xs text-slate-200">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-display">
                  {redirectPath.includes('admin') || redirectPath.includes('moderation') 
                    ? 'Administrator Access Required' 
                    : 'Account Authentication Required'}
                </strong>
                <span className="text-estate-300">
                  {redirectPath.includes('admin') || redirectPath.includes('moderation')
                    ? 'Please sign in with your system administrator credentials to access the Admin Console.'
                    : 'Please sign in or create an account to access your private VettedHomes dashboard.'}
                </span>
              </div>
            </div>
          )}

          {/* Feedback messages */}
          {error && (
            <div className="p-3 mb-4 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-center gap-2 text-xs text-rose-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 mb-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com or admin@vettedhomes.ng"
                    className="w-full pl-9 pr-3 py-2.5 border border-navy-border rounded-xl text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-white">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('forgot'); setError(''); setSuccessMessage(''); }}
                    className="text-[11px] text-gold font-bold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
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

              {/* Login Role Workspace selector */}
              <div>
                <label className="block text-[11px] font-bold text-gold-light uppercase tracking-wider mb-1">
                  Active Workspace Role
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('buyer_tenant')}
                    className={`p-2 rounded-xl border text-center transition font-semibold ${
                      selectedRole === 'buyer_tenant'
                        ? 'border-gold bg-gold/20 text-gold-light'
                        : 'border-navy-border text-slate-300 hover:bg-navy-surface hover:text-white'
                    }`}
                  >
                    Tenant / Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('landlord_owner')}
                    className={`p-2 rounded-xl border text-center transition font-semibold ${
                      selectedRole === 'landlord_owner'
                        ? 'border-gold bg-gold/20 text-gold-light'
                        : 'border-navy-border text-slate-300 hover:bg-navy-surface hover:text-white'
                    }`}
                  >
                    Landlord / Agent
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy-deep rounded-xl text-xs sm:text-sm font-black shadow-gold transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                {!loading && <ArrowRight className="w-4 h-4 text-navy-deep" />}
              </button>

              <div className="pt-3 text-center border-t border-navy-border/60">
                <p className="text-xs text-estate-300">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('register'); setError(''); setSuccessMessage(''); }}
                    className="text-gold font-bold hover:underline ml-1"
                  >
                    Create One Here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Primary User Role Selector */}
              <div>
                <label className="block text-xs font-bold text-white mb-2">
                  What is your primary goal? *
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('buyer_tenant')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                      selectedRole === 'buyer_tenant'
                        ? 'border-gold bg-gold/20 text-gold-light font-bold ring-1 ring-gold/40'
                        : 'border-navy-border text-slate-300 hover:bg-navy-surface hover:text-white'
                    }`}
                  >
                    <Home className="w-4 h-4 text-gold" />
                    <span>Rent or Buy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('landlord_owner')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                      selectedRole === 'landlord_owner'
                        ? 'border-gold bg-gold/20 text-gold-light font-bold ring-1 ring-gold/40'
                        : 'border-navy-border text-slate-300 hover:bg-navy-surface hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-gold" />
                    <span>Landlord</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('agent')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                      selectedRole === 'agent'
                        ? 'border-gold bg-gold/20 text-gold-light font-bold ring-1 ring-gold/40'
                        : 'border-navy-border text-slate-300 hover:bg-navy-surface hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-gold" />
                    <span>Agent</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  * Multi-role accounts are supported. You can search as a tenant and post as a landlord under one login.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full pl-9 pr-3 py-2 border border-navy-border rounded-xl text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3 py-2 border border-navy-border rounded-xl text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Mobile Number (WhatsApp Active) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full pl-9 pr-3 py-2 border border-navy-border rounded-xl text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy-deep rounded-xl text-xs sm:text-sm font-black shadow-gold transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {loading ? 'Creating Account & Loading Dashboard...' : 'Complete Registration & Enter Dashboard'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="pt-3 text-center border-t border-navy-border/60">
                <p className="text-xs text-estate-300">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('login'); setError(''); setSuccessMessage(''); }}
                    className="text-gold font-bold hover:underline ml-1"
                  >
                    Sign In Here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* 3. FORGOT PASSWORD FORM */}
          {activeTab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-display">Reset Your Password</h3>
                <p className="text-xs text-estate-400">
                  Enter your registered email address and we will dispatch a secure reset link.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-navy-border rounded-xl text-xs bg-navy-deep text-white focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-gold to-gold-dark text-navy-deep text-xs font-bold rounded-xl shadow-gold hover:brightness-110 transition disabled:opacity-70"
              >
                {loading ? 'Sending link...' : 'Send Password Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('login'); setSuccessMessage(''); setError(''); }}
                className="w-full text-center text-xs text-estate-400 hover:text-gold font-semibold py-1"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {/* 4. PASSWORD RESET CONFIRMATION SCREEN */}
          {activeTab === 'reset' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-display">Create New Password</h3>
                <p className="text-xs text-estate-400">
                  Enter a new secure password for your VettedHomes account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newResetPassword}
                    onChange={(e) => setNewResetPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-navy-border rounded-xl text-xs bg-navy-deep text-white focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-gold to-gold-dark text-navy-deep text-xs font-bold rounded-xl shadow-gold hover:brightness-110 transition disabled:opacity-70"
              >
                {loading ? 'Updating Password...' : 'Save & Update Password'}
              </button>
            </form>
          )}

          {/* 5. EMAIL VERIFICATION NOTICE SCREEN */}
          {activeTab === 'verify_email' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-navy-surface text-gold rounded-full flex items-center justify-center mx-auto border border-gold/30">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Confirm Your Email</h3>
                <p className="text-xs text-estate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                  We have sent an authentication confirmation email to <strong className="text-gold">{email}</strong>. Click the link in the message to activate your account.
                </p>
              </div>

              <div className="p-3 bg-navy-surface rounded-xl border border-navy-border text-[11px] text-estate-400 text-left">
                <strong>Tip:</strong> If you do not see the confirmation email within 2 minutes, check your spam or promotional folders.
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="w-full py-2.5 bg-gold hover:bg-gold-light text-navy-deep text-xs font-bold rounded-xl shadow-gold transition"
              >
                Proceed to Sign In
              </button>
            </div>
          )}

        </div>

        <div className="text-center">
          <Link to="/admin/login" className="text-[11px] text-slate-500 hover:text-gold transition inline-flex items-center gap-1">
            <span>Staff & System Administrator Access</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </div>
  );
}
