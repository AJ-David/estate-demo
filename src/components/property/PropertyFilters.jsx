import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Map, 
  X, 
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { PROPERTY_TYPES, TRANSACTION_TYPES } from '../../data/demoData';

export function PropertyFilters({
  filters,
  setFilters,
  totalResults,
  viewMode,
  setViewMode,
  onReset
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const amenitiesList = [
    '24/7 Gated Security',
    'Treated Water System',
    'Dedicated Transformer',
    'Swimming Pool',
    'Fiber Optic Ready',
    'Flood-Free Street'
  ];

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    setFilters(prev => ({ ...prev, amenities: updated }));
  };

  return (
    <div className="bg-white rounded-2xl border border-estate-200 shadow-subtle p-4 lg:p-6 mb-8 transition-all">
      {/* Top Bar: Primary Search & Transaction Switch */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pb-4 border-b border-estate-100">
        
        {/* Transaction Type Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-estate-100 rounded-xl overflow-x-auto">
          {TRANSACTION_TYPES.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, transactionType: t.value }))}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filters.transactionType === t.value
                  ? 'bg-white text-navy shadow-xs'
                  : 'text-estate-600 hover:text-navy'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-estate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by neighbourhood (e.g. Lekki, Yaba, Ikeja, Maitama) or keyword..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-estate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent bg-sand-50/50"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-estate-400 hover:text-estate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-estate-100 rounded-xl border border-estate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-white text-emerald shadow-xs' : 'text-estate-500 hover:text-navy'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'list' ? 'bg-white text-emerald shadow-xs' : 'text-estate-500 hover:text-navy'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition flex items-center gap-1 px-2.5 ${
                viewMode === 'map' ? 'bg-white text-emerald shadow-xs' : 'text-estate-500 hover:text-navy'
              }`}
              title="Interactive Map View"
            >
              <Map className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Map</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition ${
              showAdvanced || (filters.category !== 'All Types' || filters.bedrooms !== 'all' || filters.amenities?.length > 0)
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                : 'border-estate-200 text-estate-700 hover:bg-estate-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

      </div>

      {/* Secondary Bar: Quick Dropdowns & Results Count */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Property Category */}
          <div className="flex items-center gap-1.5">
            <span className="text-estate-500 font-medium">Type:</span>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="py-1.5 px-2.5 rounded-lg border border-estate-200 text-xs font-medium text-estate-800 bg-white focus:outline-none focus:ring-1 focus:ring-emerald"
            >
              {PROPERTY_TYPES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div className="flex items-center gap-1.5">
            <span className="text-estate-500 font-medium">Beds:</span>
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
              className="py-1.5 px-2.5 rounded-lg border border-estate-200 text-xs font-medium text-estate-800 bg-white focus:outline-none focus:ring-1 focus:ring-emerald"
            >
              <option value="all">Any Beds</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-1.5">
            <span className="text-estate-500 font-medium">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="py-1.5 px-2.5 rounded-lg border border-estate-200 text-xs font-medium text-estate-800 bg-white focus:outline-none focus:ring-1 focus:ring-emerald"
            >
              <option value="newest">Newest Listed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="neighbourhood_score">Top Livability Score</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-estate-500">
            Showing <strong className="text-navy">{totalResults}</strong> properties
          </span>
          {(filters.search || filters.category !== 'All Types' || filters.bedrooms !== 'all' || filters.transactionType !== 'all' || filters.amenities?.length > 0) && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-emerald font-semibold hover:text-emerald-dark"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Expandable Advanced Filter Drawer */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-estate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Price Range */}
          <div>
            <label className="block text-xs font-bold text-estate-800 mb-2">
              Price Range (₦)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min Price (₦)"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-estate-200 text-xs focus:ring-1 focus:ring-emerald outline-none"
              />
              <span className="text-estate-400 font-bold">—</span>
              <input
                type="number"
                placeholder="Max Price (₦)"
                value={filters.maxPrice || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-estate-200 text-xs focus:ring-1 focus:ring-emerald outline-none"
              />
            </div>
          </div>

          {/* Key Amenities Checkboxes */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-estate-800 mb-2">
              Desired Infrastructure & Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map(item => {
                const checked = filters.amenities?.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleAmenityToggle(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      checked
                        ? 'bg-emerald text-white shadow-xs'
                        : 'bg-estate-50 text-estate-700 hover:bg-estate-100 border border-estate-200'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

