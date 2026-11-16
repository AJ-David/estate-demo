import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { MessageSquare, Send, Phone, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sendPropertyEnquiry } from '../../services/enquiryService';

export function EnquiryModal({ isOpen, onClose, property }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [senderContact, setSenderContact] = useState(user?.phone || '');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!property) return null;

  const quickQuestions = [
    'Is the listing price negotiable?',
    'What are the annual estate service charges?',
    'Is the compound 100% flood-free in heavy rain?',
    'Can I schedule an immediate video walkthrough?'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await sendPropertyEnquiry({
      propertyId: property.id,
      recipientId: property.agent?.id || property.landlord_or_agent_id,
      senderId: user?.id,
      senderName,
      senderContact,
      message
    });

    setLoading(false);
    setSent(true);
  };

  const handleReset = () => {
    setSent(false);
    setMessage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Contact Agent & Request Details"
      subtitle={`Enquiry for: ${property.title}`}
    >
      {sent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-black text-white font-display">Message Sent to {property.agent?.name}!</h4>
          <p className="text-xs text-estate-300 max-w-sm mx-auto">
            Your enquiry has been logged into your tenant dashboard. The agent typically replies within 30 minutes during business hours.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="w-full max-w-xs py-2.5 bg-gold hover:bg-gold-light text-navy-deep text-xs font-black rounded-xl transition shadow-gold tracking-wide"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agent Mini Card */}
          <div className="flex items-center gap-3 p-3 bg-navy-surface rounded-xl border border-navy-border">
            <img
              src={property.agent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={property.agent?.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-gold/40"
            />
            <div>
              <p className="text-xs font-bold text-white">{property.agent?.name}</p>
              <p className="text-[11px] text-estate-400">{property.agent?.company} • {property.agent?.role}</p>
            </div>
          </div>

          {/* Quick Click Prompts */}
          <div>
            <label className="block text-[11px] font-bold text-estate-400 mb-1.5 uppercase tracking-wider">
              Quick Questions
            </label>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setMessage(prev => prev ? `${prev}\n${q}` : q)}
                  className="text-left text-xs bg-navy-surface hover:bg-gold/20 hover:text-gold-light text-estate-200 px-2.5 py-1.5 rounded-lg border border-navy-border transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1">
              Your Message *
            </label>
            <textarea
              required
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I am interested in this listing. Could you share details regarding..."
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs outline-none bg-navy-deep text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-white mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs outline-none bg-navy-deep text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white mb-1">Phone / WhatsApp *</label>
              <input
                type="tel"
                required
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs outline-none bg-navy-deep text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-navy-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-navy-border text-xs font-semibold rounded-xl text-estate-300 hover:bg-navy-surface hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep text-xs font-black rounded-xl shadow-gold transition disabled:opacity-70 tracking-wide"
            >
              <Send className="w-3.5 h-3.5" />
              {loading ? 'Sending...' : 'Send Enquiry'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
