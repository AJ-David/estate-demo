import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { ShieldCheck, AlertCircle, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { DEMO_NEIGHBOURHOODS } from '../../data/demoData';
import { useAuth } from '../../context/AuthContext';
import { createCommunityPost } from '../../services/communityService';

export function CreatePostModal({ isOpen, onClose, onPostCreated, initialNeighbourhoodId }) {
  const { user } = useAuth();
  const [neighbourhoodId, setNeighbourhoodId] = useState(initialNeighbourhoodId || 'lekki-phase-1');
  const [category, setCategory] = useState('INFRASTRUCTURE');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isVerifiedResident, setIsVerifiedResident] = useState(true);
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!guidelinesAccepted) {
      setError('You must confirm adherence to community safety standards.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await createCommunityPost({
        neighbourhoodId,
        category,
        title,
        content,
        tags,
        isVerifiedResident,
        user
      });

      if (!res.success) {
        setError(res.error || 'Failed to publish post. Please check platform standards.');
        return;
      }

      onPostCreated(res.post);
      handleReset();
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setTags('');
    setError('');
    setGuidelinesAccepted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Start a Community Discussion"
      subtitle="Share factual living experiences, ask questions, or report infrastructure updates."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Safety standards callout */}
        <div className="bg-sand-100 p-3.5 rounded-2xl border border-sand-200 text-xs text-estate-700 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-navy">
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span>Community Safety & Anti-Doxxing Protocol</span>
          </div>
          <p className="text-[11px] text-estate-600 leading-relaxed">
            EstateLens prohibits public accusations naming private individuals, exact gate/house numbers, or publishing phone numbers. Focus on general infrastructure, road conditions, power reliability, and helpful neighborhood context.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Neighbourhood & Category Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Neighbourhood *
            </label>
            <select
              value={neighbourhoodId}
              onChange={(e) => setNeighbourhoodId(e.target.value)}
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs bg-white focus:ring-1 focus:ring-emerald outline-none"
            >
              {DEMO_NEIGHBOURHOODS.map(n => (
                <option key={n.id} value={n.id}>{n.name} ({n.city})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Discussion Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs bg-white focus:ring-1 focus:ring-emerald outline-none"
            >
              <option value="INFRASTRUCTURE">Power & Infrastructure (Electricity, Water, Roads)</option>
              <option value="SECURITY">Security & Safety Observation</option>
              <option value="LIVING CONDITIONS">Living Conditions & Flood Drainage</option>
              <option value="PROPERTY AND LANDLORD EXPERIENCES">Landlord & Tenancy Realities</option>
              <option value="GENERAL DISCUSSIONS">General Questions & Recommendations</option>
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-estate-800 mb-1">
            Discussion Headline *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. Road drainage status after heavy rain; or 6-month fiber stability review..."
            className="w-full px-3 py-2.5 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-bold text-estate-800 mb-1">
            Your Detailed Experience or Question *
          </label>
          <textarea
            required
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share factual insights, timeline, streets involved (e.g. Admiralty corridor, Commercial Ave), and practical advice for other residents..."
            className="w-full px-3 py-2.5 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-estate-800 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. Electricity, Inverter, Drainage, Security"
            className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
          />
        </div>

        {/* Checkbox standards */}
        <div className="space-y-2 pt-2 border-t border-estate-100">
          <label className="flex items-start gap-2 cursor-pointer text-xs text-estate-700">
            <input
              type="checkbox"
              checked={isVerifiedResident}
              onChange={(e) => setIsVerifiedResident(e.target.checked)}
              className="mt-0.5 rounded text-emerald focus:ring-emerald"
            />
            <span>I currently reside or have previously lived in this neighbourhood.</span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer text-xs text-estate-700">
            <input
              type="checkbox"
              required
              checked={guidelinesAccepted}
              onChange={(e) => setGuidelinesAccepted(e.target.checked)}
              className="mt-0.5 rounded text-emerald focus:ring-emerald"
            />
            <span>
              I certify this is an honest account free from defamatory accusations naming private persons, commercial harassment, or private address disclosure.
            </span>
          </label>
        </div>

        {/* Action Footer */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-estate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-estate-200 text-xs font-semibold rounded-xl text-estate-700 hover:bg-estate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark shadow-sm transition disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Checking & Publishing...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Publish Contribution</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
