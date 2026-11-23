import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  MessageSquareText, 
  Compass,
  Star,
  Activity,
  Award
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
    { text: 'New 4-Bedroom verified Sky Villa listed on Bourdillon, Ikoyi', time: '38 mins ago', tag: 'New Listing' },
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
    <div className="space-y-16 pb-20 bg-white text-zinc-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-white via-zinc-50 to-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Nigeria's Premier Real Estate & Neighbourhood Intelligence Portal</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight font-display leading-[1.1]">
              Find Your Next Home. <br className="hidden sm:inline" />
              <span className="text-zinc-600 block sm:inline mt-1 sm:mt-0">
                Know Your Next Neighbourhood.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover verified luxury properties, audit ground-truth power and drainage realities, and consult genuine resident experiences before signing your lease.
            </p>

            {/* Search Box */}
            <div className="pt-2 max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-zinc-200">
                
                {/* Search Mode Tabs */}
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-4 pb-3 border-b border-zinc-100">
                  {[
                    { label: 'Rent a Home', value: 'rent' },
                    { label: 'Buy Property', value: 'sale' },
                    { label: 'Short-Let', value: 'short-let' }
                  ].map(tab => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setTransactionType(tab.value)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                        transactionType === tab.value
                          ? 'bg-black text-white shadow-xs'
                          : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
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
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-zinc-700 mb-1">
                      Location / Neighbourhood
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Banana Island, Ikoyi, Maitama, Lekki..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm font-medium focus:ring-1 focus:ring-black focus:border-black outline-none bg-zinc-50 text-zinc-900 placeholder:text-zinc-400"
                      />
                    </div>
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="md:col-span-4 text-left">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-zinc-700 mb-1">
                      Property Category
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm font-medium focus:ring-1 focus:ring-black focus:border-black outline-none bg-zinc-50 text-zinc-900"
                    >
                      {PROPERTY_TYPES.map(cat => (
                        <option key={cat} value={cat} className="bg-white text-zinc-900">{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Search CTA */}
                  <div className="md:col-span-3 pt-2 md:pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 px-5 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all duration-200 flex items-center justify-center gap-2 group tracking-wide cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                      <span>Search Intel</span>
                    </button>
                  </div>

                </form>

                {/* Quick Neighbourhood Pills */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                  <span className="font-bold text-zinc-900">Prime Enclaves:</span>
                  {['Banana Island', 'Ikoyi', 'Victoria Island', 'Eko Atlantic', 'Maitama Abuja', 'Asokoro', 'Lekki Phase 1', 'Ikeja GRA'].map(loc => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => { setSearchLocation(loc); navigate(`/properties?search=${encodeURIComponent(loc)}`); }}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 text-xs font-medium transition cursor-pointer"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* KPI Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Vetted Property Value</span>
            <p className="text-2xl sm:text-3xl font-black text-zinc-900 font-display">₦58.4 Billion+</p>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Title Checked
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Verified Resident Reviews</span>
            <p className="text-2xl sm:text-3xl font-black text-zinc-900 font-display">4,850+</p>
            <p className="text-[11px] text-zinc-700 font-semibold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" /> Zero Advance Fees
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Monitored Urban Districts</span>
            <p className="text-2xl sm:text-3xl font-black text-zinc-900 font-display">11 Prime Zones</p>
            <p className="text-[11px] text-zinc-600 font-semibold flex items-center justify-center gap-1">
              <Activity className="w-3.5 h-3.5 text-black" /> Lagos & Abuja
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Tenancy Integrity Record</span>
            <p className="text-2xl sm:text-3xl font-black text-zinc-900 font-display">99.6%</p>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5" /> Dispute-Free Tenancies
            </p>
          </div>
        </div>

        {/* Live Market Pulse Bar */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-zinc-700" />
              Live Market Activity:
            </span>
          </div>

          <div className="flex-1 overflow-x-auto w-full">
            <div className="flex items-center gap-4 whitespace-nowrap">
              {liveActivities.map((act, idx) => (
                <div key={idx} className="flex items-center gap-2 text-zinc-700">
                  <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-900 font-bold text-[10px] border border-zinc-200">
                    {act.tag}
                  </span>
                  <span className="text-zinc-800">{act.text}</span>
                  <span className="text-[10px] text-zinc-400">({act.time})</span>
                  {idx < liveActivities.length - 1 && <span className="text-zinc-300 font-black">•</span>}
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
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-zinc-700" />
              <span>Curated Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 font-display">
              Featured Verified Properties
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Every home includes verified title documentation, physical inspections, and ground-truth livability metrics.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:underline transition"
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
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-zinc-700" />
              <span>Neighbourhood Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 font-display">
              Explore Key Communities
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Understand power uptime, water quality, flood resistance, and security protocols before signing a lease.
            </p>
          </div>
          <Link
            to="/neighbourhoods"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:underline transition"
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
      <section id="how-it-works" className="bg-zinc-50 py-16 sm:py-20 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Transparent Decision Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 font-display mt-1">
              How VettedHomes Works
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              A transparent, community-grounded journey designed to eliminate blind leasing and property regrets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-sm relative">
              <span className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 font-black flex items-center justify-center font-display mb-5 shadow-xs">
                01
              </span>
              <h3 className="text-lg font-bold text-zinc-900 font-display mb-2">
                Discover Verified Homes
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Filter across verified houses, duplexes, serviced apartments, and short-lets with certified title status and transparent pricing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-400 shadow-md relative ring-1 ring-zinc-300">
              <div className="absolute -top-3 right-6 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                Key Distinction
              </div>
              <span className="w-10 h-10 rounded-xl bg-black text-white font-black flex items-center justify-center font-display mb-5 shadow-xs">
                02
              </span>
              <h3 className="text-lg font-bold text-zinc-900 font-display mb-2">
                Know The Real Neighbourhood
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Read crowd-sourced resident data on power uptime, road conditions, drainage flood risks, and gated security protocols.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-sm relative">
              <span className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 font-black flex items-center justify-center font-display mb-5 shadow-xs">
                03
              </span>
              <h3 className="text-lg font-bold text-zinc-900 font-display mb-2">
                Schedule Safe Inspections
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Connect directly with certified agents or landlords. Book physical inspections with verified estate security gate passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEIGHBOURHOOD COMMUNITY PULSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-zinc-800">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold shadow-xs">
                <MessageSquareText className="w-3.5 h-3.5 text-white" />
                <span>The Community Pulse</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-snug">
                Real Residents. <br />
                Real Feedback. <br />
                Zero Sales Fluff.
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Ask questions before you sign. Compare internet latency, transformer stability, flood resilience, and landlord responsiveness from people living there.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/community"
                  className="px-5 py-2.5 bg-white hover:bg-zinc-100 text-black text-xs sm:text-sm font-bold rounded-xl shadow-xs transition text-center"
                >
                  Join Community Discussions
                </Link>
                <Link
                  to="/neighbourhoods"
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition text-center"
                >
                  Browse Locations
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {recentCommunityPosts.map(post => (
                <div key={post.id} className="bg-zinc-900/90 text-white rounded-2xl p-5 shadow-sm border border-zinc-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      {post.author.name} ({post.author.badge})
                    </span>
                    <span className="text-zinc-400 text-[11px]">{post.createdAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display mb-1">{post.title}</h4>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">{post.content}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. VOICES OF THE COMMUNITY: EXECUTIVE CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Verified Resident & Landlord Endorsements
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 font-display mt-1">
            Voices of the Community
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            See how genuine residents and property owners experience VettedHomes across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-300" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 font-display">{t.name}</h4>
                  <p className="text-[11px] text-zinc-600">{t.role}</p>
                  <p className="text-[10px] text-zinc-400">{t.district}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION: LANDLORDS & AGENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Landlords & Certified Agents
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              List Your Properties on Nigeria's Most Trusted Portal
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Reach qualified tenants and buyers who appreciate quality homes in great neighbourhoods. Benefit from verified agent badges and streamlined inspection scheduling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/auth?tab=register&role=landlord_owner"
              className="px-6 py-3 bg-white hover:bg-zinc-100 text-black text-xs sm:text-sm font-bold rounded-xl shadow-xs transition text-center"
            >
              Register as Landlord
            </Link>
            <Link
              to="/auth?tab=register&role=agent"
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition text-center"
            >
              Register as Agent
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
export default HomePage;
