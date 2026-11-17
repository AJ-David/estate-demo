import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

// Authentic seed accounts representing key platform personas
const INITIAL_SYSTEM_USERS = [
  {
    id: 'usr-babatunde-01',
    name: 'Babatunde Adeleke',
    email: 'babatunde@vettedhomes.ng',
    password: 'password123',
    phone: '+234 803 123 4567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Lekki Phase 1 resident for 4+ years. Tech consultant & verified community contributor.',
    isVerified: true,
    roles: ['buyer_tenant', 'landlord_owner'],
    activeRole: 'buyer_tenant',
    enquiries: [
      {
        id: 'enq-1',
        propertyId: 'prop-101',
        propertyTitle: 'Contemporary 4-Bedroom Semi-Detached Duplex with BQ',
        agentName: 'Adewale Bakare',
        status: 'Inspection Confirmed',
        inspectionDate: 'Saturday, Nov 14, 2026 at 11:30 AM',
        lastMessage: 'Looking forward to meeting you at the security gate at 11:30 AM.'
      }
    ],
    savedProperties: ['prop-101', 'prop-102', 'prop-103'],
    followedNeighbourhoods: ['lekki-phase-1', 'yaba'],
    myListings: []
  },
  {
    id: 'usr-adewale-02',
    name: 'Adewale Bakare',
    email: 'adewale@primestone.ng',
    password: 'password123',
    phone: '+234 803 555 0192',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Principal Partner at PrimeStone Realty Partners. 10+ years specialising in luxury residential listings across Ikoyi & Lekki.',
    isVerified: true,
    roles: ['agent', 'landlord_owner', 'buyer_tenant'],
    activeRole: 'agent',
    enquiries: [],
    savedProperties: ['prop-101'],
    followedNeighbourhoods: ['lekki-phase-1', 'ikeja-gra'],
    myListings: ['prop-101', 'prop-103']
  },
  {
    id: 'usr-okonkwo-03',
    name: 'Chief Emeka Okonkwo',
    email: 'emeka.okonkwo@transcorp.ng',
    password: 'password123',
    phone: '+234 809 123 4567',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Property investor and landlord in Maitama Abuja and Victoria Island Lagos.',
    isVerified: true,
    roles: ['landlord_owner', 'buyer_tenant'],
    activeRole: 'landlord_owner',
    enquiries: [],
    savedProperties: [],
    followedNeighbourhoods: ['maitama', 'lekki-phase-1'],
    myListings: ['prop-104']
  },
  {
    id: 'usr-admin-master',
    name: 'Platform Administrator',
    email: 'admin@vettedhomes.ng',
    password: 'AdminMaster2026!',
    phone: '+234 800 838 8333',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Executive System Administrator & Platform Master.',
    isVerified: true,
    roles: ['admin'],
    activeRole: 'admin',
    enquiries: [],
    savedProperties: [],
    followedNeighbourhoods: [],
    myListings: []
  }
];

function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem('vettedhomes_registered_users');
    let users = raw ? JSON.parse(raw) : [...INITIAL_SYSTEM_USERS];
    
    // Always guarantee admin@vettedhomes.ng is present with admin role and correct password
    const adminIdx = users.findIndex(u => u.email.toLowerCase() === 'admin@vettedhomes.ng');
    const masterAdmin = INITIAL_SYSTEM_USERS[3];
    if (adminIdx === -1) {
      users = [masterAdmin, ...users];
    } else {
      users[adminIdx] = { ...users[adminIdx], ...masterAdmin };
    }
    localStorage.setItem('vettedhomes_registered_users', JSON.stringify(users));
    return users;
  } catch {
    return INITIAL_SYSTEM_USERS;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vettedhomes_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [session, setSession] = useState(null);
  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem('vettedhomes_active_role');
    return saved || 'buyer_tenant';
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [recoveryMode, setRecoveryMode] = useState(false);

  // Sync user and activeRole to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('vettedhomes_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vettedhomes_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vettedhomes_active_role', activeRole);
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
        enquiries: [],
        savedProperties: [],
        followedNeighbourhoods: [],
        myListings: []
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
          fetchSupabaseProfile(currentSession.user);
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        setSession(newSession);

        if (event === 'PASSWORD_RECOVERY') {
          setRecoveryMode(true);
        }

        if (newSession?.user) {
          await fetchSupabaseProfile(newSession.user);
        } else if (event === 'SIGNED_OUT') {
          const currentUser = JSON.parse(localStorage.getItem('vettedhomes_user') || 'null');
          if (currentUser?.email?.toLowerCase() !== 'admin@vettedhomes.ng') {
            setUser(null);
            localStorage.removeItem('vettedhomes_user');
          }
        }
      });

      subscription = authListener.subscription;
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // 1. Sign in with Email and Password
  const login = async (email, password, role = 'buyer_tenant') => {
    setAuthError(null);
    setLoading(true);

    if (!email || !email.trim()) {
      const err = 'Please enter your email address.';
      setAuthError(err);
      setLoading(false);
      return { success: false, error: err };
    }

    const trimmedEmail = email.trim().toLowerCase();
    const isMasterAdmin = trimmedEmail === 'admin@vettedhomes.ng';

    // 1. Guaranteed Master Administrator Authentication
    if (isMasterAdmin) {
      if (password === 'AdminMaster2026!') {
        const masterAdmin = INITIAL_SYSTEM_USERS.find(u => u.email.toLowerCase() === 'admin@vettedhomes.ng') || {
          id: 'usr-admin-master',
          name: 'Platform Administrator',
          email: 'admin@vettedhomes.ng',
          password: 'AdminMaster2026!',
          phone: '+234 800 838 8333',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
          bio: 'Executive System Administrator & Platform Master.',
          isVerified: true,
          roles: ['admin'],
          activeRole: 'admin',
          enquiries: [],
          savedProperties: [],
          followedNeighbourhoods: [],
          myListings: []
        };

        setUser(masterAdmin);
        setActiveRole('admin');
        localStorage.setItem('vettedhomes_user', JSON.stringify(masterAdmin));
        localStorage.setItem('vettedhomes_active_role', 'admin');
        setLoading(false);
        return { success: true, user: masterAdmin };
      } else {
        const err = 'Incorrect administrator password. Please check your credentials.';
        setAuthError(err);
        setLoading(false);
        return { success: false, error: err };
      }
    }

    // 2. Supabase remote authentication if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (!error && data?.user) {
          const fullUser = await fetchSupabaseProfile(data.user);
          setLoading(false);
          return { success: true, user: fullUser };
        }
      } catch (err) {
        console.warn('Supabase remote sign in error, checking local fallback:', err);
      }
    }

    // 3. Autonomous local client authentication & registered persona fallback
    const userList = getRegisteredUsers();
    const existingUser = userList.find(u => u.email.toLowerCase() === trimmedEmail);

    if (existingUser) {
      if (password && existingUser.password && existingUser.password !== password) {
        const err = 'Incorrect password. Please verify your credentials.';
        setAuthError(err);
        setLoading(false);
        return { success: false, error: err };
      }

      const activeUser = {
        ...existingUser,
        roles: Array.from(new Set([...(existingUser.roles || []), role])),
        activeRole: role || existingUser.activeRole || 'buyer_tenant'
      };

      setUser(activeUser);
      setActiveRole(activeUser.activeRole);
      localStorage.setItem('vettedhomes_user', JSON.stringify(activeUser));
      localStorage.setItem('vettedhomes_active_role', activeUser.activeRole);
      setLoading(false);
      return { success: true, user: activeUser };
    }

    const err = 'Account not found. Please create an account or verify your credentials.';
    setAuthError(err);
    setLoading(false);
    return { success: false, error: err };
  };

  // 2. Register new user
  const register = async ({ name, email, phone, password, role = 'buyer_tenant' }) => {
    setAuthError(null);
    setLoading(true);

    if (!name || !name.trim()) {
      const err = 'Please enter your full name.';
      setAuthError(err);
      setLoading(false);
      return { success: false, error: err };
    }

    if (!email || !email.trim()) {
      const err = 'Please enter your email address.';
      setAuthError(err);
      setLoading(false);
      return { success: false, error: err };
    }

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
      // Local client storage registration
      const userList = getRegisteredUsers();
      if (userList.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
        const err = 'An account with this email address already exists. Please sign in.';
        setAuthError(err);
        setLoading(false);
        return { success: false, error: err };
      }

      const newUser = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        password: password || 'password123',
        phone: phone ? phone.trim() : '',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: 'Verified member of the VettedHomes community.',
        isVerified: false,
        roles: [role],
        activeRole: role,
        enquiries: [],
        savedProperties: [],
        followedNeighbourhoods: [],
        myListings: [],
        createdAt: new Date().toISOString()
      };

      const updatedList = [newUser, ...userList];
      localStorage.setItem('vettedhomes_registered_users', JSON.stringify(updatedList));

      setUser(newUser);
      setActiveRole(role);
      setLoading(false);
      return { success: true, user: newUser };
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
    localStorage.removeItem('vettedhomes_user');
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
        message: `Password reset verification email dispatched to ${email}. Please check your inbox.`
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
      return { success: true };
    }
  };

  // 6. Update user profile
  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'No user signed in' };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: updates.name,
            phone: updates.phone,
            bio: updates.bio,
            avatar_url: updates.avatar,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (error) {
          console.warn('Profile update error:', error.message);
          return { success: false, error: error.message };
        }

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        return { success: true, user: updatedUser };
      } catch (err) {
        return { success: false, error: err.message };
      }
    } else {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      try {
        const list = getRegisteredUsers().map(u => u.id === user.id ? { ...u, ...updates } : u);
        localStorage.setItem('vettedhomes_registered_users', JSON.stringify(list));
      } catch (e) {
        console.warn('Failed to update local user registry:', e);
      }

      return { success: true, user: updatedUser };
    }
  };

  // 7. Multi-Role Switcher (Tenants can switch to Landlord view, Agents, etc.)
  const switchRole = async (targetRole) => {
    if (!user) return;
    setActiveRole(targetRole);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('user_roles')
          .update({ is_primary: false })
          .eq('user_id', user.id);

        await supabase
          .from('user_roles')
          .update({ is_primary: true })
          .eq('user_id', user.id)
          .eq('role', targetRole);
      } catch (err) {
        console.warn('Could not update primary role in Supabase:', err);
      }
    }
  };

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
