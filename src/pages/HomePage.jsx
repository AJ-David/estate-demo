import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  CloudRain, 
  Users, 
  Building2, 
  CheckCircle2, 
  MessageSquareText, 
  Home, 
  Compass,
  Star
} from 'lucide-react';
import { DEMO_PROPERTIES, DEMO_NEIGHBOURHOODS, DEMO_COMMUNITY_POSTS, PROPERTY_TYPES } from '../data/demoData';
import { fetchProperties } from '../services/propertyService';
import { fetchNeighbourhoods } from '../services/neighbourhoodService';
import { fetchCommunityPosts } from '../services/communityService';
import { PropertyCard } from '../components/property/PropertyCard';
import { NeighbourhoodCard } from '../components/neighbourhood/NeighbourhoodCard';
import { PostCard } from '../components/community/PostCard';

export function HomePage() {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState('rent');
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');

  const [properties, setProperties] = useState(DEMO_PROPERTIES);
  const [neighbourhoods, setNeighbourhoods] = useState(DEMO_NEIGHBOURHOODS);
  const [communityPosts, setCommunityPosts] = useState(DEMO_COMMUNITY_POSTS);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveData() {
      try {
        const [props, nHods, posts] = await Promise.all([
          fetchProperties(),
          fetchNeighbourhoods(),
          fetchCommunityPosts()
        ]);
        if (isMounted) {
          if (props && props.length > 0) setProperties(props);
          if (nHods && nHods.length > 0) setNeighbourhoods(nHods);
          if (posts && posts.length > 0) setCommunityPosts(posts);
        }
      } catch (err) {
        console.warn('Error loading dynamic homepage data:', err);
      }
    }
    loadLiveData();
    return () => { isMounted = false; };
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (transactionType && transactionType !== 'all') params.set('type', transactionType);
    if (searchLocation) params.set('search', searchLocation);
    if (propertyType && propertyType !== 'All Types') params.set('category', propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);
  const topNeighbourhoods = neighbourhoods.slice(0, 3);
  const recentCommunityPosts = communityPosts.slice(0, 2);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-28 lg:pt-24 lg:pb-36 overflow-hidden bg-gradient-to-b from-navy via-navy-deep to-sand-warm border-b border-navy-border text-white">
        {/* Subtle Sovereign Gold Aura Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-card/90 border border-gold/40 text-gold-light text-xs font-bold shadow-gold animate-fadeIn">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Verified Properties & Sovereign Neighbourhood Intelligence</span>
            </div>

            {/* Suggested Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.1]">
              Find Your Next Home. <br className="hidden sm:inline" />
              <span className="text-gold-light block sm:inline mt-1 sm:mt-0 drop-shadow-sm">
                Know Your Next Neighbourhood.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Discover verified properties, explore real living conditions, and hear vetted resident experiences before signing your lease.
            </p>

            {/* PROMINENT PROPERTY SEARCH BAR */}
            <div className="pt-4 max-w-3xl mx-auto">
              <div className="bg-navy-card/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-2xl border border-navy-border text-left">
                
                {/* Transaction Tabs */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy-border/80">
                  {[
                    { label: 'Rent a Home', value: 'rent' },
                    { label: 'Buy Property', value: 'sale' },
                    { label: 'Short-Let', value: 'short-let' }
                  ].map(tab => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setTransactionType(tab.value)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                        transactionType === tab.value
                          ? 'bg-gradient-to-r from-gold to-gold-light text-navy-deep shadow-gold'
                          : 'text-slate-300 hover:text-gold hover:bg-navy-surface'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Form Fields */}
                <form onSubmit={handleHeroSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  
                  {/* Location Input */}
                  <div className="md:col-span-5 relative">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gold-light mb-1">
                      Location / Neighbourhood
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Lekki, Yaba, Ikeja, Maitama..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-navy-border text-xs sm:text-sm font-medium focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy-deep text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="md:col-span-4">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gold-light mb-1">
                      Property Category
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-navy-border text-xs sm:text-sm font-medium focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy-deep text-white"
                    >
                      {PROPERTY_TYPES.map(cat => (
                        <option key={cat} value={cat} className="bg-navy-card text-white">{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Search CTA */}
                  <div className="md:col-span-3 pt-2 md:pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 px-5 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy-deep rounded-xl text-xs sm:text-sm font-black shadow-gold hover:shadow-gold-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      <Search className="w-4 h-4 text-navy-deep group-hover:scale-110 transition-transform" />
                      <span>Search Intel</span>
                    </button>
                  </div>

                </form>

                {/* Quick Neighbourhood Pills */}
                <div className="mt-3 pt-3 border-t border-navy-border/80 flex flex-wrap items-center gap-2 text-xs text-estate-400">
                  <span className="font-semibold text-estate-400">Popular:</span>
                  {['Lekki Phase 1', 'Yaba', 'Ikeja GRA', 'Maitama Abuja', 'Surulere'].map(loc => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSearchLocation(loc);
                      }}
                      className="text-estate-300 hover:text-gold font-medium underline underline-offset-2 transition"
                    >
                      {loc}
                    </button>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Curated Sovereign Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Featured Verified Properties
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Every home includes verified inspections and verified neighbourhood livability metrics.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold hover:text-gold-light transition"
          >
            <span>Browse All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 3. EXPLORE LOCATIONS (NEIGHBOURHOOD INTELLIGENCE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Neighbourhood Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Explore Key Communities
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Understand power uptime, water quality, safety, and flood vulnerability before signing a lease.
            </p>
          </div>
          <Link
            to="/neighbourhoods"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold hover:text-gold-light transition"
          >
            <span>View All Neighbourhoods</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topNeighbourhoods.map(neighbourhood => (
            <NeighbourhoodCard key={neighbourhood.id} neighbourhood={neighbourhood} />
          ))}
        </div>
      </section>

      {/* 4. HOW VETTEDHOMES WORKS */}
      <section id="how-it-works" className="bg-navy-deep py-16 sm:py-20 border-y border-navy-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              Smart Real Estate Decision Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
              How VettedHomes Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              A transparent, community-grounded journey designed to eliminate blind leasing and property regrets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-navy-card rounded-2xl p-6 sm:p-8 border border-navy-border shadow-xl relative">
              <span className="w-10 h-10 rounded-xl bg-navy-surface text-gold border border-navy-border font-black flex items-center justify-center font-display mb-5 shadow-xs">
                01
              </span>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Discover Verified Homes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Filter across verified houses, duplexes, serviced apartments, and short-lets with authentic photos and transparent pricing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-navy-card rounded-2xl p-6 sm:p-8 border border-gold/50 shadow-gold relative ring-1 ring-gold/30">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-gold to-gold-dark text-navy-deep text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                Signature Feature
              </div>
              <span className="w-10 h-10 rounded-xl bg-gold text-navy-deep font-black flex items-center justify-center font-display mb-5 shadow-xs">
                02
              </span>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Know The Real Neighbourhood
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Read crowd-sourced resident data on power uptime, road conditions, drainage flood risks, and gated security protocols.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-navy-card rounded-2xl p-6 sm:p-8 border border-navy-border shadow-xl relative">
              <span className="w-10 h-10 rounded-xl bg-navy-surface text-gold border border-navy-border font-black flex items-center justify-center font-display mb-5 shadow-xs">
                03
              </span>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Schedule Safe Inspections
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with certified agents or landlords. Book physical inspections with verified estate security gate passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEIGHBOURHOOD COMMUNITY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy to-navy-card rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-light text-xs font-bold shadow-xs">
                <MessageSquareText className="w-3.5 h-3.5 text-gold" />
                <span>The Community Pulse</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-snug">
                Real Residents. <br />
                Real Feedback. <br />
                Zero Sales Fluff.
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Ask questions before you sign. Compare internet latency, transformer stability, flood resilience, and landlord responsiveness from people living there.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/community"
                  className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy-deep text-xs sm:text-sm font-black rounded-xl shadow-gold hover:shadow-gold-lg transition text-center"
                >
                  Join Community Discussions
                </Link>
                <Link
                  to="/neighbourhoods"
                  className="px-5 py-2.5 bg-navy-surface hover:bg-navy-surface/80 border border-navy-border text-slate-200 hover:text-gold text-xs sm:text-sm font-semibold rounded-xl transition text-center"
                >
                  Browse Locations
                </Link>
              </div>
            </div>

            {/* Right Feed Snippet */}
            <div className="lg:col-span-7 space-y-4">
              {recentCommunityPosts.map(post => (
                <div key={post.id} className="bg-navy-card/90 text-white rounded-2xl p-5 shadow-xl border border-navy-border">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-gold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                      {post.author.name} ({post.author.badge})
                    </span>
                    <span className="text-slate-400 text-[11px]">{post.createdAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display mb-1">{post.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{post.content}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE VETTEDHOMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">
            Built for Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
            Why VettedHomes is Different
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Generic portals display photos. VettedHomes shows you the living reality of the neighbourhood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-navy-card rounded-2xl border border-navy-border shadow-xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold border border-gold/20">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">Power & Grid Tracking</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Track actual public grid availability hours and generator requirements per street.
            </p>
          </div>

          <div className="p-6 bg-navy-card rounded-2xl border border-navy-border shadow-xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-950/60 text-sky-400 flex items-center justify-center font-bold border border-sky-800/40">
              <CloudRain className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">Flood History & Drainage</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Identify streets with elevated drainage canals versus low-lying pooling zones.
            </p>
          </div>

          <div className="p-6 bg-navy-card rounded-2xl border border-navy-border shadow-xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 text-purple-300 flex items-center justify-center font-bold border border-purple-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">Resident-Verified Intel</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Discussions are tagged by verified resident status to filter out marketing fluff.
            </p>
          </div>

          <div className="p-6 bg-navy-card rounded-2xl border border-navy-border shadow-xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold-light flex items-center justify-center font-bold border border-gold/20">
              <CheckCircle2 className="w-5 h-5 text-gold" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">Privacy & Safe Inspections</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Occupant privacy protected with approximate maps; gate codes issued upon confirmed bookings.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION: LANDLORDS & AGENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-card via-navy-deep to-navy-card rounded-3xl p-8 sm:p-12 border border-navy-border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              Landlords & Certified Agents
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              List Your Properties on Nigeria's Most Trusted Portal
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Reach qualified tenants and buyers who appreciate quality homes in great neighbourhoods. Benefit from verified agent badges and streamlined inspection scheduling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/auth?tab=register&role=landlord_owner"
              className="px-6 py-3 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy-deep text-xs sm:text-sm font-black rounded-xl shadow-gold transition text-center"
            >
              Register as Landlord
            </Link>
            <Link
              to="/auth?tab=register&role=agent"
              className="px-6 py-3 bg-navy-surface hover:bg-navy-surface/80 border border-gold/40 text-gold-light hover:text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition text-center"
            >
              Register as Agent
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

