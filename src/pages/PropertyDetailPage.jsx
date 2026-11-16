import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Share2, 
  CheckCircle2, 
  EyeOff, 
  Zap, 
  Droplet, 
  CloudRain, 
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Star,
  Building,
  Video
} from 'lucide-react';
import { DEMO_NEIGHBOURHOODS, DEMO_PROPERTY_REVIEWS } from '../data/demoData';
import { formatPriceDisplay } from '../utils/formatters';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { Badge } from '../components/common/Badge';
import { InspectionModal } from '../components/property/InspectionModal';
import { EnquiryModal } from '../components/property/EnquiryModal';
import { PropertyMapView } from '../components/property/PropertyMapView';
import { PropertyReviewModal } from '../components/property/PropertyReviewModal';
import { ConversationChatDrawer } from '../components/communication/ConversationChatDrawer';
import { fetchPropertyById } from '../services/propertyService';
import { fetchPropertyReviews } from '../services/reviewService';
import { startPropertyConversation } from '../services/messageService';
import { useAuth } from '../context/AuthContext';

export function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSavedProperties();

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      fetchPropertyById(id),
      fetchPropertyReviews(id)
    ]).then(([propData, reviewsData]) => {
      if (isMounted) {
        setProperty(propData);
        setReviews(reviewsData);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleOpenChat = async () => {
    if (!property) return;
    const res = await startPropertyConversation({
      propertyId: property.id,
      propertyTitle: property.title,
      agentName: property.agent?.name,
      agentAvatar: property.agent?.avatar,
      agentPhone: property.agent?.phone,
      user
    });

    if (res.success) {
      const stored = JSON.parse(localStorage.getItem('vettedhomes_conversations') || localStorage.getItem('estatelens_conversations') || '[]');
      const targetConv = stored.find(c => c.id === res.conversationId);
      setActiveConversation(targetConv);
      setIsChatOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-estate-200 border-t-emerald rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-estate-500">Loading verified property details & neighbourhood intel...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4 p-8 bg-navy-card rounded-3xl border border-navy-border shadow-premium">
        <h2 className="text-xl font-bold text-white font-display">Property Not Found</h2>
        <p className="text-xs text-estate-400">This property may have been removed or leased.</p>
        <Link to="/properties" className="inline-block px-4 py-2 bg-gold hover:bg-gold-light text-navy-deep text-xs font-bold rounded-xl shadow-gold transition">
          Browse Available Properties
        </Link>
      </div>
    );
  }

  const saved = isSaved(property.id);

  // Associated neighbourhood intel
  const neighbourhood = DEMO_NEIGHBOURHOODS.find(n => n.id === property.location?.neighbourhoodId) || DEMO_NEIGHBOURHOODS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-estate-400">
          <Link to="/" className="hover:text-gold transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/properties" className="hover:text-gold transition">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/neighbourhoods/${neighbourhood.id}`} className="hover:text-gold transition font-medium text-gold-light">
            {neighbourhood.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-bold truncate max-w-xs">{property.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSave(property.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
              saved
                ? 'bg-rose-950/70 text-rose-300 border-rose-500/40 shadow-xs'
                : 'bg-navy-card text-estate-200 border-navy-border hover:bg-navy-surface hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current text-rose-400' : ''}`} />
            <span>{saved ? 'Saved' : 'Save Property'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: property.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Property link copied to clipboard!');
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-navy-border text-xs font-semibold text-estate-200 hover:bg-navy-surface hover:text-white bg-navy-card transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Title & Key Stats Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-navy-border">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={property.transactionType === 'rent' ? 'rent' : property.transactionType === 'sale' ? 'sale' : 'shortlet'}>
              {property.transactionType === 'rent' ? 'For Rent' : property.transactionType === 'sale' ? 'For Sale' : 'Short-Let'}
            </Badge>
            <span className="bg-navy-surface text-estate-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-navy-border">
              {property.category}
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
              {property.verificationStatus || 'VettedHomes Verified'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-estate-400">
            <MapPin className="w-4 h-4 text-gold shrink-0" />
            <span className="text-estate-200">{property.location?.address}</span>
            <span>•</span>
            <Link to={`/neighbourhoods/${neighbourhood.id}`} className="text-gold font-semibold hover:underline">
              {neighbourhood.name}, {neighbourhood.city}
            </Link>
          </div>
        </div>

        {/* Pricing block */}
        <div className="lg:text-right shrink-0">
          <p className="text-xs uppercase tracking-wider font-bold text-estate-400">
            Listing Price
          </p>
          <p className="text-3xl sm:text-4xl font-black text-white font-display mt-0.5">
            {formatPriceDisplay(property.price, property.pricePeriod, property.transactionType)}
          </p>
          <p className="text-xs text-estate-400 mt-1">
            Status: <strong className="text-emerald-400">{property.availabilityStatus || 'Available Now'}</strong>
          </p>
        </div>
      </div>

      {/* Photo Gallery with Thumbnail selector */}
      <div className="space-y-3">
        <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-premium border border-estate-200">
          <img
            src={property.images?.[activeImageIndex] || property.images?.[0]}
            alt={`${property.title} view ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Privacy watermark badge */}
          <div className="absolute bottom-4 left-4 bg-estate-950/75 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-light" />
            <span>VettedHomes Privacy Protocol: Public imagery protects resident identity.</span>
          </div>
        </div>

        {/* Thumbnails */}
        {property.images && property.images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative shrink-0 w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition ${
                  activeImageIndex === idx ? 'border-emerald ring-2 ring-emerald-300' : 'border-estate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Layout (Specs & Intel on Left, Agent Box on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Key Specs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-navy-card rounded-2xl border border-navy-border text-center">
            <div className="p-2">
              <span className="text-xs text-estate-400 block mb-1">Bedrooms</span>
              <p className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
                <Bed className="w-5 h-5 text-gold" />
                <span>{property.bedrooms} Beds</span>
              </p>
            </div>
            <div className="p-2 border-l border-navy-border">
              <span className="text-xs text-estate-400 block mb-1">Bathrooms</span>
              <p className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
                <Bath className="w-5 h-5 text-gold" />
                <span>{property.bathrooms} Baths</span>
              </p>
            </div>
            <div className="p-2 border-l border-navy-border">
              <span className="text-xs text-estate-400 block mb-1">Property Size</span>
              <p className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
                <Maximize2 className="w-5 h-5 text-gold" />
                <span>{property.sizeSqm} m²</span>
              </p>
            </div>
            <div className="p-2 border-l border-navy-border">
              <span className="text-xs text-estate-400 block mb-1">Furnishing</span>
              <p className="text-sm font-bold text-white mt-1">
                {property.furnishingStatus}
              </p>
            </div>
          </div>

          {/* Description */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">About This Property</h2>
            <p className="text-sm sm:text-base text-estate-300 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </section>

          {/* Amenities & Features */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white font-display">Features & Infrastructure</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities?.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-navy-card border border-navy-border shadow-xs text-xs font-semibold text-estate-200">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SIGNATURE: NEIGHBOURHOOD INTELLIGENCE SUMMARY */}
          <section className="bg-gradient-to-br from-navy-card via-navy-card to-navy-surface rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-premium space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Neighbourhood Ground-Truth Intelligence</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  {neighbourhood.name} Livability Snapshot
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-estate-400 block">Overall Score</span>
                  <span className="text-2xl font-black text-gold font-display">
                    {neighbourhood.livabilityScore}<span className="text-xs text-estate-400 font-normal">/10</span>
                  </span>
                </div>
                <Link
                  to={`/neighbourhoods/${neighbourhood.id}`}
                  className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-deep font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-gold"
                >
                  <span>Full Intel & Discussions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick 3-card intelligence verdict */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-navy-surface p-4 rounded-2xl border border-navy-border shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Power / Grid</span>
                </div>
                <p className="text-xs text-estate-300 leading-relaxed">
                  {neighbourhood.metrics?.electricity?.summary || '18-20 hrs grid + estate generator backup.'}
                </p>
              </div>

              <div className="bg-navy-surface p-4 rounded-2xl border border-navy-border shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                  <Droplet className="w-4 h-4 text-blue-400" />
                  <span>Water Table</span>
                </div>
                <p className="text-xs text-estate-300 leading-relaxed">
                  {neighbourhood.metrics?.water?.summary || 'Industrial water filtration standard.'}
                </p>
              </div>

              <div className="bg-navy-surface p-4 rounded-2xl border border-navy-border shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                  <CloudRain className="w-4 h-4 text-purple-400" />
                  <span>Drainage & Floods</span>
                </div>
                <p className="text-xs text-estate-300 leading-relaxed">
                  {neighbourhood.metrics?.roadsDrainage?.summary || 'Elevated street with underground drainage.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-estate-400 border-t border-navy-border">
              <span>Backed by <strong className="text-white">{neighbourhood.verifiedResidentsCount || 342} verified resident responses</strong>.</span>
              <Link to={`/community?neighbourhood=${neighbourhood.id}`} className="text-gold font-bold hover:underline">
                Ask a resident in the forum →
              </Link>
            </div>
          </section>

          {/* Interactive Map & Nearby Facilities */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Location & Proximity</h2>
                <p className="text-xs text-estate-400">
                  Approximate radius shown for security; gate code dispatched on inspection.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-navy-border shadow-premium">
              <PropertyMapView
                properties={[property]}
                selectedPropertyId={property.id}
                height="380px"
              />
            </div>

            {/* Nearby facilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {neighbourhood.nearbyFacilities?.map((fac, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-navy-surface border border-navy-border text-xs">
                  <div>
                    <span className="font-semibold text-white block">{fac.name}</span>
                    <span className="text-[10px] text-estate-400">{fac.type}</span>
                  </div>
                  <span className="font-bold text-gold bg-navy-card px-2 py-1 rounded-md border border-gold/30 text-[11px]">
                    {fac.distance}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Property Reviews & Experience */}
          <section className="space-y-4 pt-6 border-t border-navy-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Verified Tenant Reviews</h2>
                <p className="text-xs text-estate-400">
                  Real assessments from former occupants and certified pre-lease inspectors.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep text-xs font-bold rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto shadow-gold"
              >
                <Star className="w-3.5 h-3.5 text-navy-deep fill-navy-deep" />
                <span>Write a Verified Review</span>
              </button>
            </div>

            <div className="space-y-3">
              {reviews.length === 0 ? (
                <div className="p-8 text-center bg-navy-surface rounded-2xl border border-navy-border text-xs text-estate-400">
                  No reviews recorded yet for this property. Be the first verified occupant to evaluate it!
                </div>
              ) : (
                reviews.map(rev => (
                  <div key={rev.id} className="bg-navy-card p-5 rounded-2xl border border-navy-border shadow-premium text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.reviewerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                          alt={rev.reviewerName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-gold/30"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-sm">{rev.reviewerName}</span>
                            {rev.isVerifiedExperience && (
                              <span className="bg-emerald-950/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                Verified Tenant
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-estate-400 text-[11px]">{rev.createdAt}</span>
                    </div>

                    {/* Criteria ratings bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 px-3 bg-navy-surface rounded-xl border border-navy-border text-[11px]">
                      <div>
                        <span className="text-estate-400 block text-[10px]">Condition</span>
                        <span className="font-bold text-gold">{rev.conditionRating || 4.5} ★</span>
                      </div>
                      <div>
                        <span className="text-estate-400 block text-[10px]">Listing Accuracy</span>
                        <span className="font-bold text-gold">{rev.accuracyRating || 4.8} ★</span>
                      </div>
                      <div>
                        <span className="text-estate-400 block text-[10px]">Maintenance</span>
                        <span className="font-bold text-gold">{rev.maintenanceRating || 4.3} ★</span>
                      </div>
                      <div>
                        <span className="text-estate-400 block text-[10px]">Value Ratio</span>
                        <span className="font-bold text-gold">{rev.valueRating || 4.5} ★</span>
                      </div>
                    </div>

                    <p className="text-estate-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>

        {/* Right Column (4 cols) — Sticky Agent & Contact Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          
          <div className="bg-navy-card rounded-3xl border border-navy-border shadow-premium p-6 space-y-6">
            
            {/* Agent Profile Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-navy-border">
              <img
                src={property.agent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={property.agent?.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-gold/40 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white font-display">{property.agent?.name}</h4>
                  <ShieldCheck className="w-4 h-4 text-gold" />
                </div>
                <p className="text-xs text-estate-400">{property.agent?.company}</p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-400 font-semibold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{property.agent?.rating || 4.9} Rating</span>
                  <span className="text-estate-400">• {property.agent?.listingsCount || 12} listings</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsInspectionOpen(true)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep rounded-xl text-xs sm:text-sm font-black shadow-gold transition flex items-center justify-center gap-2 group tracking-wide"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Schedule Physical Inspection</span>
              </button>

              <button
                type="button"
                onClick={handleOpenChat}
                className="w-full py-3 px-4 bg-navy-surface hover:bg-navy-border text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 border border-navy-border shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                <span>Chat Directly with Agent</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full py-2.5 px-4 bg-navy-surface hover:bg-navy-border border border-navy-border text-estate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Submit Formal Written Enquiry</span>
              </button>

              <a
                href={`https://wa.me/2348035550192?text=Hello%20${encodeURIComponent(property.agent?.name || 'Agent')},%20I%20am%20inquiring%20about%20${encodeURIComponent(property.title)}%20on%20VettedHomes.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct WhatsApp Contact</span>
              </a>
            </div>

            {/* Security Guarantee Box */}
            <div className="p-3.5 bg-navy-surface rounded-2xl border border-navy-border text-xs text-estate-300 space-y-1">
              <span className="font-bold text-gold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                VettedHomes Direct Guarantee
              </span>
              <p className="text-[11px] text-estate-400 leading-relaxed">
                Zero advance inspection payment policy. Never pay inspection fees to unknown individuals. Report suspicious claims directly to our support desk.
              </p>
            </div>

          </div>

          {/* Quick link to Neighbourhood Community */}
          <div className="bg-navy-card rounded-2xl p-5 border border-navy-border space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Have Questions About {neighbourhood.name}?
            </h4>
            <p className="text-xs text-estate-400 leading-relaxed">
              Ask active residents about night security, generator maintenance schedules, and landlord responsiveness.
            </p>
            <Link
              to={`/community?neighbourhood=${neighbourhood.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:underline pt-1"
            >
              <span>Visit {neighbourhood.name} Discussion Board</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>

      {/* Modals & Chat Drawer */}
      <InspectionModal
        isOpen={isInspectionOpen}
        onClose={() => setIsInspectionOpen(false)}
        property={property}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        property={property}
      />

      <PropertyReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        property={property}
        onReviewSubmitted={(newRev) => setReviews(prev => [newRev, ...prev])}
      />

      <ConversationChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        conversation={activeConversation}
        onInspectionClick={() => {
          setIsChatOpen(false);
          setIsInspectionOpen(true);
        }}
      />

    </div>
  );
}
