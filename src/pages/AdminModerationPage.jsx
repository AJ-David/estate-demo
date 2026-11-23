import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  X,
  Flag, 
  Eye, 
  UserX, 
  Users, 
  FileText,
  Loader2,
  Trash2,
  Edit3,
  RotateCcw
} from 'lucide-react';
import { 
  fetchModerationReports, 
  resolveModerationReport,
  clearAllModerationReports,
  resetDemoModerationReports
} from '../services/communityService';
import { ConfirmModal } from '../components/common/ConfirmModal';

export function AdminModerationPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [dataMode, setDataMode] = useState(
    localStorage.getItem('vettedhomes_data_mode') || 'showcase'
  );

  const toggleDataMode = async (newMode) => {
    setDataMode(newMode);
    localStorage.setItem('vettedhomes_data_mode', newMode);
    
    if (newMode === 'clean') {
      setReports(prev => prev.filter(r => !r.isSample && !String(r.id).startsWith('rep-10')));
    } else {
      setLoading(true);
      const updated = await fetchModerationReports();
      setReports(updated || []);
      setLoading(false);
    }

    setNotification(
      newMode === 'clean'
        ? 'Platform switched to Clean Slate Mode: All sample inventory & discussions are now hidden.'
        : 'Platform switched to Showcase Mode: Curated luxury inventory & discussions are now active.'
    );
    setTimeout(() => setNotification(''), 4500);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchModerationReports().then(data => {
      if (isMounted) {
        // Enforce strict deduplication by ID on mount
        const seen = new Set();
        const unique = (data || []).filter(item => {
          const id = String(item?.id || item?.targetId || item?.title || '');
          if (!id || seen.has(id)) return false;
          seen.add(id);
          return true;
        });
        setReports(unique);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [dataMode]);

  const handleAction = (reportItem, action, index) => {
    const targetId = typeof reportItem === 'object'
      ? (reportItem?.id || reportItem?.targetId || reportItem?.target_id)
      : reportItem;

    // Guaranteed instant removal: remove from state by targetId AND index
    setReports(prev => {
      return prev.filter((r, i) => {
        if (index !== undefined && i === index) return false;
        if (targetId) {
          const rId = String(r?.id || r?.targetId || r?.target_id || '');
          if (rId === String(targetId)) return false;
        }
        return true;
      });
    });

    setNotification(`Moderation action executed: ${action}`);

    try {
      resolveModerationReport(reportItem, action, index);
    } catch (err) {
      console.warn('Error resolving report:', err);
    }

    setTimeout(() => setNotification(''), 4000);
  };

  const handleClearQueue = async () => {
    setReports([]);
    setNotification('Moderation queue has been completely cleared.');

    try {
      await clearAllModerationReports();
    } catch (err) {
      console.warn('Error clearing moderation queue:', err);
    }

    setTimeout(() => setNotification(''), 4000);
  };

  const handleResetDemoReports = async () => {
    try {
      const res = await resetDemoModerationReports();
      setReports(res.reports || []);
      setNotification('Sample moderation queue has been restored for testing.');
    } catch (err) {
      console.warn('Error resetting demo reports:', err);
    }
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white text-zinc-900 rounded-3xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-black" />
            <h1 className="text-xl sm:text-2xl font-black font-display text-black">
              Trust, Safety & Moderation Console
            </h1>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Audit reported community claims, filter unverified security allegations, and enforce anti-defamation & privacy policies.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="bg-zinc-100 px-3.5 py-2 rounded-xl border border-zinc-200 font-bold text-black">
            Pending Queue: {reports.length} Items
          </span>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-zinc-50 border border-zinc-200 text-black rounded-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Platform Inventory & Community Data Mode Controller */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
              <h2 className="text-base sm:text-lg font-black text-black font-display">
                Platform Inventory & Community Data Mode
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Toggle between Curated Showcase mode (for client presentations and lead generation) and Clean Slate mode (for 100% user-only production).
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-zinc-100 rounded-2xl border border-zinc-200">
            <button
              type="button"
              onClick={() => toggleDataMode('showcase')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                dataMode === 'showcase'
                  ? 'bg-black text-white font-bold'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              Showcase Active Mode
            </button>
            <button
              type="button"
              onClick={() => toggleDataMode('clean')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                dataMode === 'clean'
                  ? 'bg-black text-white font-bold'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              Clean Slate Mode (Pure User)
            </button>
          </div>
        </div>

        <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-zinc-700 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <span>
            {dataMode === 'showcase' ? (
              <>
                <strong>Showcase Active Mode is currently enabled:</strong> 11 prime Nigerian enclaves, ₦58.4B+ curated properties (including recently leased/sold velocity badges), and authentic community forum topics are displayed to visitors.
              </>
            ) : (
              <>
                <strong>Clean Slate Mode is currently enabled:</strong> All sample listings and discussions are hidden. Only genuine properties and community posts created by real registered users will be visible.
              </>
            )}
          </span>
        </div>
      </div>

      {/* Safety Policy Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-3xl border border-zinc-200 text-xs space-y-1">
          <span className="font-bold text-black flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-black" />
            Anti-Doxxing & Privacy Rule
          </span>
          <p className="text-zinc-500 text-[11px] leading-relaxed">
            Immediately redact or remove posts containing private house numbers, names of private occupants, or private phone numbers.
          </p>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-zinc-200 text-xs space-y-1">
          <span className="font-bold text-black flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-black" />
            Security Allegation Labeling
          </span>
          <p className="text-zinc-500 text-[11px] leading-relaxed">
            Never label an entire neighbourhood or property as dangerous based on single unverified posts. Apply the cautionary badge.
          </p>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-zinc-200 text-xs space-y-1">
          <span className="font-bold text-black flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-black" />
            Zero Advance Inspection Fees
          </span>
          <p className="text-zinc-500 text-[11px] leading-relaxed">
            Any agent or landlord charging money before physical tours is immediately suspended pending license review.
          </p>
        </div>
      </div>

      {/* Reports Queue */}
      <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden">
        <div className="p-5 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-black font-display">
              Pending Moderation Queue ({reports.length})
            </h2>
            <span className="text-xs text-zinc-500">Response SLA: &lt; 4 Hours</span>
          </div>

          <div className="flex items-center gap-2">
            {reports.length > 0 && (
              <button
                type="button"
                onClick={() => setIsConfirmClearOpen(true)}
                className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-xs font-semibold text-black rounded-xl border border-zinc-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-black" />
                <span>Clear All Reports</span>
              </button>
            )}
            {reports.length === 0 && dataMode === 'showcase' && (
              <button
                type="button"
                onClick={handleResetDemoReports}
                className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-xs font-semibold text-black rounded-xl border border-zinc-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-black" />
                <span>Restore Sample Queue</span>
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-black animate-spin mx-auto" />
            <p className="text-xs text-zinc-700 font-semibold">Loading flagged reports queue...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
            <p className="text-sm font-bold text-black">Moderation Queue is Clean</p>
            <p className="text-xs text-zinc-500">All community reports have been audited and acted upon.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200">
            {reports.map((report, index) => {
              const currentId = report?.id || report?.targetId || report?.target_id || `idx-${index}`;
              const uniqueKey = `${currentId}-${index}`;
              return (
                <div key={uniqueKey} className="p-5 sm:p-6 hover:bg-zinc-50 transition space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-black border border-zinc-300">
                        {report.severity || 'Medium'} Priority
                      </span>
                      <span className="text-xs text-zinc-600">• {report.targetType || 'Community Post'}</span>
                      <span className="text-xs text-zinc-500">• {report.time || 'Recent'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-600">
                        Reported by: <strong className="text-black font-bold">{report.reportedBy || 'Resident'}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAction(report, 'Dismiss', index)}
                        className="p-1 rounded-lg text-zinc-400 hover:text-black hover:bg-zinc-100 transition cursor-pointer"
                        title="Quick Dismiss"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-black font-display">{report.title}</h3>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      Violation Category: <strong className="text-black font-bold">{report.reason}</strong>
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-zinc-700 italic">
                    "{report.snippet || report.details}"
                  </div>

                  {/* Moderation Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-zinc-500 text-[11px]">Report ID: {currentId}</span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAction(report, 'Dismiss', index)}
                        className="px-3.5 py-2 bg-white hover:bg-zinc-100 text-black font-semibold rounded-xl border border-zinc-300 transition cursor-pointer active:scale-95"
                      >
                        Dismiss (No Violation)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(report, 'Redact', index)}
                        className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-black font-semibold rounded-xl border border-zinc-300 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Redact Personal Details</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(report, 'Takedown', index)}
                        className="px-3.5 py-2 bg-black hover:bg-zinc-800 text-white font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Take Down Post</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CLEAR ALL REPORTS INTERACTIVE POPUP MODAL */}
      <ConfirmModal
        isOpen={isConfirmClearOpen}
        onClose={() => setIsConfirmClearOpen(false)}
        onConfirm={() => {
          setIsConfirmClearOpen(false);
          handleClearQueue();
        }}
        title="Clear Moderation Queue"
        subtitle="Queue Purge Confirmation"
        message="Are you sure you want to completely clear all pending moderation reports? All reported claims will be dismissed and marked as audited in the security vault."
        confirmText="Yes, Clear All"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
