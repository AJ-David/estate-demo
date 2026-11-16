import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, MessageSquare, Mail, Phone, ExternalLink, Database } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { DatabaseStatusModal } from './DatabaseStatusModal';

export function Footer() {
  const [dbModalOpen, setDbModalOpen] = useState(false);

  return (
    <footer className="bg-navy-deep text-white border-t border-navy-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" variant="light" showTagline={true} />
            
            <p className="text-sm text-estate-300 leading-relaxed max-w-sm">
              Nigeria's premier real estate discovery and neighbourhood intelligence platform. 
              We bridge verified property discovery with ground-truth resident experiences—so you know the neighbourhood before committing to live there.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-estate-400">
              <span className="inline-flex items-center gap-1 bg-navy-surface px-2.5 py-1 rounded-md border border-navy-border text-gold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Listings
              </span>
              <span className="inline-flex items-center gap-1 bg-navy-surface px-2.5 py-1 rounded-md border border-navy-border text-estate-300">
                <MessageSquare className="w-3.5 h-3.5 text-gold-light" />
                Verified Resident Voices
              </span>
            </div>
          </div>

          {/* Key Neighbourhoods */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gold font-display">
              Top Locations
            </h4>
            <ul className="space-y-2 text-sm text-estate-400">
              <li>
                <Link to="/neighbourhoods/lekki-phase-1" className="hover:text-gold transition">
                  Lekki Phase 1, Lagos
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/yaba" className="hover:text-gold transition">
                  Yaba Tech Corridor, Lagos
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/ikeja-gra" className="hover:text-gold transition">
                  Ikeja GRA, Lagos
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/maitama" className="hover:text-gold transition">
                  Maitama District, Abuja
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/surulere" className="hover:text-gold transition">
                  Surulere, Lagos
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Intelligence */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gold font-display">
              Neighbourhood Intel
            </h4>
            <ul className="space-y-2 text-sm text-estate-400">
              <li>
                <Link to="/community?category=SECURITY" className="hover:text-gold transition">
                  Security & Safety Pulse
                </Link>
              </li>
              <li>
                <Link to="/community?category=INFRASTRUCTURE" className="hover:text-gold transition">
                  Power & Water Reliability
                </Link>
              </li>
              <li>
                <Link to="/community?category=LIVING CONDITIONS" className="hover:text-gold transition">
                  Drainage & Flooding Data
                </Link>
              </li>
              <li>
                <Link to="/community?category=PROPERTY AND LANDLORD EXPERIENCES" className="hover:text-gold transition">
                  Landlord & Lease Realities
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-gold transition">
                  Resident Q&A Forums
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gold font-display">
              Portals & Safety
            </h4>
            <ul className="space-y-2 text-sm text-estate-400">
              <li>
                <Link to="/dashboard/buyer" className="hover:text-gold transition">
                  Tenant & Buyer Portal
                </Link>
              </li>
              <li>
                <Link to="/dashboard/landlord" className="hover:text-gold transition">
                  Landlord & Agent Suite
                </Link>
              </li>
              <li>
                <Link to="/dashboard/moderation" className="hover:text-gold transition">
                  Community Standards & Moderation
                </Link>
              </li>
              <li>
                <Link to="/auth?tab=register" className="hover:text-gold transition">
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
          VettedHomes provides moderated community perspectives and crowd-sourced infrastructure observations. For resident safety and privacy, private pinpoint coordinates are obfuscated on public maps. Community submissions reflect contributor experiences and do not constitute official legal certifications. Read our community guidelines for reporting procedures.
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-navy-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} VettedHomes Technologies Ltd. Built for Nigeria, architected for global scale.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition">Community Guidelines</span>
            <button
              type="button"
              onClick={() => setDbModalOpen(true)}
              className="text-xs text-gold/80 hover:text-gold flex items-center gap-1.5 transition font-semibold"
            >
              <Database className="w-3.5 h-3.5 text-gold" />
              <span>System Architecture</span>
            </button>
          </div>
        </div>

      </div>

      {/* Database Status Modal */}
      <DatabaseStatusModal
        isOpen={dbModalOpen}
        onClose={() => setDbModalOpen(false)}
      />
    </footer>
  );
}

