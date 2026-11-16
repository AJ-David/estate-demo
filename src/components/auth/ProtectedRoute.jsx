import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, PlusCircle, ArrowRight } from 'lucide-react';

export function ProtectedRoute({ children, allowedRoles = null }) {
  const { user, isAuthenticated, activeRole, switchRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-10 h-10 border-4 border-estate-200 border-t-emerald rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-estate-500">Checking authorization...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth?tab=login&redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check if role restriction applies
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRoleInAccount = user?.roles?.some(r => allowedRoles.includes(r));
    const isActiveRoleAllowed = allowedRoles.includes(activeRole);

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

    // If user does not have the role on their account at all, offer them to add the role
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

