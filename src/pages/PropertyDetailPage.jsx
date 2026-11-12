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
import { fetchPropertyById } from '../services/propertyService';

export function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSavedProperties();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchPropertyById(id).then(data => {
      if (isMounted) {
        setProperty(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

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
      <div className="max-w-md mx-auto my-16 text-center space-y-4 p-8 bg-white rounded-3xl border border-estate-200">
        <h2 className="text-xl font-bold text-navy">Property Not Found</h2>
        <p className="text-xs text-estate-500">This property may have been removed or leased.</p>
        <Link to="/properties" className="inline-block px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl">
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
        <div className="flex items-center gap-2 text-xs text-estate-500">
          <Link to="/" className="hover:text-navy transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/properties" className="hover:text-navy transition">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/neighbourhoods/${neighbourhood.id}`} className="hover:text-navy transition font-medium text-emerald-800">
            {neighbourhood.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-estate-800 font-bold truncate max-w-xs">{property.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSave(property.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
              saved
                ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-xs'
                : 'bg-white text-estate-700 border-estate-200 hover:bg-estate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current text-rose-600' : ''}`} />
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
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-estate-200 text-xs font-semibold text-estate-700 hover:bg-estate-50 bg-white transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Title & Key Stats Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-estate-200">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={property.transactionType === 'rent' ? 'rent' : property.transactionType === 'sale' ? 'sale' : 'shortlet'}>
              {property.transactionType === 'rent' ? 'For Rent' : property.transactionType === 'sale' ? 'For Sale' : 'Short-Let'}
            </Badge>
            <span className="bg-estate-100 text-estate-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-estate-200">
              {property.category}
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
              {property.verificationStatus || 'EstateLens Verified'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy font-display tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-estate-600">
            <MapPin className="w-4 h-4 text-emerald shrink-0" />
            <span>{property.location?.address}</span>
            <span>•</span>
            <Link to={`/neighbourhoods/${neighbourhood.id}`} className="text-emerald font-semibold hover:underline">
              {neighbourhood.name}, {neighbourhood.city}
            </Link>
          </div>
        </div>

        {/* Pricing block */}
        <div className="lg:text-right shrink-0">
          <p className="text-xs uppercase tracking-wider font-bold text-estate-400">
            Listing Price
          </p>
          <p className="text-3xl sm:text-4xl font-black text-navy font-display mt-0.5">
            {formatPriceDisplay(property.price, property.pricePeriod, property.transactionType)}
          </p>
          <p className="text-xs text-estate-500 mt-1">
            Status: <strong className="text-emerald-700">{property.availabilityStatus || 'Available Now'}</strong>
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
            <span>EstateLens Privacy Protocol: Public imagery protects resident identity.</span>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-sand-50 rounded-2xl border border-sand-200/90 text-center">
            <div className="p-2">
              <span className="text-xs text-estate-500 block mb-1">Bedrooms</span>
              <p className="text-lg font-bold text-navy flex items-center justify-center gap-1.5">
                <Bed className="w-5 h-5 text-emerald" />
                <span>{property.bedrooms} Beds</span>
              </p>
            </div>
            <div className="p-2 border-l border-sand-200">
              <span className="text-xs text-estate-500 block mb-1">Bathrooms</span>
              <p className="text-lg font-bold text-navy flex items-center justify-center gap-1.5">
                <Bath className="w-5 h-5 text-emerald" />
                <span>{property.bathrooms} Baths</span>
              </p>
            </div>
            <div className="p-2 border-l border-sand-200">
              <span className="text-xs text-estate-500 block mb-1">Property Size</span>
              <p className="text-lg font-bold text-navy flex items-center justify-center gap-1.5">
                <Maximize2 className="w-5 h-5 text-emerald" />
                <span>{property.sizeSqm} m²</span>
              </p>
            </div>
            <div className="p-2 border-l border-sand-200">
              <span className="text-xs text-estate-500 block mb-1">Furnishing</span>
              <p className="text-sm font-bold text-navy mt-1">
                {property.furnishingStatus}
              </p>
            </div>
          </div>

          {/* Description */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy font-display">About This Property</h2>
            <p className="text-sm sm:text-base text-estate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </section>

          {/* Amenities & Features */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-navy font-display">Features & Infrastructure</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities?.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-estate-200 shadow-xs text-xs font-semibold text-estate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SIGNATURE: NEIGHBOURHOOD INTELLIGENCE SUMMARY */}
          <section className="bg-gradient-to-br from-sand-50 to-emerald-50/30 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Neighbourhood Ground-Truth Intelligence</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-navy font-display">
                  {neighbourhood.name} Livability Snapshot
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-estate-500 block">Overall Score</span>
                  <span className="text-2xl font-black text-navy font-display">
                    {neighbourhood.livabilityScore}<span className="text-xs text-estate-400 font-normal">/10</span>
                  </span>
                </div>
                <Link
                  to={`/neighbourhoods/${neighbourhood.id}`}
                  className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-emerald transition flex items-center gap-1.5"
                >
                  <span>Full Intel & Discussions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick 3-card intelligence verdict */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-estate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-navy mb-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Power / Grid</span>
                </div>
                <p className="text-xs text-estate-600 leading-relaxed">
                  {neighbourhood.metrics?.electricity?.summary || '18-20 hrs grid + estate generator backup.'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-estate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-navy mb-1.5">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  <span>Water Table</span>
                </div>
                <p className="text-xs text-estate-600 leading-relaxed">
                  {neighbourhood.metrics?.water?.summary || 'Industrial water filtration standard.'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-estate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-navy mb-1.5">
                  <CloudRain className="w-4 h-4 text-purple-500" />
                  <span>Drainage & Floods</span>
                </div>
                <p className="text-xs text-estate-600 leading-relaxed">
                  {neighbourhood.metrics?.roadsDrainage?.summary || 'Elevated street with underground drainage.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-estate-500 border-t border-emerald-200/60">
              <span>Backed by <strong>{neighbourhood.verifiedResidentsCount || 342} verified resident responses</strong>.</span>
              <Link to={`/community?neighbourhood=${neighbourhood.id}`} className="text-emerald font-bold hover:underline">
                Ask a resident in the forum →
              </Link>
            </div>
          </section>

          {/* Interactive Map & Nearby Facilities */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-navy font-display">Location & Proximity</h2>
                <p className="text-xs text-estate-500">
                  Approximate radius shown for security; gate code dispatched on inspection.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-estate-200">
              <PropertyMapView
                properties={[property]}
                selectedPropertyId={property.id}
                height="380px"
              />
            </div>

            {/* Nearby facilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {neighbourhood.nearbyFacilities?.map((fac, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-sand-50 border border-sand-200 text-xs">
                  <div>
                    <span className="font-semibold text-estate-900 block">{fac.name}</span>
                    <span className="text-[10px] text-estate-500">{fac.type}</span>
                  </div>
                  <span className="font-bold text-navy bg-white px-2 py-1 rounded-md border border-estate-200 text-[11px]">
                    {fac.distance}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Property Reviews & Experience */}
          <section className="space-y-4 pt-6 border-t border-estate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-navy font-display">Verified Tenant Reviews</h2>
                <p className="text-xs text-estate-500">
                  Real assessments from former occupants and certified pre-lease inspectors.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {DEMO_PROPERTY_REVIEWS.map(rev => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-estate-900 text-sm">{rev.author}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {rev.userRole}
                      </span>
                    </div>
                    <span className="text-estate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{rev.rating} / 5.0</span>
                  </div>
                  <p className="text-estate-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column (4 cols) — Sticky Agent & Contact Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          
          <div className="bg-white rounded-3xl border border-estate-200 shadow-premium p-6 space-y-6">
            
            {/* Agent Profile Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-estate-100">
              <img
                src={property.agent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={property.agent?.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-300 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-navy font-display">{property.agent?.name}</h4>
                  <ShieldCheck className="w-4 h-4 text-emerald" />
                </div>
                <p className="text-xs text-estate-500">{property.agent?.company}</p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-600 font-semibold">
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
                className="w-full py-3.5 px-4 bg-emerald hover:bg-emerald-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Schedule Physical Inspection</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full py-3 px-4 bg-navy hover:bg-estate-900 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Enquiry / Ask Questions</span>
              </button>

              <a
                href={`https://wa.me/2348035550192?text=Hello%20${encodeURIComponent(property.agent?.name || 'Agent')},%20I%20am%20inquiring%20about%20${encodeURIComponent(property.title)}%20on%20EstateLens.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-sand-100 hover:bg-sand-200 border border-sand-200 text-navy rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-emerald" />
                <span>Direct WhatsApp Contact</span>
              </a>
            </div>

            {/* Security Guarantee Box */}
            <div className="p-3.5 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-estate-600 space-y-1">
              <span className="font-bold text-navy flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
                EstateLens Direct Guarantee
              </span>
              <p className="text-[11px] leading-relaxed">
                Zero advance inspection payment policy. Never pay inspection fees to unknown individuals. Report suspicious claims directly to our support desk.
              </p>
            </div>

          </div>

          {/* Quick link to Neighbourhood Community */}
          <div className="bg-sand-100 rounded-2xl p-5 border border-sand-200 space-y-2">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
              Have Questions About {neighbourhood.name}?
            </h4>
            <p className="text-xs text-estate-600 leading-relaxed">
              Ask active residents about night security, generator maintenance schedules, and landlord responsiveness.
            </p>
            <Link
              to={`/community?neighbourhood=${neighbourhood.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald hover:underline pt-1"
            >
              <span>Visit {neighbourhood.name} Discussion Board</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>

      {/* Modals */}
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

    </div>
  );
}
