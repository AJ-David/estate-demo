import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  KeyRound, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Upload, 
  FileCheck,
  ArrowRight
} from 'lucide-react';

export function ProfilePage() {
  const { user, activeRole, switchRole, addRole, updateProfile, updatePassword, isConfigured } = useAuth();

  const [activeTab, setActiveTab] = useState('details'); // 'details', 'roles', 'security', 'verification'
  
  // Details form state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status message
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    const res = await updateProfile({
      name,
      phone,
      bio,
      avatar
    });

    setLoading(false);
    if (res.success) {
      setStatusMsg({ type: 'success', text: 'Profile information updated successfully!' });
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
    } else {
      setStatusMsg({ type: 'error', text: res.error || 'Failed to update profile.' });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setStatusMsg({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    const res = await updatePassword(newPassword);
    setLoading(false);

    if (res.success) {
      setStatusMsg({ type: 'success', text: 'Password has been updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
    } else {
      setStatusMsg({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  const allPossibleRoles = [
    {
      id: 'buyer_tenant',
      title: 'Buyer & Tenant',
      description: 'Search properties, save favorites, book inspections, review neighbourhoods, and post in communities.'
    },
    {
      id: 'landlord_owner',
      title: 'Landlord & Property Owner',
      description: 'List residential properties for rent or sale, view enquiries, manage inspection schedules.'
    },
    {
      id: 'agent',
      title: 'Certified Real Estate Agent',
      description: 'Manage property portfolios, client leads, verified inspections, and agency profile.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-estate-200 shadow-premium flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={avatar || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-emerald-100 shadow-md"
          />
          {user?.isVerified && (
            <span className="absolute -bottom-1.5 -right-1.5 bg-emerald text-white p-1 rounded-full shadow-md" title="Verified Identity">
              <ShieldCheck className="w-4 h-4" />
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-bold text-navy font-display">{user?.name}</h1>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
              {activeRole.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs text-estate-500">{user?.email}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-estate-600">
            <span><strong>Active Roles:</strong> {user?.roles?.map(r => r.replace('_', ' ')).join(', ')}</span>
            <span>•</span>
            <span className="text-emerald font-semibold">
              {isConfigured ? 'Connected to Supabase' : 'Local Demo Storage Mode'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-estate-200 pb-2 overflow-x-auto text-xs sm:text-sm font-bold">
        {[
          { id: 'details', label: 'Personal Information', icon: User },
          { id: 'roles', label: 'Multi-Role Settings', icon: Layers },
          { id: 'security', label: 'Password & Security', icon: KeyRound },
          { id: 'verification', label: 'Badges & Verification', icon: FileCheck }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setActiveTab(tab.id); setStatusMsg({ type: '', text: '' }); }}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-estate-600 hover:text-navy hover:bg-estate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Status Alert */}
      {statusMsg.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn ${
          statusMsg.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
            : 'bg-rose-50 border border-rose-200 text-rose-900'
        }`}>
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* TAB 1: PERSONAL DETAILS */}
      {activeTab === 'details' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-estate-200 shadow-subtle max-w-2xl">
          <form onSubmit={handleUpdateDetails} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                Email Address (Primary Login)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full pl-9 pr-3 py-2.5 border border-estate-200 rounded-xl text-xs bg-estate-50 text-estate-500 cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] text-estate-400 mt-0.5">Email is tied to your authentication identity.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                WhatsApp / Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full pl-9 pr-3 py-2.5 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                Avatar Photo URL
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2.5 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                Bio / About Me
              </label>
              <textarea
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Resident in Lekki Phase 1, tech enthusiast, property investor..."
                className="w-full px-3 py-2.5 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-navy hover:bg-estate-900 text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                {loading ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: MULTI-ROLE SETTINGS */}
      {activeTab === 'roles' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-sand-50 p-5 rounded-3xl border border-sand-200 text-xs text-estate-700 space-y-1">
            <h3 className="font-bold text-navy text-sm">Unified Multi-Role Capability</h3>
            <p className="text-[11px] leading-relaxed">
              In EstateLens, you do not need multiple logins. You can be an active tenant searching for an apartment while also listing properties as a landlord or managing clients as a licensed agent.
            </p>
          </div>

          <div className="space-y-4">
            {allPossibleRoles.map(roleItem => {
              const hasRole = user?.roles?.includes(roleItem.id);
              const isCurrentActive = activeRole === roleItem.id;

              return (
                <div
                  key={roleItem.id}
                  className={`p-5 rounded-2xl border transition ${
                    isCurrentActive
                      ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-300'
                      : hasRole
                      ? 'bg-white border-estate-200'
                      : 'bg-estate-50/70 border-dashed border-estate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-navy font-display">{roleItem.title}</h4>
                        {isCurrentActive && (
                          <span className="bg-emerald text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Active Workspace
                          </span>
                        )}
                        {hasRole && !isCurrentActive && (
                          <span className="bg-estate-200 text-estate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            Added to Account
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-estate-600 mt-1">{roleItem.description}</p>
                    </div>

                    <div className="shrink-0">
                      {isCurrentActive ? (
                        <span className="text-xs font-bold text-emerald flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Current View
                        </span>
                      ) : hasRole ? (
                        <button
                          type="button"
                          onClick={() => switchRole(roleItem.id)}
                          className="px-3.5 py-1.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition"
                        >
                          Switch to this View
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addRole(roleItem.id)}
                          className="px-3.5 py-1.5 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition"
                        >
                          + Activate Role
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PASSWORD & SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-estate-200 shadow-subtle max-w-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-navy font-display">Update Password</h3>
            <p className="text-xs text-estate-500 mt-0.5">Ensure your account uses a strong, unique password.</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-navy hover:bg-estate-900 text-white text-xs font-bold rounded-xl shadow-sm transition"
            >
              {loading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: BADGES & VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-white rounded-3xl p-6 border border-estate-200 shadow-subtle space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald rounded-2xl flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy font-display">Verified Resident Badge</h3>
                <p className="text-xs text-estate-500">Unlocks verified resident credibility on community discussions.</p>
              </div>
            </div>
            <p className="text-xs text-estate-600 leading-relaxed">
              Earn the Verified Resident badge for your neighbourhood by submitting proof of address (utility bill, tenancy agreement, or estate association dues receipt).
            </p>
            <button
              type="button"
              onClick={() => alert('Verification submission portal: Upload utility bill or estate receipt to request badge.')}
              className="px-4 py-2 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition"
            >
              Request Resident Verification
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-estate-200 shadow-subtle space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-navy text-emerald-light rounded-2xl flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy font-display">Certified Agent & Landlord Badge</h3>
                <p className="text-xs text-estate-500">Allows posting unlimited verified properties and hosting tours.</p>
              </div>
            </div>
            <p className="text-xs text-estate-600 leading-relaxed">
              EstateLens requires real estate agents to submit license or CAC registration details before advertising properties.
            </p>
            <button
              type="button"
              onClick={() => alert('Agent verification portal: Upload agency certification or title documents.')}
              className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition"
            >
              Request Agent Badge
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

