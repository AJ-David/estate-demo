import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilters } from '../components/property/PropertyFilters';
import { PropertyMapView } from '../components/property/PropertyMapView';
import { Building2, SearchX, Sparkles } from 'lucide-react';
import { fetchProperties } from '../services/propertyService';

export function PropertiesPage() {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    transactionType: searchParams.get('type') || 'all',
    category: searchParams.get('category') || 'All Types',
    bedrooms: 'all',
    minPrice: '',
    maxPrice: '',
    amenities: [],
    sortBy: 'newest'
  });

  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProperties(filters).then(data => {
      if (isMounted) {
        setProperties(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      transactionType: 'all',
      category: 'All Types',
      bedrooms: 'all',
      minPrice: '',
      maxPrice: '',
      amenities: [],
      sortBy: 'newest'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          Properties in Nigeria
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Explore verified homes paired with neighbourhood power, safety and drainage insights.
        </p>
      </div>

      {/* Filter Toolbar */}
      <PropertyFilters
        filters={filters}
        setFilters={setFilters}
        totalResults={properties.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onReset={handleResetFilters}
      />

      {/* Content depending on View Mode */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-navy-border border-t-gold rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-slate-300">Scanning verified properties & neighbourhood intel...</p>
        </div>
      ) : viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map */}
          <div className="lg:col-span-7 sticky top-24">
            <PropertyMapView
              properties={properties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={setSelectedPropertyId}
            />
          </div>

          {/* Properties column next to map */}
          <div className="lg:col-span-5 space-y-4 max-h-[650px] overflow-y-auto pr-2">
            <p className="text-xs font-bold text-estate-400 uppercase tracking-wider sticky top-0 bg-navy-deep py-1 z-10">
              Matching Homes ({properties.length})
            </p>
            {properties.length === 0 ? (
              <div className="text-center py-12 bg-navy-card rounded-2xl border border-navy-border p-6 shadow-premium">
                <SearchX className="w-10 h-10 text-estate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">No properties found</p>
                <p className="text-xs text-estate-400 mt-1">Try broadening your search or resetting filters.</p>
              </div>
            ) : (
              properties.map(property => (
                <div
                  key={property.id}
                  onClick={() => setSelectedPropertyId(property.id)}
                  className={`cursor-pointer transition ${
                    selectedPropertyId === property.id ? 'ring-2 ring-gold rounded-2xl shadow-gold' : ''
                  }`}
                >
                  <PropertyCard property={property} layout="grid" />
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <>
          {properties.length === 0 ? (
            <div className="text-center py-16 bg-navy-card rounded-3xl border border-navy-border p-8 max-w-lg mx-auto shadow-premium">
              <SearchX className="w-12 h-12 text-estate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white font-display">No matching properties found</h3>
              <p className="text-xs sm:text-sm text-estate-400 mt-1 mb-5">
                We couldn't find properties matching your current criteria. Try adjusting your filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-gold hover:bg-gold-light text-navy-deep text-xs font-black rounded-xl shadow-gold tracking-wide transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'list'
                ? 'space-y-4'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            }>
              {properties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  layout={viewMode}
                />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}
