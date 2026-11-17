import React from 'react';
import { Modal } from './Modal';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Lock, 
  CheckCircle2, 
  HelpCircle,
  Phone,
  Mail,
  Scale
} from 'lucide-react';

export function PolicyModal({ type, isOpen, onClose }) {
  if (!isOpen) return null;

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Nigeria Data Protection Regulation (NDPR) & Resident Confidentiality',
      icon: <Lock className="w-5 h-5 text-gold" />,
      content: (
        <div className="space-y-5 text-xs text-slate-300 leading-relaxed max-h-[65vh] overflow-y-auto pr-2">
          <div className="p-3.5 bg-navy-surface rounded-2xl border border-navy-border flex items-start gap-3 text-slate-200">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-display">Data Protection Commitment</strong>
              VettedHomes Technologies is committed to safeguarding personal information and preserving the confidentiality of property seekers, verified residents, and property owners.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">1. Information We Collect</h4>
            <p>
              When you register, schedule inspections, or post listings, we collect your full name, email address (<strong className="text-white">fiyinjoba10@gmail.com</strong>), WhatsApp/phone number (<strong className="text-white">+234 802 146 4287</strong>), and role preferences (Tenant, Landlord, or Agent).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">2. Obfuscation of Physical Coordinates</h4>
            <p>
              To protect private homeowners and resident communities from unauthorized mapping, precise building coordinates and gate access codes are obfuscated on public listing views. Full addresses and security pass details are issued exclusively to verified users with confirmed inspection bookings.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">3. Community Posts & Reviews</h4>
            <p>
              Resident feedback regarding infrastructure, power reliability, and drainage is indexed to promote market transparency. Reviews are vetted to ensure personal identifiable details (e.g. phone numbers or private resident names) are not publicized without consent.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">4. No Unauthorized Third-Party Brokerage</h4>
            <p>
              We do not sell, rent, or trade your contact information to unsolicited marketing firms or predatory loan/insurance agencies.
            </p>
          </div>

          <div className="p-3 bg-navy-deep rounded-xl border border-navy-border flex items-center justify-between text-[11px]">
            <span className="text-estate-400">Privacy queries & data access:</span>
            <a href="mailto:fiyinjoba10@gmail.com" className="text-gold font-bold hover:underline flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              fiyinjoba10@gmail.com
            </a>
          </div>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Platform Usage Agreement & Member Obligations',
      icon: <Scale className="w-5 h-5 text-gold" />,
      content: (
        <div className="space-y-5 text-xs text-slate-300 leading-relaxed max-h-[65vh] overflow-y-auto pr-2">
          <div className="p-3.5 bg-navy-surface rounded-2xl border border-navy-border flex items-start gap-3 text-slate-200">
            <FileText className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-display">Platform Governance</strong>
              By accessing VettedHomes or creating an account, you agree to comply with platform usage rules, Nigerian legal standards, and truth-in-advertising guidelines.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">1. Closed-Wall Marketplace Access</h4>
            <p>
              VettedHomes operates as a gated real estate network. Account holders are responsible for maintaining the confidentiality of their sign-in credentials and all activity conducted through their workspace.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">2. Truth in Real Estate Listings</h4>
            <p>
              Landlords and certified agents must submit authentic property photographs, accurate pricing, correct rental terms, and truthful infrastructure statuses. Uploading misleading imagery or fictitious prices will result in immediate delisting and account termination.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">3. Community Standards & Integrity Desk</h4>
            <p>
              Users contributing to Neighbourhood Community feeds must share genuine living experiences. Defamatory allegations, commercial spam, hate speech, or intentionally deceptive flood/security claims are actively monitored by the Moderation Desk and removed.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">4. Physical Inspection & Legal Title Verification</h4>
            <p>
              VettedHomes provides comprehensive intelligence tools to empower buyers and renters. However, all users must conduct physical site visits and independent title verifications (Governor’s Consent, C of O, Gazette) before finalizing financial commitments.
            </p>
          </div>

          <div className="p-3 bg-navy-deep rounded-xl border border-navy-border flex items-center justify-between text-[11px]">
            <span className="text-estate-400">Legal inquiries:</span>
            <span className="text-white font-mono">fiyinjoba10@gmail.com</span>
          </div>
        </div>
      )
    },
    'anti-scam': {
      title: 'Anti-Scam & Advance Fee Policy',
      subtitle: 'Zero Tolerance for Fraudulent Solicitations & Fake Holding Deposits',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      content: (
        <div className="space-y-5 text-xs text-slate-300 leading-relaxed max-h-[65vh] overflow-y-auto pr-2">
          <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-500/40 flex items-start gap-3 text-rose-200">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-display text-sm">Critical Warning: Never Pay Before Physical Inspection</strong>
              Never wire rent, security deposits, caution fees, or "holding fees" to any individual before physically touring the property and verifying legitimate ownership credentials.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">1. Red Flags to Watch For</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Demands for a "commitment deposit" or "gate pass fee" prior to meeting in person.</li>
              <li>Claims that the landlord is overseas or unavailable and you must pay to secure your place in line.</li>
              <li>Rushed pressure tactics claiming "five other buyers are wiring funds right now".</li>
              <li>Directives to transfer funds to personal bank accounts not verified with proper ownership documents.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">2. Official Inspection Booking Protocol</h4>
            <p>
              Always book viewings through the platform's inspection scheduler. Legitimate agents registered on VettedHomes will coordinate viewing schedules and guide you through official physical gates without demanding advance payments.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display">3. Reporting Suspicious Activity</h4>
            <p>
              If an agent or landlord solicits illegal advance fee payments or displays dishonest behaviour, report them immediately to our Security Desk. Accounts found in breach are permanently blacklisted and reported to relevant regulatory authorities.
            </p>
          </div>

          <div className="p-3.5 bg-navy-surface rounded-2xl border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              <span>Fraud Hotline & WhatsApp: <strong className="text-white">+234 802 146 4287</strong></span>
            </div>
            <a 
              href="https://wa.me/2348021464287?text=Hello%20VettedHomes,%20I%20want%20to%20report%20suspicious%20activity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-black rounded-lg text-[11px] shadow-gold hover:brightness-110 transition"
            >
              Report on WhatsApp
            </a>
          </div>
        </div>
      )
    }
  };

  const currentPolicy = policies[type] || policies['privacy'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          {currentPolicy.icon}
          <span>{currentPolicy.title}</span>
        </div>
      }
      subtitle={currentPolicy.subtitle}
      maxWidth="max-w-2xl"
    >
      {currentPolicy.content}
    </Modal>
  );
}
