import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { schedulePhysicalInspection } from '../../services/enquiryService';

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
  const [loading, setLoading] = useState(false);

  if (!property) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await schedulePhysicalInspection({
      propertyId: property.id,
      agentId: property.agent?.id || property.landlord_or_agent_id,
      userId: user?.id,
      preferredDate,
      preferredTimeSlot: preferredTime,
      fullName,
      phone,
      email,
      notes
    });

    setLoading(false);
    setConfirmationCode(res.gateCode);
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
          <div className="w-16 h-16 bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h4 className="text-xl font-black text-white font-display">Inspection Request Confirmed!</h4>
            <p className="text-sm text-estate-300 mt-1 max-w-sm mx-auto">
              The listing agent/host <strong className="text-gold">{property.agent?.name}</strong> has received your appointment request.
            </p>
          </div>

          <div className="bg-navy-surface rounded-2xl p-4 text-left border border-gold/40 max-w-sm mx-auto space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-estate-400">Estate Security Gate Pass:</span>
              <span className="font-mono font-bold text-gold bg-navy-card px-2 py-0.5 rounded border border-gold/40 text-sm">
                {confirmationCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-estate-400">Scheduled Schedule:</span>
              <span className="font-semibold text-white">{preferredDate} at {preferredTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-estate-400">Security Gate Protocol:</span>
              <span className="font-semibold text-emerald-400">Pass code dispatched to WhatsApp</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full max-w-sm py-2.5 bg-gold hover:bg-gold-light text-navy-deep text-sm font-black rounded-xl transition shadow-gold tracking-wide"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Security Gate Notice */}
          <div className="p-3 bg-navy-surface border border-gold/30 rounded-xl flex items-start gap-2.5 text-xs text-slate-200">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>
              For occupant privacy and estate security, exact street gate codes are verified and dispatched once the agent confirms this appointment.
            </span>
          </div>

          {/* Date & Time Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Suggested Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-navy-border rounded-lg text-xs bg-navy-surface text-white focus:ring-1 focus:ring-gold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Preferred Time Slot *
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-navy-border rounded-lg text-xs focus:ring-1 focus:ring-gold outline-none bg-navy-surface text-white"
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
              <label className="block text-xs font-bold text-white mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tunde Adeleke"
                className="w-full px-3 py-2 border border-navy-border rounded-lg text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Mobile Phone (WhatsApp Active) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full px-3 py-2 border border-navy-border rounded-lg text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-3 py-2 border border-navy-border rounded-lg text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1">
              Inspection Notes / Specific Queries
            </label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g. I will be coming with my spouse; would love to inspect water pressure and inverter switch..."
              className="w-full px-3 py-2 border border-navy-border rounded-lg text-xs bg-navy-surface text-white placeholder-slate-400 focus:ring-1 focus:ring-gold outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-navy-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-navy-border text-xs font-semibold rounded-xl text-slate-300 hover:bg-navy-surface hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep text-xs font-black rounded-xl shadow-gold transition disabled:opacity-70 tracking-wide"
            >
              {loading ? 'Submitting Request...' : 'Confirm Inspection Request'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
