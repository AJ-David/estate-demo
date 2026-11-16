import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Star, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitPropertyReview } from '../../services/reviewService';

export function PropertyReviewModal({ isOpen, onClose, property, onReviewSubmitted }) {
  const { user } = useAuth();
  const [conditionRating, setConditionRating] = useState(5);
  const [accuracyRating, setAccuracyRating] = useState(5);
  const [maintenanceRating, setMaintenanceRating] = useState(5);
  const [valueRating, setValueRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isVerifiedExperience, setIsVerifiedExperience] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const calculateOverall = () => {
    return Number(((conditionRating + accuracyRating + maintenanceRating + valueRating) / 4).toFixed(1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim().length < 15) {
      setError('Please provide at least 15 characters of constructive feedback.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const res = await submitPropertyReview({
        propertyId: property.id,
        conditionRating,
        accuracyRating,
        maintenanceRating,
        valueRating,
        overallRating: calculateOverall(),
        comment,
        user,
        isVerifiedExperience
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

  const renderStars = (rating, setRating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="p-1 hover:scale-110 transition text-amber-400"
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating ? 'fill-amber-400 text-amber-400' : 'text-estate-200'
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-black text-gold ml-2">{rating}.0 / 5.0</span>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Submit Verified Property Review"
      subtitle={`Reviewing: ${property.title}`}
      maxWidth="max-w-2xl"
    >
      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 bg-emerald-950/80 text-emerald-300 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white font-display">Review Published</h4>
          <p className="text-xs text-estate-400 max-w-sm mx-auto leading-relaxed">
            Your evaluation has been recorded and will assist fellow home-seekers in making informed rental and purchasing decisions.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="w-full max-w-xs py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep text-xs font-bold rounded-xl shadow-gold transition"
          >
            Return to Property Page
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Overall score indicator */}
          <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-estate-500 block">Computed Overall Score</span>
              <span className="text-xs text-estate-600">Average of 4 criteria below</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald font-display">{calculateOverall()}</span>
              <span className="text-xs text-estate-400"> / 5.0</span>
            </div>
          </div>

          {/* Multi-criteria rating grid */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-navy-surface rounded-xl border border-navy-border gap-2">
              <div>
                <span className="text-xs font-bold text-white block">Physical Condition</span>
                <span className="text-[11px] text-estate-400">Finishing, plumbing, tiling and electrical state</span>
              </div>
              {renderStars(conditionRating, setConditionRating)}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-navy-surface rounded-xl border border-navy-border gap-2">
              <div>
                <span className="text-xs font-bold text-white block">Listing Accuracy</span>
                <span className="text-[11px] text-estate-400">True representation vs photos and stated amenities</span>
              </div>
              {renderStars(accuracyRating, setAccuracyRating)}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-navy-surface rounded-xl border border-navy-border gap-2">
              <div>
                <span className="text-xs font-bold text-white block">Maintenance & Landlord Responsiveness</span>
                <span className="text-[11px] text-estate-400">Speed of repairs and estate service delivery</span>
              </div>
              {renderStars(maintenanceRating, setMaintenanceRating)}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-navy-surface rounded-xl border border-navy-border gap-2">
              <div>
                <span className="text-xs font-bold text-white block">Value for Money</span>
                <span className="text-[11px] text-estate-400">Fairness of rent and service charge ratio</span>
              </div>
              {renderStars(valueRating, setValueRating)}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold text-white mb-1">
              Your Experience & Honest Feedback *
            </label>
            <textarea
              required
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details regarding borehole water cleanliness, backup power schedule, landlord responsiveness, and inspection experience..."
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs outline-none bg-navy-deep text-white"
            />
          </div>

          {/* Verification Checkbox */}
          <div className="pt-2 border-t border-navy-border">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-estate-300">
              <input
                type="checkbox"
                checked={isVerifiedExperience}
                onChange={(e) => setIsVerifiedExperience(e.target.checked)}
                className="mt-0.5 rounded text-gold focus:ring-gold"
              />
              <span>
                <strong className="text-gold">Verified Experience Badge:</strong> I confirm I have physically inspected or resided in this property under a valid lease or tour pass.
              </span>
            </label>
          </div>

          <p className="text-[11px] text-estate-400 italic">
            * Reviews reflect subjective opinions of users and do not constitute warranties by VettedHomes.
          </p>

          {/* Footer Actions */}
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
                  <span>Publishing...</span>
                </>
              ) : (
                <span>Publish Review</span>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

