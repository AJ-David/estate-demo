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
      <section className="relative bg-navy-deep text-white pt-10 pb-16 overflow-hidden border-b border-navy-border">
        {/* Background Image overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={neighbourhood.heroImage}
            alt={neighbourhood.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/neighbourhoods" className="hover:text-gold transition">Neighbourhoods</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{neighbourhood.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{neighbourhood.city}, {neighbourhood.state}, {neighbourhood.country}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
                {neighbourhood.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                {neighbourhood.description}
              </p>
            </div>

            {/* Livability score pill */}
            <div className="bg-navy-card/90 backdrop-blur-md p-5 rounded-3xl border border-gold/40 text-center shrink-0 shadow-gold">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1">
                Livability Rating
              </span>
              <p className="text-4xl font-black text-gold font-display">
                {neighbourhood.livabilityScore}
                <span className="text-base text-slate-300 font-normal">/10</span>
              </p>
              <div className="mt-2 text-[11px] text-slate-300">
                <span>{neighbourhood.verifiedResidentsCount || 240} Verified Contributors</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar on Hero */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-navy-border text-xs">
            <div className="bg-navy-surface p-3 rounded-2xl border border-navy-border">
              <span className="text-slate-300 block text-[11px]">Avg 3-Bed Rent</span>
              <p className="font-bold text-white text-sm mt-0.5">{neighbourhood.avgRent3Bed || '₦7,500,000 / yr'}</p>
            </div>
            <div className="bg-navy-surface p-3 rounded-2xl border border-navy-border">
              <span className="text-slate-300 block text-[11px]">Avg 4-Bed Sale</span>
              <p className="font-bold text-white text-sm mt-0.5">{neighbourhood.avgSale4Bed || '₦220,000,000'}</p>
            </div>
            <div className="bg-navy-surface p-3 rounded-2xl border border-navy-border">
              <span className="text-slate-300 block text-[11px]">Active Listings</span>
              <p className="font-bold text-white text-sm mt-0.5">{activeProperties.length} Available</p>
            </div>
            <div className="bg-navy-surface p-3 rounded-2xl border border-navy-border">
              <span className="text-slate-300 block text-[11px]">Security Assessment</span>
              <p className="font-bold text-gold text-sm mt-0.5">
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
                <div className="bg-navy-card rounded-3xl p-6 sm:p-7 border border-navy-border shadow-premium space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-border pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-navy-surface text-gold rounded-lg border border-gold/30">
                          <FileCheck2 className="w-4 h-4" />
                        </span>
                        <h2 className="text-lg font-bold text-white font-display">
                          Verified Neighbourhood Feedback Summary
                        </h2>
                      </div>
                      <p className="text-xs text-estate-400 mt-1">
                        Synthesized from {intelligenceSummary.totalCommunitySubmissions} authentic community reports • As of {intelligenceSummary.asOfDate}
                      </p>
                    </div>

                    <span className="bg-navy-surface text-gold text-[10px] font-bold px-2.5 py-1 rounded-full border border-gold/40 shrink-0">
                      {intelligenceSummary.confidenceRating}
                    </span>
                  </div>

                  {/* Summary Category Boxes */}
                  <div className="space-y-4">
                    
                    {/* Security */}
                    <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-gold" />
                          Security & Safety Perception:
                        </span>
                        <span className="text-[10px] font-semibold text-estate-400">
                          {intelligenceSummary.categories.security.reportCount} Verified Reports
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-estate-200">
                        "{intelligenceSummary.categories.security.headline}"
                      </p>
                      <p className="text-xs text-estate-400 leading-relaxed">
                        {intelligenceSummary.categories.security.summary}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-950/40 p-2 rounded-xl mt-2 border border-amber-500/30">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span><strong>Uncertainty Note:</strong> {intelligenceSummary.categories.security.uncertaintyNote}</span>
                      </div>
                    </div>

                    {/* Electricity */}
                    <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-amber-400" />
                          Electricity & Power Stability:
                        </span>
                        <span className="text-[10px] font-semibold text-estate-400">
                          {intelligenceSummary.categories.electricity.reportCount} Reports
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-estate-200">
                        "{intelligenceSummary.categories.electricity.headline}"
                      </p>
                      <p className="text-xs text-estate-400 leading-relaxed">
                        {intelligenceSummary.categories.electricity.summary}
                      </p>
                      <p className="text-[11px] text-estate-500 italic">
                        Note: {intelligenceSummary.categories.electricity.uncertaintyNote}
                      </p>
                    </div>

                    {/* Clean Water */}
                    <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Droplet className="w-4 h-4 text-blue-400" />
                          Water Supply & Aquifer:
                        </span>
                        <span className="text-[10px] font-semibold text-estate-400">
                          {intelligenceSummary.categories.water.reportCount} Reports
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-estate-200">
                        "{intelligenceSummary.categories.water.headline}"
                      </p>
                      <p className="text-xs text-estate-400 leading-relaxed">
                        {intelligenceSummary.categories.water.summary}
                      </p>
                    </div>

                    {/* Roads & Drainage */}
                    <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CloudRain className="w-4 h-4 text-teal-400" />
                          Road Conditions & Seasonal Flash Pooling:
                        </span>
                        <span className="text-[10px] font-semibold text-estate-400">
                          {intelligenceSummary.categories.roadConditions.reportCount} Reports
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-estate-200">
                        "{intelligenceSummary.categories.roadConditions.headline}"
                      </p>
                      <p className="text-xs text-estate-400 leading-relaxed">
                        {intelligenceSummary.categories.roadConditions.summary}
                      </p>
                      <p className="text-[11px] text-estate-500 italic">
                        {intelligenceSummary.categories.roadConditions.uncertaintyNote}
                      </p>
                    </div>

                  </div>

                  {/* Anti-misinformation disclaimer */}
                  <div className="p-3 bg-navy-surface rounded-2xl text-[11px] text-estate-400 flex items-start gap-2 border border-navy-border">
                    <HelpCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{intelligenceSummary.disclaimer}</span>
                  </div>
                </div>
              )}

              {/* Quantitative Metrics Bar */}
              <div className="bg-navy-card rounded-3xl p-6 sm:p-7 border border-navy-border shadow-premium space-y-4">
                <div className="border-b border-navy-border pb-3">
                  <h3 className="text-base font-bold text-white font-display">
                    Living Conditions & Quantitative Breakdown
                  </h3>
                  <p className="text-xs text-estate-400">
                    Calculated from vetted resident surveys and infrastructure logs.
                  </p>
                </div>
                <NeighbourhoodMetricsBar metrics={neighbourhood.metrics} showSummaries={true} />
              </div>

              {/* Key Facilities List */}
              <div className="bg-navy-card rounded-3xl p-6 sm:p-7 border border-navy-border shadow-premium space-y-4">
                <div className="flex items-center justify-between border-b border-navy-border pb-3">
                  <h3 className="text-base font-bold text-white font-display">
                    Key Facilities & Surrounding Infrastructure
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('map')}
                    className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
                  >
                    <span>View on Interactive Map</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(NEIGHBOURHOOD_FACILITIES[neighbourhood.id] || neighbourhood.nearbyFacilities || []).map((fac, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-navy-surface rounded-2xl border border-navy-border text-xs">
                      <div>
                        <span className="font-bold text-white block">{fac.name}</span>
                        <span className="text-[10px] text-estate-400">{fac.type} • {fac.rating || 'Verified'}</span>
                      </div>
                      <span className="font-bold text-gold bg-navy-card px-2.5 py-1 rounded-xl border border-gold/30 text-[11px] shadow-xs">
                        {fac.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resident Reviews & Ground-Truth Ratings */}
              <div className="bg-navy-card rounded-3xl p-6 sm:p-7 border border-navy-border shadow-premium space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-border pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      Verified Resident Living Evaluations ({reviews.length})
                    </h3>
                    <p className="text-xs text-estate-400">
                      Multi-criteria evaluations submitted by vetted residents.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep text-xs font-bold rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto shadow-gold"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-navy-deep" />
                    <span>Evaluate This Neighbourhood</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {reviews.length === 0 ? (
                    <p className="text-xs text-estate-400 italic py-4">No evaluations yet. Be the first resident to evaluate living conditions here!</p>
                  ) : (
                    reviews.map(rev => (
                      <div key={rev.id} className="p-4 bg-navy-surface rounded-2xl border border-navy-border text-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{rev.reviewerName}</span>
                            {rev.isVerifiedResident && (
                              <span className="bg-emerald-950/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                Verified Resident
                              </span>
                            )}
                          </div>
                          <span className="text-estate-400 text-[11px]">{rev.createdAt}</span>
                        </div>

                        {/* Criteria scores */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 bg-navy-card rounded-xl border border-navy-border text-[11px]">
                          <div>
                            <span className="text-estate-400 block text-[10px]">Safety</span>
                            <span className="font-bold text-gold">{rev.safetyRating} / 10</span>
                          </div>
                          <div>
                            <span className="text-estate-400 block text-[10px]">Power & Grid</span>
                            <span className="font-bold text-gold">{rev.infrastructureRating} / 10</span>
                          </div>
                          <div>
                            <span className="text-estate-400 block text-[10px]">Transit Links</span>
                            <span className="font-bold text-gold">{rev.accessibilityRating} / 10</span>
                          </div>
                          <div>
                            <span className="text-estate-400 block text-[10px]">Drainage</span>
                            <span className="font-bold text-gold">{rev.cleanlinessRating} / 10</span>
                          </div>
                        </div>

                        <p className="text-estate-300 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Right Column (4 cols): Property Types & Community Snippet */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Property Types in this Neighbourhood */}
              <div className="bg-navy-card rounded-3xl p-6 border border-navy-border shadow-premium space-y-4">
                <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-gold" />
                  Available Property Types
                </h4>
                <div className="space-y-2 text-xs">
                  {Object.keys(propertyTypeCounts).length > 0 ? (
                    Object.entries(propertyTypeCounts).map(([cat, count]) => (
                      <div key={cat} className="flex items-center justify-between p-2.5 rounded-xl bg-navy-surface border border-navy-border">
                        <span className="font-semibold text-estate-200">{cat}</span>
                        <span className="font-bold text-gold bg-navy-card px-2 py-0.5 rounded-lg border border-gold/30">
                          {count} {count === 1 ? 'home' : 'homes'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-navy-surface">
                        <span className="text-estate-300">Duplexes & Townhouses</span>
                        <span className="font-bold text-gold">45%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-navy-surface">
                        <span className="text-estate-300">Apartments & Flats</span>
                        <span className="font-bold text-gold">35%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-navy-surface">
                        <span className="text-estate-300">Commercial & Short-lets</span>
                        <span className="font-bold text-gold">20%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ask Question in this Neighbourhood */}
              <div className="bg-navy-card rounded-3xl p-6 border border-navy-border shadow-premium space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
                  <MessageSquareText className="w-4 h-4 text-gold" />
                  <span>Resident Dialogue</span>
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  Have questions about living in {neighbourhood.name}?
                </h3>
                <p className="text-xs text-estate-400 leading-relaxed">
                  Ask verified residents about road conditions during rainy season, internet speeds, or landlord maintenance.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreatePostOpen(true)}
                  className="w-full py-2.5 bg-gradient-to-r from-gold to-gold-dark hover:brightness-110 text-navy-deep rounded-xl text-xs font-bold shadow-gold transition flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-navy-deep" />
                  <span>Start Discussion / Ask Question</span>
                </button>
              </div>

              {/* Quick Homes Preview */}
              <div className="bg-navy-card rounded-3xl p-6 border border-navy-border shadow-premium space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-display">
                    Homes in {neighbourhood.name}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('properties')}
                    className="text-xs text-gold font-semibold hover:underline"
                  >
                    View All ({activeProperties.length})
                  </button>
                </div>
                <div className="space-y-3">
                  {activeProperties.slice(0, 3).map(prop => (
                    <Link
                      key={prop.id}
                      to={`/properties/${prop.id}`}
                      className="flex items-center gap-3 p-2 rounded-2xl hover:bg-navy-surface transition border border-transparent hover:border-navy-border"
                    >
                      <img src={prop.images[0]} alt={prop.title} className="w-14 h-14 rounded-xl object-cover ring-1 ring-gold/20" />
                      <div className="text-xs">
                        <p className="font-bold text-white line-clamp-1">{prop.title}</p>
                        <p className="text-gold font-semibold">{prop.category}</p>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-navy-card p-4 rounded-2xl border border-navy-border shadow-premium">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  {neighbourhood.name} Interactive District Map
                </h3>
                <p className="text-xs text-estate-400">
                  Includes boundary enclave, approximate property markers (260m privacy buffer), and nearby schools, clinics, markets & transit hubs.
                </p>
              </div>
              <div className="text-xs font-semibold text-estate-400">
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
                <h2 className="text-xl font-bold text-white font-display">
                  Current Listings in {neighbourhood.name}
                </h2>
                <p className="text-xs text-estate-400">
                  Showing verified rental, sale, and short-let opportunities.
                </p>
              </div>
            </div>

            {activeProperties.length === 0 ? (
              <div className="text-center py-16 bg-navy-card rounded-3xl border border-navy-border p-8 shadow-premium">
                <Building2 className="w-12 h-12 text-estate-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">No active listings in this neighbourhood right now</p>
                <p className="text-xs text-estate-400 mt-1 mb-4">Check back soon or explore adjacent areas.</p>
                <Link
                  to="/properties"
                  className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-deep text-xs font-bold rounded-xl transition shadow-gold"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-card p-4 rounded-2xl border border-navy-border shadow-premium">
              <div>
                <h2 className="text-lg font-bold text-white font-display">
                  {neighbourhood.name} Discussion Board
                </h2>
                <p className="text-xs text-estate-400">
                  Discussions moderated under community safety guidelines.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreatePostOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-gold to-gold-dark text-navy-deep text-xs font-bold rounded-xl hover:brightness-110 shadow-gold transition flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4 text-navy-deep" />
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
                      ? 'bg-gold text-navy-deep shadow-gold'
                      : 'bg-navy-surface text-estate-300 border border-navy-border hover:bg-navy-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Post feed */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-navy-card rounded-2xl border border-navy-border p-6 shadow-premium">
                  <p className="text-sm font-bold text-white">No discussions in this category yet.</p>
                  <p className="text-xs text-estate-400 mt-1">Be the first to share your living experience or ask questions!</p>
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
