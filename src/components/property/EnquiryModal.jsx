import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { MessageSquare, Send, Phone, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function EnquiryModal({ isOpen, onClose, property }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [senderContact, setSenderContact] = useState(user?.phone || '');
  const [sent, setSent] = useState(false);

  if (!property) return null;

  const quickQuestions = [
    'Is the listing price negotiable?',
    'What are the annual estate service charges?',
    'Is the compound 100% flood-free in heavy rain?',
    'Can I schedule an immediate video walkthrough?'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-navy font-display">Message Sent to {property.agent.name}!</h4>
          <p className="text-xs text-estate-600 max-w-sm mx-auto">
            Your enquiry has been logged into your tenant dashboard. The agent typically replies within 30 minutes during business hours.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="w-full max-w-xs py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agent Mini Card */}
          <div className="flex items-center gap-3 p-3 bg-sand-50 rounded-xl border border-sand-200">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-emerald-300"
            />
            <div>
              <p className="text-xs font-bold text-estate-900">{property.agent.name}</p>
              <p className="text-[11px] text-estate-500">{property.agent.company} • {property.agent.role}</p>
            </div>
          </div>

          {/* Quick Click Prompts */}
          <div>
            <label className="block text-[11px] font-bold text-estate-600 mb-1.5 uppercase tracking-wider">
              Quick Questions
            </label>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setMessage(prev => prev ? `${prev}\n${q}` : q)}
                  className="text-left text-xs bg-estate-100 hover:bg-emerald-50 hover:text-emerald-800 text-estate-700 px-2.5 py-1.5 rounded-lg border border-estate-200 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Your Message *
            </label>
            <textarea
              required
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I am interested in this listing. Could you share details regarding..."
              className="w-full px-3 py-2 border border-estate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Phone / WhatsApp *</label>
              <input
                type="tel"
                required
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>
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
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-navy text-white text-xs font-bold rounded-lg hover:bg-emerald transition"
            >
              <Send className="w-3.5 h-3.5" />
              Send Enquiry
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

