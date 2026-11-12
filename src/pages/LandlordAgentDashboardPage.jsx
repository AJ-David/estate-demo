import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  PlusCircle, 
  Eye, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Edit, 
  PauseCircle, 
  PlayCircle,
  CheckCircle2, 
  Clock, 
  MapPin, 
  DollarSign,
  ShieldCheck,
  AlertCircle,
  Trash2,
  Upload,
  Image as ImageIcon,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { DEMO_NEIGHBOURHOODS, PROPERTY_TYPES } from '../data/demoData';
import { Modal } from '../components/common/Modal';
import { EditPropertyModal } from '../components/property/EditPropertyModal';
import { 
  fetchProperties, 
  createProperty, 
  deleteProperty, 
  seedPropertiesToSupabase 
} from '../services/propertyService';
import { uploadMultiplePropertyImages } from '../services/storageService';

export function LandlordAgentDashboardPage() {
  const { user, isConfigured } = useAuth();

  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // New Listing Form Fields
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Duplexes');
  const [newPrice, setNewPrice] = useState('');
  const [newTransactionType, setNewTransactionType] = useState('rent');
  const [newNeighbourhood, setNewNeighbourhood] = useState('lekki-phase-1');
  const [newAddress, setNewAddress] = useState('');
  const [newBedrooms, setNewBedrooms] = useState('3');
  const [newBathrooms, setNewBathrooms] = useState('3');
  const [newSizeSqm, setNewSizeSqm] = useState('280');
  const [newFurnishing, setNewFurnishing] = useState('Semi-Furnished');
  const [newDescription, setNewDescription] = useState('');
  const [newAmenities, setNewAmenities] = useState('24/7 Gated Security, Treated Water System, Flood-Free Street');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Load properties
  const loadListings = async () => {
    setLoading(true);
    const properties = await fetchProperties();
    setMyListings(properties);
    setLoading(false);
  };

  useEffect(() => {
    loadListings();
  }, []);

  // Performance data for Recharts
  const performanceData = [
    { day: 'Mon', views: 82, enquiries: 4 },
    { day: 'Tue', views: 110, enquiries: 7 },
    { day: 'Wed', views: 95, enquiries: 5 },
    { day: 'Thu', views: 140, enquiries: 9 },
    { day: 'Fri', views: 180, enquiries: 12 },
    { day: 'Sat', views: 245, enquiries: 19 },
    { day: 'Sun', views: 190, enquiries: 14 }
  ];

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map(f => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Upload images if provided
      let finalImages = [];
      if (imageFiles.length > 0) {
        finalImages = await uploadMultiplePropertyImages(imageFiles);
      } else if (imageUrlInput.trim()) {
        finalImages = imageUrlInput.split(',').map(s => s.trim()).filter(Boolean);
      }

      if (finalImages.length === 0) {
        finalImages = ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];
      }

      const amenitiesArray = newAmenities.split(',').map(s => s.trim()).filter(Boolean);

      const created = await createProperty({
        title: newTitle,
        description: newDescription,
        category: newCategory,
        price: Number(newPrice),
        transactionType: newTransactionType,
        neighbourhoodId: newNeighbourhood,
        locationAddress: newAddress || 'Off Admiralty Way, Lekki',
        bedrooms: Number(newBedrooms),
        bathrooms: Number(newBathrooms),
        sizeSqm: Number(newSizeSqm),
        furnishingStatus: newFurnishing,
        amenities: amenitiesArray,
        images: finalImages
      }, user);

      setMyListings(prev => [created, ...prev]);
      setIsCreateModalOpen(false);
      resetForm();
      setNotification('Property listing created and published to EstateLens marketplace!');
      setTimeout(() => setNotification(''), 4000);
    } catch (err) {
      alert('Error creating listing: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewTitle('');
    setNewPrice('');
    setNewDescription('');
    setNewAddress('');
    setImageFiles([]);
    setImagePreviews([]);
    setImageUrlInput('');
  };

  const toggleListingStatus = (id) => {
    setMyListings(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.availabilityStatus === 'Available Now' ? 'Paused' : 'Available Now';
        return { ...item, availabilityStatus: nextStatus };
      }
      return item;
    }));
    setNotification('Property status updated.');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDeleteListing = async (id) => {
    if (window.confirm('Are you sure you want to remove this property listing?')) {
      await deleteProperty(id, user);
      setMyListings(prev => prev.filter(p => p.id !== id));
      setNotification('Listing removed from marketplace.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleSeedSupabase = async () => {
    setIsSeeding(true);
    const res = await seedPropertiesToSupabase(user);
    setIsSeeding(false);
    if (res.success) {
      setNotification('Sample Nigerian properties seeded to your live Supabase database!');
      loadListings();
      setTimeout(() => setNotification(''), 4000);
    } else {
      alert('Seeding note: ' + (res.error || 'Ensure you are signed in.'));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-estate-200 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-navy font-display">
              Landlord & Real Estate Agent Suite
            </h1>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Verified Partner
            </span>
          </div>
          <p className="text-xs text-estate-500 mt-1">
            Manage your property portfolio, inspection schedules, and listing performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isConfigured && (
            <button
              type="button"
              disabled={isSeeding}
              onClick={handleSeedSupabase}
              className="px-4 py-2.5 bg-sand-100 hover:bg-sand-200 border border-sand-200 text-navy rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              title="Populate Supabase tables with sample verified listings"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald" />
              <span>{isSeeding ? 'Seeding...' : 'Seed Sample Homes to DB'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-emerald hover:bg-emerald-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Listing</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle space-y-1">
          <span className="text-xs text-estate-500">Active Listings</span>
          <p className="text-2xl font-black text-navy font-display">{myListings.length}</p>
          <p className="text-[11px] text-emerald-700 font-semibold">100% Verified status</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle space-y-1">
          <span className="text-xs text-estate-500">Total Views This Week</span>
          <p className="text-2xl font-black text-navy font-display">1,042</p>
          <p className="text-[11px] text-emerald-700 font-semibold">↑ 18% vs last week</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle space-y-1">
          <span className="text-xs text-estate-500">Pending Enquiries</span>
          <p className="text-2xl font-black text-navy font-display">30</p>
          <p className="text-[11px] text-amber-600 font-semibold">Avg reply time: 24 mins</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle space-y-1">
          <span className="text-xs text-estate-500">Scheduled Inspections</span>
          <p className="text-2xl font-black text-navy font-display">10</p>
          <p className="text-[11px] text-emerald-700 font-semibold">Gate passes generated</p>
        </div>
      </div>

      {/* Analytics Chart with Recharts */}
      <div className="bg-white p-6 rounded-3xl border border-estate-200 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-navy font-display">
              Listing Impressions & Enquiry Dynamics
            </h3>
            <p className="text-xs text-estate-500">Daily breakdown of unique user views across your portfolio.</p>
          </div>
          <span className="text-xs text-estate-500 font-semibold">Last 7 Days</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0E1A2B', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                itemStyle={{ color: '#34D399' }}
              />
              <Bar dataKey="views" name="Listing Views" fill="#0E1A2B" radius={[6, 6, 0, 0]} />
              <Bar dataKey="enquiries" name="Enquiries" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Property Portfolio Table / Cards */}
      <div className="bg-white rounded-3xl border border-estate-200 shadow-subtle overflow-hidden">
        <div className="p-6 border-b border-estate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-navy font-display">Your Property Listings ({myListings.length})</h3>
            <p className="text-xs text-estate-500">Manage pricing, status, and inspection availability.</p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-estate-500">
            <div className="w-8 h-8 border-4 border-estate-200 border-t-emerald rounded-full animate-spin mx-auto mb-2"></div>
            <span>Loading your property portfolio...</span>
          </div>
        ) : myListings.length === 0 ? (
          <div className="p-12 text-center text-xs text-estate-500">
            <Building2 className="w-10 h-10 text-estate-300 mx-auto mb-2" />
            <p className="font-bold text-navy text-sm">No properties in your portfolio yet</p>
            <p className="mt-1">Click "Create New Listing" to publish your first property.</p>
          </div>
        ) : (
          <div className="divide-y divide-estate-100">
            {myListings.map(listing => (
              <div key={listing.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-sand-50/50 transition">
                
                <div className="flex items-center gap-4">
                  <img
                    src={listing.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                    alt={listing.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        listing.availabilityStatus === 'Available Now'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-estate-200 text-estate-700'
                      }`}>
                        {listing.availabilityStatus || 'Active'}
                      </span>
                      <span className="text-xs text-estate-500">{listing.category}</span>
                      <span className="text-xs text-emerald font-semibold uppercase">{listing.transactionType}</span>
                    </div>
                    <h4 className="text-sm font-bold text-navy font-display line-clamp-1">
                      <Link to={`/properties/${listing.id}`} className="hover:text-emerald">
                        {listing.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-estate-500">
                      {listing.location?.neighbourhoodName || 'Lagos'} • <strong className="text-navy">₦{Number(listing.price).toLocaleString()} / {listing.pricePeriod}</strong>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 justify-between md:justify-end text-xs">
                  <Link
                    to={`/properties/${listing.id}`}
                    className="p-2 border border-estate-200 rounded-lg text-estate-600 hover:bg-estate-100 transition"
                    title="View Property Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleListingStatus(listing.id)}
                    className="p-2 border border-estate-200 rounded-lg text-estate-600 hover:bg-estate-100 transition"
                    title={listing.availabilityStatus === 'Available Now' ? 'Pause Listing' : 'Activate Listing'}
                  >
                    {listing.availabilityStatus === 'Available Now' ? (
                      <PauseCircle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <PlayCircle className="w-4 h-4 text-emerald" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProperty(listing)}
                    className="p-2 border border-estate-200 rounded-lg text-estate-600 hover:bg-estate-100 transition"
                    title="Edit Listing"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteListing(listing.id)}
                    className="p-2 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE NEW LISTING MODAL WITH MULTI-IMAGE UPLOAD */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Property Listing"
        subtitle="Publish your property with neighbourhood ground-truth context."
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleCreateListing} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Property Title *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Contemporary 4-Bedroom Semi-Detached Duplex with BQ"
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Category *</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs bg-white outline-none"
              >
                {PROPERTY_TYPES.filter(t => t !== 'All Types').map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Transaction *</label>
              <select
                value={newTransactionType}
                onChange={(e) => setNewTransactionType(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs bg-white outline-none"
              >
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
                <option value="short-let">Short-Let</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">
                {newTransactionType === 'short-let' ? 'Price per Night (₦) *' : newTransactionType === 'sale' ? 'Sale Price (₦) *' : 'Annual Rent (₦) *'}
              </label>
              <input
                type="number"
                required
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="e.g. 7500000"
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Neighbourhood *</label>
              <select
                value={newNeighbourhood}
                onChange={(e) => setNewNeighbourhood(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs bg-white outline-none"
              >
                {DEMO_NEIGHBOURHOODS.map(n => (
                  <option key={n.id} value={n.id}>{n.name} ({n.city})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Street / Enclave Address *</label>
              <input
                type="text"
                required
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="e.g. Off Admiralty Way, Lekki Phase 1"
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Bedrooms</label>
              <input
                type="number"
                value={newBedrooms}
                onChange={(e) => setNewBedrooms(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Bathrooms</label>
              <input
                type="number"
                value={newBathrooms}
                onChange={(e) => setNewBathrooms(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Size (m²)</label>
              <input
                type="number"
                value={newSizeSqm}
                onChange={(e) => setNewSizeSqm(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Furnishing</label>
              <select
                value={newFurnishing}
                onChange={(e) => setNewFurnishing(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs bg-white outline-none"
              >
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>

          {/* Image Upload Component */}
          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">
              Property Photographs (Multi-image upload supported)
            </label>
            <div className="border-2 border-dashed border-estate-200 rounded-2xl p-4 text-center hover:bg-sand-50 transition cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-6 h-6 text-emerald mx-auto mb-1" />
              <p className="text-xs font-semibold text-navy">Click or drag images to upload</p>
              <p className="text-[10px] text-estate-400">JPEG, PNG, WebP up to 10MB each</p>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {imagePreviews.map((src, i) => (
                  <img key={i} src={src} alt="Preview" className="w-16 h-16 rounded-xl object-cover ring-1 ring-emerald-300" />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">Or Paste Image URLs (comma separated)</label>
            <input
              type="text"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/..., https://..."
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">Features & Amenities (comma separated)</label>
            <input
              type="text"
              value={newAmenities}
              onChange={(e) => setNewAmenities(e.target.value)}
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">Property Description *</label>
            <textarea
              required
              rows="3"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe layout, marble kitchen counters, power inverter, and access security..."
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-estate-100">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 border border-estate-200 text-xs font-semibold rounded-xl text-estate-700 hover:bg-estate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-emerald hover:bg-emerald-dark text-white text-xs font-bold rounded-xl transition disabled:opacity-70 flex items-center gap-1.5"
            >
              {isSubmitting ? 'Uploading & Creating...' : 'Publish to Marketplace'}
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <EditPropertyModal
        isOpen={Boolean(editingProperty)}
        onClose={() => setEditingProperty(null)}
        property={editingProperty}
        onUpdated={(updated) => {
          setMyListings(prev => prev.map(p => p.id === updated.id ? updated : p));
        }}
      />

    </div>
  );
}
