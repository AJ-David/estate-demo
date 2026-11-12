import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Heart, MapPin, MessageSquare, Mail, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white border-t border-navy-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-surface flex items-center justify-center border border-navy-border text-emerald-light">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-display">
                Estate<span className="text-emerald-light">Lens</span>
              </span>
            </Link>
            
            <p className="text-sm text-estate-300 leading-relaxed max-w-sm">
              Nigeria's premier real estate discovery and neighbourhood intelligence platform. 
              We bridge verified property discovery with ground-truth resident experiences—so you know the neighbourhood before committing to live there.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-estate-400">
              <span className="inline-flex items-center gap-1 bg-navy-surface px-2.5 py-1 rounded-md border border-navy-border text-emerald-light">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Listings
              </span>
              <span className="inline-flex items-center gap-1 bg-navy-surface px-2.5 py-1 rounded-md border border-navy-border text-estate-300">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                Verified Resident Voices
              </span>
            </div>
          </div>

          {/* Key Neighbourhoods */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-estate-300 font-display">
              Top Locations
            </h4>
            <ul className="space-y-2 text-sm text-estate-300">
              <li>
                <Link to="/neighbourhoods/lekki-phase-1" className="hover:text-emerald-light transition">
                  Lekki Phase 1, Lagos
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/yaba" className="hover:text-emerald-light transition">
                  Yaba Tech Corridor, Lagos
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/ikeja-gra" className="hover:text-emerald-light transition">
                  Ikeja GRA, Lagos
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/maitama" className="hover:text-emerald-light transition">
                  Maitama District, Abuja
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/surulere" className="hover:text-emerald-light transition">
                  Surulere, Lagos
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Intelligence */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-estate-300 font-display">
              Neighbourhood Intel
            </h4>
            <ul className="space-y-2 text-sm text-estate-300">
              <li>
                <Link to="/community?category=SECURITY" className="hover:text-emerald-light transition">
                  Security & Safety Pulse
                </Link>
              </li>
              <li>
                <Link to="/community?category=INFRASTRUCTURE" className="hover:text-emerald-light transition">
                  Power & Water Reliability
                </Link>
              </li>
              <li>
                <Link to="/community?category=LIVING CONDITIONS" className="hover:text-emerald-light transition">
                  Drainage & Flooding Data
                </Link>
              </li>
              <li>
                <Link to="/community?category=PROPERTY AND LANDLORD EXPERIENCES" className="hover:text-emerald-light transition">
                  Landlord & Lease Realities
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-emerald-light transition">
                  Resident Q&A Forums
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-estate-300 font-display">
              Portals & Safety
            </h4>
            <ul className="space-y-2 text-sm text-estate-300">
              <li>
                <Link to="/dashboard/buyer" className="hover:text-emerald-light transition">
                  Tenant & Buyer Portal
                </Link>
              </li>
              <li>
                <Link to="/dashboard/landlord" className="hover:text-emerald-light transition">
                  Landlord & Agent Suite
                </Link>
              </li>
              <li>
                <Link to="/dashboard/moderation" className="hover:text-emerald-light transition">
                  Community Standards & Moderation
                </Link>
              </li>
              <li>
                <Link to="/auth?tab=register" className="hover:text-emerald-light transition">
                  Join as Verified Agent
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Safety & Compliance Banner */}
        <div className="rounded-xl bg-navy-card p-4 border border-navy-border text-xs text-estate-400 mb-8 leading-relaxed">
          <span className="font-bold text-amber-400 block mb-1">
            Community Integrity & Safety Standard:
          </span>
          EstateLens provides moderated community perspectives and crowd-sourced infrastructure observations. For resident safety and privacy, private pinpoint coordinates are obfuscated on public maps. Community submissions reflect contributor experiences and do not constitute official legal certifications. Read our community guidelines for reporting procedures.
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-navy-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-estate-400">
          <p>© {new Date().getFullYear()} EstateLens Technologies Ltd. Built for Nigeria, architected for global scale.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition">Community Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

