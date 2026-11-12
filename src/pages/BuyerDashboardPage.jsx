import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Calendar, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Trash2, 
  ChevronRight, 
  ShieldCheck, 
  Building2,
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { DEMO_PROPERTIES, DEMO_NEIGHBOURHOODS } from '../data/demoData';
import { PropertyCard } from '../components/property/PropertyCard';

export function BuyerDashboardPage() {
  const { user } = useAuth();
  const { savedIds, toggleSave } = useSavedProperties();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved', 'inspections', 'enquiries', 'neighbourhoods'

  const savedProperties = DEMO_PROPERTIES.filter(p => savedIds.includes(p.id));
  const followedNeighbourhoods = DEMO_NEIGHBOURHOODS.filter(n => user?.followedNeighbourhoods?.includes(n.id) || ['lekki-phase-1', 'yaba'].includes(n.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-estate-200 shadow-subtle">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-300 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-navy font-display">{user?.name || 'Babatunde Adeleke'}</h1>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Tenant & Buyer Portal
              </span>
            </div>
            <p className="text-xs text-estate-500 mt-0.5">
              {user?.email} • {user?.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/properties"
            className="px-4 py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4" />
            <span>Search Properties</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-estate-200 pb-2 overflow-x-auto">
        {[
          { id: 'saved', label: 'Saved Properties', count: savedProperties.length, icon: Heart },
          { id: 'inspections', label: 'Inspection Appointments', count: user?.enquiries?.length || 2, icon: Calendar },
          { id: 'enquiries', label: 'Enquiries & Messages', count: 2, icon: MessageSquare },
          { id: 'neighbourhoods', label: 'Followed Neighbourhoods', count: followedNeighbourhoods.length, icon: MapPin }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-estate-600 hover:text-navy hover:bg-estate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id ? 'bg-emerald text-white' : 'bg-estate-200 text-estate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SAVED PROPERTIES */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-estate-200 p-8">
              <Heart className="w-12 h-12 text-estate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy font-display">No saved properties yet</h3>
              <p className="text-xs text-estate-500 mt-1 mb-4">Click the heart icon on any property to save it to your dashboard.</p>
              <Link to="/properties" className="px-4 py-2 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition">
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map(property => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} layout="grid" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INSPECTION APPOINTMENTS */}
      {activeTab === 'inspections' && (
        <div className="space-y-4 max-w-3xl">
          {user?.enquiries?.map(enq => (
            <div key={enq.id} className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-estate-100">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                    {enq.status}
                  </span>
                  <h3 className="text-sm font-bold text-navy font-display mt-1">{enq.propertyTitle}</h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-estate-400 block">Scheduled Window</span>
                  <span className="text-xs font-bold text-estate-800 flex items-center gap-1 sm:justify-end">
                    <Clock className="w-3.5 h-3.5 text-emerald" />
                    {enq.inspectionDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-estate-600">
                  Agent: <strong className="text-estate-900">{enq.agentName}</strong>
                </span>
                <Link
                  to={`/properties/${enq.propertyId}`}
                  className="text-xs font-bold text-navy hover:text-emerald inline-flex items-center gap-1"
                >
                  View Property Details <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-3 bg-sand-50 rounded-xl text-xs text-estate-600 border border-sand-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                <span>
                  <strong>Gate Access Pass:</strong> Your gate code for the security gate on Admiralty Way will be generated 2 hours before the inspection.
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ENQUIRIES & MESSAGES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4 max-w-3xl">
          {user?.enquiries?.map(enq => (
            <div key={enq.id} className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy">{enq.agentName}</span>
                <span className="text-[10px] text-estate-400">Recent message</span>
              </div>
              <p className="text-xs text-estate-700 bg-sand-50 p-3 rounded-xl border border-sand-200">
                "{enq.lastMessage}"
              </p>
              <div className="flex justify-between items-center pt-2 text-xs">
                <span className="text-estate-400 text-[11px]">{enq.propertyTitle}</span>
                <button
                  type="button"
                  onClick={() => alert(`Opening chat conversation with ${enq.agentName}...`)}
                  className="text-xs font-bold text-emerald hover:underline"
                >
                  Reply to Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: FOLLOWED NEIGHBOURHOODS */}
      {activeTab === 'neighbourhoods' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {followedNeighbourhoods.map(neighbourhood => (
            <div key={neighbourhood.id} className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-navy font-display">{neighbourhood.name}</h3>
                  <p className="text-xs text-estate-500">{neighbourhood.city}, {neighbourhood.state}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-navy">{neighbourhood.livabilityScore}</span>
                  <span className="text-xs text-estate-400">/10</span>
                </div>
              </div>
              <p className="text-xs text-estate-600 line-clamp-2">{neighbourhood.description}</p>
              <div className="pt-2 border-t border-estate-100 flex items-center justify-between text-xs">
                <Link to={`/community?neighbourhood=${neighbourhood.id}`} className="text-emerald font-semibold hover:underline">
                  View Community Feed
                </Link>
                <Link to={`/neighbourhoods/${neighbourhood.id}`} className="font-bold text-navy hover:text-emerald">
                  Neighbourhood Intel →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

