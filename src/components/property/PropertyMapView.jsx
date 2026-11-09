import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Bed, Bath, ArrowRight, EyeOff } from 'lucide-react';
import { formatCurrency, formatPriceDisplay } from '../../utils/formatters';

// Custom price pill marker generator
const createPriceIcon = (price, isSelected = false) => {
  const formatted = price >= 1000000 ? `₦${(price / 1000000).toFixed(1)}M` : `₦${(price / 1000).toFixed(0)}k`;
  
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${isSelected ? '#059669' : '#0E1A2B'};
        color: white;
        padding: 4px 8px;
        border-radius: 9999px;
        font-weight: 700;
        font-size: 11px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        border: 2px solid white;
        white-space: nowrap;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        transition: transform 0.2s;
      ">
        <span>${formatted}</span>
      </div>
    `,
    iconSize: [40, 24],
    iconAnchor: [20, 12]
  });
};

export function PropertyMapView({ properties, selectedPropertyId, onSelectProperty }) {
  const [activeProperty, setActiveProperty] = useState(null);

  // Center on Lagos default
  const defaultCenter = [6.4698, 3.4500];

  useEffect(() => {
    if (selectedPropertyId) {
      const match = properties.find(p => p.id === selectedPropertyId);
      if (match) setActiveProperty(match);
    }
  }, [selectedPropertyId, properties]);

  return (
    <div className="relative w-full h-[650px] rounded-2xl overflow-hidden border border-estate-200 shadow-premium">
      {/* Privacy Notice Banner */}
      <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-estate-200 text-xs shadow-md flex items-center gap-2 max-w-sm">
        <EyeOff className="w-4 h-4 text-emerald shrink-0" />
        <span className="text-estate-700">
          <strong>Privacy Preserved:</strong> Markers reflect neighbourhood zones. Exact residential gates are protected until verified inspection booking.
        </span>
      </div>

      <MapContainer
        center={properties.length > 0 ? [properties[0].location.coordinates.lat, properties[0].location.coordinates.lng] : defaultCenter}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties.map(property => {
          const coords = [property.location.coordinates.lat, property.location.coordinates.lng];
          const isSelected = activeProperty?.id === property.id;

          return (
            <React.Fragment key={property.id}>
              {/* Approximate privacy perimeter circle */}
              <Circle
                center={coords}
                radius={250}
                pathOptions={{
                  color: isSelected ? '#059669' : '#3B82F6',
                  fillColor: isSelected ? '#10B981' : '#60A5FA',
                  fillOpacity: 0.15,
                  weight: 1
                }}
              />

              <Marker
                position={coords}
                icon={createPriceIcon(property.price, isSelected)}
                eventHandlers={{
                  click: () => {
                    setActiveProperty(property);
                    if (onSelectProperty) onSelectProperty(property.id);
                  }
                }}
              >
                <Popup className="custom-popup" minWidth={240}>
                  <div className="p-1">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-28 object-cover rounded-lg mb-2"
                    />
                    <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{property.verificationStatus}</span>
                    </div>
                    <h4 className="text-sm font-bold text-estate-900 line-clamp-1 mb-1 font-display">
                      {property.title}
                    </h4>
                    <p className="text-sm font-extrabold text-navy mb-2">
                      {formatPriceDisplay(property.price, property.pricePeriod, property.transactionType)}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-estate-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5" /> {property.bedrooms} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5" /> {property.bathrooms} Baths
                      </span>
                    </div>
                    <Link
                      to={`/properties/${property.id}`}
                      className="block text-center w-full py-1.5 px-3 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-emerald transition"
                    >
                      View Details & Intel
                    </Link>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Floating Property Card on Active Pin */}
      {activeProperty && (
        <div className="hidden lg:block absolute bottom-6 right-6 z-20 w-80 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-estate-200 shadow-2xl animate-fadeIn">
          <div className="relative mb-3">
            <img
              src={activeProperty.images[0]}
              alt={activeProperty.title}
              className="w-full h-36 object-cover rounded-xl"
            />
            <span className="absolute top-2 left-2 bg-navy text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {activeProperty.category}
            </span>
          </div>
          <p className="text-lg font-bold text-navy font-display">
            {formatPriceDisplay(activeProperty.price, activeProperty.pricePeriod, activeProperty.transactionType)}
          </p>
          <h4 className="text-xs font-bold text-estate-800 line-clamp-1 mt-0.5">
            {activeProperty.title}
          </h4>
          <p className="text-[11px] text-estate-500 mb-3">
            {activeProperty.location.neighbourhoodName}, {activeProperty.location.city}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-estate-100">
            <Link
              to={`/neighbourhoods/${activeProperty.location.neighbourhoodId}`}
              className="text-xs text-emerald font-semibold hover:underline"
            >
              Neighbourhood Intel
            </Link>
            <Link
              to={`/properties/${activeProperty.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-emerald"
            >
              Full Page
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
