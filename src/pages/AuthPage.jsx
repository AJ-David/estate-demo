import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
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

  const initialTab = searchParams.get('tab') || (recoveryMode ? 'reset' : 'login');
  const initialRole = searchParams.get('role') || 'buyer_tenant';
  const redirectPath = searchParams.get('redirect');

  const [activeTab, setActiveTab] = useState(initialTab); // 'login', 'register', 'forgot', 'reset', 'verify_email'
  const [selectedRole, setSelectedRole] = useState(initialRole);

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
      if (redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [isAuthenticated, redirectPath, activeTab, recoveryMode, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email || 'babatunde@vettedhomes.demo', password, selectedRole);
    setLoading(false);

    if (res.success) {
      const destination = redirectPath || (selectedRole === 'landlord_owner' || selectedRole === 'agent' ? '/dashboard/landlord' : '/dashboard/buyer');
      navigate(destination);
    } else {
      setError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
      name: name || 'Demo Resident',
      email: email || 'user@vettedhomes.ng',
      phone: phone || '+234 800 000 0000',
      password,
      role: selectedRole
    });
    setLoading(false);

    if (res.success) {
      if (res.requiresVerification) {
        setActiveTab('verify_email');
      } else {
        setSuccessMessage('Account registered successfully! Welcome to VettedHomes.');
        setTimeout(() => {
          const destination = redirectPath || (selectedRole === 'landlord_owner' || selectedRole === 'agent' ? '/dashboard/landlord' : '/dashboard/buyer');
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
    setLoading(true);

    const res = await forgotPassword(email);
    setLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || `Password reset link has been dispatched to ${email}. Check your inbox.`);
    } else {
      setError(res.error || 'Unable to send password reset link.');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newResetPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const res = await updatePassword(newResetPassword);
    setLoading(false);

    if (res.success) {
      setSuccessMessage('Your password has been successfully updated! You can now sign in.');
      setTimeout(() => {
        setActiveTab('login');
        setSuccessMessage('');
      }, 1500);
    } else {
      setError(res.error || 'Failed to update password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-sand-warm">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <BrandLogo size="lg" variant="dark" showTagline={false} />
          </div>
          <p className="text-xs text-estate-500 font-medium">
            Nigeria's Verified Property & Neighbourhood Platform
          </p>

          {/* Connection Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-white border border-estate-200 text-estate-600 shadow-xs">
            <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald animate-pulse' : 'bg-amber-400'}`}></span>
            <span>{isConfigured ? 'Live Supabase Connected' : 'Local Demo Sandbox Mode'}</span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-estate-200 shadow-premium">
          
          {/* Tab Switcher (Visible only on login and register) */}
          {(activeTab === 'login' || activeTab === 'register') && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-estate-100 rounded-2xl mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(''); setSuccessMessage(''); }}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'login' ? 'bg-white text-navy shadow-xs' : 'text-estate-500 hover:text-navy'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(''); setSuccessMessage(''); }}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'register' ? 'bg-white text-navy shadow-xs' : 'text-estate-500 hover:text-navy'
                }`}
              >
                Create Account
              </button>
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
            <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-estate-800 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. babatunde@vettedhomes.demo"
                    className="w-full pl-9 pr-3 py-2.5 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-estate-800">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('forgot'); setError(''); setSuccessMessage(''); }}
                    className="text-[11px] text-emerald font-bold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
              </div>

              {/* Login Role Workspace selector */}
              <div>
                <label className="block text-[11px] font-bold text-estate-500 uppercase tracking-wider mb-1">
                  Active Workspace Role
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('buyer_tenant')}
                    className={`p-2 rounded-xl border text-center transition font-semibold ${
                      selectedRole === 'buyer_tenant'
                        ? 'border-emerald bg-emerald-50 text-emerald-800'
                        : 'border-estate-200 text-estate-600 hover:bg-estate-50'
                    }`}
                  >
                    Tenant / Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('landlord_owner')}
                    className={`p-2 rounded-xl border text-center transition font-semibold ${
                      selectedRole === 'landlord_owner'
                        ? 'border-emerald bg-emerald-50 text-emerald-800'
                        : 'border-estate-200 text-estate-600 hover:bg-estate-50'
                    }`}
                  >
                    Landlord / Agent
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-navy hover:bg-estate-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {loading ? 'Authenticating...' : 'Sign In to VettedHomes'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="pt-2 text-center text-xs text-estate-500">
                <span>Demo mode preloads sample credentials. Simply click <strong>Sign In</strong>.</span>
              </div>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Primary User Role Selector */}
              <div>
                <label className="block text-xs font-bold text-estate-800 mb-2">
                  What is your primary goal? *
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('buyer_tenant')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                      selectedRole === 'buyer_tenant'
                        ? 'border-emerald bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-400'
                        : 'border-estate-200 text-estate-700 hover:bg-estate-50'
                    }`}
                  >
                    <Home className="w-4 h-4 text-emerald" />
                    <span>Rent or Buy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('landlord_owner')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                      selectedRole === 'landlord_owner'
                        ? 'border-emerald bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-400'
                        : 'border-estate-200 text-estate-700 hover:bg-estate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald" />
                    <span>Landlord</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('agent')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                      selectedRole === 'agent'
                        ? 'border-emerald bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-400'
                        : 'border-estate-200 text-estate-700 hover:bg-estate-50'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-emerald" />
                    <span>Agent</span>
                  </button>
                </div>
                <p className="text-[10px] text-estate-400 mt-1">
                  * Multi-role accounts are fully supported. You can search as a tenant and post as a landlord under one login.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-estate-800 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full pl-9 pr-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-estate-800 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-estate-800 mb-1">
                  Mobile Number (WhatsApp Active) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full pl-9 pr-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-estate-800 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-estate-800 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald hover:bg-emerald-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* 3. FORGOT PASSWORD FORM */}
          {activeTab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-navy font-display">Reset Your Password</h3>
                <p className="text-xs text-estate-500">
                  Enter your registered email address and we will dispatch a secure reset link.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-estate-800 mb-1">
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
                    className="w-full pl-9 pr-3 py-2.5 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition disabled:opacity-70"
              >
                {loading ? 'Sending link...' : 'Send Password Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('login'); setSuccessMessage(''); setError(''); }}
                className="w-full text-center text-xs text-estate-600 hover:text-navy font-semibold py-1"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {/* 4. PASSWORD RESET CONFIRMATION SCREEN */}
          {activeTab === 'reset' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-navy font-display">Create New Password</h3>
                <p className="text-xs text-estate-500">
                  Enter a new secure password for your VettedHomes account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-estate-800 mb-1">
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
                    className="w-full pl-9 pr-3 py-2.5 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition disabled:opacity-70"
              >
                {loading ? 'Updating Password...' : 'Save & Update Password'}
              </button>
            </form>
          )}

          {/* 5. EMAIL VERIFICATION NOTICE SCREEN */}
          {activeTab === 'verify_email' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy font-display">Confirm Your Email</h3>
                <p className="text-xs text-estate-600 mt-1 max-w-xs mx-auto leading-relaxed">
                  We have sent an authentication confirmation email to <strong className="text-navy">{email}</strong>. Click the link in the message to activate your account.
                </p>
              </div>

              <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 text-[11px] text-estate-500 text-left">
                <strong>Tip:</strong> If you do not see the confirmation email within 2 minutes, check your spam or promotional folders.
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="w-full py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition"
              >
                Proceed to Sign In
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
