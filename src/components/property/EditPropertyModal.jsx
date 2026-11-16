import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { PROPERTY_TYPES } from '../../data/demoData';
import { CheckCircle2 } from 'lucide-react';
import { updateProperty } from '../../services/propertyService';
import { useAuth } from '../../context/AuthContext';

export function EditPropertyModal({ isOpen, onClose, property, onUpdated }) {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('');
  const [furnishingStatus, setFurnishingStatus] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('3');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (property) {
      setTitle(property.title || '');
      setPrice(property.price ? String(property.price).replace(/[^0-9]/g, '') : '');
      setCategory(property.category || 'Duplexes');
      setAvailabilityStatus(property.availabilityStatus || 'Available Now');
      setFurnishingStatus(property.furnishingStatus || 'Semi-Furnished');
      setBedrooms(String(property.bedrooms || 3));
      setBathrooms(String(property.bathrooms || 3));
      setDescription(property.description || '');
      setMsg('');
    }
  }, [property]);

  if (!property) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updates = {
      title,
      price: Number(price),
      category,
      availabilityStatus,
      furnishingStatus,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      description
    };

    await updateProperty(property.id, updates, user);
    setLoading(false);
    setMsg('Listing updated successfully!');
    if (onUpdated) onUpdated({ ...property, ...updates });
    setTimeout(() => {
      setMsg('');
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Property Listing"
      subtitle={`Updating: ${property.title}`}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {msg && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{msg}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-100 mb-1">
            Property Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-100 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
            >
              {PROPERTY_TYPES.filter(t => t !== 'All Types').map(t => (
                <option key={t} value={t} className="bg-navy-deep text-white">{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-100 mb-1">Price (₦) *</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-100 mb-1">Availability</label>
            <select
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="Available Now" className="bg-navy-deep text-white">Available Now</option>
              <option value="Under Offer" className="bg-navy-deep text-white">Under Offer</option>
              <option value="Leased / Sold" className="bg-navy-deep text-white">Leased / Sold</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-100 mb-1">Furnishing</label>
            <select
              value={furnishingStatus}
              onChange={(e) => setFurnishingStatus(e.target.value)}
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="Furnished" className="bg-navy-deep text-white">Furnished</option>
              <option value="Semi-Furnished" className="bg-navy-deep text-white">Semi-Furnished</option>
              <option value="Unfurnished" className="bg-navy-deep text-white">Unfurnished</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-100 mb-1">Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-100 mb-1">Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-100 mb-1">Property Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-navy-border rounded-xl text-xs text-white bg-navy-surface outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-navy-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-navy-border text-xs font-semibold rounded-xl text-slate-200 hover:bg-navy-surface hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep text-xs font-black rounded-xl shadow-gold transition disabled:opacity-70 tracking-wide"
          >
            {loading ? 'Saving Changes...' : 'Save Updates'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
