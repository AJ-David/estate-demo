import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  Bed, 
  Bath, 
  ArrowRight, 
  EyeOff, 
  Layers, 
  Navigation,
  School,
  HeartPulse,
  ShoppingBag,
  Bus,
  Landmark,
  Compass,
  X
} from 'lucide-react';
import { formatPriceDisplay } from '../../utils/formatters';
import { NEIGHBOURHOOD_BOUNDARIES, NEIGHBOURHOOD_FACILITIES } from '../../services/neighbourhoodService';

// Controller to smoothly pan & zoom map
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2) {
      map.flyTo(center, zoom || 13, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom Leaflet Price Pill Marker
const createPriceIcon = (price, isSelected = false) => {
  const formatted = price >= 1000000 
    ? `₦${(price / 1000000).toFixed(1)}M` 
    : `₦${(price / 1000).toFixed(0)}k`;
  
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${isSelected ? '#059669' : '#0E1A2B'};
        color: white;
        padding: 5px 10px;
        border-radius: 9999px;
        font-weight: 800;
        font-size: 11px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.3);
        border: 2px solid ${isSelected ? '#ffffff' : '#e2e8f0'};
        white-space: nowrap;
        transform: translate(-50%, -50%) ${isSelected ? 'scale(1.15)' : 'scale(1)'};
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background-color:${isSelected ? '#6ee7b7' : '#10b981'};"></span>
        <span>${formatted}</span>
      </div>
    `,
    iconSize: [45, 26],
    iconAnchor: [22, 13]
  });
};

// Custom Leaflet Facility Marker
const createFacilityIcon = (type) => {
  let bg = '#4F46E5';
  let symbol = '🏥';

  if (type === 'Healthcare') {
    bg = '#EF4444';
    symbol = '🏥';
  } else if (type === 'Education') {
    bg = '#3B82F6';
    symbol = '🏫';
  } else if (type === 'Shopping') {
    bg = '#F59E0B';
    symbol = '🛒';
  } else if (type === 'Transit') {
    bg = '#10B981';
    symbol = '🚌';
  } else if (type === 'Bank') {
    bg = '#065F46';
    symbol = '🏦';
  } else if (type === 'Tech' || type === 'Diplomacy') {
    bg = '#8B5CF6';
    symbol = '🏛️';
  }

  return L.divIcon({
    className: 'custom-facility-marker',
    html: `
      <div style="
        background-color: ${bg};
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        border: 2px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.25);
        cursor: pointer;
        transform: translate(-50%, -50%);
      ">
        <span>${symbol}</span>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

const NEIGHBOURHOOD_CENTERS = [
  { id: 'all-lagos', name: 'All Lagos Overview', coords: [6.4698, 3.4500], zoom: 11 },
  { id: 'lekki-phase-1', name: 'Lekki Phase 1', coords: [6.4474, 3.4849], zoom: 14 },
  { id: 'yaba', name: 'Yaba Corridor', coords: [6.5095, 3.3711], zoom: 14 },
  { id: 'ikeja-gra', name: 'Ikeja GRA', coords: [6.5922, 3.3553], zoom: 14 },
  { id: 'maitama-abuja', name: 'Maitama Abuja', coords: [9.0882, 7.4985], zoom: 14 },
  { id: 'surulere', name: 'Surulere', coords: [6.4969, 3.3551], zoom: 14 }
];

export function PropertyMapView({ 
  properties = [], 
  selectedPropertyId = null, 
  onSelectProperty = null,
  activeNeighbourhoodId = null,
  height = '680px'
}) {
  const [activeProperty, setActiveProperty] = useState(null);
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('all-lagos');
  const [mapCenter, setMapCenter] = useState([6.4698, 3.4500]);
  const [mapZoom, setMapZoom] = useState(12);

  // Facility filter toggles
  const [visibleFacilities, setVisibleFacilities] = useState({
    Healthcare: true,
    Education: true,
    Shopping: true,
    Transit: true,
    Bank: false
  });

  const [showFacilitiesLayer, setShowFacilitiesLayer] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);

  // Sync selectedPropertyId
  useEffect(() => {
    if (selectedPropertyId) {
      const match = properties.find(p => p.id === selectedPropertyId);
      if (match) {
        setActiveProperty(match);
        setMapCenter([match.location.coordinates.lat, match.location.coordinates.lng]);
        setMapZoom(15);
      }
    }
  }, [selectedPropertyId, properties]);

  // Sync activeNeighbourhoodId
  useEffect(() => {
    if (activeNeighbourhoodId) {
      const match = NEIGHBOURHOOD_CENTERS.find(n => n.id === activeNeighbourhoodId);
      if (match) {
        setSelectedNeighbourhood(match.id);
        setMapCenter(match.coords);
        setMapZoom(match.zoom);
      }
    }
  }, [activeNeighbourhoodId]);

  const handleNeighbourhoodChange = (item) => {
    setSelectedNeighbourhood(item.id);
    setMapCenter(item.coords);
    setMapZoom(item.zoom);
  };

  const toggleFacilityType = (type) => {
    setVisibleFacilities(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Aggregate visible facilities
  const allFacilities = Object.entries(NEIGHBOURHOOD_FACILITIES).flatMap(([nHoodKey, list]) => 
    list.map(f => ({ ...f, neighbourhoodKey: nHoodKey }))
  ).filter(f => showFacilitiesLayer && visibleFacilities[f.type] !== false);

  return (
    <div 
      className="relative w-full rounded-3xl overflow-hidden border border-estate-200 shadow-premium"
      style={{ height }}
    >
      {/* Dynamic Map Controller */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <MapController center={mapCenter} zoom={mapZoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 1. Neighbourhood Boundary Polygons */}
        {showBoundaries && Object.entries(NEIGHBOURHOOD_BOUNDARIES).map(([slug, coords]) => (
          <Polygon
            key={`poly-${slug}`}
            positions={coords}
            pathOptions={{
              color: '#059669',
              fillColor: '#10B981',
              fillOpacity: 0.05,
              weight: 2,
              dashArray: '6, 6'
            }}
          />
        ))}

        {/* 2. Facility Markers */}
        {allFacilities.map(fac => (
          <Marker
            key={fac.id}
            position={[fac.lat, fac.lng]}
            icon={createFacilityIcon(fac.type)}
          >
            <Popup className="custom-popup" minWidth={200}>
              <div className="p-1 text-xs">
                <span className="text-[10px] font-bold text-white bg-navy px-2 py-0.5 rounded-full inline-block mb-1">
                  {fac.type}
                </span>
                <h4 className="font-bold text-navy text-sm font-display">{fac.name}</h4>
                <p className="text-[11px] text-estate-600 mt-0.5">{fac.rating}</p>
                <div className="mt-2 pt-2 border-t border-estate-100 flex items-center justify-between text-[11px] text-estate-500">
                  <span className="flex items-center gap-1 font-semibold text-emerald">
                    <Navigation className="w-3 h-3" /> {fac.distance}
                  </span>
                  <span className="capitalize">{fac.neighbourhoodKey.replace(/-/g, ' ')}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 3. Property Markers & Approximate Privacy Buffers */}
        {properties.map(property => {
          const coords = [property.location.coordinates.lat, property.location.coordinates.lng];
          const isSelected = activeProperty?.id === property.id;

          return (
            <React.Fragment key={property.id}>
              {/* Privacy radius buffer (250m) */}
              <Circle
                center={coords}
                radius={260}
                pathOptions={{
                  color: isSelected ? '#059669' : '#3B82F6',
                  fillColor: isSelected ? '#10B981' : '#60A5FA',
                  fillOpacity: isSelected ? 0.22 : 0.10,
                  weight: isSelected ? 2 : 1
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
                <Popup className="custom-popup" minWidth={250}>
                  <div className="p-1">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-28 object-cover rounded-xl mb-2"
                    />
                    <div className="flex items-center gap-1 text-[10px] text-emerald font-bold mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{property.verificationStatus}</span>
                    </div>
                    <h4 className="text-xs font-bold text-navy line-clamp-1 mb-1 font-display">
                      {property.title}
                    </h4>
                    <p className="text-sm font-black text-navy mb-2">
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
                      className="block text-center w-full py-2 px-3 bg-navy text-white text-xs font-bold rounded-xl hover:bg-emerald transition shadow-xs"
                    >
                      View Details & Security Intel
                    </Link>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* OVERLAY 1: Top Neighbourhood Quick Switcher Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Quick jump pills */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-estate-200 shadow-md overflow-x-auto max-w-full pointer-events-auto">
          <div className="flex items-center gap-1 px-2 text-xs font-bold text-navy border-r border-estate-200 mr-1">
            <Compass className="w-3.5 h-3.5 text-emerald" />
            <span className="hidden sm:inline">District:</span>
          </div>
          {NEIGHBOURHOOD_CENTERS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNeighbourhoodChange(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedNeighbourhood === item.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-estate-700 hover:text-navy hover:bg-estate-100'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Privacy rule badge */}
        <div className="hidden lg:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-estate-200 text-xs shadow-sm pointer-events-auto text-estate-700">
          <EyeOff className="w-3.5 h-3.5 text-emerald shrink-0" />
          <span className="text-[11px]">
            <strong>Privacy Protected:</strong> Exact gate coordinates released upon confirmed booking.
          </span>
        </div>
      </div>

      {/* OVERLAY 2: Bottom-Left Facility Filter Control */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-estate-200 shadow-lg pointer-events-auto max-w-xs text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-estate-100 pb-1.5">
          <span className="font-bold text-navy flex items-center gap-1 text-[11px] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-emerald" />
            Nearby Facilities
          </span>
          <button
            type="button"
            onClick={() => setShowFacilitiesLayer(!showFacilitiesLayer)}
            className="text-[10px] font-bold text-emerald hover:underline"
          >
            {showFacilitiesLayer ? 'Hide All' : 'Show All'}
          </button>
        </div>

        {showFacilitiesLayer && (
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => toggleFacilityType('Healthcare')}
              className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition text-left ${
                visibleFacilities.Healthcare ? 'bg-red-50 text-red-700 border border-red-200' : 'text-estate-400 bg-estate-50'
              }`}
            >
              <span>🏥</span>
              <span>Healthcare</span>
            </button>
            <button
              type="button"
              onClick={() => toggleFacilityType('Education')}
              className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition text-left ${
                visibleFacilities.Education ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-estate-400 bg-estate-50'
              }`}
            >
              <span>🏫</span>
              <span>Education</span>
            </button>
            <button
              type="button"
              onClick={() => toggleFacilityType('Shopping')}
              className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition text-left ${
                visibleFacilities.Shopping ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'text-estate-400 bg-estate-50'
              }`}
            >
              <span>🛒</span>
              <span>Markets & Malls</span>
            </button>
            <button
              type="button"
              onClick={() => toggleFacilityType('Transit')}
              className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition text-left ${
                visibleFacilities.Transit ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-estate-400 bg-estate-50'
              }`}
            >
              <span>🚌</span>
              <span>Transit Hubs</span>
            </button>
          </div>
        )}
      </div>

      {/* OVERLAY 3: Floating Active Property Preview Card */}
      {activeProperty && (
        <div className="absolute bottom-4 right-4 z-10 w-80 bg-white/95 backdrop-blur-md rounded-3xl p-4 border border-estate-200 shadow-2xl animate-fadeIn pointer-events-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-navy text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {activeProperty.category}
            </span>
            <button
              type="button"
              onClick={() => setActiveProperty(null)}
              className="p-1 hover:bg-estate-100 rounded-full text-estate-400 hover:text-navy transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative mb-3">
            <img
              src={activeProperty.images[0]}
              alt={activeProperty.title}
              className="w-full h-32 object-cover rounded-2xl"
            />
            <div className="absolute bottom-2 left-2 bg-navy/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
              {activeProperty.furnishingStatus}
            </div>
          </div>

          <p className="text-base font-black text-navy font-display">
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
              District Intel
            </Link>
            <Link
              to={`/properties/${activeProperty.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-emerald transition shadow-xs"
            >
              <span>Explore Home</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
