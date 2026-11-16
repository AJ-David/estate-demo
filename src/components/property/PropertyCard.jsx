import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatPriceDisplay } from '../../utils/formatters';
import { useSavedProperties } from '../../context/SavedPropertiesContext';
import { Badge } from '../common/Badge';

export function PropertyCard({ property, layout = 'grid' }) {
  const { isSaved, toggleSave } = useSavedProperties();
  const saved = isSaved(property.id);

  const getTransactionBadge = () => {
    switch (property.transactionType) {
      case 'rent':
        return <Badge variant="rent">For Rent</Badge>;
      case 'sale':
        return <Badge variant="sale">For Sale</Badge>;
      case 'short-let':
        return <Badge variant="shortlet">Short-Let</Badge>;
      default:
        return null;
    }
  };

  const isListLayout = layout === 'list';

  return (
    <div 
      className={`group bg-white rounded-2xl overflow-hidden border border-estate-200/90 hover:border-gold/50 hover:shadow-gold transition-all duration-300 flex ${
        isListLayout ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isListLayout ? 'md:w-72 lg:w-80 shrink-0 h-64 md:h-auto' : 'h-60'}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          {getTransactionBadge()}
          <span className="bg-navy/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            {property.category}
          </span>
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            saved 
              ? 'bg-rose-50 text-rose-600 shadow-sm' 
              : 'bg-white/80 hover:bg-white text-estate-600 hover:text-rose-600 backdrop-blur-xs'
          }`}
          title={saved ? 'Remove from saved' : 'Save property'}
          aria-label="Save property"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Verification Strip */}
        <div className="absolute bottom-3 left-3 z-10">
          {property.verificationStatus && (
            <div className="inline-flex items-center gap-1.5 bg-navy-deep/90 backdrop-blur-xs text-gold-light text-[11px] font-bold px-2.5 py-1 rounded-full border border-gold/30 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>{property.verificationStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <p className="text-xl lg:text-2xl font-bold text-navy font-display tracking-tight">
                {formatPriceDisplay(property.price, property.pricePeriod, property.transactionType)}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-estate-900 group-hover:text-gold-dark transition-colors line-clamp-1 mb-1 font-display">
            <Link to={`/properties/${property.id}`}>
              {property.title}
            </Link>
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-estate-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate">{property.location.neighbourhoodName}, {property.location.city}</span>
          </div>

          {/* Key Specs */}
          <div className="flex items-center gap-4 py-3 border-y border-estate-100 text-xs text-estate-700">
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-4 h-4 text-estate-400" />
              <span className="font-semibold">{property.bedrooms}</span>
              <span className="text-estate-400">Beds</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-4 h-4 text-estate-400" />
              <span className="font-semibold">{property.bathrooms}</span>
              <span className="text-estate-400">Baths</span>
            </div>
            {property.sizeSqm && (
              <div className="flex items-center gap-1.5" title={`${property.sizeSqm} square meters`}>
                <Maximize2 className="w-3.5 h-3.5 text-estate-400" />
                <span className="font-semibold">{property.sizeSqm}</span>
                <span className="text-estate-400">m²</span>
              </div>
            )}
          </div>
        </div>

        {/* Neighbourhood Intelligence Footer Snippet */}
        <div className="mt-4 pt-2">
          {property.neighbourhoodSnapshot && (
            <Link
              to={`/neighbourhoods/${property.neighbourhoodSnapshot.id}`}
              className="inline-flex items-center justify-between w-full bg-sand-50 hover:bg-sand-100 border border-sand-200/80 rounded-xl px-3 py-2 text-xs transition group/intel"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {property.neighbourhoodSnapshot.score}
                </span>
                <span className="text-estate-700 font-medium">
                  {property.neighbourhoodSnapshot.name} Livability
                </span>
              </div>
              <span className="text-emerald font-semibold flex items-center gap-1 group-hover/intel:translate-x-0.5 transition-transform">
                Read Intel
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-estate-400">
              Listed by: <strong className="text-estate-700">{property.agent.name.split(' ')[0]}</strong>
            </span>
            <Link
              to={`/properties/${property.id}`}
              className="text-xs font-semibold text-navy hover:text-emerald-dark inline-flex items-center gap-1"
            >
              View Property
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

