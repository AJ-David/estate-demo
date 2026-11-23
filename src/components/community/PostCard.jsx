import React, { useState, useEffect } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  ShieldCheck, 
  Share2, 
  Flag, 
  Pin,
  ChevronDown,
  ChevronUp,
  Send,
  AlertTriangle,
  Check,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';
import { voteCommunityPost, addCommunityComment } from '../../services/communityService';

export function PostCard({ post, onReport }) {
  const { user } = useAuth();
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Load any local comments for this post
  useEffect(() => {
    const commentsMap = JSON.parse(
      localStorage.getItem('vettedhomes_comments_map') || 
      localStorage.getItem('estatelens_comments_map') || 
      '{}'
    );
    if (commentsMap[post.id]) {
      setComments(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const custom = commentsMap[post.id].filter(c => !existingIds.has(c.id));
        return [...prev, ...custom];
      });
    }

    const userVotes = JSON.parse(
      localStorage.getItem('vettedhomes_user_votes') || 
      localStorage.getItem('estatelens_user_votes') || 
      '{}'
    );
    if (userVotes[post.id]) {
      setUserVote(userVotes[post.id]);
    }
  }, [post.id]);

  const handleVote = async (type) => {
    // Optimistic UI update
    if (userVote === type) {
      setUserVote(null);
      setUpvotes(prev => (type === 'up' ? Math.max(0, prev - 1) : prev));
    } else {
      if (userVote === 'up') setUpvotes(prev => Math.max(0, prev - 1));
      if (type === 'up') setUpvotes(prev => prev + 1);
      setUserVote(type);
    }

    await voteCommunityPost(post.id, type, user);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await addCommunityComment({
      postId: post.id,
      content: newComment,
      user
    });

    if (res.success) {
      setComments(prev => [...prev, res.comment]);
      setNewComment('');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/community?post=${post.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const categoryVariants = {
    'SECURITY': 'danger',
    'INFRASTRUCTURE': 'emerald',
    'LIVING CONDITIONS': 'warning',
    'PROPERTY AND LANDLORD EXPERIENCES': 'rent',
    'GENERAL DISCUSSIONS': 'default'
  };

  return (
    <article className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5 sm:p-6 mb-4 hover:border-zinc-400 transition-all text-zinc-900">
      {/* Pinned strip */}
      {post.pinned && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full w-fit mb-3 border border-zinc-200">
          <Pin className="w-3.5 h-3.5 rotate-45 text-black" />
          <span>Pinned Neighbourhood Announcement</span>
        </div>
      )}

      {/* Header: Author + Meta */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={post.author?.name}
            className="w-10 h-10 rounded-2xl object-cover ring-2 ring-zinc-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-900 font-display">
                {post.author?.name || 'Local Resident'}
              </span>
              {post.verifiedResident && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Resident
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-600" />
                {post.neighbourhoodName}
              </span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <Badge variant={categoryVariants[post.category] || 'default'}>
          {post.category?.replace(/_/g, ' ')}
        </Badge>
      </div>

      {/* Post Title */}
      <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-display mb-2 leading-snug">
        {post.title}
      </h3>

      {/* Post Content */}
      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4 whitespace-pre-line">
        {post.content}
      </p>

      {/* Security Disclaimer Notice if category is security */}
      {post.category?.toUpperCase() === 'SECURITY' && (
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Community Observation:</strong> This post reflects an individual resident report. In accordance with safety policies, emergency or urgent security concerns should be reported directly to local estate gate controllers and emergency services.
          </span>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-semibold text-zinc-700 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Footer: Upvote, Downvote, Comments, Share, Report */}
      <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {/* Upvote */}
          <button
            type="button"
            onClick={() => handleVote('up')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
              userVote === 'up'
                ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-black'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Helpful ({upvotes})</span>
          </button>

          {/* Downvote */}
          <button
            type="button"
            onClick={() => handleVote('down')}
            className={`p-1.5 rounded-xl border transition cursor-pointer ${
              userVote === 'down'
                ? 'bg-black text-white border-black font-bold'
                : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100 hover:text-black'
            }`}
            title="Mark as unhelpful"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>

          {/* Comments Toggle */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-zinc-600 hover:text-black hover:bg-zinc-100 transition border border-transparent hover:border-zinc-200 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{comments.length} Comments</span>
            {showComments ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 text-zinc-500 hover:text-black transition cursor-pointer"
            title="Copy share link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-black" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          {/* Report Button */}
          <button
            type="button"
            onClick={() => onReport && onReport(post)}
            className="flex items-center gap-1 text-zinc-500 hover:text-rose-600 transition cursor-pointer"
            title="Report inappropriate content"
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report</span>
          </button>
        </div>
      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-zinc-200 space-y-3 animate-fadeIn">
          {comments.length === 0 ? (
            <p className="text-xs text-zinc-500 italic py-2">No comments yet. Share your experience or reply below.</p>
          ) : (
            comments.map(c => (
              <div key={c.id} className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900">{c.author}</span>
                    <span className="text-[10px] bg-white text-zinc-700 px-2 py-0.5 rounded-full border border-zinc-200">
                      {c.badge || 'Resident'}
                    </span>
                  </div>
                  <span className="text-zinc-400 text-[10px]">{c.createdAt}</span>
                </div>
                <p className="text-zinc-700 leading-relaxed">{c.content}</p>
              </div>
            ))
          )}

          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add your respectful reply or clarification..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3.5 py-2 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-black outline-none bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Reply</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
export default PostCard;
