import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  ShieldAlert, 
  ShieldCheck, 
  Share2, 
  Flag, 
  Pin,
  ChevronDown,
  ChevronUp,
  Send,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';

export function PostCard({ post, onReport }) {
  const { user } = useAuth();
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleVote = (type) => {
    if (userVote === type) {
      // Toggle off
      setUserVote(null);
      setUpvotes(prev => type === 'up' ? prev - 1 : prev);
    } else {
      if (userVote === 'up') setUpvotes(prev => prev - 1);
      if (type === 'up') setUpvotes(prev => prev + 1);
      setUserVote(type);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = {
      id: `c-${Date.now()}`,
      author: user?.name || 'Anonymous Neighbour',
      badge: user ? 'Community Contributor' : 'Guest Contributor',
      createdAt: 'Just now',
      content: newComment,
      upvotes: 0
    };

    setComments(prev => [...prev, added]);
    setNewComment('');
  };

  const categoryVariants = {
    'SECURITY': 'danger',
    'INFRASTRUCTURE': 'emerald',
    'LIVING CONDITIONS': 'warning',
    'PROPERTY AND LANDLORD EXPERIENCES': 'rent',
    'GENERAL DISCUSSIONS': 'default'
  };

  return (
    <article className="bg-white rounded-2xl border border-estate-200/90 shadow-subtle p-5 sm:p-6 mb-4 hover:border-estate-300 transition-all">
      {/* Pinned strip */}
      {post.pinned && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg w-fit mb-3">
          <Pin className="w-3.5 h-3.5 rotate-45" />
          <span>Pinned Neighbourhood Announcement</span>
        </div>
      )}

      {/* Header: Author + Meta */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-estate-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-estate-900 font-display">
                {post.author.name}
              </span>
              {post.verifiedResident && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Resident
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-estate-400 mt-0.5">
              <span>{post.neighbourhoodName}</span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <Badge variant={categoryVariants[post.category] || 'default'}>
          {post.category.replace(/_/g, ' ')}
        </Badge>
      </div>

      {/* Post Title */}
      <h3 className="text-base sm:text-lg font-bold text-navy font-display mb-2 leading-snug">
        {post.title}
      </h3>

      {/* Post Content */}
      <p className="text-sm text-estate-700 leading-relaxed mb-4 whitespace-pre-line">
        {post.content}
      </p>

      {/* Security Disclaimer Notice if category is security */}
      {post.category === 'SECURITY' && (
        <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Community Observation:</strong> This post reflects an individual resident report. In accordance with safety policies, emergency issues should be reported directly to local security gates and law enforcement.
          </span>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-medium text-estate-500 bg-estate-100 hover:bg-estate-200 px-2 py-0.5 rounded-md transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Footer: Upvote, Downvote, Comments, Report */}
      <div className="pt-3 border-t border-estate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {/* Upvote */}
          <button
            type="button"
            onClick={() => handleVote('up')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
              userVote === 'up'
                ? 'bg-emerald text-white border-emerald font-bold'
                : 'bg-estate-50 text-estate-700 border-estate-200 hover:bg-estate-100'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Helpful ({upvotes})</span>
          </button>

          {/* Downvote */}
          <button
            type="button"
            onClick={() => handleVote('down')}
            className={`p-1.5 rounded-xl border transition ${
              userVote === 'down'
                ? 'bg-estate-800 text-white border-estate-800'
                : 'bg-estate-50 text-estate-500 border-estate-200 hover:bg-estate-100'
            }`}
            title="Mark as unhelpful"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>

          {/* Comments Toggle */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-estate-600 hover:bg-estate-50 transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{comments.length} Comments</span>
            {showComments ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Report Button */}
        <button
          type="button"
          onClick={() => onReport && onReport(post)}
          className="flex items-center gap-1 text-estate-400 hover:text-rose-600 transition"
          title="Report inappropriate content"
        >
          <Flag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Report</span>
        </button>
      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-estate-100 space-y-3 animate-fadeIn">
          {comments.map(c => (
            <div key={c.id} className="bg-sand-50/70 p-3 rounded-xl border border-sand-200/80 text-xs">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-estate-900">{c.author}</span>
                  <span className="text-[10px] bg-estate-200 text-estate-700 px-1.5 py-0.5 rounded">
                    {c.badge}
                  </span>
                </div>
                <span className="text-estate-400 text-[10px]">{c.createdAt}</span>
              </div>
              <p className="text-estate-700 leading-relaxed">{c.content}</p>
            </div>
          ))}

          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add your respectful reply or clarification..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3 py-2 border border-estate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl hover:bg-emerald transition flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              Reply
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
