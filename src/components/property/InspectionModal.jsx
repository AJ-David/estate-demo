import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function InspectionModal({ isOpen, onClose, property }) {
  const { user } = useAuth();
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = `INS-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Request Physical Property Inspection"
      subtitle={property.title}
    >
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-navy font-display">Inspection Request Submitted!</h4>
            <p className="text-sm text-estate-600 mt-1 max-w-sm mx-auto">
              The listing agent/host <strong className="text-navy">{property.agent.name}</strong> has received your appointment request.
            </p>
          </div>

          <div className="bg-sand-100 rounded-xl p-4 text-left border border-sand-200 max-w-sm mx-auto space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-estate-500">Confirmation Reference:</span>
              <span className="font-mono font-bold text-navy">{confirmationCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-estate-500">Requested Schedule:</span>
              <span className="font-semibold text-estate-800">{preferredDate} at {preferredTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-estate-500">Security Gate Protocol:</span>
              <span className="font-semibold text-emerald-800">Pass code will be sent via SMS</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full max-w-sm py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-estate-900 transition"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Security Gate Notice */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
            <span>
              For occupant privacy and estate security, exact street gate codes are verified and dispatched once the agent confirms this appointment.
            </span>
          </div>

          {/* Date & Time Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                Suggested Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-estate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                Preferred Time Slot *
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-estate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald outline-none bg-white"
                >
                  <option value="10:00 AM">Morning (10:00 AM)</option>
                  <option value="11:30 AM">Late Morning (11:30 AM)</option>
                  <option value="02:00 PM">Afternoon (02:00 PM)</option>
                  <option value="04:30 PM">Late Afternoon (04:30 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tunde Adeleke"
                className="w-full px-3 py-2 border border-estate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                Mobile Phone (WhatsApp Active) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full px-3 py-2 border border-estate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-3 py-2 border border-estate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Inspection Notes / Specific Queries
            </label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g. I will be coming with my spouse; would love to inspect water pressure and inverter switch..."
              className="w-full px-3 py-2 border border-estate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-estate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-estate-200 text-xs font-semibold rounded-lg text-estate-700 hover:bg-estate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald text-white text-xs font-bold rounded-lg hover:bg-emerald-dark shadow-sm transition"
            >
              Confirm Inspection Request
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

