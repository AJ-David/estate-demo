import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEMO_COMMUNITY_POSTS, DEMO_NEIGHBOURHOODS } from '../data/demoData';

// Anti-Doxxing & Community Safety Rules (Section 6 Compliance)
export function validatePostContent(title, content) {
  const errors = [];

  // 1. Phone number detection (Nigerian format)
  const phonePattern = /(\+?234|0)[789][01]\d{8}/;
  if (phonePattern.test(title) || phonePattern.test(content)) {
    errors.push('Personal phone numbers cannot be published in public discussions to protect resident privacy.');
  }

  // 2. Specific private house/flat/gate targeting
  const addressPattern = /(house\s*\d+|flat\s*\d+|gate\s*\d+|plot\s*\d+|block\s*[a-z0-9]+)/i;
  const accusationWords = /(scam|thief|criminal|fraud|liar|stole|robbed|police case)/i;
  if (addressPattern.test(content) && accusationWords.test(content)) {
    errors.push('Specific residential addresses cannot be targeted with public accusations. Please report directly to estate security or authorities.');
  }

  // 3. Length checks
  if (title.trim().length < 8) {
    errors.push('Discussion headline must be at least 8 characters.');
  }
  if (content.trim().length < 20) {
    errors.push('Discussion content must be at least 20 characters to provide useful context.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// 1. Fetch Community Discussions
export async function fetchCommunityPosts({
  neighbourhoodId = 'ALL',
  category = 'ALL',
  search = '',
  sortBy = 'newest'
} = {}) {
  let dbPosts = [];

  if (isSupabaseConfigured) {
    try {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          neighbourhoods (id, name, city),
          profiles (id, full_name, avatar_url)
        `)
        .neq('status', 'hidden')
        .order('created_at', { ascending: false });

      if (neighbourhoodId !== 'ALL') {
        query = query.eq('neighbourhood_id', neighbourhoodId);
      }
      if (category !== 'ALL') {
        query = query.eq('category', category.toUpperCase().replace(/\s+/g, ' '));
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        dbPosts = data.map(row => {
          const nHood = row.neighbourhoods || DEMO_NEIGHBOURHOODS.find(n => n.id === row.neighbourhood_id);
          const authorProfile = row.profiles;

          return {
            id: row.id,
            neighbourhoodId: row.neighbourhood_id,
            neighbourhoodName: nHood ? nHood.name : 'Urban Enclave',
            category: row.category,
            title: row.title,
            content: row.content,
            author: {
              id: row.author_id,
              name: authorProfile?.full_name || 'Verified Neighbour',
              badge: row.is_verified_resident ? 'Verified Resident' : 'Community Member',
              avatar: authorProfile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
            },
            createdAt: row.created_at ? new Date(row.created_at).toLocaleDateString() : 'Recent',
            upvotes: row.upvotes_count || 0,
            downvotes: row.downvotes_count || 0,
            commentsCount: row.comments_count || 0,
            tags: row.tags || [],
            verifiedResident: row.is_verified_resident,
            pinned: row.pinned,
            comments: []
          };
        });
      }
    } catch (err) {
      console.warn('Error fetching community posts from Supabase:', err);
    }
  }

  // Local user-created posts fallback
  const localPosts = JSON.parse(
    localStorage.getItem('vettedhomes_custom_posts') ||
    localStorage.getItem('estatelens_custom_posts') ||
    '[]'
  );

  // Combine DB posts + Local posts + Demo posts
  const isCleanSlate = localStorage.getItem('vettedhomes_data_mode') === 'clean';
  let combined = [...dbPosts, ...localPosts];
  if (isCleanSlate) {
    // Pure production mode: only genuine user-created posts
  } else if (combined.length === 0) {
    combined = DEMO_COMMUNITY_POSTS;
  } else {
    // Add demo posts that don't collide
    const existingIds = new Set(combined.map(p => p.id));
    const uniqueDemos = DEMO_COMMUNITY_POSTS.filter(p => !existingIds.has(p.id));
    combined = [...combined, ...uniqueDemos];
  }

  // Filter in memory
  let filtered = combined.filter(post => {
    if (neighbourhoodId !== 'ALL' && post.neighbourhoodId !== neighbourhoodId) return false;
    if (category !== 'ALL' && post.category.toUpperCase() !== category.toUpperCase()) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = post.title?.toLowerCase().includes(q);
      const matchContent = post.content?.toLowerCase().includes(q);
      const matchNHood = post.neighbourhoodName?.toLowerCase().includes(q);
      const matchTags = post.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchNHood && !matchTags) return false;
    }
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'helpful') return (b.upvotes || 0) - (a.upvotes || 0);
    if (sortBy === 'trending') return (b.commentsCount || 0) - (a.commentsCount || 0);
    return (b.createdAt || '').localeCompare(a.createdAt || '');
  });

  return filtered;
}

// 2. Create Community Post
export async function createCommunityPost({
  neighbourhoodId,
  category,
  title,
  content,
  tags = [],
  isVerifiedResident = false,
  user
}) {
  const validation = validatePostContent(title, content);
  if (!validation.isValid) {
    return { success: false, error: validation.errors.join(' ') };
  }

  const selectedNeighbourhood = DEMO_NEIGHBOURHOODS.find(n => n.id === neighbourhoodId);
  const nHoodName = selectedNeighbourhood ? selectedNeighbourhood.name : 'Urban Neighbourhood';

  const newPost = {
    id: `post-${Date.now()}`,
    neighbourhoodId,
    neighbourhoodName: nHoodName,
    category,
    title,
    content,
    author: {
      id: user?.id || 'guest',
      name: user?.name || 'Local Resident',
      badge: isVerifiedResident ? 'Verified Resident' : 'Community Contributor',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: 'Just now',
    upvotes: 1,
    downvotes: 0,
    commentsCount: 0,
    tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean),
    verifiedResident: isVerifiedResident,
    pinned: false,
    comments: []
  };

  if (isSupabaseConfigured && user?.id) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          neighbourhood_id: neighbourhoodId,
          author_id: user.id,
          category: category.toUpperCase(),
          title: title,
          content: content,
          tags: newPost.tags,
          is_verified_resident: isVerifiedResident,
          pinned: false,
          upvotes_count: 1,
          downvotes_count: 0,
          comments_count: 0,
          status: 'active'
        })
        .select()
        .single();

      if (!error && data) {
        newPost.id = data.id;
      }
    } catch (err) {
      console.warn('Could not save post to Supabase, saving locally:', err);
    }
  }

  // Save locally
  const current = JSON.parse(
    localStorage.getItem('vettedhomes_custom_posts') ||
    localStorage.getItem('estatelens_custom_posts') ||
    '[]'
  );
  localStorage.setItem('vettedhomes_custom_posts', JSON.stringify([newPost, ...current]));

  return { success: true, post: newPost };
}

// 3. Upvote or Downvote a Post
export async function voteCommunityPost(postId, voteType, user) {
  // Save vote record to prevent duplicate votes
  const userVotes = JSON.parse(
    localStorage.getItem('vettedhomes_user_votes') ||
    localStorage.getItem('estatelens_user_votes') ||
    '{}'
  );
  const previousVote = userVotes[postId];

  let voteDelta = 0;
  if (previousVote === voteType) {
    // Un-vote
    delete userVotes[postId];
    voteDelta = voteType === 'up' ? -1 : 0;
  } else {
    userVotes[postId] = voteType;
    if (voteType === 'up') {
      voteDelta = previousVote === 'down' ? 1 : 1;
    } else {
      voteDelta = previousVote === 'up' ? -1 : 0;
    }
  }
  localStorage.setItem('vettedhomes_user_votes', JSON.stringify(userVotes));

  if (isSupabaseConfigured && user?.id && !postId.startsWith('post-')) {
    try {
      if (previousVote === voteType) {
        await supabase
          .from('community_votes')
          .delete()
          .match({ post_id: postId, user_id: user.id });
      } else {
        await supabase
          .from('community_votes')
          .upsert({
            post_id: postId,
            user_id: user.id,
            vote_type: voteType
          });
      }
    } catch (err) {
      console.warn('Could not register vote on Supabase:', err);
    }
  }

  return { success: true, userVote: userVotes[postId] || null, delta: voteDelta };
}

// 4. Add Comment to a Discussion
export async function addCommunityComment({ postId, content, user }) {
  if (!content || !content.trim()) return { success: false, error: 'Comment cannot be empty' };

  const newComment = {
    id: `c-${Date.now()}`,
    author: user?.name || 'Neighbourhood Contributor',
    badge: user?.roles?.includes('buyer_tenant') ? 'Verified Resident' : 'Community Member',
    createdAt: 'Just now',
    content: content.trim(),
    upvotes: 0
  };

  if (isSupabaseConfigured && user?.id && !postId.startsWith('post-')) {
    try {
      await supabase
        .from('community_comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content: content.trim()
        });

      // Increment comments_count on post
      await supabase.rpc('increment_comments_count', { post_id: postId }).catch(() => {});
    } catch (err) {
      console.warn('Could not insert comment to Supabase:', err);
    }
  }

  // Local storage comments tracking
  const commentsMap = JSON.parse(
    localStorage.getItem('vettedhomes_comments_map') ||
    localStorage.getItem('estatelens_comments_map') ||
    '{}'
  );
  commentsMap[postId] = [...(commentsMap[postId] || []), newComment];
  localStorage.setItem('vettedhomes_comments_map', JSON.stringify(commentsMap));

  return { success: true, comment: newComment };
}

// 5. Submit Moderation Report
export async function submitModerationReport({
  targetType = 'post',
  targetId,
  title = '',
  reason,
  details,
  reporterUser = null
}) {
  const newReport = {
    id: `rep-${Date.now()}`,
    targetType,
    targetId,
    title: title || 'Reported Discussion Item',
    reportedBy: reporterUser?.name || 'Anonymous Resident',
    reason,
    snippet: details,
    time: 'Just now',
    severity: reason === 'privacy_doxxing' || reason === 'advance_fee' ? 'Critical' : 'High',
    status: 'Pending Review'
  };

  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('moderation_reports')
        .insert({
          reporter_id: reporterUser?.id || null,
          target_type: targetType,
          target_id: String(targetId),
          reason: reason,
          details: details,
          status: 'pending'
        });
    } catch (err) {
      console.warn('Could not submit report to Supabase:', err);
    }
  }

  // Persist locally for immediate reflection in moderation console
  const reports = JSON.parse(
    localStorage.getItem('vettedhomes_moderation_reports') ||
    localStorage.getItem('estatelens_moderation_reports') ||
    '[]'
  );
  localStorage.setItem('vettedhomes_moderation_reports', JSON.stringify([newReport, ...reports]));

  return { success: true, report: newReport };
}

const DEFAULT_MODERATION_REPORTS = [
  {
    id: 'rep-101',
    targetType: 'Community Post',
    title: 'Allegation naming specific landlord on Admiralty Way',
    reportedBy: 'Anonymous Resident',
    reason: 'Defamation / Naming Private Individuals',
    snippet: 'Landlord at House 14 (Mr. Okafor) refuses to repair sewage leak...',
    time: '45 mins ago',
    severity: 'High',
    status: 'Pending Review',
    isSample: true
  },
  {
    id: 'rep-102',
    targetType: 'Community Post',
    title: 'Unverified alarmist claim about street entrance barrier',
    reportedBy: 'Kemi M.',
    reason: 'Unsubstantiated / Alarmist Security Report',
    snippet: 'Someone claimed the estate gates were breached without police report...',
    time: '2 hours ago',
    severity: 'Medium',
    status: 'Pending Review',
    isSample: true
  },
  {
    id: 'rep-103',
    targetType: 'Property Listing',
    title: 'Suspicious inspection fee request before physical tour',
    reportedBy: 'Tunde A.',
    reason: 'Advance Fee Violation Policy',
    snippet: 'Lister requested ₦10,000 inspection processing fee before visit...',
    time: '5 hours ago',
    severity: 'Critical',
    status: 'Pending Review',
    isSample: true
  }
];

function getStoredReports() {
  const resolvedIds = JSON.parse(localStorage.getItem('vettedhomes_resolved_reports') || '[]');
  const raw = localStorage.getItem('vettedhomes_moderation_reports');
  let reports = [];

  if (raw !== null) {
    try {
      const parsed = JSON.parse(raw);
      reports = Array.isArray(parsed) ? parsed : [];
    } catch {
      reports = [];
    }
  } else {
    // Only pre-populate if defaults haven't been resolved
    reports = DEFAULT_MODERATION_REPORTS.filter(r => !resolvedIds.includes(String(r.id)));
    localStorage.setItem('vettedhomes_moderation_reports', JSON.stringify(reports));
  }

  // Filter out any report that has ever been resolved or dismissed
  const filtered = reports.filter(r => {
    const id = String(r?.id || r?.targetId || r?.target_id || '');
    return id && !resolvedIds.includes(id);
  });

  // Strict deduplication by ID
  const seen = new Set();
  const deduped = [];
  for (const r of filtered) {
    const id = String(r?.id || r?.targetId || r?.target_id || JSON.stringify(r));
    if (!seen.has(id)) {
      seen.add(id);
      deduped.push(r);
    }
  }

  // Keep localStorage clean and synchronized
  if (deduped.length !== reports.length) {
    localStorage.setItem('vettedhomes_moderation_reports', JSON.stringify(deduped));
  }

  return deduped;
}

// 6. Fetch Moderation Reports (for Admin Console)
export async function fetchModerationReports() {
  const dataMode = localStorage.getItem('vettedhomes_data_mode') || 'showcase';
  const allReports = getStoredReports();

  if (dataMode === 'clean') {
    // Hide all sample reports when clean slate mode is active
    return allReports.filter(r => !r.isSample && !String(r.id).startsWith('rep-10'));
  }

  return allReports;
}

// 7. Resolve Moderation Report (Dismiss, Redact, Takedown)
export async function resolveModerationReport(reportTarget, action, index) {
  const targetId = typeof reportTarget === 'object'
    ? (reportTarget?.id || reportTarget?.targetId || reportTarget?.target_id)
    : reportTarget;

  const resolvedIds = JSON.parse(localStorage.getItem('vettedhomes_resolved_reports') || '[]');
  if (targetId && !resolvedIds.includes(String(targetId))) {
    resolvedIds.push(String(targetId));
    localStorage.setItem('vettedhomes_resolved_reports', JSON.stringify(resolvedIds));
  }

  // Directly update vettedhomes_moderation_reports
  let rawReports = [];
  try {
    const raw = localStorage.getItem('vettedhomes_moderation_reports');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) rawReports = parsed;
    }
  } catch {
    rawReports = [];
  }

  const updatedReports = rawReports.filter((r, i) => {
    const rId = String(r?.id || r?.targetId || r?.target_id || '');
    if (targetId && rId === String(targetId)) return false;
    if (index !== undefined && i === index) return false;
    return true;
  });
  localStorage.setItem('vettedhomes_moderation_reports', JSON.stringify(updatedReports));

  if (action === 'Takedown' && targetId) {
    try {
      const localPosts = JSON.parse(
        localStorage.getItem('vettedhomes_custom_posts') || '[]'
      );
      const updated = localPosts.filter(p => String(p?.id) !== String(targetId));
      localStorage.setItem('vettedhomes_custom_posts', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not remove custom post:', e);
    }
  }

  return { success: true };
}

// 8. Clear all moderation reports
export async function clearAllModerationReports() {
  const resolvedIds = JSON.parse(localStorage.getItem('vettedhomes_resolved_reports') || '[]');
  ['rep-101', 'rep-102', 'rep-103'].forEach(id => {
    if (!resolvedIds.includes(id)) resolvedIds.push(id);
  });

  try {
    const raw = JSON.parse(localStorage.getItem('vettedhomes_moderation_reports') || '[]');
    if (Array.isArray(raw)) {
      raw.forEach(r => {
        const id = String(r?.id || r?.targetId || r?.target_id || '');
        if (id && !resolvedIds.includes(id)) resolvedIds.push(id);
      });
    }
  } catch {}

  localStorage.setItem('vettedhomes_resolved_reports', JSON.stringify(resolvedIds));
  localStorage.setItem('vettedhomes_moderation_reports', JSON.stringify([]));
  return { success: true };
}

// 9. Reset to default demo reports
export async function resetDemoModerationReports() {
  localStorage.removeItem('vettedhomes_resolved_reports');
  localStorage.setItem('vettedhomes_moderation_reports', JSON.stringify(DEFAULT_MODERATION_REPORTS));
  return { success: true, reports: DEFAULT_MODERATION_REPORTS };
}

