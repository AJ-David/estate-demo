import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, PlusCircle, ArrowRight, Lock, Home } from 'lucide-react';

export function ProtectedRoute({ children, allowedRoles = null }) {
  const { user, isAuthenticated, activeRole, switchRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-10 h-10 border-4 border-navy-border border-t-gold rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-200">Checking authorization...</p>
      </div>
    );
  }

  // Not authenticated at all -> Redirect to Auth / Login page
  if (!isAuthenticated) {
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard/moderation')) {
      return <Navigate to={`/admin/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
    }
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check if role restriction applies
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRoleInAccount = user?.roles?.some(r => allowedRoles.includes(r));
    const isActiveRoleAllowed = allowedRoles.includes(activeRole);

    // SPECIAL SECURITY RULE: Admin role is strictly guarded
    if (allowedRoles.includes('admin') && !user?.roles?.includes('admin')) {
      return (
        <div className="max-w-xl mx-auto my-16 p-8 bg-navy-card rounded-3xl border border-rose-500/40 shadow-premium text-center space-y-5">
          <div className="w-14 h-14 bg-rose-950/70 text-rose-400 border border-rose-500/40 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-display">Administrator Clearance Required</h2>
            <p className="text-xs text-estate-300 mt-2 leading-relaxed">
              The Admin Console & Clean Slate Management console is strictly restricted to the platform system administrator. Your signed-in account (<strong className="text-gold">{user.email}</strong>) does not have administrative privileges.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/auth?tab=login&role=admin&redirect=/admin"
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow-gold"
            >
              <span>Sign In with Admin Account</span>
              <ArrowRight className="w-4 h-4 text-navy-deep" />
            </Link>
            <Link
              to="/properties"
              className="w-full sm:w-auto px-6 py-2.5 bg-navy-surface hover:bg-navy-border border border-navy-border text-estate-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Properties</span>
            </Link>
          </div>
        </div>
      );
    }

    // If user has the role but it's not currently active, give them an option to switch
    if (hasRoleInAccount && !isActiveRoleAllowed) {
      const targetRole = allowedRoles.find(r => user.roles.includes(r));
      return (
        <div className="max-w-xl mx-auto my-16 p-8 bg-navy-card rounded-3xl border border-navy-border shadow-premium text-center space-y-5">
          <div className="w-12 h-12 bg-amber-950/60 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-display">Switch Active Role Required</h2>
            <p className="text-xs text-estate-400 mt-1.5 leading-relaxed">
              You are currently viewing VettedHomes in <strong className="text-gold">{activeRole.replace('_', ' ')}</strong> mode. This section requires <strong className="text-gold">{targetRole.replace('_', ' ')}</strong> mode.
            </p>
          </div>
          <button
            type="button"
            onClick={() => switchRole(targetRole)}
            className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-gold"
          >
            <span>Switch to {targetRole.replace('_', ' ')} Workspace</span>
            <ArrowRight className="w-4 h-4 text-navy-deep" />
          </button>
        </div>
      );
    }

    // If user does not have the non-admin role, offer to add (e.g. buyer adding landlord role)
    if (!hasRoleInAccount) {
      const requiredRoleName = allowedRoles[0].replace('_', ' ');
      return (
        <div className="max-w-xl mx-auto my-16 p-8 bg-navy-card rounded-3xl border border-navy-border shadow-premium text-center space-y-5">
          <div className="w-12 h-12 bg-navy-surface text-gold rounded-2xl flex items-center justify-center mx-auto border border-gold/30">
            <PlusCircle className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-display">Upgrade Your Account Access</h2>
            <p className="text-xs text-estate-400 mt-1.5 leading-relaxed">
              This area is restricted to {requiredRoleName} accounts. Because VettedHomes accounts support multiple roles simultaneously, you can add this role to your existing account right now.
            </p>
          </div>
          <button
            type="button"
            onClick={() => switchRole(allowedRoles[0])}
            className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-gold"
          >
            <span>Activate {requiredRoleName} Role on My Account</span>
            <ArrowRight className="w-4 h-4 text-navy-deep" />
          </button>
        </div>
      );
    }
  }

  return children;
}
