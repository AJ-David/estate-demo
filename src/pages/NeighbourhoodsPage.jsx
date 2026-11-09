import React, { useState } from 'react';
import { DEMO_NEIGHBOURHOODS } from '../data/demoData';
import { NeighbourhoodCard } from '../components/neighbourhood/NeighbourhoodCard';
import { Compass, Search, MapPin, ShieldCheck, Zap, CloudRain } from 'lucide-react';

export function NeighbourhoodsPage() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredNeighbourhoods = DEMO_NEIGHBOURHOODS.filter(n => {
    const matchesSearch = n.name.toLowerCase().includes(search.toLowerCase()) ||
                          n.city.toLowerCase().includes(search.toLowerCase()) ||
                          n.description.toLowerCase().includes(search.toLowerCase());
    const matchesCity = selectedCity === 'All' || n.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Location Intelligence Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy font-display tracking-tight">
          Nigeria's Neighbourhood Directory
        </h1>
        <p className="text-xs sm:text-sm text-estate-600 leading-relaxed">
          Detailed infrastructure diagnostics, crowd-sourced safety ratings, power stability metrics and resident discussions across key urban districts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-estate-200 p-4 shadow-subtle flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-estate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
          {['All', 'Lagos', 'Abuja'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedCity === city
                  ? 'bg-white text-navy shadow-xs'
                  : 'text-estate-600 hover:text-navy'
              }`}
            >
              {city === 'All' ? 'All Cities' : `${city}`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter neighbourhoods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none bg-sand-50/50"
          />
        </div>

      </div>

      {/* Neighbourhood Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNeighbourhoods.map(neighbourhood => (
          <NeighbourhoodCard key={neighbourhood.id} neighbourhood={neighbourhood} />
        ))}
      </div>

      {/* Trust & Methodology Footnote */}
      <div className="bg-sand-50 rounded-2xl p-6 border border-sand-200 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-estate-600">
        <div className="space-y-1 max-w-2xl">
          <span className="font-bold text-navy flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald" />
            EstateLens Neighbourhood Intelligence Methodology
          </span>
          <p className="text-[11px] leading-relaxed">
            Every metric combines historical transformer uptime datasets, flood topography mapping, and verified questionnaires submitted by vetted local residents. We do not accept sponsorship payments to inflate livability scores.
          </p>
        </div>
      </div>

    </div>
  );
}
