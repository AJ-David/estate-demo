import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEMO_PROPERTIES } from '../data/demoData';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilters } from '../components/property/PropertyFilters';
import { PropertyMapView } from '../components/property/PropertyMapView';
import { Building2, SearchX } from 'lucide-react';

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

  const filteredProperties = useMemo(() => {
    return DEMO_PROPERTIES.filter(property => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLoc = property.location.neighbourhoodName.toLowerCase().includes(query) ||
                           property.location.city.toLowerCase().includes(query);
        const matchesCat = property.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCat) return false;
      }

      // Transaction Type
      if (filters.transactionType !== 'all' && property.transactionType !== filters.transactionType) {
        return false;
      }

      // Category
      if (filters.category !== 'All Types' && property.category !== filters.category) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'all') {
        const beds = parseInt(filters.bedrooms, 10);
        if (property.bedrooms < beds) return false;
      }

      // Price Range
      if (filters.minPrice && property.price < parseFloat(filters.minPrice)) return false;
      if (filters.maxPrice && property.price > parseFloat(filters.maxPrice)) return false;

      // Amenities
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(a => 
          property.amenities.some(item => item.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'neighbourhood_score') {
        return (b.neighbourhoodSnapshot?.score || 0) - (a.neighbourhoodSnapshot?.score || 0);
      }
      // 'newest' default
      return new Date(b.listingDate) - new Date(a.listingDate);
    });
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
        <h1 className="text-2xl sm:text-3xl font-black text-navy font-display">
          Properties in Nigeria
        </h1>
        <p className="text-xs sm:text-sm text-estate-600 mt-1">
          Explore verified homes paired with neighbourhood power, safety and drainage insights.
        </p>
      </div>

      {/* Filter Toolbar */}
      <PropertyFilters
        filters={filters}
        setFilters={setFilters}
        totalResults={filteredProperties.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onReset={handleResetFilters}
      />

      {/* Content depending on View Mode */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map */}
          <div className="lg:col-span-7 sticky top-24">
            <PropertyMapView
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={setSelectedPropertyId}
            />
          </div>

          {/* Properties column next to map */}
          <div className="lg:col-span-5 space-y-4 max-h-[650px] overflow-y-auto pr-2">
            <p className="text-xs font-bold text-estate-500 uppercase tracking-wider sticky top-0 bg-sand-warm py-1 z-10">
              Matching Homes ({filteredProperties.length})
            </p>
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-estate-200 p-6">
                <SearchX className="w-10 h-10 text-estate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No properties found</p>
                <p className="text-xs text-estate-500 mt-1">Try broadening your search or resetting filters.</p>
              </div>
            ) : (
              filteredProperties.map(property => (
                <div
                  key={property.id}
                  onClick={() => setSelectedPropertyId(property.id)}
                  className={`cursor-pointer transition ${
                    selectedPropertyId === property.id ? 'ring-2 ring-emerald rounded-2xl' : ''
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
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-estate-200 p-8 max-w-lg mx-auto shadow-subtle">
              <SearchX className="w-12 h-12 text-estate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy font-display">No matching properties found</h3>
              <p className="text-xs sm:text-sm text-estate-500 mt-1 mb-5">
                We couldn't find properties matching your current criteria. Try adjusting your filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition"
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
              {filteredProperties.map(property => (
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
