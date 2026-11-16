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
  Database,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSavedProperties } from '../../context/SavedPropertiesContext';
import { DatabaseStatusModal } from './DatabaseStatusModal';
import { BrandLogo } from './BrandLogo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [dbModalOpen, setDbModalOpen] = useState(false);
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
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-estate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <BrandLogo size="md" variant="dark" showTagline={true} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                to="/properties"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/properties') 
                    ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                    : 'text-estate-700 hover:text-navy hover:bg-estate-50'
                }`}
              >
                Explore Properties
              </Link>

              <Link
                to="/neighbourhoods"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/neighbourhoods') 
                    ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                    : 'text-estate-700 hover:text-navy hover:bg-estate-50'
                }`}
              >
                Neighbourhoods
              </Link>

              <Link
                to="/community"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/community') 
                    ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                    : 'text-estate-700 hover:text-navy hover:bg-estate-50'
                }`}
              >
                <MessageSquareText className="w-4 h-4 text-emerald" />
                <span>Community</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">
                  Signature
                </span>
              </Link>

              <Link
                to="/#how-it-works"
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-estate-700 hover:text-navy hover:bg-estate-50 transition-colors"
              >
                How It Works
              </Link>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Database Status Button */}
              <button
                type="button"
                onClick={() => setDbModalOpen(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold transition ${
                  isConfigured
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-sand-100 border-sand-200 text-estate-600 hover:bg-sand-200'
                }`}
                title="View Supabase PostgreSQL Database Architecture"
              >
                <Database className={`w-3.5 h-3.5 ${isConfigured ? 'text-emerald' : 'text-amber-500'}`} />
                <span>{isConfigured ? 'DB: Supabase Live' : 'DB: Local Sandbox'}</span>
              </button>

              {/* Saved properties */}
              <Link
                to="/dashboard/saved"
                className="relative p-2.5 rounded-full text-estate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Saved Properties"
              >
                <Heart className="w-5 h-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* List Property CTA */}
              <Link
                to={isAuthenticated ? "/dashboard/landlord" : "/auth?tab=register&role=landlord_owner"}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-navy bg-sand-100 hover:bg-sand-200 border border-sand-200 rounded-xl transition"
              >
                <PlusCircle className="w-4 h-4 text-emerald" />
                <span>Post Listing</span>
              </Link>

              {/* User Auth or Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-estate-200 hover:border-estate-300 hover:bg-estate-50 transition"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-estate-200"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-estate-900 leading-tight truncate max-w-[110px]">
                        {user.name?.split(' ')[0]}
                      </p>
                      <p className="text-[10px] text-emerald-700 font-semibold leading-tight">
                        {roleLabels[activeRole] || 'Member'}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-estate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-estate-100 py-2 z-50 text-estate-800"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-estate-100 bg-sand-50/50">
                        <p className="text-xs text-estate-500">Signed in as</p>
                        <p className="text-sm font-bold text-estate-900 truncate">{user.name}</p>
                        <p className="text-xs text-estate-500 truncate">{user.email}</p>
                        
                        {/* Role switcher */}
                        <div className="mt-3 pt-2 border-t border-estate-200/60">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-estate-400 mb-1.5">
                            Switch Active Workspace:
                          </p>
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() => { switchRole('buyer_tenant'); setUserDropdownOpen(false); }}
                              className={`px-2 py-1.5 rounded-lg text-left text-xs font-medium transition ${
                                activeRole === 'buyer_tenant' 
                                  ? 'bg-emerald text-white font-semibold' 
                                  : 'bg-estate-100 text-estate-700 hover:bg-estate-200'
                              }`}
                            >
                              Tenant/Buyer
                            </button>
                            <button
                              type="button"
                              onClick={() => { switchRole('landlord_owner'); setUserDropdownOpen(false); }}
                              className={`px-2 py-1.5 rounded-lg text-left text-xs font-medium transition ${
                                activeRole === 'landlord_owner' 
                                  ? 'bg-emerald text-white font-semibold' 
                                  : 'bg-estate-100 text-estate-700 hover:bg-estate-200'
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
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-estate-50 text-estate-700"
                        >
                          <Settings className="w-4 h-4 text-estate-500" />
                          Profile & Roles
                        </Link>
                        <Link
                          to="/dashboard/buyer"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-estate-50 text-estate-700"
                        >
                          <LayoutDashboard className="w-4 h-4 text-estate-500" />
                          Buyer / Tenant Dashboard
                        </Link>
                        <Link
                          to="/dashboard/landlord"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-estate-50 text-estate-700"
                        >
                          <Building2 className="w-4 h-4 text-estate-500" />
                          Landlord & Agent Suite
                        </Link>
                        <Link
                          to="/dashboard/moderation"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-estate-50 text-estate-700"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald" />
                          Community Moderation
                        </Link>
                      </div>

                      <div className="border-t border-estate-100 pt-1">
                        <button
                          type="button"
                          onClick={() => { logout(); setUserDropdownOpen(false); }}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition"
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
                    to="/auth?tab=login"
                    className="px-4 py-2 text-xs font-semibold text-estate-700 hover:text-navy hover:bg-estate-100 rounded-xl transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?tab=register"
                    className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-estate-900 rounded-xl shadow-sm transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button
                type="button"
                onClick={() => setDbModalOpen(true)}
                className="p-1.5 text-estate-600"
                title="Database Status"
              >
                <Database className="w-4 h-4 text-emerald" />
              </button>
              <Link
                to="/dashboard/saved"
                className="relative p-2 text-estate-600"
                aria-label="Saved properties"
              >
                <Heart className="w-5 h-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-estate-700 hover:bg-estate-100 focus:outline-none"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-estate-200 px-4 pt-2 pb-6 space-y-3">
            <nav className="space-y-1">
              <Link
                to="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-estate-800 hover:bg-estate-50"
              >
                Explore Properties
              </Link>
              <Link
                to="/neighbourhoods"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-estate-800 hover:bg-estate-50"
              >
                Neighbourhood Directory
              </Link>
              <Link
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-emerald-800 bg-emerald-50"
              >
                Neighbourhood Community (Discussions)
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-estate-800 hover:bg-estate-50"
                  >
                    Profile & Roles
                  </Link>
                  <Link
                    to="/dashboard/buyer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-estate-800 hover:bg-estate-50"
                  >
                    Buyer & Tenant Dashboard
                  </Link>
                  <Link
                    to="/dashboard/landlord"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-estate-800 hover:bg-estate-50"
                  >
                    Landlord & Agent Suite
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-rose-600 hover:bg-rose-50"
                  >
                    Sign Out ({user?.name})
                  </button>
                </>
              ) : (
                <div className="pt-4 grid grid-cols-2 gap-2">
                  <Link
                    to="/auth?tab=login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl border border-estate-200 text-sm font-semibold text-estate-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?tab=register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-navy text-sm font-semibold text-white shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Database Status Modal */}
      <DatabaseStatusModal
        isOpen={dbModalOpen}
        onClose={() => setDbModalOpen(false)}
      />
    </>
  );
}
