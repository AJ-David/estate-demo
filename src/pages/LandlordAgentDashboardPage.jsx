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
  ExternalLink,
  ArrowRightLeft,
  Copy,
  Check,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell
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
import { getUserInspections } from '../services/enquiryService';
import { fetchConversations } from '../services/messageService';
import { ConversationChatDrawer } from '../components/communication/ConversationChatDrawer';

export function LandlordAgentDashboardPage() {
  const { user, isConfigured } = useAuth();

  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio', 'inspections', 'conversations', 'analytics'
  const [myListings, setMyListings] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [copiedGateCode, setCopiedGateCode] = useState(null);

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

  // Load properties, inspections, and conversations
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [properties, inspList, convList] = await Promise.all([
        fetchProperties(),
        getUserInspections(user?.id),
        fetchConversations(user?.id)
      ]);
      setMyListings(properties);
      setInspections(inspList);
      setConversations(convList);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user?.id]);

  const handleApproveInspection = (inspId) => {
    const code = `INS-${Math.floor(100000 + Math.random() * 900000)}`;
    setInspections(prev => prev.map(insp => {
      if (insp.id === inspId) {
        return {
          ...insp,
          status: 'Inspection Confirmed',
          gateCode: insp.gateCode || code
        };
      }
      return insp;
    }));
    setNotification('Inspection approved and Security Gate Pass dispatched to prospective tenant!');
    setTimeout(() => setNotification(''), 4500);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedGateCode(code);
    setTimeout(() => setCopiedGateCode(null), 2500);
  };

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
      setNotification('Property listing created and published to VettedHomes marketplace!');
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-navy-card rounded-3xl border border-navy-border shadow-premium">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white font-display">
              Landlord & Real Estate Agent Suite
            </h1>
            <span className="bg-navy-surface text-gold text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gold/40">
              Verified Partner
            </span>
          </div>
          <p className="text-xs text-estate-400 mt-1">
            Manage your property portfolio, inspection schedules, and listing performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/dashboard/buyer"
            className="px-3.5 py-2.5 bg-navy-surface hover:bg-navy-border border border-navy-border text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-gold" />
            <span>Switch to Tenant / Buyer View</span>
          </Link>

          {isConfigured && (
            <button
              type="button"
              disabled={isSeeding}
              onClick={handleSeedSupabase}
              className="px-4 py-2.5 bg-navy-surface hover:bg-navy-border border border-navy-border text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              title="Populate Supabase tables with sample verified listings"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{isSeeding ? 'Seeding...' : 'Seed Sample Homes to DB'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-black rounded-xl text-xs sm:text-sm shadow-gold hover:brightness-110 transition flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-navy-deep" />
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
        <div className="bg-navy-card p-5 rounded-2xl border border-navy-border shadow-premium space-y-1">
          <span className="text-xs text-estate-400">Active Listings</span>
          <p className="text-2xl font-black text-white font-display">{myListings.length}</p>
          <p className="text-[11px] text-gold font-semibold">100% Verified status</p>
        </div>

        <div className="bg-navy-card p-5 rounded-2xl border border-navy-border shadow-premium space-y-1">
          <span className="text-xs text-estate-400">Total Views This Week</span>
          <p className="text-2xl font-black text-white font-display">1,042</p>
          <p className="text-[11px] text-emerald-400 font-semibold">↑ 18% vs last week</p>
        </div>

        <div className="bg-navy-card p-5 rounded-2xl border border-navy-border shadow-premium space-y-1">
          <span className="text-xs text-estate-400">Client Conversations</span>
          <p className="text-2xl font-black text-white font-display">{conversations.length}</p>
          <p className="text-[11px] text-amber-400 font-semibold">Live two-way messaging</p>
        </div>

        <div className="bg-navy-card p-5 rounded-2xl border border-navy-border shadow-premium space-y-1">
          <span className="text-xs text-estate-400">Scheduled Inspections</span>
          <p className="text-2xl font-black text-white font-display">{inspections.length}</p>
          <p className="text-[11px] text-gold font-semibold">Gate passes managed</p>
        </div>
      </div>

      {/* Main Suite Tabs */}
      <div className="flex items-center gap-2 border-b border-navy-border pb-3 overflow-x-auto">
        {[
          { id: 'portfolio', label: 'Property Portfolio', count: myListings.length, icon: Building2 },
          { id: 'inspections', label: 'Tours & Security Gate Passes', count: inspections.length, icon: Calendar },
          { id: 'conversations', label: 'Client Inquiries & Chat', count: conversations.length, icon: MessageSquare },
          { id: 'analytics', label: 'Performance Analytics', count: null, icon: TrendingUp }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gold text-navy-deep font-black shadow-gold'
                  : 'text-estate-400 hover:text-white hover:bg-navy-surface border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-navy-deep text-gold' : 'bg-navy-surface text-estate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PORTFOLIO LISTINGS */}
      {activeTab === 'portfolio' && (
        <div className="bg-navy-card rounded-3xl border border-navy-border shadow-premium overflow-hidden">
          <div className="p-6 border-b border-navy-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Your Property Listings ({myListings.length})</h3>
              <p className="text-xs text-estate-400">Manage pricing, status, and inspection availability.</p>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-estate-400">
              <div className="w-8 h-8 border-4 border-navy-border border-t-gold rounded-full animate-spin mx-auto mb-2"></div>
              <span>Loading your property portfolio...</span>
            </div>
          ) : myListings.length === 0 ? (
            <div className="p-12 text-center text-xs text-estate-400">
              <Building2 className="w-10 h-10 text-estate-500 mx-auto mb-2" />
              <p className="font-bold text-white text-sm">No properties in your portfolio yet</p>
              <p className="mt-1">Click "Create New Listing" to publish your first property.</p>
            </div>
          ) : (
            <div className="divide-y divide-navy-border">
              {myListings.map(listing => (
                <div key={listing.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-navy-surface/50 transition">
                  
                  <div className="flex items-center gap-4">
                    <img
                      src={listing.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                      alt={listing.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-gold/20"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          listing.availabilityStatus === 'Available Now'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                            : 'bg-navy-surface text-estate-300 border border-navy-border'
                        }`}>
                          {listing.availabilityStatus || 'Active'}
                        </span>
                        <span className="text-xs text-estate-400">{listing.category}</span>
                        <span className="text-xs text-gold font-semibold uppercase">{listing.transactionType}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display line-clamp-1">
                        <Link to={`/properties/${listing.id}`} className="hover:text-gold transition">
                          {listing.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-estate-400">
                        {listing.location?.neighbourhoodName || 'Lagos'} • <strong className="text-gold">₦{Number(listing.price).toLocaleString()} / {listing.pricePeriod}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 justify-between md:justify-end text-xs">
                    <Link
                      to={`/properties/${listing.id}`}
                      className="p-2 border border-navy-border rounded-lg text-estate-300 hover:bg-navy-surface hover:text-white transition"
                      title="View Property Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleListingStatus(listing.id)}
                      className="p-2 border border-navy-border rounded-lg text-estate-300 hover:bg-navy-surface hover:text-white transition"
                      title={listing.availabilityStatus === 'Available Now' ? 'Pause Listing' : 'Activate Listing'}
                    >
                      {listing.availabilityStatus === 'Available Now' ? (
                        <PauseCircle className="w-4 h-4 text-amber-400" />
                      ) : (
                        <PlayCircle className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProperty(listing)}
                      className="p-2 border border-navy-border rounded-lg text-estate-300 hover:bg-navy-surface hover:text-white transition"
                      title="Edit Listing"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteListing(listing.id)}
                      className="p-2 border border-rose-500/30 text-rose-400 rounded-lg hover:bg-rose-950/30 transition"
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
      )}

      {/* TAB 2: TOURS & SECURITY GATE PASSES */}
      {activeTab === 'inspections' && (
        <div className="bg-navy-card rounded-3xl border border-navy-border shadow-premium p-6 space-y-6">
          <div className="border-b border-navy-border pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Scheduled Physical Inspections</h3>
              <p className="text-xs text-estate-400">Approve tour windows and dispatch security gate pass codes to verified visitors.</p>
            </div>
            <span className="text-xs text-gold font-semibold">{inspections.length} Bookings</span>
          </div>

          <div className="space-y-4">
            {inspections.length === 0 ? (
              <p className="text-xs text-estate-400 italic py-8 text-center">No inspection requests pending.</p>
            ) : (
              inspections.map(insp => (
                <div key={insp.id} className="p-5 rounded-2xl bg-navy-surface border border-navy-border space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-border pb-3">
                    <div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        insp.status === 'Inspection Confirmed' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                      }`}>
                        {insp.status || 'Pending Approval'}
                      </span>
                      <h4 className="text-sm font-bold text-white font-display mt-1">{insp.propertyTitle}</h4>
                    </div>

                    <div className="text-left sm:text-right text-xs">
                      <span className="text-estate-400 text-[11px] block">Requested Time</span>
                      <strong className="text-gold">{insp.inspectionDate}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-estate-400 block text-[11px]">Prospective Tenant / Buyer:</span>
                      <span className="font-bold text-white">{insp.fullName || 'Registered User'}</span> <span className="text-estate-400">({insp.phone || 'Contact via Portal'})</span>
                    </div>

                    {insp.gateCode ? (
                      <div className="flex items-center gap-2 p-2 bg-navy-card rounded-xl border border-gold/30">
                        <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                        <span className="font-mono font-black text-gold">{insp.gateCode}</span>
                        <button
                          type="button"
                          onClick={() => copyCode(insp.gateCode)}
                          className="px-2 py-1 bg-navy-surface rounded-lg border border-gold/30 text-[10px] font-bold text-gold hover:bg-navy-border transition"
                        >
                          {copiedGateCode === insp.gateCode ? 'Copied' : 'Copy Code'}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApproveInspection(insp.id)}
                        className="px-4 py-2 bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-gold hover:brightness-110"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Approve & Dispatch Gate Pass</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT CONVERSATIONS */}
      {activeTab === 'conversations' && (
        <div className="bg-navy-card rounded-3xl border border-navy-border shadow-premium p-6 space-y-4">
          <div className="border-b border-navy-border pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Client Enquiries & Conversations</h3>
              <p className="text-xs text-estate-400">Live two-way portal messages from prospective tenants and buyers.</p>
            </div>
            <span className="text-xs text-gold font-semibold">{conversations.length} Active Threads</span>
          </div>

          <div className="space-y-3">
            {conversations.map(conv => (
              <div 
                key={conv.id}
                className="p-4 bg-navy-surface rounded-2xl border border-navy-border hover:border-gold/50 transition space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={conv.counterpart?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={conv.counterpart?.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-gold/40"
                    />
                    <div>
                      <span className="font-bold text-white block text-sm">{conv.counterpart?.name}</span>
                      <span className="text-estate-400 text-[11px]">{conv.propertyTitle}</span>
                    </div>
                  </div>
                  <span className="text-estate-400 text-[10px]">{conv.lastMessageTime}</span>
                </div>

                <p className="text-estate-300 bg-navy-card p-3 rounded-xl border border-navy-border leading-relaxed italic">
                  "{conv.lastMessage}"
                </p>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveConversation(conv);
                      setIsChatOpen(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-gold"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-navy-deep" />
                    <span>Open Live Message Thread</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RECHARTS PERFORMANCE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-navy-card p-6 rounded-3xl border border-navy-border shadow-premium space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Listing Impressions & Enquiry Dynamics
                </h3>
                <p className="text-xs text-estate-400">Daily breakdown of unique user views across your portfolio.</p>
              </div>
              <span className="text-xs text-gold font-semibold">Last 7 Days</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#232938" />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#12151F', borderRadius: '12px', border: '1px solid #D4AF37', color: '#fff', fontSize: '12px', boxShadow: '0 0 15px rgba(212, 175, 55, 0.25)' }}
                    itemStyle={{ color: '#DFC37F' }}
                  />
                  <Bar dataKey="views" name="Listing Views" fill="#D4AF37" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="enquiries" name="Enquiries" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-navy-card rounded-3xl border border-navy-border shadow-premium space-y-1">
              <span className="text-estate-400 block">Inquiry to Inspection Conversion</span>
              <p className="text-2xl font-black text-white font-display">33.3%</p>
              <p className="text-gold font-semibold">Exceeds Lagos benchmark (22%)</p>
            </div>

            <div className="p-5 bg-navy-card rounded-3xl border border-navy-border shadow-premium space-y-1">
              <span className="text-estate-400 block">Tour to Tenancy Deal Rate</span>
              <p className="text-2xl font-black text-white font-display">45.0%</p>
              <p className="text-emerald-400 font-semibold">High interest in verified duplexes</p>
            </div>

            <div className="p-5 bg-navy-card rounded-3xl border border-navy-border shadow-premium space-y-1">
              <span className="text-estate-400 block">Average Days on Market</span>
              <p className="text-2xl font-black text-white font-display">14 Days</p>
              <p className="text-gold font-semibold">2.4x faster than unverified platforms</p>
            </div>
          </div>
        </div>
      )}

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
              <Upload className="w-6 h-6 text-gold mx-auto mb-1" />
              <p className="text-xs font-semibold text-white">Click or drag images to upload</p>
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

      {/* TWO-WAY LIVE CHAT DRAWER */}
      <ConversationChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        conversation={activeConversation}
      />

    </div>
  );
}
