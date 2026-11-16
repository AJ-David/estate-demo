import React, { useState } from 'react';
import { Modal } from './Modal';
import { Database, CheckCircle2, Copy, ExternalLink, ShieldCheck, Layers, Server } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function DatabaseStatusModal({ isOpen, onClose }) {
  const { isConfigured } = useAuth();
  const [copied, setCopied] = useState(false);

  const copyEnvSnippet = () => {
    const snippet = `# VettedHomes Supabase Configuration\nVITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const tablesList = [
    { name: 'profiles', desc: 'User profiles with bio, avatar, and contact' },
    { name: 'user_roles', desc: 'Multi-role capability (tenant, landlord, agent, admin)' },
    { name: 'neighbourhoods', desc: 'Nigerian urban intelligence & livability metrics' },
    { name: 'properties', desc: 'Listings for rent, sale, and short-let' },
    { name: 'property_images', desc: 'Photo galleries and display order' },
    { name: 'property_amenities', desc: 'Infrastructure and features tags' },
    { name: 'saved_properties', desc: 'User wishlists and saved homes' },
    { name: 'enquiries', desc: 'In-platform direct messaging and questions' },
    { name: 'inspections', desc: 'Appointment schedules with gate codes' },
    { name: 'community_posts', desc: 'Discussions on security, power, and roads' },
    { name: 'community_comments', desc: 'Resident replies and local guidance' },
    { name: 'community_votes', desc: 'Helpful upvotes and downvotes' },
    { name: 'property_reviews', desc: 'Verified tenant experiences' },
    { name: 'neighbourhood_reviews', desc: 'Location livability ratings' },
    { name: 'moderation_reports', desc: 'Trust & safety reports queue' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Supabase PostgreSQL Database Architecture"
      subtitle="Phase 2 Backend & Row Level Security (RLS) Status"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        
        {/* Status Card */}
        <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
          isConfigured 
            ? 'bg-navy-surface border-emerald-500/40 text-emerald-300' 
            : 'bg-navy-surface border-gold/40 text-gold-light'
        }`}>
          <div className="p-2 rounded-xl bg-navy-card shadow-xs shrink-0 border border-navy-border">
            <Database className={`w-5 h-5 ${isConfigured ? 'text-emerald-400' : 'text-gold'}`} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">
              {isConfigured ? 'Live Supabase Backend Connected' : 'Running in Local Demo Sandbox Mode'}
            </h4>
            <p className="mt-0.5 leading-relaxed text-estate-300">
              {isConfigured 
                ? 'Authentication, user profiles, and multi-role operations are synced with your live Supabase PostgreSQL database.'
                : 'The application is running with local browser storage persistence. To connect your live Supabase cloud project, add your URL and Anon Key to .env and run supabase/schema.sql in the Supabase SQL editor.'
              }
            </p>
          </div>
        </div>

        {/* Database Tables Overview */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-gold" />
            <span>Configured Tables with Row Level Security (RLS)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {tablesList.map(t => (
              <div key={t.name} className="p-2.5 bg-navy-surface rounded-xl border border-navy-border text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gold">{t.name}</span>
                  <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold px-1.5 py-0.5 rounded">
                    RLS Enabled
                  </span>
                </div>
                <p className="text-[11px] text-estate-400 mt-0.5">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-navy-surface p-4 rounded-2xl border border-navy-border text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">Quick Supabase Setup:</span>
            <button
              type="button"
              onClick={copyEnvSnippet}
              className="text-gold hover:text-gold-light font-bold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Snippet!' : 'Copy .env variables'}</span>
            </button>
          </div>
          <ol className="list-decimal pl-4 space-y-1 text-estate-600 text-[11px] leading-relaxed">
            <li>Create a new project on <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald font-semibold hover:underline">supabase.com</a>.</li>
            <li>In the Supabase SQL Editor, run the script provided in <code className="bg-estate-100 px-1 py-0.5 rounded font-mono">supabase/schema.sql</code> and <code className="bg-estate-100 px-1 py-0.5 rounded font-mono">supabase/seed.sql</code>.</li>
            <li>Copy your Project URL and Anon Public Key from Project Settings &gt; API into your local <code className="bg-estate-100 px-1 py-0.5 rounded font-mono">.env</code> file.</li>
          </ol>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition"
          >
            Close Overview
          </button>
        </div>

      </div>
    </Modal>
  );
}

