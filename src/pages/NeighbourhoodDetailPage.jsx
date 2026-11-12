import React, { useState } from 'react';
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
  ExternalLink
} from 'lucide-react';
import { DEMO_NEIGHBOURHOODS, DEMO_PROPERTIES, DEMO_COMMUNITY_POSTS } from '../data/demoData';
import { NeighbourhoodMetricsBar } from '../components/neighbourhood/NeighbourhoodMetricsBar';
import { PropertyCard } from '../components/property/PropertyCard';
import { PostCard } from '../components/community/PostCard';
import { CreatePostModal } from '../components/community/CreatePostModal';
import { ReportModal } from '../components/community/ReportModal';

export function NeighbourhoodDetailPage() {
  const { id } = useParams();
  const neighbourhood = DEMO_NEIGHBOURHOODS.find(n => n.id === id) || DEMO_NEIGHBOURHOODS[0];

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'properties', 'community'
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [reportItem, setReportItem] = useState(null);

  // Active listings in this neighbourhood
  const activeProperties = DEMO_PROPERTIES.filter(p => p.location.neighbourhoodId === neighbourhood.id);

  // Community posts for this neighbourhood
  const [communityPosts, setCommunityPosts] = useState(() => 
    DEMO_COMMUNITY_POSTS.filter(p => p.neighbourhoodId === neighbourhood.id)
  );

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
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-transparent" />

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
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-light">
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

            {/* Score pill */}
            <div className="bg-navy-surface/90 backdrop-blur-md p-5 rounded-3xl border border-navy-border text-center shrink-0">
              <span className="text-xs uppercase tracking-wider font-bold text-estate-400 block mb-1">
                Livability Score
              </span>
              <p className="text-4xl font-black text-emerald-light font-display">
                {neighbourhood.livabilityScore}
                <span className="text-base text-estate-400 font-normal">/10</span>
              </p>
              <div className="mt-2 text-[11px] text-estate-300">
                <span>{neighbourhood.verifiedResidentsCount} Verified Contributors</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar on Hero */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-navy-border/60 text-xs">
            <div className="bg-navy-card/60 p-3 rounded-xl border border-navy-border">
              <span className="text-estate-400 block text-[11px]">Avg 3-Bed Rent</span>
              <p className="font-bold text-white text-sm mt-0.5">{neighbourhood.avgRent3Bed}</p>
            </div>
            <div className="bg-navy-card/60 p-3 rounded-xl border border-navy-border">
              <span className="text-estate-400 block text-[11px]">Avg 4-Bed Sale</span>
              <p className="font-bold text-white text-sm mt-0.5">{neighbourhood.avgSale4Bed}</p>
            </div>
            <div className="bg-navy-card/60 p-3 rounded-xl border border-navy-border">
              <span className="text-estate-400 block text-[11px]">Active Listings</span>
              <p className="font-bold text-white text-sm mt-0.5">{neighbourhood.activeListingsCount} Available</p>
            </div>
            <div className="bg-navy-card/60 p-3 rounded-xl border border-navy-border">
              <span className="text-estate-400 block text-[11px]">Security Rating</span>
              <p className="font-bold text-emerald-light text-sm mt-0.5">{neighbourhood.metrics.security.rating}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-2 border-b border-estate-200 pb-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Neighbourhood Diagnostics & Intel', count: null },
            { id: 'properties', label: 'Available Properties', count: activeProperties.length },
            { id: 'community', label: 'Resident Community Forum', count: communityPosts.length }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-estate-600 hover:text-navy hover:bg-estate-100'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-emerald text-white' : 'bg-estate-200 text-estate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: OVERVIEW & METRICS */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8 cols): Diagnostic Bars */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-navy font-display mb-1">
                  Living Conditions & Infrastructure Reality
                </h2>
                <p className="text-xs text-estate-500">
                  Quantitative and qualitative evaluations based on resident consensus.
                </p>
              </div>

              <NeighbourhoodMetricsBar metrics={neighbourhood.metrics} showSummaries={true} />

              {/* Nearby Facilities */}
              <div className="pt-6 border-t border-estate-200 space-y-4">
                <h3 className="text-lg font-bold text-navy font-display">
                  Key Neighbourhood Facilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {neighbourhood.nearbyFacilities?.map((fac, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-estate-200 shadow-xs text-xs">
                      <div>
                        <span className="font-bold text-estate-900 block">{fac.name}</span>
                        <span className="text-[10px] text-estate-500">{fac.type}</span>
                      </div>
                      <span className="font-semibold text-navy bg-sand-100 px-2.5 py-1 rounded-lg border border-sand-200 text-[11px]">
                        {fac.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Community Snippet & Action Box */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Ask Question in this Neighbourhood */}
              <div className="bg-sand-50 rounded-3xl p-6 border border-sand-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wider">
                  <MessageSquareText className="w-4 h-4" />
                  <span>Resident Dialogue</span>
                </div>
                <h3 className="text-lg font-bold text-navy font-display">
                  Have specific questions about {neighbourhood.name}?
                </h3>
                <p className="text-xs text-estate-600 leading-relaxed">
                  Connect directly with verified residents living on Admiralty Way, Sabo, or GRA closes.
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

              {/* Quick Peek at Properties */}
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
                  {activeProperties.slice(0, 2).map(prop => (
                    <Link
                      key={prop.id}
                      to={`/properties/${prop.id}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-sand-50 transition border border-transparent hover:border-sand-200"
                    >
                      <img src={prop.images[0]} alt={prop.title} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="text-xs">
                        <p className="font-bold text-navy line-clamp-1">{prop.title}</p>
                        <p className="text-emerald-700 font-semibold">{prop.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: AVAILABLE PROPERTIES */}
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
              <div className="text-center py-12 bg-white rounded-2xl border border-estate-200 p-6">
                <Building2 className="w-10 h-10 text-estate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No active listings in this neighbourhood right now</p>
                <p className="text-xs text-estate-500 mt-1">Check back soon or explore adjacent areas.</p>
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

        {/* Tab 3: COMMUNITY DISCUSSIONS */}
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

            {/* Post feed */}
            <div className="space-y-4">
              {communityPosts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-estate-200 p-6">
                  <p className="text-sm font-bold text-navy">No discussions posted yet for this location.</p>
                  <p className="text-xs text-estate-500 mt-1">Be the first to share your living experience or ask questions!</p>
                </div>
              ) : (
                communityPosts.map(post => (
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

    </div>
  );
}

