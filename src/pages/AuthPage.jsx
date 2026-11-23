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
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white text-zinc-900">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <BrandLogo size="lg" variant="dark" showTagline={false} />
          </div>
          <p className="text-xs text-zinc-500 font-medium">
            Nigeria's Verified Property & Neighbourhood Intelligence Platform
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xl text-zinc-900">
          
          {/* Tab Switcher (Visible on login and register) */}
          {(activeTab === 'login' || activeTab === 'register') && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-100 rounded-2xl mb-6 text-xs font-bold border border-zinc-200">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(''); setSuccessMessage(''); }}
                className={`py-2 rounded-xl transition cursor-pointer ${
                  activeTab === 'login' ? 'bg-black text-white font-bold shadow-xs' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(''); setSuccessMessage(''); }}
                className={`py-2 rounded-xl transition cursor-pointer ${
                  activeTab === 'register' ? 'bg-black text-white font-bold shadow-xs' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Context Alert when redirected from a protected route */}
          {redirectPath && (
            <div className="p-3.5 mb-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-start gap-2.5 text-xs text-zinc-700">
              <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-900 block font-display">
                  {redirectPath.includes('admin') || redirectPath.includes('moderation') 
                    ? 'Administrator Access Required' 
                    : 'Account Authentication Required'}
                </strong>
                <span className="text-zinc-600">
                  {redirectPath.includes('admin') || redirectPath.includes('moderation')
                    ? 'Please sign in with your system administrator credentials to access the Admin Console.'
                    : 'Please sign in or create an account to access your private VettedHomes dashboard.'}
                </span>
              </div>
            </div>
          )}

          {/* Feedback messages */}
          {error && (
            <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com or admin@vettedhomes.ng"
                    className="w-full pl-9 pr-3 py-2.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-zinc-900">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('forgot'); setError(''); setSuccessMessage(''); }}
                    className="text-[11px] text-zinc-600 font-bold hover:text-black hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              {/* Login Role Workspace selector */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                  Active Workspace Role
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('buyer_tenant')}
                    className={`p-2 rounded-xl border text-center transition font-semibold cursor-pointer ${
                      selectedRole === 'buyer_tenant'
                        ? 'border-black bg-zinc-100 text-black font-bold ring-1 ring-black'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-black'
                    }`}
                  >
                    Tenant / Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('landlord_owner')}
                    className={`p-2 rounded-xl border text-center transition font-semibold cursor-pointer ${
                      selectedRole === 'landlord_owner'
                        ? 'border-black bg-zinc-100 text-black font-bold ring-1 ring-black'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-black'
                    }`}
                  >
                    Landlord / Agent
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70 cursor-pointer"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                {!loading && <ArrowRight className="w-4 h-4 text-white" />}
              </button>

              <div className="pt-3 text-center border-t border-zinc-200">
                <p className="text-xs text-zinc-500">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('register'); setError(''); setSuccessMessage(''); }}
                    className="text-black font-bold hover:underline ml-1 cursor-pointer"
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
                <label className="block text-xs font-bold text-zinc-900 mb-2">
                  What is your primary goal? *
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('buyer_tenant')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition cursor-pointer ${
                      selectedRole === 'buyer_tenant'
                        ? 'border-black bg-zinc-100 text-black font-bold ring-1 ring-black'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-black'
                    }`}
                  >
                    <Home className="w-4 h-4 text-zinc-900" />
                    <span>Rent or Buy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('landlord_owner')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition cursor-pointer ${
                      selectedRole === 'landlord_owner'
                        ? 'border-black bg-zinc-100 text-black font-bold ring-1 ring-black'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-black'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-zinc-900" />
                    <span>Landlord</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('agent')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition cursor-pointer ${
                      selectedRole === 'agent'
                        ? 'border-black bg-zinc-100 text-black font-bold ring-1 ring-black'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-black'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-zinc-900" />
                    <span>Agent</span>
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">
                  * Multi-role accounts are supported. You can search as a tenant and post as a landlord under one login.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  Mobile Number (WhatsApp Active) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70 cursor-pointer"
              >
                {loading ? 'Creating Account & Loading Dashboard...' : 'Complete Registration & Enter Dashboard'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="pt-3 text-center border-t border-zinc-200">
                <p className="text-xs text-zinc-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('login'); setError(''); setSuccessMessage(''); }}
                    className="text-black font-bold hover:underline ml-1 cursor-pointer"
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
                <h3 className="text-base font-bold text-zinc-900 font-display">Reset Your Password</h3>
                <p className="text-xs text-zinc-500">
                  Enter your registered email address and we will dispatch a secure reset link.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-xl shadow-xs transition disabled:opacity-70 cursor-pointer"
              >
                {loading ? 'Sending link...' : 'Send Password Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('login'); setSuccessMessage(''); setError(''); }}
                className="w-full text-center text-xs text-zinc-500 hover:text-black font-semibold py-1 cursor-pointer"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {/* 4. PASSWORD RESET CONFIRMATION SCREEN */}
          {activeTab === 'reset' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900 font-display">Create New Password</h3>
                <p className="text-xs text-zinc-500">
                  Enter a new secure password for your VettedHomes account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newResetPassword}
                    onChange={(e) => setNewResetPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50 text-zinc-900 focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-xl shadow-xs transition disabled:opacity-70 cursor-pointer"
              >
                {loading ? 'Updating Password...' : 'Save & Update Password'}
              </button>
            </form>
          )}

          {/* 5. EMAIL VERIFICATION NOTICE SCREEN */}
          {activeTab === 'verify_email' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-zinc-100 text-black rounded-full flex items-center justify-center mx-auto border border-zinc-200">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 font-display">Confirm Your Email</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  We have sent an authentication confirmation email to <strong className="text-black">{email}</strong>. Click the link in the message to activate your account.
                </p>
              </div>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] text-zinc-500 text-left">
                <strong>Tip:</strong> If you do not see the confirmation email within 2 minutes, check your spam or promotional folders.
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Proceed to Sign In
              </button>
            </div>
          )}

        </div>

        <div className="text-center">
          <Link to="/admin/login" className="text-[11px] text-zinc-500 hover:text-black transition inline-flex items-center gap-1">
            <span>Staff & System Administrator Access</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </div>
  );
}
