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
  Clock,
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
      className={`group bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-400 hover:shadow-lg transition-all duration-300 flex text-zinc-900 ${
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
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10 max-w-[75%]">
          {getTransactionBadge()}
          <span className="bg-white/90 backdrop-blur-xs text-zinc-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-zinc-200 shadow-xs">
            {property.category}
          </span>
          {property.marketStatus === 'recently_leased' && (
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 shadow-xs flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>{property.marketStatusLabel || 'Recently Leased'}</span>
            </span>
          )}
          {property.marketStatus === 'recently_sold' && (
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 shadow-xs flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>{property.marketStatusLabel || 'Recently Sold'}</span>
            </span>
          )}
          {property.marketStatus === 'under_escrow' && (
            <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 shadow-xs flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>Under Escrow</span>
            </span>
          )}
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer ${
            saved 
              ? 'bg-rose-600 text-white shadow-md' 
              : 'bg-white/90 hover:bg-white text-zinc-600 hover:text-rose-600 backdrop-blur-xs border border-zinc-200 shadow-xs'
          }`}
          title={saved ? 'Remove from saved' : 'Save property'}
          aria-label="Save property"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Verification Strip */}
        <div className="absolute bottom-3 left-3 z-10">
          {property.verificationStatus && (
            <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs text-zinc-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-zinc-200 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
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
              <p className="text-xl lg:text-2xl font-black text-zinc-900 font-display tracking-tight">
                {formatPriceDisplay(property.price, property.pricePeriod, property.transactionType)}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-zinc-900 hover:text-black transition-colors line-clamp-1 mb-1 font-display">
            <Link to={`/properties/${property.id}`}>
              {property.title}
            </Link>
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
            <span className="truncate">{property.location.neighbourhoodName}, {property.location.city}</span>
          </div>

          {/* Key Specs */}
          <div className="flex items-center gap-4 py-3 border-y border-zinc-200 text-xs text-zinc-600">
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-4 h-4 text-zinc-500" />
              <span className="font-semibold text-zinc-900">{property.bedrooms}</span>
              <span className="text-zinc-500">Beds</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-4 h-4 text-zinc-500" />
              <span className="font-semibold text-zinc-900">{property.bathrooms}</span>
              <span className="text-zinc-500">Baths</span>
            </div>
            {property.sizeSqm && (
              <div className="flex items-center gap-1.5" title={`${property.sizeSqm} square meters`}>
                <Maximize2 className="w-3.5 h-3.5 text-zinc-500" />
                <span className="font-semibold text-zinc-900">{property.sizeSqm}</span>
                <span className="text-zinc-500">m²</span>
              </div>
            )}
          </div>
        </div>

        {/* Neighbourhood Intelligence Footer Snippet */}
        <div className="mt-4 pt-2">
          {property.neighbourhoodSnapshot && (
            <Link
              to={`/neighbourhoods/${property.neighbourhoodSnapshot.id}`}
              className="inline-flex items-center justify-between w-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-2 text-xs transition group/intel"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-black text-white font-bold text-[10px]">
                  {property.neighbourhoodSnapshot.score}
                </span>
                <span className="text-zinc-900 font-medium">
                  {property.neighbourhoodSnapshot.name} Livability
                </span>
              </div>
              <span className="text-black font-bold flex items-center gap-1 group-hover/intel:translate-x-0.5 transition-transform">
                Read Intel
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">
              Listed by: <strong className="text-zinc-900">{property.agent?.name?.split(' ')[0] || 'Verified Agent'}</strong>
            </span>
            <Link
              to={`/properties/${property.id}`}
              className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
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
export default PropertyCard;
