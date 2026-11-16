import React, { useState, useEffect } from 'react';
import { NeighbourhoodCard } from '../components/neighbourhood/NeighbourhoodCard';
import { Compass, Search, MapPin, ShieldCheck, Zap, CloudRain, Loader2, Sparkles, Building2 } from 'lucide-react';
import { fetchNeighbourhoods } from '../services/neighbourhoodService';

export function NeighbourhoodsPage() {
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [sortBy, setSortBy] = useState('livability'); // 'livability', 'listings', 'name'

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchNeighbourhoods().then(data => {
      if (isMounted) {
        setNeighbourhoods(data);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const filteredNeighbourhoods = neighbourhoods
    .filter(n => {
      const matchesSearch = n.name.toLowerCase().includes(search.toLowerCase()) ||
                            n.city.toLowerCase().includes(search.toLowerCase()) ||
                            n.description.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === 'All' || n.city.toLowerCase() === selectedCity.toLowerCase();
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (sortBy === 'livability') return (b.livabilityScore || 0) - (a.livabilityScore || 0);
      if (sortBy === 'listings') return (b.activeListingsCount || 0) - (a.activeListingsCount || 0);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Location Intelligence Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
          Nigeria's Neighbourhood Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Detailed infrastructure diagnostics, crowd-sourced safety ratings, power stability metrics and resident discussions across key urban districts in Lagos and Abuja.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-navy-card rounded-3xl border border-navy-border p-4 shadow-premium flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-navy-surface rounded-2xl w-full md:w-auto overflow-x-auto border border-navy-border">
          {['All', 'Lagos', 'Abuja'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCity === city
                  ? 'bg-gold text-navy-deep font-black shadow-gold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {city === 'All' ? 'All Cities' : `${city}`}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search districts, streets, vibes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-navy-border rounded-xl text-xs focus:ring-1 focus:ring-gold outline-none bg-navy-deep text-white"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-navy-surface border border-navy-border rounded-xl text-xs font-semibold text-estate-200 outline-none"
          >
            <option value="livability">Sort: Highest Livability Score</option>
            <option value="listings">Sort: Most Available Listings</option>
            <option value="name">Sort: Alphabetical (A-Z)</option>
          </select>
        </div>

      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto" />
          <p className="text-xs font-semibold text-estate-400">Querying verified neighbourhood diagnostics...</p>
        </div>
      ) : filteredNeighbourhoods.length === 0 ? (
        <div className="text-center py-16 bg-navy-card rounded-3xl border border-navy-border p-8 shadow-premium">
          <p className="text-sm font-bold text-white">No neighbourhoods match your criteria</p>
          <p className="text-xs text-estate-400 mt-1 mb-4">Try clearing search keywords or selecting "All Cities".</p>
          <button
            type="button"
            onClick={() => { setSearch(''); setSelectedCity('All'); }}
            className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-deep text-xs font-black rounded-xl transition shadow-gold tracking-wide"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Neighbourhood Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighbourhoods.map(neighbourhood => (
            <NeighbourhoodCard key={neighbourhood.id} neighbourhood={neighbourhood} />
          ))}
        </div>
      )}

      {/* Trust & Methodology Footnote */}
      <div className="bg-navy-card rounded-3xl p-6 border border-navy-border flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-estate-400">
        <div className="space-y-1.5 max-w-2xl">
          <span className="font-bold text-white flex items-center gap-1.5 text-sm">
            <ShieldCheck className="w-4 h-4 text-gold" />
            VettedHomes Neighbourhood Intelligence Methodology
          </span>
          <p className="text-[11px] leading-relaxed text-estate-400">
            Every metric combines historical transformer uptime datasets, flood topography mapping, and verified questionnaires submitted by vetted local residents. We do not accept sponsorship payments to inflate livability scores.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <div className="p-3 bg-navy-surface rounded-2xl border border-navy-border text-center">
            <span className="text-[10px] text-estate-400 block font-semibold">Tracked Enclaves</span>
            <span className="text-base font-black text-white">{neighbourhoods.length} Districts</span>
          </div>
          <div className="p-3 bg-navy-surface rounded-2xl border border-navy-border text-center">
            <span className="text-[10px] text-estate-400 block font-semibold">Active Verifiers</span>
            <span className="text-base font-black text-gold">1,240+ Residents</span>
          </div>
        </div>
      </div>

    </div>
  );
}
