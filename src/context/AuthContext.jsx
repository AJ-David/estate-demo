import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USER } from '../data/demoData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Demo initialized user for rich Phase 1 exploration
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('estatelens_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem('estatelens_active_role');
    return saved || 'buyer_tenant';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('estatelens_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('estatelens_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('estatelens_active_role', activeRole);
  }, [activeRole]);

  const login = (email, password, role = 'buyer_tenant') => {
    const newUser = {
      ...DEMO_USER,
      email,
      roles: [role, 'buyer_tenant'],
      activeRole: role
    };
    setUser(newUser);
    setActiveRole(role);
    return { success: true };
  };

  const register = ({ name, email, phone, role }) => {
    const newUser = {
      ...DEMO_USER,
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      roles: [role],
      activeRole: role
    };
    setUser(newUser);
    setActiveRole(role);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (user && user.roles.includes(newRole)) {
      setActiveRole(newRole);
      setUser(prev => ({ ...prev, activeRole: newRole }));
    } else if (user) {
      // Allow adding the role to their account (as per prompt specification: users can have multiple roles)
      const updatedRoles = [...new Set([...user.roles, newRole])];
      const updatedUser = { ...user, roles: updatedRoles, activeRole: newRole };
      setUser(updatedUser);
      setActiveRole(newRole);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        activeRole,
        login,
        register,
        logout,
        switchRole
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
