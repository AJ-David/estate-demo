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
  const { user, isAuthenticated, activeRole, switchRole, logout } = useAuth();
  const { savedCount } = useSavedProperties();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo (Icon only, clean architectural roofline) */}
            <BrandLogo size="md" variant="icon-only" />

            {/* Desktop Navigation */}
            {isAuthenticated ? (
              <nav className="hidden lg:flex items-center space-x-1">
                <Link
                  to="/"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive('/') 
                      ? 'bg-zinc-100 text-black font-bold border border-zinc-300' 
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/properties"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive('/properties') 
                      ? 'bg-zinc-100 text-black font-bold border border-zinc-300' 
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  Properties
                </Link>

                <Link
                  to="/community"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive('/community') 
                      ? 'bg-zinc-100 text-black font-bold border border-zinc-300' 
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  Community
                </Link>
              </nav>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-xs font-bold border border-zinc-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
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
                    className="relative p-2.5 rounded-full text-zinc-600 hover:text-rose-600 hover:bg-zinc-100 transition-colors"
                    title="Saved Properties"
                  >
                    <Heart className="w-5 h-5 text-zinc-600 hover:text-rose-600" />
                    {savedCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center">
                        {savedCount}
                      </span>
                    )}
                  </Link>

                  {/* List Property CTA */}
                  <Link
                    to="/dashboard/landlord"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-xl transition"
                  >
                    <PlusCircle className="w-4 h-4 text-white" />
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
                    className="flex items-center gap-1.5 p-1 rounded-full border border-zinc-200 bg-white hover:border-zinc-400 transition cursor-pointer"
                    aria-label="User account menu"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || 'User'}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-300"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-800 border border-zinc-200">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500 mr-1" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-zinc-300 py-2 z-50 text-zinc-900"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/80">
                        <p className="text-xs text-zinc-500">Signed in as</p>
                        <p className="text-sm font-bold text-zinc-900 truncate">{user.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                        
                        {/* Role switcher */}
                        <div className="mt-3 pt-2 border-t border-zinc-200">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-1.5">
                            Switch Active Workspace:
                          </p>
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() => { switchRole('buyer_tenant'); setUserDropdownOpen(false); }}
                              className={`px-2 py-1.5 rounded-lg text-left text-xs font-semibold transition ${
                                activeRole === 'buyer_tenant' 
                                  ? 'bg-black text-white font-bold' 
                                  : 'bg-zinc-100 text-zinc-700 hover:text-black'
                              }`}
                            >
                              Tenant/Buyer
                            </button>
                            <button
                              type="button"
                              onClick={() => { switchRole('landlord_owner'); setUserDropdownOpen(false); }}
                              className={`px-2 py-1.5 rounded-lg text-left text-xs font-semibold transition ${
                                activeRole === 'landlord_owner' 
                                  ? 'bg-black text-white font-bold' 
                                  : 'bg-zinc-100 text-zinc-700 hover:text-black'
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
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-zinc-50 hover:text-black text-zinc-700 transition font-medium"
                        >
                          <Settings className="w-4 h-4 text-zinc-500" />
                          Profile & Roles
                        </Link>
                        <Link
                          to="/dashboard/buyer"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-zinc-50 hover:text-black text-zinc-700 transition font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-zinc-500" />
                          Buyer / Tenant Dashboard
                        </Link>
                        <Link
                          to="/dashboard/landlord"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-zinc-50 hover:text-black text-zinc-700 transition font-medium"
                        >
                          <Building2 className="w-4 h-4 text-zinc-500" />
                          Landlord & Agent Suite
                        </Link>
                        {user?.roles?.includes('admin') && (
                          <Link
                            to="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-zinc-50 text-zinc-900 font-bold transition"
                          >
                            <ShieldCheck className="w-4 h-4 text-black" />
                            Admin Console
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-zinc-100 pt-1">
                        <button
                          type="button"
                          onClick={() => { logout(); setUserDropdownOpen(false); }}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition font-medium cursor-pointer"
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
                    className="px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 rounded-xl transition border border-zinc-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-xl transition"
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
                className="relative p-2 text-zinc-600 hover:text-rose-600"
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
                className="p-2 rounded-lg text-zinc-800 hover:bg-zinc-100 focus:outline-none"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-zinc-800" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-2 pb-6 space-y-3">
            <nav className="space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                  >
                    Home
                  </Link>
                  <Link
                    to="/properties"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                  >
                    Properties
                  </Link>
                  <Link
                    to="/community"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                  >
                    Community
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                  >
                    Profile & Roles
                  </Link>
                  <Link
                    to="/dashboard/buyer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                  >
                    Buyer & Tenant Dashboard
                  </Link>
                  <Link
                    to="/dashboard/landlord"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                  >
                    Landlord & Agent Suite
                  </Link>
                  {user?.roles?.includes('admin') && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-base font-semibold text-black hover:bg-zinc-100 transition flex items-center justify-between"
                    >
                      <span>Admin Console</span>
                      <ShieldCheck className="w-4 h-4 text-black" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="pt-2 space-y-3">
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-600">
                    <ShieldCheck className="w-4 h-4 text-zinc-900 mb-1" />
                    Please sign in or create an account to access verified properties, districts, and your dashboard.
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-800 hover:bg-zinc-100 transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2.5 rounded-xl bg-black text-sm font-bold text-white"
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
