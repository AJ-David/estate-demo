import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { PolicyModal } from './PolicyModal';

export function Footer() {
  const { user } = useAuth();
  const [activePolicy, setActivePolicy] = useState(null);

  return (
    <footer className="bg-navy-deep text-white border-t border-navy-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Corporate Offices */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" variant="light" showTagline={true} />
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Nigeria's premier real estate authority and neighbourhood intelligence portal. 
              We bridge verified property discovery with ground-truth resident data—so you understand living conditions before committing capital or signing a lease.
            </p>

            {/* Contact Channels */}
            <div className="pt-2 border-t border-navy-border/80">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <a 
                  href="https://wa.me/2348021464287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-gold transition font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+234 802 146 4287 (Phone / WhatsApp)</span>
                </a>
                <a 
                  href="mailto:fiyinjoba10@gmail.com"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-gold transition font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <span>fiyinjoba10@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Prime Enclaves */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gold font-display">
              Prime Enclaves
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/neighbourhoods/banana-island" className="hover:text-gold transition">
                  Banana Island, Ikoyi
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/ikoyi" className="hover:text-gold transition">
                  Old Ikoyi & Bourdillon
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/victoria-island" className="hover:text-gold transition">
                  Victoria Island & Oniru
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/eko-atlantic" className="hover:text-gold transition">
                  Eko Atlantic City
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/lekki-phase-1" className="hover:text-gold transition">
                  Lekki Phase 1, Lagos
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/maitama" className="hover:text-gold transition">
                  Maitama District, Abuja
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/asokoro" className="hover:text-gold transition">
                  Asokoro Enclave, Abuja
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Intelligence */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gold font-display">
              Neighbourhood Intel
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/community?category=SECURITY" className="hover:text-gold transition">
                  Security & Gate Passes
                </Link>
              </li>
              <li>
                <Link to="/community?category=INFRASTRUCTURE" className="hover:text-gold transition">
                  Power & Water Reliability
                </Link>
              </li>
              <li>
                <Link to="/community?category=LIVING CONDITIONS" className="hover:text-gold transition">
                  Drainage & Flood Records
                </Link>
              </li>
              <li>
                <Link to="/community?category=PROPERTY AND LANDLORD EXPERIENCES" className="hover:text-gold transition">
                  Service Charge Transparency
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-gold transition">
                  Resident Discussions Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gold font-display">
              Enterprise Portals
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/dashboard/buyer" className="hover:text-gold transition">
                  Tenant & Buyer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/landlord" className="hover:text-gold transition">
                  Landlord & Agent Suite
                </Link>
              </li>
              {user?.roles?.includes('admin') && (
                <li>
                  <Link to="/admin" className="hover:text-gold transition font-bold text-gold flex items-center gap-1.5">
                    <span>Admin & Clean Slate Console</span>
                  </Link>
                </li>
              )}
              <li>
                <Link to="/dashboard/moderation" className="hover:text-gold transition">
                  Community Integrity Desk
                </Link>
              </li>
              <li>
                <Link to="/auth?tab=register&role=agent" className="hover:text-gold transition">
                  Apply for Certified Agency Pass
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-gold transition">
                  Marketplace Properties
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Safety & Compliance Banner */}
        <div className="rounded-2xl bg-navy-card p-4 sm:p-5 border border-navy-border text-xs text-slate-300 mb-8 leading-relaxed shadow-premium">
          <span className="font-bold text-gold block mb-1">
            Institutional Transparency & Resident Data Protection Statement:
          </span>
          VettedHomes Technologies Limited operates in strict compliance with the Lagos State Real Estate Regulatory Authority (LASRERA) and the Nigeria Data Protection Act (NDPR). To safeguard resident privacy, private building coordinates are obfuscated on public map interfaces; verified physical gate codes are issued only upon confirmed, agent-authorized inspection bookings.
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-navy-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} VettedHomes Technologies Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setActivePolicy('privacy')}
              className="hover:text-gold transition font-medium"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActivePolicy('terms')}
              className="hover:text-gold transition font-medium"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setActivePolicy('anti-scam')}
              className="hover:text-gold transition font-medium text-amber-400/90 hover:text-amber-300"
            >
              Anti-Scam & Advance Fee Policy
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Policy & Legal Modals */}
      <PolicyModal
        type={activePolicy}
        isOpen={Boolean(activePolicy)}
        onClose={() => setActivePolicy(null)}
      />
    </footer>
  );
}
