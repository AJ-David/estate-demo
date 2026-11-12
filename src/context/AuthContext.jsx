import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEMO_USER } from '../data/demoData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('estatelens_user');
    return saved ? JSON.parse(saved) : (isSupabaseConfigured ? null : DEMO_USER);
  });

  const [session, setSession] = useState(null);
  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem('estatelens_active_role');
    return saved || 'buyer_tenant';
  });

  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [recoveryMode, setRecoveryMode] = useState(false);

  // Sync user and activeRole to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('estatelens_user', JSON.stringify(user));
    } else if (!isSupabaseConfigured) {
      localStorage.removeItem('estatelens_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('estatelens_active_role', activeRole);
  }, [activeRole]);

  // Load user profile and user_roles from Supabase
  const fetchSupabaseProfile = async (authUser) => {
    if (!authUser) return null;
    try {
      // 1. Fetch profile
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (profileErr) {
        console.warn('Could not fetch profile from Supabase:', profileErr.message);
      }

      // 2. Fetch user roles
      const { data: rolesData, error: rolesErr } = await supabase
        .from('user_roles')
        .select('role, is_primary')
        .eq('user_id', authUser.id);

      if (rolesErr) {
        console.warn('Could not fetch roles from Supabase:', rolesErr.message);
      }

      const assignedRoles = rolesData && rolesData.length > 0 
        ? rolesData.map(r => r.role)
        : [authUser.user_metadata?.role || 'buyer_tenant'];

      const primaryRole = rolesData?.find(r => r.is_primary)?.role || assignedRoles[0];

      const fullUser = {
        id: authUser.id,
        email: authUser.email,
        name: profile?.full_name || authUser.user_metadata?.full_name || authUser.email.split('@')[0],
        phone: profile?.phone || authUser.user_metadata?.phone || '',
        avatar: profile?.avatar_url || authUser.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: profile?.bio || '',
        isVerified: profile?.is_verified || false,
        roles: assignedRoles,
        activeRole: primaryRole,
        enquiries: DEMO_USER.enquiries,
        savedProperties: DEMO_USER.savedProperties,
        followedNeighbourhoods: DEMO_USER.followedNeighbourhoods,
        myListings: DEMO_USER.myListings
      };

      setUser(fullUser);
      setActiveRole(prev => (assignedRoles.includes(prev) ? prev : primaryRole));
      return fullUser;
    } catch (err) {
      console.error('Error hydrating Supabase user:', err);
      return null;
    }
  };

  // Listen to Supabase Auth State changes if configured
  useEffect(() => {
    let subscription = null;

    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session: currentSession }, error }) => {
        if (error) console.warn('Error reading session:', error.message);
        setSession(currentSession);
        if (currentSession?.user) {
          fetchSupabaseProfile(currentSession.user).finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      });

      const { data } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
        setSession(currentSession);
        if (event === 'PASSWORD_RECOVERY') {
          setRecoveryMode(true);
        }

        if (currentSession?.user) {
          await fetchSupabaseProfile(currentSession.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('estatelens_user');
        }
        setLoading(false);
      });

      subscription = data.subscription;
    } else {
      setLoading(false);
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // 1. Sign in with Email and Password
  const login = async (email, password, role = 'buyer_tenant') => {
    setAuthError(null);
    setLoading(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (error) {
          setAuthError(error.message);
          setLoading(false);
          return { success: false, error: error.message };
        }

        const fullUser = await fetchSupabaseProfile(data.user);
        setLoading(false);
        return { success: true, user: fullUser };
      } catch (err) {
        const msg = err.message || 'Login failed';
        setAuthError(msg);
        setLoading(false);
        return { success: false, error: msg };
      }
    } else {
      // Local demo mode simulation
      const newUser = {
        ...DEMO_USER,
        email: email.trim() || DEMO_USER.email,
        roles: Array.from(new Set([role, 'buyer_tenant'])),
        activeRole: role
      };
      setUser(newUser);
      setActiveRole(role);
      setLoading(false);
      return { success: true, user: newUser, demoMode: true };
    }
  };

  // 2. Register new user
  const register = async ({ name, email, phone, password, role = 'buyer_tenant' }) => {
    setAuthError(null);
    setLoading(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
              phone: phone ? phone.trim() : '',
              role: role,
              avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
            }
          }
        });

        if (error) {
          setAuthError(error.message);
          setLoading(false);
          return { success: false, error: error.message };
        }

        // If email confirmation is required by Supabase project settings
        if (data?.user && (!data.session || data.user.identities?.length === 0)) {
          setLoading(false);
          return { 
            success: true, 
            requiresVerification: true, 
            message: 'Please check your email to confirm your account before signing in.' 
          };
        }

        if (data?.user) {
          const fullUser = await fetchSupabaseProfile(data.user);
          setLoading(false);
          return { success: true, user: fullUser };
        }

        setLoading(false);
        return { success: true };
      } catch (err) {
        const msg = err.message || 'Registration failed';
        setAuthError(msg);
        setLoading(false);
        return { success: false, error: msg };
      }
    } else {
      // Local demo mode simulation
      const newUser = {
        ...DEMO_USER,
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : '+234 800 000 0000',
        roles: [role],
        activeRole: role
      };
      setUser(newUser);
      setActiveRole(role);
      setLoading(false);
      return { success: true, user: newUser, demoMode: true };
    }
  };

  // 3. Log out
  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem('estatelens_user');
  };

  // 4. Request password reset email
  const forgotPassword = async (email) => {
    setAuthError(null);
    if (isSupabaseConfigured) {
      const redirectUrl = `${window.location.origin}/auth?tab=reset`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl
      });
      if (error) {
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      return { success: true, message: `Password reset link sent to ${email}` };
    } else {
      return { 
        success: true, 
        message: `Password reset link has been dispatched to ${email} (Demo Mode).`,
        demoMode: true 
      };
    }
  };

  // 5. Update user password
  const updatePassword = async (newPassword) => {
    setAuthError(null);
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      setRecoveryMode(false);
      return { success: true };
    } else {
      setRecoveryMode(false);
      return { success: true, demoMode: true };
    }
  };

  // 6. Update user profile
  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'No user signed in' };

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: updates.name || user.name,
            phone: updates.phone !== undefined ? updates.phone : user.phone,
            bio: updates.bio !== undefined ? updates.bio : user.bio,
            avatar_url: updates.avatar || user.avatar
          })
          .eq('id', user.id);

        if (error) throw error;
      } catch (err) {
        console.warn('Could not sync profile update to Supabase:', err.message);
        return { success: false, error: err.message };
      }
    }

    return { success: true, user: updatedUser };
  };

  // 7. Role management: switch active workspace role
  const switchRole = (newRole) => {
    if (!user) return;
    if (user.roles?.includes(newRole)) {
      setActiveRole(newRole);
      setUser(prev => ({ ...prev, activeRole: newRole }));
    } else {
      // Add role to user
      addRole(newRole);
    }
  };

  // 8. Add a new role to user (multi-role capability)
  const addRole = async (newRole) => {
    if (!user) return;
    const currentRoles = user.roles || ['buyer_tenant'];
    if (currentRoles.includes(newRole)) {
      setActiveRole(newRole);
      return;
    }

    const updatedRoles = [...currentRoles, newRole];
    const updatedUser = { ...user, roles: updatedRoles, activeRole: newRole };
    setUser(updatedUser);
    setActiveRole(newRole);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('user_roles')
          .insert({
            user_id: user.id,
            role: newRole,
            is_primary: false
          });
      } catch (err) {
        console.warn('Could not insert role to Supabase:', err.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isConfigured: isSupabaseConfigured,
        activeRole,
        loading,
        authError,
        recoveryMode,
        login,
        register,
        logout,
        forgotPassword,
        updatePassword,
        updateProfile,
        switchRole,
        addRole,
        fetchProfile: () => session?.user && fetchSupabaseProfile(session.user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
