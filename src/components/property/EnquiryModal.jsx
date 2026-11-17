import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { MessageSquare, Send, Phone, CheckCircle2, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sendPropertyEnquiry } from '../../services/enquiryService';

export function EnquiryModal({ isOpen, onClose, property }) {
  const { user } = useAuth();
  const [senderName, setSenderName] = useState(user?.name || '');
  const [senderContact, setSenderContact] = useState(user?.phone || '');
  const [matchSimilar, setMatchSimilar] = useState(true);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  if (!property) return null;

  const isOffMarket = property.marketStatus === 'recently_leased' || 
                      property.marketStatus === 'recently_sold' || 
                      property.marketStatus === 'under_escrow';

  const [message, setMessage] = useState(
    isOffMarket
      ? `Hello VettedHomes Concierge, I see that this residence is off-market. Please match me with 2–3 identical unlisted verified options in ${property.location?.neighbourhoodName || 'this district'} matching this price point.`
      : ''
  );

  const quickQuestions = isOffMarket ? [
    `What similar unlisted properties do you have in ${property.location?.neighbourhoodName || 'this area'}?`,
    'Notify me immediately when an identical unit becomes available',
    'Can I schedule a consultation call with your private broker?',
    'What is the typical entry budget for this estate?'
  ] : [
    'Is the listing price negotiable?',
    'What are the annual estate service charges?',
    'Is the compound 100% flood-free in heavy rain?',
    'Can I schedule an immediate video walkthrough?'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const ref = `VH-CONCIERGE-${Math.floor(100000 + Math.random() * 900000)}`;

    await sendPropertyEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location?.neighbourhoodName,
      recipientId: property.agent?.id || property.landlord_or_agent_id,
      senderId: user?.id,
      senderName,
      senderContact,
      message: `${message}${matchSimilar ? '\n\n[Client requested automatic matching for similar unlisted residences in this district]' : ''}`,
      referenceCode: ref
    });

    setReferenceCode(ref);
    setLoading(false);
    setSent(true);
  };

  const handleReset = () => {
    setSent(false);
    setMessage('');
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello VettedHomes Concierge, I just submitted enquiry (${referenceCode}) regarding ${property.title} in ${property.location?.neighbourhoodName}. Please provide availability and matched options.`
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isOffMarket ? "Private Concierge Home Matching" : "Contact Agent & Private Allocation"}
      subtitle={`Enquiry for: ${property.title}`}
    >
      {sent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-black text-white font-display">
              Request Dispatched to Concierge Desk!
            </h4>
            <p className="text-xs text-estate-300 max-w-sm mx-auto leading-relaxed">
              Your private enquiry has been logged with our senior client desk. A concierge advisor will review live estate allocations and contact you via WhatsApp / Phone within 30 minutes.
            </p>
          </div>

          <div className="bg-navy-surface rounded-2xl p-4 text-left border border-gold/40 max-w-sm mx-auto space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-estate-400">Reference Tracking ID:</span>
              <span className="font-mono font-bold text-gold bg-navy-card px-2.5 py-1 rounded border border-gold/40 text-xs">
                {referenceCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-estate-400">Target Enclave:</span>
              <span className="font-semibold text-white">{property.location?.neighbourhoodName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-estate-400">Response Window:</span>
              <span className="font-semibold text-emerald-400">Within 30 Mins (Priority Desk)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 max-w-sm mx-auto pt-2">
            <a
              href={`https://wa.me/2348035550192?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-950/60 hover:bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp Follow-up</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 bg-gold hover:bg-gold-light text-navy-deep text-xs font-black rounded-xl transition shadow-gold tracking-wide"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Concierge Protocol Banner */}
          <div className="p-3 bg-navy-surface border border-gold/30 rounded-xl flex items-start gap-2.5 text-xs text-slate-200">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>
              {isOffMarket 
                ? `This property is off-market. Our concierge desk will immediately match your enquiry with 2–3 identical unlisted verified residences in ${property.location?.neighbourhoodName || 'the district'}.`
                : `Private Allocation: A VettedHomes Concierge verifies live gate-pass and inspection availability with the district trustees before confirming your viewing.`
              }
            </span>
          </div>

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
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I am interested in this listing. Could you share details regarding..."
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs outline-none bg-navy-deep text-white focus:border-gold/50"
            />
          </div>

          {/* Automatic Match Checkbox */}
          <label className="flex items-center gap-2 p-2.5 bg-navy-surface/80 rounded-xl border border-navy-border cursor-pointer text-xs text-slate-200">
            <input
              type="checkbox"
              checked={matchSimilar}
              onChange={(e) => setMatchSimilar(e.target.checked)}
              className="rounded border-navy-border text-gold focus:ring-gold bg-navy-deep w-4 h-4"
            />
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Also match me with similar unlisted vetted residences in <strong>{property.location?.neighbourhoodName || 'this area'}</strong></span>
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-white mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs outline-none bg-navy-deep text-white focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white mb-1">Phone / WhatsApp *</label>
              <input
                type="tel"
                required
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs outline-none bg-navy-deep text-white focus:border-gold/50"
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
              {loading ? 'Routing to Desk...' : isOffMarket ? 'Request Private Matching' : 'Send Priority Enquiry'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
