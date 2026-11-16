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
      <div className="bg-navy-card rounded-3xl p-6 sm:p-8 border border-navy-border shadow-premium flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={avatar || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gold/40 shadow-gold"
          />
          {user?.isVerified && (
            <span className="absolute -bottom-1.5 -right-1.5 bg-gold text-navy-deep p-1.5 rounded-full shadow-md" title="Verified Identity">
              <ShieldCheck className="w-4 h-4 font-black" />
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black text-white font-display">{user?.name}</h1>
            <span className="bg-navy-surface text-gold text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gold/40 uppercase tracking-wider">
              {activeRole.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs text-estate-400">{user?.email}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-estate-400">
            <span><strong className="text-white">Active Roles:</strong> {user?.roles?.map(r => r.replace('_', ' ')).join(', ')}</span>
            <span>•</span>
            <span className="text-gold font-semibold">
              {isConfigured ? 'Cloud Sync Connected' : 'Verified Resident Account'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-navy-border pb-3 overflow-x-auto text-xs sm:text-sm font-bold">
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
                  ? 'bg-gold text-navy-deep font-black shadow-gold'
                  : 'text-estate-400 hover:text-white hover:bg-navy-surface border border-transparent'
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
            ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' 
            : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
        }`}>
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* TAB 1: PERSONAL DETAILS */}
      {activeTab === 'details' && (
        <div className="bg-navy-card rounded-3xl p-6 sm:p-8 border border-navy-border shadow-premium max-w-2xl">
          <form onSubmit={handleUpdateDetails} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-100 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-100 mb-1">
                Email Address (Primary Login)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full pl-9 pr-3 py-2.5 border border-navy-border rounded-xl text-xs bg-navy-deep text-slate-400 cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Email is tied to your authentication identity.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-100 mb-1">
                WhatsApp / Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full pl-9 pr-3 py-2.5 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-100 mb-1">
                Avatar Photo URL
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2.5 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-100 mb-1">
                Bio / About Me
              </label>
              <textarea
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Resident in Lekki Phase 1, tech enthusiast, property investor..."
                className="w-full px-3 py-2.5 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep text-xs font-black rounded-xl shadow-gold transition tracking-wide"
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
          <div className="bg-navy-card p-5 rounded-3xl border border-navy-border shadow-premium text-xs text-estate-300 space-y-1">
            <h3 className="font-bold text-white text-sm">Unified Multi-Role Capability</h3>
            <p className="text-[11px] leading-relaxed text-estate-400">
              In VettedHomes, you do not need multiple logins. You can be an active tenant searching for an apartment while also listing properties as a landlord or managing clients as a licensed agent.
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
                      ? 'bg-navy-surface border-gold/50 ring-1 ring-gold/40'
                      : hasRole
                      ? 'bg-navy-card border-navy-border'
                      : 'bg-navy-deep/60 border-dashed border-navy-border'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white font-display">{roleItem.title}</h4>
                        {isCurrentActive && (
                          <span className="bg-gold text-navy-deep text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Active Workspace
                          </span>
                        )}
                        {hasRole && !isCurrentActive && (
                          <span className="bg-navy-surface text-estate-300 border border-navy-border text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            Added to Account
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-estate-400 mt-1">{roleItem.description}</p>
                    </div>

                    <div className="shrink-0">
                      {isCurrentActive ? (
                        <span className="text-xs font-bold text-gold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Current View
                        </span>
                      ) : hasRole ? (
                        <button
                          type="button"
                          onClick={() => switchRole(roleItem.id)}
                          className="px-3.5 py-1.5 bg-gold hover:bg-gold-light text-navy-deep text-xs font-bold rounded-xl shadow-gold transition"
                        >
                          Switch to this View
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addRole(roleItem.id)}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep text-xs font-bold rounded-xl shadow-gold transition"
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
        <div className="bg-navy-card rounded-3xl p-6 sm:p-8 border border-navy-border shadow-premium max-w-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white font-display">Update Password</h3>
            <p className="text-xs text-estate-400 mt-0.5">Ensure your account uses a strong, unique password.</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-100 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-100 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep text-xs font-black rounded-xl shadow-gold transition tracking-wide"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: BADGES & VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-navy-card rounded-3xl p-6 border border-navy-border shadow-premium space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-navy-surface text-gold rounded-2xl flex items-center justify-center font-bold border border-gold/30">
                <ShieldCheck className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Verified Resident Badge</h3>
                <p className="text-xs text-estate-400">Unlocks verified resident credibility on community discussions.</p>
              </div>
            </div>
            <p className="text-xs text-estate-300 leading-relaxed">
              Earn the Verified Resident badge for your neighbourhood by submitting proof of address (utility bill, tenancy agreement, or estate association dues receipt).
            </p>
            <button
              type="button"
              onClick={() => alert('Verification submission portal: Upload utility bill or estate receipt to request badge.')}
              className="px-4 py-2 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep text-xs font-bold rounded-xl shadow-gold transition"
            >
              Request Resident Verification
            </button>
          </div>

          <div className="bg-navy-card rounded-3xl p-6 border border-navy-border shadow-premium space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-navy-surface text-gold rounded-2xl flex items-center justify-center font-bold border border-gold/30">
                <Building2 className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Certified Agent & Landlord Badge</h3>
                <p className="text-xs text-estate-400">Allows posting unlimited verified properties and hosting tours.</p>
              </div>
            </div>
            <p className="text-xs text-estate-300 leading-relaxed">
              VettedHomes requires real estate agents to submit license or CAC registration details before advertising properties.
            </p>
            <button
              type="button"
              onClick={() => alert('Agent verification portal: Upload agency certification or title documents.')}
              className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-deep text-xs font-bold rounded-xl shadow-gold transition"
            >
              Request Agent Badge
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

