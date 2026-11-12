import React, { useState } from 'react';
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
  CheckCircle2, 
  Clock, 
  MapPin, 
  DollarSign,
  ShieldCheck,
  AlertCircle
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
import { DEMO_PROPERTIES, DEMO_NEIGHBOURHOODS, PROPERTY_TYPES } from '../data/demoData';
import { Modal } from '../components/common/Modal';

export function LandlordAgentDashboardPage() {
  const { user } = useAuth();

  const [myListings, setMyListings] = useState([
    {
      id: 'my-1',
      title: 'Contemporary 4-Bedroom Semi-Detached Duplex with BQ',
      category: 'Duplexes',
      price: '₦9,500,000 / yr',
      status: 'Active',
      location: 'Lekki Phase 1, Lagos',
      views: 540,
      enquiries: 18,
      inspections: 6,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'my-2',
      title: 'Smart Executive 2-Bedroom Serviced Apartment with Pool & Gym',
      category: 'Apartments and flats',
      price: '₦4,500,000 / yr',
      status: 'Active',
      location: 'Yaba, Lagos',
      views: 395,
      enquiries: 12,
      inspections: 4,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Duplexes');
  const [newPrice, setNewPrice] = useState('');
  const [newTransactionType, setNewTransactionType] = useState('rent');
  const [newNeighbourhood, setNewNeighbourhood] = useState('lekki-phase-1');
  const [newBedrooms, setNewBedrooms] = useState('3');
  const [newBathrooms, setNewBathrooms] = useState('3');
  const [newDescription, setNewDescription] = useState('');
  const [newAmenities, setNewAmenities] = useState('24/7 Gated Security, Treated Water');
  const [notification, setNotification] = useState('');

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

  const handleCreateListing = (e) => {
    e.preventDefault();
    const created = {
      id: `my-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      price: `₦${Number(newPrice).toLocaleString('en-NG')} / yr`,
      status: 'Active (Verified)',
      location: DEMO_NEIGHBOURHOODS.find(n => n.id === newNeighbourhood)?.name || 'Lekki Phase 1',
      views: 1,
      enquiries: 0,
      inspections: 0,
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
    };

    setMyListings(prev => [created, ...prev]);
    setIsCreateModalOpen(false);
    setNotification('Property listing created and published to EstateLens marketplace!');
    setTimeout(() => setNotification(''), 4000);
  };

  const toggleListingStatus = (id) => {
    setMyListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Active' ? 'Paused' : 'Active' };
      }
      return item;
    }));
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

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-3 bg-emerald hover:bg-emerald-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Listing</span>
        </button>
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
            <h3 className="text-base font-bold text-navy font-display">Your Property Listings</h3>
            <p className="text-xs text-estate-500">Manage pricing, status, and inspection availability.</p>
          </div>
        </div>

        <div className="divide-y divide-estate-100">
          {myListings.map(listing => (
            <div key={listing.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-sand-50/50 transition">
              
              <div className="flex items-center gap-4">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      listing.status.includes('Active')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-estate-200 text-estate-700'
                    }`}>
                      {listing.status}
                    </span>
                    <span className="text-xs text-estate-500">{listing.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-navy font-display line-clamp-1">
                    {listing.title}
                  </h4>
                  <p className="text-xs text-estate-500">{listing.location} • <strong className="text-navy">{listing.price}</strong></p>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center gap-6 justify-between md:justify-end text-xs">
                <div className="text-center">
                  <span className="text-estate-400 block text-[10px]">Views</span>
                  <span className="font-bold text-navy">{listing.views}</span>
                </div>
                <div className="text-center">
                  <span className="text-estate-400 block text-[10px]">Enquiries</span>
                  <span className="font-bold text-navy">{listing.enquiries}</span>
                </div>
                <div className="text-center">
                  <span className="text-estate-400 block text-[10px]">Inspections</span>
                  <span className="font-bold text-navy">{listing.inspections}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleListingStatus(listing.id)}
                    className="p-2 border border-estate-200 rounded-lg text-estate-600 hover:bg-estate-100 transition"
                    title={listing.status === 'Active' ? 'Pause Listing' : 'Activate Listing'}
                  >
                    <PauseCircle className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Editing listing details...')}
                    className="p-2 border border-estate-200 rounded-lg text-estate-600 hover:bg-estate-100 transition"
                    title="Edit Listing"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* CREATE NEW LISTING MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Property Listing"
        subtitle="List your property with transparent neighbourhood context."
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
              <label className="block text-xs font-bold text-estate-800 mb-1">Annual Price (₦) *</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-estate-800 mb-1">Neighbourhood *</label>
              <select
                value={newNeighbourhood}
                onChange={(e) => setNewNeighbourhood(e.target.value)}
                className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs bg-white outline-none"
              >
                {DEMO_NEIGHBOURHOODS.map(n => (
                  <option key={n.id} value={n.id}>{n.name}</option>
                ))}
              </select>
            </div>
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
          </div>

          <div>
            <label className="block text-xs font-bold text-estate-800 mb-1">Key Features / Amenities (comma separated)</label>
            <input
              type="text"
              value={newAmenities}
              onChange={(e) => setNewAmenities(e.target.value)}
              placeholder="e.g. 24/7 Gated Security, Treated Water, Swimming Pool"
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
              placeholder="Describe interior finishes, ceiling height, transformer stability, and compound access..."
              className="w-full px-3 py-2 border border-estate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald"
            />
          </div>

          <div className="p-3 bg-sand-50 rounded-xl text-xs text-estate-600 border border-sand-200">
            <span className="font-bold text-navy block mb-0.5">Privacy Notice:</span>
            Exact residential coordinates will be approximate on the public map to protect occupant safety.
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
              className="px-5 py-2 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

