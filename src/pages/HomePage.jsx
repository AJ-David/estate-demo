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
  Building2, 
  CheckCircle2, 
  MessageSquareText, 
  Compass,
  Star,
  Activity,
  Award,
  Shield,
  Clock,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { DEMO_PROPERTIES, DEMO_NEIGHBOURHOODS, DEMO_COMMUNITY_POSTS, PROPERTY_TYPES } from '../data/demoData';
import { fetchProperties } from '../services/propertyService';
import { fetchNeighbourhoods } from '../services/neighbourhoodService';
import { fetchCommunityPosts } from '../services/communityService';
import { PropertyCard } from '../components/property/PropertyCard';
import { NeighbourhoodCard } from '../components/neighbourhood/NeighbourhoodCard';

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
  const recentCommunityPosts = communityPosts.slice(0, 3);

  // Live market activity pulse ticker items
  const liveActivities = [
    { text: 'Physical inspection completed & gate code verified in Banana Island', time: '14 mins ago', tag: 'Inspection' },
    { text: 'New 4-Bedroom LASRERA-verified Sky Villa listed on Bourdillon, Ikoyi', time: '38 mins ago', tag: 'New Listing' },
    { text: 'Verified resident published drainage clearance report on Admiralty Way', time: '1 hr ago', tag: 'Community' },
    { text: 'Tenancy agreement closed for diplomatic duplex in Maitama, Abuja', time: '2 hrs ago', tag: 'Lease Closed' },
    { text: 'Security desk checked in guest with Gate Pass #INS-892401 in Ikeja GRA', time: '3 hrs ago', tag: 'Gate Pass' }
  ];

  // Executive client testimonials
  const testimonials = [
    {
      name: 'Dr. Folake Adeleke',
      role: 'Medical Director & Resident Homeowner',
      district: 'Banana Island, Ikoyi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment: 'Before VettedHomes, agents would promise 24/7 power only for us to move in and discover the estate runs diesel for only 6 hours. The crowd-sourced power audits and water treatment metrics here saved us from a ₦25M mistake. The level of transparency is unprecedented.',
      rating: 5
    },
    {
      name: 'Engr. Babatunde Sanusi',
      role: 'Commercial Property Investor & Landlord',
      district: 'Old Ikoyi & Ikeja GRA',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      comment: 'As a landlord with multiple duplexes across Lagos, the verified inspection system is phenomenal. Prospective tenants view genuine floor plans and verified title documents beforehand. We leased our Bourdillon penthouse in 11 days with zero agency friction.',
      rating: 5
    },
    {
      name: 'Amina Bello',
      role: 'Fintech Executive & Resident',
      district: 'Maitama District, Abuja',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      comment: 'Relocating from London to Abuja was daunting with so many fake listings online. VettedHomes gave me ground-truth data on power uptime, security protocols, and water pressure before I even booked my flight. This is the only platform I trust in Nigeria.',
      rating: 5
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-navy via-navy-deep to-sand-warm border-b border-navy-border text-white">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-card/90 border border-gold/40 text-gold-light text-xs font-bold shadow-gold animate-fadeIn">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Nigeria's Premier Real Estate & Neighbourhood Intelligence Authority</span>
            </div>

            {/* Suggested Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.1]">
              Find Your Next Home. <br className="hidden sm:inline" />
              <span className="text-gold-light block sm:inline mt-1 sm:mt-0 drop-shadow-sm">
                Know Your Next Neighbourhood.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover verified luxury properties, audit ground-truth power and drainage realities, and consult genuine resident experiences before signing your lease.
            </p>

            {/* Search Box */}
            <div className="pt-2 max-w-3xl mx-auto">
              <div className="bg-navy-card/95 rounded-3xl p-3 sm:p-4 shadow-2xl border border-navy-border backdrop-blur-md">
                
                {/* Search Mode Tabs */}
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-3 pb-3 border-b border-navy-border">
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
                  <div className="md:col-span-5 relative text-left">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gold-light mb-1">
                      Location / Neighbourhood
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Banana Island, Ikoyi, Maitama, Lekki..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-navy-border text-xs sm:text-sm font-medium focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy-deep text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="md:col-span-4 text-left">
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
                      className="w-full py-3 px-5 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy-deep rounded-xl text-xs sm:text-sm font-black shadow-gold hover:shadow-gold-lg transition-all duration-200 flex items-center justify-center gap-2 group tracking-wide"
                    >
                      <Search className="w-4 h-4 text-navy-deep group-hover:scale-110 transition-transform" />
                      <span>Search Intel</span>
                    </button>
                  </div>

                </form>

                {/* Quick Neighbourhood Pills */}
                <div className="mt-3 pt-3 border-t border-navy-border/80 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  <span className="font-bold text-gold">Prime Enclaves:</span>
                  {['Banana Island', 'Ikoyi', 'Victoria Island', 'Eko Atlantic', 'Maitama Abuja', 'Asokoro', 'Lekki Phase 1', 'Ikeja GRA'].map(loc => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSearchLocation(loc)}
                      className="text-slate-200 hover:text-gold font-medium underline underline-offset-2 transition"
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

      {/* 2. LIVE MARKET ACTIVITY & VERIFIED METRICS PULSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* KPI Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-navy-card/95 backdrop-blur-md p-5 rounded-3xl border border-navy-border shadow-premium text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-light block">Vetted Property Value</span>
            <p className="text-2xl sm:text-3xl font-black text-white font-display">₦58.4 Billion+</p>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Title Checked
            </p>
          </div>

          <div className="bg-navy-card/95 backdrop-blur-md p-5 rounded-3xl border border-navy-border shadow-premium text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-light block">Verified Resident Reviews</span>
            <p className="text-2xl sm:text-3xl font-black text-white font-display">4,850+</p>
            <p className="text-[11px] text-gold font-semibold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Zero Advance Fees
            </p>
          </div>

          <div className="bg-navy-card/95 backdrop-blur-md p-5 rounded-3xl border border-navy-border shadow-premium text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-light block">Monitored Urban Districts</span>
            <p className="text-2xl sm:text-3xl font-black text-white font-display">11 Prime Zones</p>
            <p className="text-[11px] text-slate-300 font-semibold flex items-center justify-center gap-1">
              <Activity className="w-3.5 h-3.5 text-gold" /> Lagos & Abuja
            </p>
          </div>

          <div className="bg-navy-card/95 backdrop-blur-md p-5 rounded-3xl border border-navy-border shadow-premium text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-light block">Tenancy Integrity Record</span>
            <p className="text-2xl sm:text-3xl font-black text-white font-display">99.6%</p>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5" /> Dispute-Free Tenancies
            </p>
          </div>
        </div>

        {/* Live Market Pulse Bar */}
        <div className="bg-navy-card rounded-2xl p-3.5 sm:p-4 border border-navy-border shadow-premium flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-gold" />
              Live Market Activity:
            </span>
          </div>

          <div className="flex-1 overflow-x-auto w-full">
            <div className="flex items-center gap-4 whitespace-nowrap">
              {liveActivities.map((act, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-200">
                  <span className="px-2 py-0.5 rounded-full bg-navy-surface text-gold font-bold text-[10px] border border-gold/30">
                    {act.tag}
                  </span>
                  <span className="text-slate-100">{act.text}</span>
                  <span className="text-[10px] text-slate-400">({act.time})</span>
                  {idx < liveActivities.length - 1 && <span className="text-navy-border font-black">•</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* 3. FEATURED PROPERTIES */}
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
              Every home includes verified title documentation, physical inspections, and ground-truth livability metrics.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold hover:text-gold-light transition"
          >
            <span>Browse All Properties ({properties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. EXPLORE LOCATIONS (NEIGHBOURHOOD INTELLIGENCE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Neighbourhood Intelligence Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Explore Key Communities
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Understand power uptime, water quality, flood resistance, and security protocols before signing a lease.
            </p>
          </div>
          <Link
            to="/neighbourhoods"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold hover:text-gold-light transition"
          >
            <span>View All {neighbourhoods.length} Districts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topNeighbourhoods.map(neighbourhood => (
            <NeighbourhoodCard key={neighbourhood.id} neighbourhood={neighbourhood} />
          ))}
        </div>
      </section>

      {/* 5. HOW VETTEDHOMES WORKS */}
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
            <div className="bg-navy-card rounded-2xl p-6 sm:p-8 border border-navy-border shadow-xl relative">
              <span className="w-10 h-10 rounded-xl bg-navy-surface text-gold border border-navy-border font-black flex items-center justify-center font-display mb-5 shadow-xs">
                01
              </span>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Discover Verified Homes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Filter across verified houses, duplexes, serviced apartments, and short-lets with certified title status and transparent pricing.
              </p>
            </div>

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

      {/* 6. NEIGHBOURHOOD COMMUNITY PULSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy to-navy-card rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-navy-border">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
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

      {/* 7. VOICES OF THE COMMUNITY: EXECUTIVE CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">
            Verified Resident & Landlord Endorsements
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
            Voices of the Community
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            See how genuine residents and property owners experience VettedHomes across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-navy-card rounded-3xl border border-navy-border shadow-premium flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-navy-border/80 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-gold" />
                <div>
                  <h4 className="text-xs font-bold text-white font-display">{t.name}</h4>
                  <p className="text-[11px] text-gold-light">{t.role}</p>
                  <p className="text-[10px] text-slate-400">{t.district}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTITUTIONAL TRUST & REGULATORY ACCREDITATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-card/80 rounded-3xl p-6 sm:p-8 border border-navy-border shadow-premium">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-light">
              Compliance & Institutional Accreditations
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
            <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border space-y-1">
              <Shield className="w-6 h-6 text-gold mx-auto mb-1" />
              <h5 className="text-xs font-bold text-white">LASRERA Registered</h5>
              <p className="text-[10px] text-slate-400">Lagos State Real Estate Regulatory Authority • #LSR/2024/0084</p>
            </div>

            <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border space-y-1">
              <Award className="w-6 h-6 text-gold mx-auto mb-1" />
              <h5 className="text-xs font-bold text-white">REDAN Corporate Member</h5>
              <p className="text-[10px] text-slate-400">Real Estate Developers Association of Nigeria • #RD-9821</p>
            </div>

            <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border space-y-1">
              <FileCheck className="w-6 h-6 text-gold mx-auto mb-1" />
              <h5 className="text-xs font-bold text-white">NITDA NDPR Certified</h5>
              <p className="text-[10px] text-slate-400">Nigeria Data Protection Regulation Compliant Identity Vault</p>
            </div>

            <div className="p-4 bg-navy-surface rounded-2xl border border-navy-border space-y-1">
              <ShieldCheck className="w-6 h-6 text-gold mx-auto mb-1" />
              <h5 className="text-xs font-bold text-white">SCUML / EFCC Compliant</h5>
              <p className="text-[10px] text-slate-400">Anti-Money Laundering Certified • Cert #SC-194021</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION: LANDLORDS & AGENTS */}
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
