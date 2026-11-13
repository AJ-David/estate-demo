import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  Copy,
  Check,
  Phone,
  Mail,
  Loader2,
  ArrowRightLeft,
  Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { DEMO_NEIGHBOURHOODS } from '../data/demoData';
import { PropertyCard } from '../components/property/PropertyCard';
import { fetchProperties } from '../services/propertyService';
import { getUserInspections, getUserEnquiries } from '../services/enquiryService';
import { fetchConversations } from '../services/messageService';
import { ConversationChatDrawer } from '../components/communication/ConversationChatDrawer';

export function BuyerDashboardPage() {
  const { user } = useAuth();
  const { savedIds, toggleSave } = useSavedProperties();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved', 'inspections', 'enquiries', 'neighbourhoods'
  const [allProperties, setAllProperties] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedGateCode, setCopiedGateCode] = useState(null);

  // Load properties, user activity and conversations
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const [props, inspList, enqList, convList] = await Promise.all([
          fetchProperties(),
          getUserInspections(user?.id),
          getUserEnquiries(user?.id),
          fetchConversations(user?.id)
        ]);

        if (isMounted) {
          setAllProperties(props);
          setInspections(inspList);
          setEnquiries(enqList);
          setConversations(convList);
        }
      } catch (err) {
        console.error('Failed to load buyer dashboard data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [user?.id]);

  const savedProperties = allProperties.filter(p => savedIds.includes(p.id));
  const followedNeighbourhoods = DEMO_NEIGHBOURHOODS.filter(n => 
    user?.followedNeighbourhoods?.includes(n.id) || ['lekki-phase-1', 'yaba'].includes(n.id)
  );

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedGateCode(code);
    setTimeout(() => setCopiedGateCode(null), 2500);
  };

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
              <h1 className="text-xl sm:text-2xl font-black text-navy font-display">{user?.name || 'Valued Client'}</h1>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Buyer & Tenant Portal
              </span>
            </div>
            <p className="text-xs text-estate-500 mt-0.5">
              {user?.email} {user?.phone ? `• ${user.phone}` : ''}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/dashboard/landlord"
            className="px-3.5 py-2.5 bg-sand-100 hover:bg-sand-200 border border-sand-200 text-navy text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald" />
            <span>Switch to Landlord Portal</span>
          </Link>

          <Link
            to="/properties"
            className="px-4 py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-estate-900 transition flex items-center gap-1.5 shadow-sm"
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
          { id: 'inspections', label: 'Inspection Appointments', count: inspections.length, icon: Calendar },
          { id: 'enquiries', label: 'Enquiries & Messages', count: enquiries.length, icon: MessageSquare },
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
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-8 h-8 text-emerald animate-spin mx-auto mb-2" />
              <p className="text-xs text-estate-500 font-semibold">Loading saved properties...</p>
            </div>
          ) : savedProperties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-estate-200 p-8 shadow-subtle">
              <Heart className="w-12 h-12 text-estate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy font-display">No saved properties yet</h3>
              <p className="text-xs text-estate-500 mt-1 mb-4">Click the heart icon on any property listing to save it to your dashboard.</p>
              <Link to="/properties" className="px-5 py-2.5 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition inline-flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Browse Market Properties
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
          {inspections.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-estate-200 p-8 shadow-subtle">
              <Calendar className="w-12 h-12 text-estate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy font-display">No inspections booked yet</h3>
              <p className="text-xs text-estate-500 mt-1 mb-4">Find a property you like and book a physical tour with guaranteed zero advance tour fees.</p>
              <Link to="/properties" className="px-4 py-2 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition inline-block">
                Explore Verified Listings
              </Link>
            </div>
          ) : (
            inspections.map(insp => (
              <div key={insp.id} className="bg-white p-5 rounded-2xl border border-estate-200 shadow-subtle space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-estate-100">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                      {insp.status || 'Confirmed'}
                    </span>
                    <h3 className="text-sm font-bold text-navy font-display mt-1">{insp.propertyTitle}</h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-estate-400 block">Scheduled Window</span>
                    <span className="text-xs font-bold text-estate-800 flex items-center gap-1 sm:justify-end">
                      <Clock className="w-3.5 h-3.5 text-emerald" />
                      {insp.inspectionDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                  <span className="text-estate-600">
                    Host: <strong className="text-estate-900">{insp.fullName || 'Verified Agent'}</strong> ({insp.phone || 'Contact via portal'})
                  </span>
                  {insp.propertyId && (
                    <Link
                      to={`/properties/${insp.propertyId}`}
                      className="text-xs font-bold text-navy hover:text-emerald inline-flex items-center gap-1"
                    >
                      View Property Details <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {/* Gate Pass Code */}
                {insp.gateCode ? (
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">Security Gate Pass Code</span>
                        <span className="text-base font-black text-navy font-mono tracking-widest">{insp.gateCode}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyCode(insp.gateCode)}
                      className="p-2 bg-white rounded-lg border border-emerald-200 hover:bg-emerald-100 text-emerald-800 transition flex items-center gap-1 text-xs font-bold"
                    >
                      {copiedGateCode === insp.gateCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Pass</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-sand-50 rounded-xl text-xs text-estate-600 border border-sand-200 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                    <span>
                      <strong>Estate Security Notice:</strong> Gate pass verification will be confirmed by estate security prior to inspection.
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: ENQUIRIES & TWO-WAY MESSAGING */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4 max-w-4xl">
          {conversations.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-estate-200 p-8 shadow-subtle">
              <MessageSquare className="w-12 h-12 text-estate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy font-display">No conversation threads yet</h3>
              <p className="text-xs text-estate-500 mt-1 mb-4">Have questions about rent terms or service charges? Click "Chat Directly with Agent" on any property.</p>
              <Link to="/properties" className="px-4 py-2 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition inline-block">
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map(conv => (
                <div 
                  key={conv.id} 
                  className="bg-white p-5 rounded-3xl border border-estate-200 shadow-subtle hover:border-emerald-300 transition space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-estate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={conv.counterpart?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={conv.counterpart?.name}
                        className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-100"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-navy font-display">{conv.counterpart?.name}</span>
                          {conv.counterpart?.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-emerald" />
                          )}
                          <span className="text-[10px] bg-sand-100 text-estate-700 px-2 py-0.5 rounded-full font-semibold">
                            {conv.counterpart?.role}
                          </span>
                        </div>
                        <span className="text-xs text-estate-500">{conv.counterpart?.phone}</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-estate-400 block">{conv.lastMessageTime}</span>
                      {conv.unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-emerald text-white text-[10px] font-bold rounded-full">
                          {conv.unreadCount} New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message bubble preview */}
                  <div className="p-3.5 bg-sand-50/80 rounded-2xl border border-sand-200 text-xs text-estate-700 leading-relaxed">
                    <span className="font-bold text-navy block mb-0.5 text-[11px]">Latest Exchange:</span>
                    "{conv.lastMessage}"
                  </div>

                  {/* Footer actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                    <span className="text-estate-500 text-[11px] font-medium truncate max-w-sm">
                      Re: <strong className="text-navy">{conv.propertyTitle}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveConversation(conv);
                          setIsChatOpen(true);
                        }}
                        className="px-4 py-2 bg-navy hover:bg-estate-900 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald" />
                        <span>Open Live Chat ({conv.messages?.length || 0})</span>
                      </button>

                      <Link
                        to={`/properties/${conv.propertyId}`}
                        className="px-3 py-2 border border-estate-200 hover:bg-sand-50 rounded-xl text-estate-700 text-xs font-semibold transition"
                      >
                        View Listing
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Chat Drawer */}
      <ConversationChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        conversation={activeConversation}
      />

    </div>
  );
}
