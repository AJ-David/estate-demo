import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { PolicyModal } from './PolicyModal';

export function Footer() {
  const { user } = useAuth();
  const [activePolicy, setActivePolicy] = useState(null);

  return (
    <footer className="bg-zinc-50 text-zinc-900 border-t border-zinc-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Corporate Offices */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" variant="dark" showTagline={true} />
            
            <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">
              Nigeria's premier real estate authority and neighbourhood intelligence portal. 
              We bridge verified property discovery with ground-truth resident data—so you understand living conditions before committing capital or signing a lease.
            </p>

            {/* Contact Channels */}
            <div className="pt-2 border-t border-zinc-200">
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                <a 
                  href="https://wa.me/2348021464287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-600 hover:text-black transition font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+234 802 146 4287 (Phone / WhatsApp)</span>
                </a>
                <a 
                  href="mailto:fiyinjoba10@gmail.com"
                  className="flex items-center gap-1.5 text-zinc-600 hover:text-black transition font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-900" />
                  <span>fiyinjoba10@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Prime Enclaves */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-900 font-display">
              Prime Enclaves
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link to="/neighbourhoods/banana-island" className="hover:text-black transition">
                  Banana Island, Ikoyi
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/ikoyi" className="hover:text-black transition">
                  Old Ikoyi & Bourdillon
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/victoria-island" className="hover:text-black transition">
                  Victoria Island & Oniru
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/eko-atlantic" className="hover:text-black transition">
                  Eko Atlantic City
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/lekki-phase-1" className="hover:text-black transition">
                  Lekki Phase 1, Lagos
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/maitama" className="hover:text-black transition">
                  Maitama District, Abuja
                </Link>
              </li>
              <li>
                <Link to="/neighbourhoods/asokoro" className="hover:text-black transition">
                  Asokoro Enclave, Abuja
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Intelligence */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-900 font-display">
              Neighbourhood Intel
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link to="/community?category=SECURITY" className="hover:text-black transition">
                  Security & Gate Passes
                </Link>
              </li>
              <li>
                <Link to="/community?category=INFRASTRUCTURE" className="hover:text-black transition">
                  Power & Water Reliability
                </Link>
              </li>
              <li>
                <Link to="/community?category=LIVING CONDITIONS" className="hover:text-black transition">
                  Drainage & Flood Records
                </Link>
              </li>
              <li>
                <Link to="/community?category=PROPERTY AND LANDLORD EXPERIENCES" className="hover:text-black transition">
                  Service Charge Transparency
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-black transition">
                  Resident Discussions Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-900 font-display">
              Enterprise Portals
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link to="/dashboard/buyer" className="hover:text-black transition">
                  Tenant & Buyer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/landlord" className="hover:text-black transition">
                  Landlord & Agent Suite
                </Link>
              </li>
              {user?.roles?.includes('admin') && (
                <li>
                  <Link to="/admin" className="hover:text-black transition font-bold text-zinc-900 flex items-center gap-1.5">
                    <span>Admin & Clean Slate Console</span>
                  </Link>
                </li>
              )}
              <li>
                <Link to="/dashboard/moderation" className="hover:text-black transition">
                  Community Integrity Desk
                </Link>
              </li>
              <li>
                <Link to="/auth?tab=register&role=agent" className="hover:text-black transition">
                  Apply for Certified Agency Pass
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-black transition">
                  Marketplace Properties
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Safety & Compliance Banner */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-zinc-200 text-xs text-zinc-600 mb-8 leading-relaxed">
          <span className="font-bold text-zinc-900 block mb-1">
            Institutional Transparency & Resident Data Protection Statement:
          </span>
          VettedHomes Technologies Limited operates in strict compliance with applicable real estate regulations and resident data privacy standards. To safeguard resident privacy, private building coordinates are obfuscated on public map interfaces; verified physical gate codes are issued only upon confirmed, agent-authorized inspection bookings.
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} VettedHomes Technologies Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setActivePolicy('privacy')}
              className="hover:text-black transition font-medium cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActivePolicy('terms')}
              className="hover:text-black transition font-medium cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setActivePolicy('anti-scam')}
              className="hover:text-amber-700 transition font-medium text-amber-600 cursor-pointer"
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
