import React, { useState } from 'react';
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
import { PropertyCard } from '../components/property/PropertyCard';
import { NeighbourhoodCard } from '../components/neighbourhood/NeighbourhoodCard';
import { PostCard } from '../components/community/PostCard';

export function HomePage() {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState('rent');
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (transactionType && transactionType !== 'all') params.set('type', transactionType);
    if (searchLocation) params.set('search', searchLocation);
    if (propertyType && propertyType !== 'All Types') params.set('category', propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  const featuredProperties = DEMO_PROPERTIES.filter(p => p.featured).slice(0, 3);
  const topNeighbourhoods = DEMO_NEIGHBOURHOODS.slice(0, 3);
  const recentCommunityPosts = DEMO_COMMUNITY_POSTS.slice(0, 2);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-white via-sand-50/80 to-sand-warm border-b border-estate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs animate-fadeIn">
              <Sparkles className="w-4 h-4 text-emerald" />
              <span>Property Discovery Meets Neighbourhood Truth</span>
            </div>

            {/* Suggested Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy tracking-tight font-display leading-[1.1]">
              Find Your Next Home. <br className="hidden sm:inline" />
              <span className="text-emerald">Know Your Next Neighbourhood.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-estate-600 max-w-2xl mx-auto leading-relaxed">
              Discover properties, explore neighbourhoods and hear real experiences before making your next property decision.
            </p>

            {/* PROMINENT PROPERTY SEARCH BAR */}
            <div className="pt-4 max-w-3xl mx-auto">
              <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-premium border border-estate-200/90 text-left">
                
                {/* Transaction Tabs */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-estate-100">
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
                          ? 'bg-navy text-white shadow-xs'
                          : 'text-estate-600 hover:text-navy hover:bg-estate-50'
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
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-estate-400 mb-1">
                      Location / Neighbourhood
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-emerald absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Lekki, Yaba, Ikeja, Maitama..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-estate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald outline-none bg-sand-50/50"
                      />
                    </div>
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="md:col-span-4">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-estate-400 mb-1">
                      Property Category
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-estate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald outline-none bg-white text-estate-800"
                    >
                      {PROPERTY_TYPES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Search CTA */}
                  <div className="md:col-span-3 pt-2 md:pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 px-5 bg-emerald hover:bg-emerald-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Search Intel</span>
                    </button>
                  </div>

                </form>

                {/* Quick Neighbourhood Pills */}
                <div className="mt-3 pt-3 border-t border-estate-100 flex flex-wrap items-center gap-2 text-xs text-estate-500">
                  <span className="font-semibold text-estate-400">Popular:</span>
                  {['Lekki Phase 1', 'Yaba', 'Ikeja GRA', 'Maitama Abuja', 'Surulere'].map(loc => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSearchLocation(loc);
                      }}
                      className="text-estate-700 hover:text-emerald font-medium underline underline-offset-2"
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
            <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Curated Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy font-display">
              Featured Verified Properties
            </h2>
            <p className="text-xs sm:text-sm text-estate-500 mt-1">
              Every home includes verified inspections and verified neighbourhood livability metrics.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-emerald transition"
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
            <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Neighbourhood Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy font-display">
              Explore Key Communities
            </h2>
            <p className="text-xs sm:text-sm text-estate-500 mt-1">
              Understand power uptime, water quality, safety, and flood vulnerability before signing a lease.
            </p>
          </div>
          <Link
            to="/neighbourhoods"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-emerald transition"
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
      <section id="how-it-works" className="bg-sand-100 py-16 sm:py-20 border-y border-estate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald uppercase tracking-wider">
              Smart Real Estate Decision Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy font-display mt-1">
              How VettedHomes Works
            </h2>
            <p className="text-xs sm:text-sm text-estate-600 mt-2">
              A transparent, community-grounded journey designed to eliminate blind leasing and property regrets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-estate-200/80 shadow-subtle relative">
              <span className="w-10 h-10 rounded-xl bg-navy text-white font-bold flex items-center justify-center font-display mb-5 shadow-xs">
                01
              </span>
              <h3 className="text-lg font-bold text-navy font-display mb-2">
                Discover Verified Homes
              </h3>
              <p className="text-xs sm:text-sm text-estate-600 leading-relaxed">
                Filter across verified houses, duplexes, serviced apartments, and short-lets with authentic photos and transparent pricing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-300 shadow-premium relative ring-1 ring-emerald-500/20">
              <div className="absolute -top-3 right-6 bg-emerald text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                Signature Feature
              </div>
              <span className="w-10 h-10 rounded-xl bg-emerald text-white font-bold flex items-center justify-center font-display mb-5 shadow-xs">
                02
              </span>
              <h3 className="text-lg font-bold text-navy font-display mb-2">
                Know The Real Neighbourhood
              </h3>
              <p className="text-xs sm:text-sm text-estate-600 leading-relaxed">
                Read crowd-sourced resident data on power uptime, road conditions, drainage flood risks, and gated security protocols.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-estate-200/80 shadow-subtle relative">
              <span className="w-10 h-10 rounded-xl bg-navy text-white font-bold flex items-center justify-center font-display mb-5 shadow-xs">
                03
              </span>
              <h3 className="text-lg font-bold text-navy font-display mb-2">
                Schedule Safe Inspections
              </h3>
              <p className="text-xs sm:text-sm text-estate-600 leading-relaxed">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald/20 border border-emerald/40 text-emerald-light text-xs font-semibold">
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>The Community Pulse</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-snug">
                Real Residents. <br />
                Real Feedback. <br />
                Zero Sales Fluff.
              </h2>

              <p className="text-xs sm:text-sm text-estate-300 leading-relaxed">
                Ask questions before you sign. Compare internet latency, transformer stability, flood resilience, and landlord responsiveness from people living there.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/community"
                  className="px-5 py-2.5 bg-emerald hover:bg-emerald-dark text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition text-center"
                >
                  Join Community Discussions
                </Link>
                <Link
                  to="/neighbourhoods"
                  className="px-5 py-2.5 bg-navy-surface hover:bg-navy-surface/80 border border-navy-border text-white text-xs sm:text-sm font-semibold rounded-xl transition text-center"
                >
                  Browse Locations
                </Link>
              </div>
            </div>

            {/* Right Feed Snippet */}
            <div className="lg:col-span-7 space-y-4">
              {recentCommunityPosts.map(post => (
                <div key={post.id} className="bg-white text-estate-900 rounded-2xl p-5 shadow-lg border border-estate-100">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-navy flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
                      {post.author.name} ({post.author.badge})
                    </span>
                    <span className="text-estate-400 text-[11px]">{post.createdAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-navy font-display mb-1">{post.title}</h4>
                  <p className="text-xs text-estate-600 line-clamp-2 leading-relaxed">{post.content}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE VETTEDHOMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald uppercase tracking-wider">
            Built for Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy font-display mt-1">
            Why VettedHomes is Different
          </h2>
          <p className="text-xs sm:text-sm text-estate-600 mt-2">
            Generic portals display photos. VettedHomes shows you the living reality of the neighbourhood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-estate-200 shadow-subtle space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-navy font-display">Power & Grid Tracking</h4>
            <p className="text-xs text-estate-600 leading-relaxed">
              Track actual public grid availability hours and generator requirements per street.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-estate-200 shadow-subtle space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <CloudRain className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-navy font-display">Flood History & Drainage</h4>
            <p className="text-xs text-estate-600 leading-relaxed">
              Identify streets with elevated drainage canals versus low-lying pooling zones.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-estate-200 shadow-subtle space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-navy font-display">Resident-Verified Intel</h4>
            <p className="text-xs text-estate-600 leading-relaxed">
              Discussions are tagged by verified resident status to filter out marketing fluff.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-estate-200 shadow-subtle space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-navy font-display">Privacy & Safe Inspections</h4>
            <p className="text-xs text-estate-600 leading-relaxed">
              Occupant privacy protected with approximate maps; gate codes issued upon confirmed bookings.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION: LANDLORDS & AGENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand-100 rounded-3xl p-8 sm:p-12 border border-sand-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-emerald uppercase tracking-wider">
              Landlords & Certified Agents
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-navy font-display">
              List Your Properties on Nigeria's Most Trusted Portal
            </h3>
            <p className="text-xs sm:text-sm text-estate-600 leading-relaxed">
              Reach qualified tenants and buyers who appreciate quality homes in great neighbourhoods. Benefit from verified agent badges and streamlined inspection scheduling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/auth?tab=register&role=landlord_owner"
              className="px-6 py-3 bg-navy hover:bg-estate-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition text-center"
            >
              Register as Landlord
            </Link>
            <Link
              to="/auth?tab=register&role=agent"
              className="px-6 py-3 bg-white hover:bg-estate-50 border border-estate-200 text-navy text-xs sm:text-sm font-bold rounded-xl shadow-xs transition text-center"
            >
              Register as Agent
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

