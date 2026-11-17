import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  MessageSquareText, 
  Heart, 
  User, 
  Menu, 
  X, 
  PlusCircle, 
  ShieldCheck, 
  Layers, 
  Compass,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSavedProperties } from '../../context/SavedPropertiesContext';
import { BrandLogo } from './BrandLogo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, activeRole, switchRole, logout, isConfigured } = useAuth();
  const { savedCount } = useSavedProperties();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const roleLabels = {
    buyer_tenant: 'Tenant / Buyer View',
    landlord_owner: 'Landlord View',
    agent: 'Agent View',
    admin: 'Admin Console'
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-navy/95 backdrop-blur-md border-b border-navy-border shadow-lg transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <BrandLogo size="md" variant="light" showTagline={true} />

            {/* Desktop Navigation */}
            {isAuthenticated ? (
              <nav className="hidden lg:flex items-center space-x-1">
                <Link
                  to="/properties"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive('/properties') 
                      ? 'bg-navy-surface text-gold font-bold border border-gold/40 shadow-xs' 
                      : 'text-white/90 hover:text-gold hover:bg-navy-surface'
                  }`}
                >
                  Explore Properties
                </Link>

                <Link
                  to="/neighbourhoods"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive('/neighbourhoods') 
                      ? 'bg-navy-surface text-gold font-bold border border-gold/40 shadow-xs' 
                      : 'text-white/90 hover:text-gold hover:bg-navy-surface'
                  }`}
                >
                  Neighbourhoods
                </Link>

                <Link
                  to="/community"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive('/community') 
                      ? 'bg-navy-surface text-gold font-bold border border-gold/40 shadow-xs' 
                      : 'text-white/90 hover:text-gold hover:bg-navy-surface'
                  }`}
                >
                  <MessageSquareText className="w-4 h-4 text-gold" />
                  <span>Community</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gold/20 text-gold-light border border-gold/30 px-1.5 py-0.5 rounded-full">
                    Signature
                  </span>
                </Link>

                <Link
                  to={
                    activeRole === 'admin'
                      ? "/admin"
                      : activeRole === 'landlord_owner' || activeRole === 'agent'
                      ? "/dashboard/landlord"
                      : "/dashboard/buyer"
                  }
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')
                      ? 'bg-navy-surface text-gold font-bold border border-gold/40 shadow-xs' 
                      : 'text-white/90 hover:text-gold hover:bg-navy-surface'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-gold" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/#how-it-works"
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold text-white/90 hover:text-gold hover:bg-navy-surface transition-colors"
                >
                  How It Works
                </Link>
              </nav>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-surface text-gold text-xs font-bold border border-gold/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Private Verified Real Estate Network</span>
                </span>
              </div>
            )}

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated && (
                <>
                  {/* Saved properties */}
                  <Link
                    to="/dashboard/saved"
                    className="relative p-2.5 rounded-full text-estate-300 hover:text-rose-400 hover:bg-navy-surface transition-colors"
                    title="Saved Properties"
                  >
                    <Heart className="w-5 h-5 text-estate-300 hover:text-rose-400" />
                    {savedCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-crimson text-white rounded-full text-[11px] font-bold flex items-center justify-center">
                        {savedCount}
                      </span>
                    )}
                  </Link>

                  {/* List Property CTA */}
                  <Link
                    to="/dashboard/landlord"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-black text-navy-deep bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold rounded-xl shadow-gold transition"
                  >
                    <PlusCircle className="w-4 h-4 text-navy-deep" />
                    <span>Post Listing</span>
                  </Link>
                </>
              )}

              {/* User Auth or Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-navy-border bg-navy-card hover:border-gold/40 transition"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-gold/40"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-white leading-tight truncate max-w-[110px]">
                        {user.name?.split(' ')[0]}
                      </p>
                      <p className="text-[10px] text-gold font-semibold leading-tight">
                        {roleLabels[activeRole] || 'Member'}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-estate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-navy-card shadow-2xl border border-navy-border py-2 z-50 text-white"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-navy-border bg-navy-deep/60">
                        <p className="text-xs text-estate-400">Signed in as</p>
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                        <p className="text-xs text-estate-400 truncate">{user.email}</p>
                        
                        {/* Role switcher */}
                        <div className="mt-3 pt-2 border-t border-navy-border">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-estate-400 mb-1.5">
                            Switch Active Workspace:
                          </p>
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() => { switchRole('buyer_tenant'); setUserDropdownOpen(false); }}
                              className={`px-2 py-1.5 rounded-lg text-left text-xs font-semibold transition ${
                                activeRole === 'buyer_tenant' 
                                  ? 'bg-gold text-navy-deep font-bold' 
                                  : 'bg-navy-surface text-slate-200 hover:text-white'
                              }`}
                            >
                              Tenant/Buyer
                            </button>
                            <button
                              type="button"
                              onClick={() => { switchRole('landlord_owner'); setUserDropdownOpen(false); }}
                              className={`px-2 py-1.5 rounded-lg text-left text-xs font-semibold transition ${
                                activeRole === 'landlord_owner' 
                                  ? 'bg-gold text-navy-deep font-bold' 
                                  : 'bg-navy-surface text-slate-200 hover:text-white'
                              }`}
                            >
                              Landlord
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-navy-surface hover:text-gold text-white/90 transition font-medium"
                        >
                          <Settings className="w-4 h-4 text-gold" />
                          Profile & Roles
                        </Link>
                        <Link
                          to="/dashboard/buyer"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-navy-surface hover:text-gold text-white/90 transition font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gold" />
                          Buyer / Tenant Dashboard
                        </Link>
                        <Link
                          to="/dashboard/landlord"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-navy-surface hover:text-gold text-white/90 transition font-medium"
                        >
                          <Building2 className="w-4 h-4 text-gold" />
                          Landlord & Agent Suite
                        </Link>
                        {user?.roles?.includes('admin') && (
                          <Link
                            to="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-navy-surface hover:text-gold text-gold font-bold transition"
                          >
                            <ShieldCheck className="w-4 h-4 text-gold" />
                            Admin & Clean Slate Console
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-navy-border pt-1">
                        <button
                          type="button"
                          onClick={() => { logout(); setUserDropdownOpen(false); }}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-navy-surface hover:text-rose-300 transition font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs font-bold text-white hover:text-gold hover:bg-navy-surface rounded-xl transition border border-navy-border"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-xs font-black text-navy-deep bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold rounded-xl shadow-gold transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <Link
                to="/dashboard/saved"
                className="relative p-2 text-slate-300 hover:text-rose-400"
                aria-label="Saved properties"
              >
                <Heart className="w-5 h-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-crimson text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:text-gold hover:bg-navy-surface focus:outline-none"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-card border-b border-navy-border px-4 pt-2 pb-6 space-y-3">
            <nav className="space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/properties"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-navy-surface hover:text-gold transition"
                  >
                    Explore Properties
                  </Link>
                  <Link
                    to="/neighbourhoods"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-navy-surface hover:text-gold transition"
                  >
                    Neighbourhood Directory
                  </Link>
                  <Link
                    to="/community"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-bold text-gold bg-navy-surface border border-gold/40"
                  >
                    Neighbourhood Community (Discussions)
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-navy-surface hover:text-gold transition"
                  >
                    Profile & Roles
                  </Link>
                  <Link
                    to="/dashboard/buyer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-navy-surface hover:text-gold transition"
                  >
                    Buyer & Tenant Dashboard
                  </Link>
                  <Link
                    to="/dashboard/landlord"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-white hover:bg-navy-surface hover:text-gold transition"
                  >
                    Landlord & Agent Suite
                  </Link>
                  {user?.roles?.includes('admin') && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-base font-semibold text-gold hover:bg-navy-surface transition flex items-center justify-between"
                    >
                      <span>Admin & Clean Slate Console</span>
                      <ShieldCheck className="w-4 h-4 text-gold" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-rose-400 hover:bg-navy-surface transition"
                  >
                    Sign Out ({user?.name})
                  </button>
                </>
              ) : (
                <div className="pt-2 space-y-3">
                  <div className="p-3 bg-navy-surface rounded-xl border border-gold/30 text-xs text-estate-300">
                    <ShieldCheck className="w-4 h-4 text-gold mb-1" />
                    Please sign in or create an account to access verified properties, districts, and your dashboard.
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl border border-navy-border text-sm font-bold text-white hover:text-gold hover:bg-navy-surface transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-sm font-black text-navy-deep shadow-gold"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
