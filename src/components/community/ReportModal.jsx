import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Flag, CheckCircle2, AlertTriangle } from 'lucide-react';

export function ReportModal({ isOpen, onClose, targetItem }) {
  const [reason, setReason] = useState('defamation');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!targetItem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDetails('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Report Content to Community Moderation"
      subtitle={`Flagging: "${targetItem.title || 'Contribution'}"`}
    >
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-navy font-display">Report Received</h4>
          <p className="text-xs text-estate-600 max-w-sm mx-auto">
            Thank you for helping protect community integrity. The moderation desk reviews reported content against our safety standards within 4 hours.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="w-full max-w-xs py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              EstateLens does not tolerate malicious reviews, disclosure of private residential identities, or unsubstantiated alarmist rumors.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Primary Reason for Report *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs bg-white focus:ring-1 focus:ring-emerald outline-none"
            >
              <option value="defamation">Defamation / Naming Private Individuals</option>
              <option value="privacy_doxxing">Exposing Exact Private Address or Phone Number</option>
              <option value="unverified_security">Unsubstantiated / Alarmist Security Report</option>
              <option value="spam">Commercial Spam or Scam Solicitation</option>
              <option value="hate_speech">Harassment or Inappropriate Language</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Additional Details *
            </label>
            <textarea
              required
              rows="3"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Explain why this content violates platform guidelines..."
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-estate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-estate-200 text-xs font-semibold rounded-xl text-estate-700 hover:bg-estate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition"
            >
              Submit Report
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
