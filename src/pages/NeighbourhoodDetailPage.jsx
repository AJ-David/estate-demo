import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Droplet, 
  CloudRain, 
  Users, 
  Building2, 
  MessageSquareText, 
  ArrowLeft, 
  PlusCircle, 
  ChevronRight,
  Wifi,
  ExternalLink,
  Layers,
  AlertTriangle,
  FileCheck2,
  Calendar,
  Sparkles,
  Loader2,
  Compass,
  CheckCircle2,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { fetchNeighbourhoodById, getNeighbourhoodIntelligenceSummary, NEIGHBOURHOOD_FACILITIES } from '../services/neighbourhoodService';
import { fetchProperties } from '../services/propertyService';
import { fetchCommunityPosts } from '../services/communityService';
import { fetchNeighbourhoodReviews } from '../services/reviewService';
import { DEMO_COMMUNITY_POSTS } from '../data/demoData';
import { NeighbourhoodMetricsBar } from '../components/neighbourhood/NeighbourhoodMetricsBar';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyMapView } from '../components/property/PropertyMapView';
import { PostCard } from '../components/community/PostCard';
import { CreatePostModal } from '../components/community/CreatePostModal';
import { ReportModal } from '../components/community/ReportModal';
import { NeighbourhoodReviewModal } from '../components/neighbourhood/NeighbourhoodReviewModal';

export function NeighbourhoodDetailPage() {
  const { id } = useParams();
  const [neighbourhood, setNeighbourhood] = useState(null);
  const [intelligenceSummary, setIntelligenceSummary] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'map', 'properties', 'community'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reportItem, setReportItem] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadNeighbourhoodData() {
      try {
        const [nHood, summary, props, postsList, reviewsList] = await Promise.all([
          fetchNeighbourhoodById(id),
          getNeighbourhoodIntelligenceSummary(id),
          fetchProperties(),
          fetchCommunityPosts({ neighbourhoodId: id }),
          fetchNeighbourhoodReviews(id)
        ]);

        if (isMounted) {
          setNeighbourhood(nHood);
          setIntelligenceSummary(summary);
          setAllProperties(props);
          setCommunityPosts(postsList.length > 0 ? postsList : DEMO_COMMUNITY_POSTS.slice(0, 3));
          setReviews(reviewsList || []);
        }
      } catch (err) {
        console.error('Failed to load neighbourhood detail:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNeighbourhoodData();
    return () => { isMounted = false; };
  }, [id]);

  if (loading || !neighbourhood) {
    return (
      <div className="py-32 text-center space-y-3">
        <Loader2 className="w-10 h-10 text-emerald animate-spin mx-auto" />
        <p className="text-xs font-semibold text-estate-500">Compiling neighbourhood intelligence & community reports...</p>
      </div>
    );
  }

  // Active listings in this neighbourhood
  const activeProperties = allProperties.filter(p => 
    p.location?.neighbourhoodId === neighbourhood.id || 
    p.location?.address?.toLowerCase().includes(neighbourhood.name.toLowerCase())
  );

  // Community posts filtered by category
  const filteredPosts = communityPosts.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  // Property types distribution
  const propertyTypeCounts = activeProperties.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const handlePostCreated = (newPost) => {
    setCommunityPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Header */}
      <section className="relative bg-navy text-white pt-10 pb-16 overflow-hidden border-b border-estate-800">
        {/* Background Image overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={neighbourhood.heroImage}
            alt={neighbourhood.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-estate-400">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/neighbourhoods" className="hover:text-white transition">Neighbourhoods</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{neighbourhood.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald">
                <MapPin className="w-4 h-4" />
                <span>{neighbourhood.city}, {neighbourhood.state}, {neighbourhood.country}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
                {neighbourhood.name}
              </h1>

              <p className="text-sm sm:text-base text-estate-300 leading-relaxed max-w-2xl">
                {neighbourhood.description}
              </p>
            </div>

            {/* Livability score pill */}
            <div className="bg-estate-900/90 backdrop-blur-md p-5 rounded-3xl border border-estate-700 text-center shrink-0 shadow-lg">
              <span className="text-xs uppercase tracking-wider font-bold text-estate-400 block mb-1">
                Livability Rating
              </span>
              <p className="text-4xl font-black text-emerald font-display">
                {neighbourhood.livabilityScore}
                <span className="text-base text-estate-400 font-normal">/10</span>
              </p>
              <div className="mt-2 text-[11px] text-estate-300">
                <span>{neighbourhood.verifiedResidentsCount || 240} Verified Contributors</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar on Hero */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-estate-800 text-xs">
            <div className="bg-estate-900/60 p-3 rounded-2xl border border-estate-800">
              <span className="text-estate-400 block text-[11px]">Avg 3-Bed Rent</span>
              <p className="font-bold text-white text-sm mt-0.5">{neighbourhood.avgRent3Bed || '₦7,500,000 / yr'}</p>
            </div>
            <div className="bg-estate-900/60 p-3 rounded-2xl border border-estate-800">
              <span className="text-estate-400 block text-[11px]">Avg 4-Bed Sale</span>
              <p className="font-bold text-white text-sm mt-0.5">{neighbourhood.avgSale4Bed || '₦220,000,000'}</p>
            </div>
            <div className="bg-estate-900/60 p-3 rounded-2xl border border-estate-800">
              <span className="text-estate-400 block text-[11px]">Active Listings</span>
              <p className="font-bold text-white text-sm mt-0.5">{activeProperties.length} Available</p>
            </div>
            <div className="bg-estate-900/60 p-3 rounded-2xl border border-estate-800">
              <span className="text-estate-400 block text-[11px]">Security Assessment</span>
              <p className="font-bold text-emerald text-sm mt-0.5">
                {neighbourhood.metrics?.security?.rating || 'Gated Street Patrol'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-2 border-b border-navy-border pb-3 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Neighbourhood Diagnostics & Intelligence', count: null },
            { id: 'map', label: 'Interactive District Map & Enclave', count: null },
            { id: 'properties', label: 'Available Properties', count: activeProperties.length },
            { id: 'community', label: 'Resident Community Forum', count: filteredPosts.length }
          ].map(tab => (
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
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-navy-deep text-gold' : 'bg-navy-surface text-estate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: OVERVIEW & INTELLIGENCE */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8 cols): Diagnostic Bars & Verified Feedback Summary */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* SECTION 7 SIGNATURE COMPONENT: NEIGHBOURHOOD FEEDBACK SUMMARY */}
              {intelligenceSummary && (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-estate-200 shadow-subtle space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-estate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-emerald-50 text-emerald rounded-lg">
                          <FileCheck2 className="w-4 h-4" />
                        </span>
                        <h2 className="text-lg font-bold text-navy font-display">
                          Verified Neighbourhood Feedback Summary
                        </h2>
                      </div>
                      <p className="text-xs text-estate-500 mt-1">
                        Synthesized from {intelligenceSummary.totalCommunitySubmissions} authentic community reports • As of {intelligenceSummary.asOfDate}
                      </p>
                    </div>

                    <span className="bg-sand-100 text-estate-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-sand-200 shrink-0">
                      {intelligenceSummary.confidenceRating}
                    </span>
                  </div>

                  {/* Summary Category Boxes */}
                  <div className="space-y-4">
                    
                    {/* Security */}
                    <div className="p-4 bg-sand-50/60 rounded-2xl border border-sand-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald" />
                          Security & Safety Perception:
                        </span>
                        <span className="text-[10px] font-semibold text-estate-500">
                          {intelligenceSummary.categories.security.reportCount} Verified Reports
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-estate-800">
                        "{intelligenceSummary.categories.security.headline}"
                      </p>
                      <p className="text-xs text-estate-600 leading-relaxed">
                        {intelligenceSummary.categories.security.summary}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50/70 p-2 rounded-xl mt-2 border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span><strong>Uncertainty Note:</strong> {intelligenceSummary.categories.security.uncertaintyNote}</span>
                      </div>
                    </div>

                    {/* Electricity */}
                    <div className="p-4 bg-sand-50/60 rounded-2xl border border-sand-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-amber-600" />
                          Electricity & Power Stability:
                        </span>
                        <span className="text-[10px] font-semibold text-estate-500">
                          {intelligenceSummary.categories.electricity.reportCount} Reports
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-estate-800">
                        "{intelligenceSummary.categories.electricity.headline}"
                      </p>
                      <p className="text-xs text-estate-600 leading-relaxed">
                        {intelligenceSummary.categories.electricity.summary}
                      </p>
                      <p className="text-[11px] text-estate-500 italic">
                        Note: {intelligenceSummary.categories.electricity.uncertaintyNote}
                      </p>
                    </div>

                    {/* Clean Water */}
                    <div className="p-4 bg-sand-50/60 rounded-2xl border border-sand-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                          <Droplet className="w-4 h-4 text-blue-600" />
                          Water Supply & Aquifer:
                        </span>
                        <span className="text-[10px] font-semibold text-estate-500">
                          {intelligenceSummary.categories.water.reportCount} Reports
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-estate-800">
                        "{intelligenceSummary.categories.water.headline}"
                      </p>
                      <p className="text-xs text-estate-600 leading-relaxed">
                        {intelligenceSummary.categories.water.summary}
                      </p>
                    </div>

                    {/* Roads & Drainage */}
                    <div className="p-4 bg-sand-50/60 rounded-2xl border border-sand-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                          <CloudRain className="w-4 h-4 text-teal-600" />
                          Road Conditions & Seasonal Flash Pooling:
                        </span>
                        <span className="text-[10px] font-semibold text-estate-500">
                          {intelligenceSummary.categories.roadConditions.reportCount} Reports
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-estate-800">
                        "{intelligenceSummary.categories.roadConditions.headline}"
                      </p>
                      <p className="text-xs text-estate-600 leading-relaxed">
                        {intelligenceSummary.categories.roadConditions.summary}
                      </p>
                      <p className="text-[11px] text-estate-500 italic">
                        {intelligenceSummary.categories.roadConditions.uncertaintyNote}
                      </p>
                    </div>

                  </div>

                  {/* Anti-misinformation disclaimer */}
                  <div className="p-3 bg-estate-100 rounded-2xl text-[11px] text-estate-500 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                    <span>{intelligenceSummary.disclaimer}</span>
                  </div>
                </div>
              )}

              {/* Quantitative Metrics Bar */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-estate-200 shadow-subtle space-y-4">
                <div className="border-b border-estate-100 pb-3">
                  <h3 className="text-base font-bold text-navy font-display">
                    Living Conditions & Quantitative Breakdown
                  </h3>
                  <p className="text-xs text-estate-500">
                    Calculated from vetted resident surveys and infrastructure logs.
                  </p>
                </div>
                <NeighbourhoodMetricsBar metrics={neighbourhood.metrics} showSummaries={true} />
              </div>

              {/* Key Facilities List */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-estate-200 shadow-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-estate-100 pb-3">
                  <h3 className="text-base font-bold text-navy font-display">
                    Key Facilities & Surrounding Infrastructure
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('map')}
                    className="text-xs font-bold text-emerald hover:underline flex items-center gap-1"
                  >
                    <span>View on Interactive Map</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(NEIGHBOURHOOD_FACILITIES[neighbourhood.id] || neighbourhood.nearbyFacilities || []).map((fac, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-sand-50/70 rounded-2xl border border-sand-200 text-xs">
                      <div>
                        <span className="font-bold text-navy block">{fac.name}</span>
                        <span className="text-[10px] text-estate-500">{fac.type} • {fac.rating || 'Verified'}</span>
                      </div>
                      <span className="font-bold text-navy bg-white px-2.5 py-1 rounded-xl border border-estate-200 text-[11px] shadow-xs">
                        {fac.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resident Reviews & Ground-Truth Ratings */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-estate-200 shadow-subtle space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-estate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-navy font-display">
                      Verified Resident Living Evaluations ({reviews.length})
                    </h3>
                    <p className="text-xs text-estate-500">
                      Multi-criteria evaluations submitted by vetted residents.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-4 py-2 bg-navy hover:bg-estate-900 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald" />
                    <span>Evaluate This Neighbourhood</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {reviews.length === 0 ? (
                    <p className="text-xs text-estate-500 italic py-4">No evaluations yet. Be the first resident to evaluate living conditions here!</p>
                  ) : (
                    reviews.map(rev => (
                      <div key={rev.id} className="p-4 bg-sand-50/70 rounded-2xl border border-sand-200 text-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-navy">{rev.reviewerName}</span>
                            {rev.isVerifiedResident && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-emerald" />
                                Verified Resident
                              </span>
                            )}
                          </div>
                          <span className="text-estate-400 text-[11px]">{rev.createdAt}</span>
                        </div>

                        {/* Criteria scores */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 bg-white rounded-xl border border-estate-200 text-[11px]">
                          <div>
                            <span className="text-estate-400 block text-[10px]">Safety</span>
                            <span className="font-bold text-navy">{rev.safetyRating} / 10</span>
                          </div>
                          <div>
                            <span className="text-estate-400 block text-[10px]">Power & Grid</span>
                            <span className="font-bold text-navy">{rev.infrastructureRating} / 10</span>
                          </div>
                          <div>
                            <span className="text-estate-400 block text-[10px]">Transit Links</span>
                            <span className="font-bold text-navy">{rev.accessibilityRating} / 10</span>
                          </div>
                          <div>
                            <span className="text-estate-400 block text-[10px]">Drainage</span>
                            <span className="font-bold text-navy">{rev.cleanlinessRating} / 10</span>
                          </div>
                        </div>

                        <p className="text-estate-700 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Right Column (4 cols): Property Types & Community Snippet */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Property Types in this Neighbourhood */}
              <div className="bg-white rounded-3xl p-6 border border-estate-200 shadow-subtle space-y-4">
                <h4 className="text-sm font-bold text-navy font-display flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald" />
                  Available Property Types
                </h4>
                <div className="space-y-2 text-xs">
                  {Object.keys(propertyTypeCounts).length > 0 ? (
                    Object.entries(propertyTypeCounts).map(([cat, count]) => (
                      <div key={cat} className="flex items-center justify-between p-2.5 rounded-xl bg-sand-50 border border-sand-200">
                        <span className="font-semibold text-estate-800">{cat}</span>
                        <span className="font-bold text-navy bg-white px-2 py-0.5 rounded-lg border border-estate-200">
                          {count} {count === 1 ? 'home' : 'homes'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-sand-50">
                        <span>Duplexes & Townhouses</span>
                        <span className="font-bold text-navy">45%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-sand-50">
                        <span>Apartments & Flats</span>
                        <span className="font-bold text-navy">35%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-sand-50">
                        <span>Commercial & Short-lets</span>
                        <span className="font-bold text-navy">20%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ask Question in this Neighbourhood */}
              <div className="bg-sand-50 rounded-3xl p-6 border border-sand-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wider">
                  <MessageSquareText className="w-4 h-4" />
                  <span>Resident Dialogue</span>
                </div>
                <h3 className="text-base font-bold text-navy font-display">
                  Have questions about living in {neighbourhood.name}?
                </h3>
                <p className="text-xs text-estate-600 leading-relaxed">
                  Ask verified residents about road conditions during rainy season, internet speeds, or landlord maintenance.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreatePostOpen(true)}
                  className="w-full py-2.5 bg-emerald hover:bg-emerald-dark text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Start Discussion / Ask Question</span>
                </button>
              </div>

              {/* Quick Homes Preview */}
              <div className="bg-white rounded-3xl p-6 border border-estate-200 shadow-subtle space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-navy font-display">
                    Homes in {neighbourhood.name}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('properties')}
                    className="text-xs text-emerald font-semibold hover:underline"
                  >
                    View All ({activeProperties.length})
                  </button>
                </div>
                <div className="space-y-3">
                  {activeProperties.slice(0, 3).map(prop => (
                    <Link
                      key={prop.id}
                      to={`/properties/${prop.id}`}
                      className="flex items-center gap-3 p-2 rounded-2xl hover:bg-sand-50 transition border border-transparent hover:border-sand-200"
                    >
                      <img src={prop.images[0]} alt={prop.title} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="text-xs">
                        <p className="font-bold text-navy line-clamp-1">{prop.title}</p>
                        <p className="text-emerald font-semibold">{prop.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: INTERACTIVE DISTRICT MAP */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-4 rounded-2xl border border-estate-200 shadow-subtle">
              <div>
                <h3 className="text-base font-bold text-navy font-display">
                  {neighbourhood.name} Interactive District Map
                </h3>
                <p className="text-xs text-estate-500">
                  Includes boundary enclave, approximate property markers (260m privacy buffer), and nearby schools, clinics, markets & transit hubs.
                </p>
              </div>
              <div className="text-xs font-semibold text-estate-600">
                <span>Coordinates: {neighbourhood.coordinates?.lat}, {neighbourhood.coordinates?.lng}</span>
              </div>
            </div>

            <PropertyMapView
              properties={activeProperties}
              activeNeighbourhoodId={neighbourhood.id}
              height="650px"
            />
          </div>
        )}

        {/* Tab 3: AVAILABLE PROPERTIES */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-navy font-display">
                  Current Listings in {neighbourhood.name}
                </h2>
                <p className="text-xs text-estate-500">
                  Showing verified rental, sale, and short-let opportunities.
                </p>
              </div>
            </div>

            {activeProperties.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-estate-200 p-8 shadow-subtle">
                <Building2 className="w-12 h-12 text-estate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No active listings in this neighbourhood right now</p>
                <p className="text-xs text-estate-500 mt-1 mb-4">Check back soon or explore adjacent areas.</p>
                <Link
                  to="/properties"
                  className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition"
                >
                  Browse All Market Listings
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: COMMUNITY DISCUSSIONS */}
        {activeTab === 'community' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-sand-50 p-4 rounded-2xl border border-sand-200">
              <div>
                <h2 className="text-lg font-bold text-navy font-display">
                  {neighbourhood.name} Discussion Board
                </h2>
                <p className="text-xs text-estate-500">
                  Discussions moderated under community safety guidelines.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreatePostOpen(true)}
                className="px-4 py-2 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Post</span>
              </button>
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['All', 'Security', 'Infrastructure', 'Living Conditions', 'Property & Landlord Experiences', 'General Discussions'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-white text-estate-700 border border-estate-200 hover:bg-sand-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Post feed */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-estate-200 p-6">
                  <p className="text-sm font-bold text-navy">No discussions in this category yet.</p>
                  <p className="text-xs text-estate-500 mt-1">Be the first to share your living experience or ask questions!</p>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onReport={(item) => setReportItem(item)}
                  />
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPostCreated={handlePostCreated}
        initialNeighbourhoodId={neighbourhood.id}
      />

      <ReportModal
        isOpen={!!reportItem}
        onClose={() => setReportItem(null)}
        targetItem={reportItem}
      />

      <NeighbourhoodReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        neighbourhood={neighbourhood}
        onReviewSubmitted={(newRev) => setReviews(prev => [newRev, ...prev])}
      />

    </div>
  );
}
