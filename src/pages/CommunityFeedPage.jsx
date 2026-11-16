import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  MessageSquareText, 
  PlusCircle, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Filter, 
  MapPin, 
  Flame, 
  Clock, 
  ThumbsUp,
  AlertTriangle,
  Info,
  Loader2,
  BookmarkCheck,
  BookmarkPlus
} from 'lucide-react';
import { DEMO_NEIGHBOURHOODS, COMMUNITY_CATEGORIES } from '../data/demoData';
import { PostCard } from '../components/community/PostCard';
import { CreatePostModal } from '../components/community/CreatePostModal';
import { ReportModal } from '../components/community/ReportModal';
import { fetchCommunityPosts } from '../services/communityService';
import { useAuth } from '../context/AuthContext';

export function CommunityFeedPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'ALL');
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState(searchParams.get('neighbourhood') || 'ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'helpful', 'trending'

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [followedNeighbourhoods, setFollowedNeighbourhoods] = useState(() => {
    return JSON.parse(
      localStorage.getItem('vettedhomes_followed_neighbourhoods') || 
      localStorage.getItem('estatelens_followed_neighbourhoods') || 
      '["lekki-phase-1", "yaba"]'
    );
  });

  // Load community posts
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchCommunityPosts({
      neighbourhoodId: selectedNeighbourhood,
      category: selectedCategory,
      search: searchQuery,
      sortBy
    }).then(data => {
      if (isMounted) {
        setPosts(data);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [selectedNeighbourhood, selectedCategory, searchQuery, sortBy]);

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const toggleFollowNeighbourhood = (nHoodId) => {
    setFollowedNeighbourhoods(prev => {
      const updated = prev.includes(nHoodId)
        ? prev.filter(id => id !== nHoodId)
        : [...prev, nHoodId];
      localStorage.setItem('vettedhomes_followed_neighbourhoods', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-navy-border">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-surface text-gold text-xs font-bold border border-gold/40">
            <MessageSquareText className="w-3.5 h-3.5 text-gold" />
            <span>VettedHomes Signature Community</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
            Neighbourhood Community Discussions
          </h1>
          <p className="text-xs sm:text-sm text-estate-300 leading-relaxed">
            Unfiltered, ground-truth discussions about living conditions, power reliability, drainage, security vigilance, and landlord realities across Nigerian urban estates.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {selectedNeighbourhood !== 'ALL' && (
            <button
              type="button"
              onClick={() => toggleFollowNeighbourhood(selectedNeighbourhood)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                followedNeighbourhoods.includes(selectedNeighbourhood)
                  ? 'bg-gold/20 text-gold-light border-gold/50 shadow-gold'
                  : 'bg-navy-card text-estate-200 border-navy-border hover:bg-navy-surface hover:text-white'
              }`}
            >
              {followedNeighbourhoods.includes(selectedNeighbourhood) ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-gold" />
                  <span>Following District</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Follow District Updates</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-3 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy-deep rounded-2xl text-xs sm:text-sm font-black shadow-gold transition flex items-center justify-center gap-2 tracking-wide"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Start a Discussion</span>
          </button>
        </div>
      </div>

      {/* Safety Policy & Anti-Defamation Banner */}
      <div className="bg-sand-100 rounded-3xl p-4 sm:p-5 border border-sand-200 flex flex-col sm:flex-row items-start gap-3.5 text-xs text-estate-700">
        <ShieldCheck className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-navy text-sm block">
            Community Integrity & Resident Protection Guidelines
          </span>
          <p className="leading-relaxed text-estate-600 text-[11px]">
            To ensure genuine transparency without enabling harassment or defamation, posts naming private individuals, disclosing exact private gate numbers, or leaking phone numbers are strictly prohibited. Security observations represent contributor experiences and do not legally certify a neighbourhood as unsafe.
          </p>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-estate-100">
        {COMMUNITY_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-estate-700 hover:bg-estate-100 border border-estate-200'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-estate-200 p-4 shadow-subtle flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Neighbourhood Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <MapPin className="w-4 h-4 text-emerald shrink-0" />
          <span className="text-xs text-estate-500 font-semibold">Location:</span>
          <select
            value={selectedNeighbourhood}
            onChange={(e) => setSelectedNeighbourhood(e.target.value)}
            className="py-1.5 px-3 rounded-xl border border-estate-200 text-xs font-semibold text-estate-800 bg-sand-50/60 focus:ring-1 focus:ring-emerald outline-none"
          >
            <option value="ALL">All Neighbourhoods</option>
            {DEMO_NEIGHBOURHOODS.map(n => (
              <option key={n.id} value={n.id}>{n.name}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-estate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search discussions, topics, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none bg-sand-50/50"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-xs text-estate-500 font-semibold">Sort:</span>
          <div className="flex items-center p-1 bg-estate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                sortBy === 'newest' ? 'bg-white text-navy shadow-xs' : 'text-estate-600'
              }`}
            >
              Newest
            </button>
            <button
              type="button"
              onClick={() => setSortBy('helpful')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                sortBy === 'helpful' ? 'bg-white text-navy shadow-xs' : 'text-estate-600'
              }`}
            >
              Most Helpful
            </button>
            <button
              type="button"
              onClick={() => setSortBy('trending')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                sortBy === 'trending' ? 'bg-white text-navy shadow-xs' : 'text-estate-600'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

      </div>

      {/* Main Grid: Feed on Left (8 cols), Quick Stats & Guides on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Posts Feed */}
        <div className="lg:col-span-8 space-y-4">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="w-10 h-10 text-emerald animate-spin mx-auto" />
              <p className="text-xs font-semibold text-estate-500">Retrieving neighbourhood community forum discussions...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-estate-200 p-8 shadow-subtle">
              <MessageSquareText className="w-12 h-12 text-estate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy font-display">No discussions found</h3>
              <p className="text-xs sm:text-sm text-estate-500 mt-1 mb-5">
                No posts match your selected filters. Be the first to start a conversation!
              </p>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-2.5 bg-emerald text-white text-xs font-bold rounded-xl hover:bg-emerald-dark transition"
              >
                Create New Post
              </button>
            </div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onReport={(item) => setReportTarget(item)}
              />
            ))
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* Trending Topics */}
          <div className="bg-white rounded-3xl p-6 border border-estate-200 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-navy font-display uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Trending Neighbourhood Topics</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              <button
                type="button"
                onClick={() => setSearchQuery('Drainage')}
                className="w-full text-left p-3 rounded-2xl bg-sand-50 hover:bg-sand-100 border border-sand-200 transition"
              >
                <p className="font-bold text-estate-900">#Drainage & Flood Clearance</p>
                <p className="text-[11px] text-estate-500">Lekki Admiralty & Surulere updates</p>
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('Inverter')}
                className="w-full text-left p-3 rounded-2xl bg-sand-50 hover:bg-sand-100 border border-sand-200 transition"
              >
                <p className="font-bold text-estate-900">#Solar Inverter Setup Costs</p>
                <p className="text-[11px] text-estate-500">Managing 24/7 power in Yaba</p>
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('Security')}
                className="w-full text-left p-3 rounded-2xl bg-sand-50 hover:bg-sand-100 border border-sand-200 transition"
              >
                <p className="font-bold text-estate-900">#Estate Gate Night Pass Protocols</p>
                <p className="text-[11px] text-estate-500">Admiralty & Ikeja GRA vigilance</p>
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('Service Charge')}
                className="w-full text-left p-3 rounded-2xl bg-sand-50 hover:bg-sand-100 border border-sand-200 transition"
              >
                <p className="font-bold text-estate-900">#Service Charge Transparency</p>
                <p className="text-[11px] text-estate-500">Diesel contribution audits</p>
              </button>
            </div>
          </div>

          {/* Resident Verification Info Card */}
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 shadow-subtle space-y-3 text-xs">
            <span className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              Verified Resident Badge
            </span>
            <p className="text-estate-700 leading-relaxed text-[11px]">
              Residents who verify their residential connection with utility receipts or landlord agreements earn a green badge on their posts. This builds genuine trust across the community.
            </p>
            <Link
              to="/profile"
              className="text-xs font-bold text-emerald-800 hover:underline block pt-1"
            >
              Learn about resident verification →
            </Link>
          </div>

        </div>

      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
        initialNeighbourhoodId={selectedNeighbourhood !== 'ALL' ? selectedNeighbourhood : 'lekki-phase-1'}
      />

      <ReportModal
        isOpen={!!reportTarget}
        onClose={() => setReportTarget(null)}
        targetItem={reportTarget}
      />

    </div>
  );
}
