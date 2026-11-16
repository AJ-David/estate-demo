import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  Eye, 
  UserX, 
  Users, 
  FileText,
  Loader2,
  Trash2,
  Edit3
} from 'lucide-react';
import { fetchModerationReports, resolveModerationReport } from '../services/communityService';

export function AdminModerationPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchModerationReports().then(data => {
      if (isMounted) {
        setReports(data);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, []);

  const handleAction = async (reportId, action) => {
    await resolveModerationReport(reportId, action);
    setReports(prev => prev.filter(r => r.id !== reportId));
    setNotification(`Moderation action executed: ${action} for report #${reportId}`);
    setTimeout(() => setNotification(''), 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-navy-card text-white rounded-3xl shadow-premium border border-navy-border">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-gold" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-white">
              Trust, Safety & Moderation Console
            </h1>
          </div>
          <p className="text-xs text-estate-400 mt-1">
            Audit reported community claims, filter unverified security allegations, and enforce anti-defamation & privacy policies.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="bg-navy-surface px-3.5 py-2 rounded-xl border border-gold/40 font-bold text-gold">
            Pending Queue: {reports.length} Items
          </span>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-navy-surface border border-emerald-500/40 text-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Safety Policy Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-navy-card rounded-3xl border border-navy-border shadow-premium text-xs space-y-1">
          <span className="font-bold text-white flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Anti-Doxxing & Privacy Rule
          </span>
          <p className="text-estate-400 text-[11px] leading-relaxed">
            Immediately redact or remove posts containing private house numbers, names of private occupants, or private phone numbers.
          </p>
        </div>

        <div className="p-4 bg-navy-card rounded-3xl border border-navy-border shadow-premium text-xs space-y-1">
          <span className="font-bold text-white flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Security Allegation Labeling
          </span>
          <p className="text-estate-400 text-[11px] leading-relaxed">
            Never label an entire neighbourhood or property as dangerous based on single unverified posts. Apply the cautionary badge.
          </p>
        </div>

        <div className="p-4 bg-navy-card rounded-3xl border border-navy-border shadow-premium text-xs space-y-1">
          <span className="font-bold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-gold" />
            Zero Advance Inspection Fees
          </span>
          <p className="text-estate-400 text-[11px] leading-relaxed">
            Any agent or landlord charging money before physical tours is immediately suspended pending license review.
          </p>
        </div>
      </div>

      {/* Reports Queue */}
      <div className="bg-navy-card rounded-3xl border border-navy-border shadow-premium overflow-hidden">
        <div className="p-5 border-b border-navy-border flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-display">
            Pending Moderation Queue ({reports.length})
          </h2>
          <span className="text-xs text-estate-400">Response SLA: &lt; 4 Hours</span>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
            <p className="text-xs text-slate-200 font-semibold">Loading flagged reports queue...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
            <p className="text-sm font-bold text-white">Moderation Queue is Clean</p>
            <p className="text-xs text-slate-300">All community reports have been audited and acted upon.</p>
          </div>
        ) : (
          <div className="divide-y divide-navy-border">
            {reports.map(report => (
              <div key={report.id} className="p-5 sm:p-6 hover:bg-navy-surface/50 transition space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      report.severity === 'Critical'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                        : report.severity === 'High'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                        : 'bg-navy-surface text-slate-200 border border-navy-border'
                    }`}>
                      {report.severity} Priority
                    </span>
                    <span className="text-xs text-slate-300">• {report.targetType}</span>
                    <span className="text-xs text-slate-300">• {report.time}</span>
                  </div>

                  <span className="text-xs text-slate-300">
                    Reported by: <strong className="text-gold">{report.reportedBy}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display">{report.title}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Violation Category: <strong className="text-gold">{report.reason}</strong>
                  </p>
                </div>

                <div className="p-3 bg-navy-surface rounded-2xl border border-navy-border text-xs text-slate-200 italic">
                  "{report.snippet}"
                </div>

                {/* Moderation Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400 text-[11px]">Report ID: {report.id}</span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAction(report.id, 'Dismiss')}
                      className="px-3.5 py-2 bg-navy-surface hover:bg-navy-border text-slate-200 font-bold rounded-xl border border-navy-border transition"
                    >
                      Dismiss (No Violation)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(report.id, 'Redact')}
                      className="px-3.5 py-2 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Redact Personal Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(report.id, 'Takedown')}
                      className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Take Down Post</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
