import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitNeighbourhoodReview } from '../../services/reviewService';

export function NeighbourhoodReviewModal({ isOpen, onClose, neighbourhood, onReviewSubmitted }) {
  const { user } = useAuth();
  const [safetyRating, setSafetyRating] = useState(8.5);
  const [infrastructureRating, setInfrastructureRating] = useState(7.5);
  const [accessibilityRating, setAccessibilityRating] = useState(8.0);
  const [cleanlinessRating, setCleanlinessRating] = useState(7.5);
  const [comment, setComment] = useState('');
  const [isVerifiedResident, setIsVerifiedResident] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!neighbourhood) return null;

  const calculateOverall = () => {
    return Number(((safetyRating + infrastructureRating + accessibilityRating + cleanlinessRating) / 4).toFixed(1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim().length < 20) {
      setError('Please provide at least 20 characters describing your neighborhood experience.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const res = await submitNeighbourhoodReview({
        neighbourhoodId: neighbourhood.id,
        safetyRating,
        infrastructureRating,
        accessibilityRating,
        cleanlinessRating,
        overallRating: calculateOverall(),
        comment,
        user,
        isVerifiedResident
      });

      if (res.success) {
        setSubmitted(true);
        if (onReviewSubmitted) onReviewSubmitted(res.review);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setComment('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Submit Verified Neighbourhood Evaluation"
      subtitle={`Evaluating: ${neighbourhood.name} (${neighbourhood.city})`}
      maxWidth="max-w-2xl"
    >
      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 bg-emerald-950/80 text-emerald-300 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white font-display">Evaluation Recorded</h4>
          <p className="text-xs text-estate-400 max-w-sm mx-auto leading-relaxed">
            Thank you for contributing to Nigeria's ground-truth location intelligence. Your rating informs prospective residents on real living conditions.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="w-full max-w-xs py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep text-xs font-bold rounded-xl shadow-gold transition"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-500/30 rounded-xl flex items-center gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Computed overall banner */}
          <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-estate-400 block">Overall Livability Contribution</span>
              <span className="text-xs text-estate-300">Calculated from 4 core urban dimensions</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-gold font-display">{calculateOverall()}</span>
              <span className="text-xs text-estate-400"> / 10.0</span>
            </div>
          </div>

          {/* Multi-criteria sliders */}
          <div className="space-y-3">
            <div className="p-3 bg-navy-surface rounded-xl border border-navy-border space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Security & Street Vigilance</span>
                <span className="text-gold font-black">{safetyRating} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={safetyRating}
                onChange={(e) => setSafetyRating(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-estate-400">Gated closes, vigilante presence, nocturnal lighting</span>
            </div>

            <div className="p-3 bg-navy-surface rounded-xl border border-navy-border space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Power & Infrastructure Stability</span>
                <span className="text-gold font-black">{infrastructureRating} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={infrastructureRating}
                onChange={(e) => setInfrastructureRating(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-estate-400">Public feeder uptime, transformer maintenance, borehole water</span>
            </div>

            <div className="p-3 bg-navy-surface rounded-xl border border-navy-border space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Accessibility & Transit Links</span>
                <span className="text-gold font-black">{accessibilityRating} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={accessibilityRating}
                onChange={(e) => setAccessibilityRating(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-estate-400">Rush hour traffic, road condition, bridge or metro connection</span>
            </div>

            <div className="p-3 bg-navy-surface rounded-xl border border-navy-border space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Cleanliness & Drainage Resistance</span>
                <span className="text-gold font-black">{cleanlinessRating} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={cleanlinessRating}
                onChange={(e) => setCleanlinessRating(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <span className="text-[10px] text-estate-400">Flash flood resilience, waste management, road cleanliness</span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold text-white mb-1">
              Your Living Experience Insights *
            </label>
            <textarea
              required
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Detail flood patterns during rainy season, internet speeds (e.g. Starlink, FiberOne), estate gate lock-up times, and supermarket access..."
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs outline-none bg-navy-deep text-white"
            />
          </div>

          {/* Verification check */}
          <div className="pt-2 border-t border-navy-border">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-estate-300">
              <input
                type="checkbox"
                checked={isVerifiedResident}
                onChange={(e) => setIsVerifiedResident(e.target.checked)}
                className="mt-0.5 rounded text-gold focus:ring-gold"
              />
              <span>
                <strong className="text-gold">Verified Resident Badge:</strong> I confirm I live or previously resided in this neighbourhood.
              </span>
            </label>
          </div>

          <p className="text-[11px] text-estate-400 italic">
            * Ratings represent subjective experiences of community contributors and do not constitute warranties.
          </p>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-navy-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-navy-border text-xs font-semibold rounded-xl text-estate-300 hover:bg-navy-surface hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep text-xs font-black rounded-xl shadow-gold transition flex items-center gap-1.5 disabled:opacity-50 tracking-wide"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Recording...</span>
                </>
              ) : (
                <span>Submit Evaluation</span>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

