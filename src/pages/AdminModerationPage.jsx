import React, { useState } from 'react';
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
  FileText 
} from 'lucide-react';

export function AdminModerationPage() {
  const [reports, setReports] = useState([
    {
      id: 'rep-101',
      targetType: 'Community Post',
      title: 'Allegation naming specific landlord on Admiralty Way',
      reportedBy: 'Anonymous Resident',
      reason: 'Defamation / Naming Private Individuals',
      snippet: 'Landlord at House 14 (Mr. Okafor) refuses to repair sewage leak...',
      time: '45 mins ago',
      severity: 'High',
      status: 'Pending Review'
    },
    {
      id: 'rep-102',
      targetType: 'Community Post',
      title: 'Unverified alarmist claim about street entrance barrier',
      reportedBy: 'Kemi M.',
      reason: 'Unsubstantiated / Alarmist Security Report',
      snippet: 'Someone claimed the estate gates were breached without police report...',
      time: '2 hours ago',
      severity: 'Medium',
      status: 'Pending Review'
    },
    {
      id: 'rep-103',
      targetType: 'Property Listing',
      title: 'Suspicious inspection fee request before physical tour',
      reportedBy: 'Tunde A.',
      reason: 'Advance Fee Violation Policy',
      snippet: 'Lister requested ₦10,000 inspection processing fee before visit...',
      time: '5 hours ago',
      severity: 'Critical',
      status: 'Pending Review'
    }
  ]);

  const [notification, setNotification] = useState('');

  const handleAction = (reportId, action) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    setNotification(`Action completed: ${action} for report #${reportId}`);
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-navy text-white rounded-3xl shadow-xl border border-navy-border">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-light" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-white">
              Trust, Safety & Moderation Console
            </h1>
          </div>
          <p className="text-xs text-estate-300 mt-1">
            Audit reported community claims, filter unverified security allegations, and enforce anti-defamation policies.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="bg-navy-surface px-3 py-1.5 rounded-xl border border-navy-border font-semibold text-emerald-light">
            Pending Reports: {reports.length}
          </span>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Safety Policy Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-estate-200 shadow-subtle text-xs space-y-1">
          <span className="font-bold text-navy flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            Anti-Doxxing & Privacy Rule
          </span>
          <p className="text-estate-600 text-[11px] leading-relaxed">
            Immediately redact or remove posts containing private house numbers, names of private occupants, or private phone numbers.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-estate-200 shadow-subtle text-xs space-y-1">
          <span className="font-bold text-navy flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Security Allegation Labeling
          </span>
          <p className="text-estate-600 text-[11px] leading-relaxed">
            Never label an entire neighbourhood or property as dangerous based on single unverified posts. Apply the cautionary badge.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-estate-200 shadow-subtle text-xs space-y-1">
          <span className="font-bold text-navy flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald" />
            Zero Advance Inspection Fees
          </span>
          <p className="text-estate-600 text-[11px] leading-relaxed">
            Any agent or landlord charging money before physical tours is immediately suspended pending license review.
          </p>
        </div>
      </div>

      {/* Reports Queue */}
      <div className="bg-white rounded-3xl border border-estate-200 shadow-subtle overflow-hidden">
        <div className="p-6 border-b border-estate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-navy font-display">Active Moderation Queue</h3>
          <span className="text-xs text-estate-400 font-medium">Standard SLA: Under 4 Hours</span>
        </div>

        {reports.length === 0 ? (
          <div className="p-12 text-center text-xs text-estate-500">
            <CheckCircle2 className="w-10 h-10 text-emerald mx-auto mb-2" />
            <p className="font-bold text-navy text-sm">Moderation Queue is Clean!</p>
            <p className="mt-1">All reported content has been audited in compliance with platform guidelines.</p>
          </div>
        ) : (
          <div className="divide-y divide-estate-100">
            {reports.map(rep => (
              <div key={rep.id} className="p-6 space-y-3 hover:bg-sand-50/50 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      rep.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                      rep.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {rep.severity} Severity
                    </span>
                    <span className="text-xs font-bold text-estate-500">• {rep.targetType}</span>
                    <span className="text-xs text-estate-400">• {rep.time}</span>
                  </div>
                  <span className="text-xs text-estate-500">
                    Reason: <strong className="text-rose-700">{rep.reason}</strong>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-navy font-display">{rep.title}</h4>
                <p className="text-xs text-estate-700 bg-sand-50 p-3 rounded-xl border border-sand-200 font-mono">
                  "{rep.snippet}"
                </p>

                {/* Moderation Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-estate-400 text-[11px]">
                    Flagged by: {rep.reportedBy}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAction(rep.id, 'Approved Content (Valid & Safe)')}
                      className="px-3 py-1.5 border border-estate-200 rounded-lg text-estate-700 hover:bg-estate-100 font-semibold"
                    >
                      Dismiss (Keep Post)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(rep.id, 'Redacted & Cautionary Label Attached')}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold"
                    >
                      Redact Personal Names
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(rep.id, 'Takedown & Warning Issued')}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold"
                    >
                      Takedown Content
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
