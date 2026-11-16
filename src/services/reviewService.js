import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEMO_PROPERTIES } from '../data/demoData';

// Default initial property reviews for demonstration
const DEFAULT_PROPERTY_REVIEWS = {
  'prop-101': [
    {
      id: 'prev-1',
      propertyId: 'prop-101',
      reviewerName: 'Chinedu Eze',
      reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      overallRating: 4.8,
      conditionRating: 5.0,
      accuracyRating: 4.8,
      maintenanceRating: 4.5,
      valueRating: 4.7,
      comment: 'Lived here for 18 months before relocating. The industrial water plant delivers genuinely clear water, which is rare on this side of Admiralty. Landlord replaced the borehole pump within 24 hours when it tripped.',
      isVerifiedExperience: true,
      createdAt: '2 weeks ago'
    },
    {
      id: 'prev-2',
      propertyId: 'prop-101',
      reviewerName: 'Amina Bello',
      reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      overallRating: 4.5,
      conditionRating: 4.6,
      accuracyRating: 4.9,
      maintenanceRating: 4.2,
      valueRating: 4.3,
      comment: 'Listing photos are 100% accurate. The master bedroom walk-in closet is huge. Only downside is transformer maintenance contribution was ₦45,000 in October during the rain storm, but service is stable.',
      isVerifiedExperience: true,
      createdAt: '1 month ago'
    }
  ],
  'prop-102': [
    {
      id: 'prev-3',
      propertyId: 'prop-102',
      reviewerName: 'Dr. Segun Adeleke',
      reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      overallRating: 4.6,
      conditionRating: 4.5,
      accuracyRating: 4.8,
      maintenanceRating: 4.6,
      valueRating: 4.5,
      comment: 'Outstanding location for anyone working in tech in Yaba. Gigabit optical fiber was already patched into the living room. Noise levels from Commercial Ave are negligible inside.',
      isVerifiedExperience: true,
      createdAt: '3 weeks ago'
    }
  ]
};

// Default initial neighbourhood reviews
const DEFAULT_NEIGHBOURHOOD_REVIEWS = {
  'lekki-phase-1': [
    {
      id: 'nrev-1',
      neighbourhoodId: 'lekki-phase-1',
      reviewerName: 'Bukola Adeyemi',
      reviewerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      overallRating: 8.6,
      safetyRating: 8.8,
      infrastructureRating: 7.9,
      accessibilityRating: 9.0,
      cleanlinessRating: 8.5,
      comment: 'Superb access via the Lekki-Ikoyi link bridge allows me to beat major rush hour bottlenecks. Gated security on Admiralty closes is strictly enforced after 10 PM. Drainage along lower Admiralty needs pre-rain clearing.',
      isVerifiedResident: true,
      createdAt: '3 days ago'
    },
    {
      id: 'nrev-2',
      neighbourhoodId: 'lekki-phase-1',
      reviewerName: 'Fola Martins',
      reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      overallRating: 8.2,
      safetyRating: 8.5,
      infrastructureRating: 7.4,
      accessibilityRating: 8.8,
      cleanlinessRating: 8.0,
      comment: 'Power averages 18 hrs daily on our feeder. Inverter is essential for uninterrupted work-from-home. Food options and supermarkets within 5 minutes walk.',
      isVerifiedResident: true,
      createdAt: '1 week ago'
    }
  ],
  'yaba': [
    {
      id: 'nrev-3',
      neighbourhoodId: 'yaba',
      reviewerName: 'Tosin Alao',
      reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      overallRating: 8.1,
      safetyRating: 7.8,
      infrastructureRating: 8.3,
      accessibilityRating: 8.5,
      cleanlinessRating: 7.6,
      comment: 'Energetic, young vibe. Clean freshwater aquifer means zero water treatment hassle. Proximity to UNILAG and the new Red Line metro makes transit seamless.',
      isVerifiedResident: true,
      createdAt: '5 days ago'
    }
  ]
};

// 1. Fetch Property Reviews
export async function fetchPropertyReviews(propertyId) {
  let dbReviews = [];

  if (isSupabaseConfigured && propertyId && !propertyId.startsWith('prop-')) {
    try {
      const { data, error } = await supabase
        .from('property_reviews')
        .select(`
          *,
          profiles (full_name, avatar_url)
        `)
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        dbReviews = data.map(r => ({
          id: r.id,
          propertyId: r.property_id,
          reviewerName: r.profiles?.full_name || 'Verified Tenant',
          reviewerAvatar: r.profiles?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          overallRating: Number(r.rating),
          conditionRating: Number(r.condition_rating) || 4.5,
          accuracyRating: Number(r.accuracy_rating) || 4.5,
          maintenanceRating: Number(r.maintenance_rating) || 4.5,
          valueRating: Number(r.value_rating) || 4.5,
          comment: r.comment,
          isVerifiedExperience: r.is_verified_experience,
          createdAt: new Date(r.created_at).toLocaleDateString()
        }));
      }
    } catch (err) {
      console.warn('Could not read property reviews from Supabase:', err);
    }
  }

  // Local user-submitted reviews
  const localMap = JSON.parse(
    localStorage.getItem('vettedhomes_property_reviews') ||
    localStorage.getItem('estatelens_property_reviews') ||
    '{}'
  );
  const localList = localMap[propertyId] || [];

  const defaultList = DEFAULT_PROPERTY_REVIEWS[propertyId] || [];

  return [...dbReviews, ...localList, ...defaultList];
}

// 2. Submit Property Review
export async function submitPropertyReview({
  propertyId,
  conditionRating = 4.5,
  accuracyRating = 4.5,
  maintenanceRating = 4.5,
  valueRating = 4.5,
  overallRating = 4.5,
  comment,
  user,
  isVerifiedExperience = true
}) {
  const newReview = {
    id: `prev-${Date.now()}`,
    propertyId,
    reviewerName: user?.name || 'Verified Tenant',
    reviewerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    overallRating: Number(overallRating),
    conditionRating: Number(conditionRating),
    accuracyRating: Number(accuracyRating),
    maintenanceRating: Number(maintenanceRating),
    valueRating: Number(valueRating),
    comment: comment.trim(),
    isVerifiedExperience,
    createdAt: 'Just now'
  };

  if (isSupabaseConfigured && user?.id && !propertyId.startsWith('prop-')) {
    try {
      await supabase
        .from('property_reviews')
        .insert({
          property_id: propertyId,
          reviewer_id: user.id,
          rating: overallRating,
          condition_rating: conditionRating,
          accuracy_rating: accuracyRating,
          maintenance_rating: maintenanceRating,
          value_rating: valueRating,
          comment: comment.trim(),
          is_verified_experience: isVerifiedExperience
        });
    } catch (err) {
      console.warn('Failed to insert property review into Supabase:', err);
    }
  }

  // Persist locally
  const localMap = JSON.parse(
    localStorage.getItem('vettedhomes_property_reviews') ||
    localStorage.getItem('estatelens_property_reviews') ||
    '{}'
  );
  localMap[propertyId] = [newReview, ...(localMap[propertyId] || [])];
  localStorage.setItem('vettedhomes_property_reviews', JSON.stringify(localMap));

  return { success: true, review: newReview };
}

// 3. Fetch Neighbourhood Reviews
export async function fetchNeighbourhoodReviews(neighbourhoodId) {
  let dbReviews = [];

  if (isSupabaseConfigured && neighbourhoodId) {
    try {
      const { data, error } = await supabase
        .from('neighbourhood_reviews')
        .select(`
          *,
          profiles (full_name, avatar_url)
        `)
        .eq('neighbourhood_id', neighbourhoodId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        dbReviews = data.map(r => ({
          id: r.id,
          neighbourhoodId: r.neighbourhood_id,
          reviewerName: r.profiles?.full_name || 'Resident',
          reviewerAvatar: r.profiles?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          overallRating: Number(r.overall_rating),
          safetyRating: Number(r.safety_rating) || 8.0,
          infrastructureRating: Number(r.infrastructure_rating) || 7.5,
          accessibilityRating: Number(r.accessibility_rating) || 8.0,
          cleanlinessRating: Number(r.cleanliness_rating) || 7.5,
          comment: r.comment,
          isVerifiedResident: r.is_verified_resident,
          createdAt: new Date(r.created_at).toLocaleDateString()
        }));
      }
    } catch (err) {
      console.warn('Could not read neighbourhood reviews from Supabase:', err);
    }
  }

  // Local user-submitted reviews
  const localMap = JSON.parse(
    localStorage.getItem('vettedhomes_neighbourhood_reviews') ||
    localStorage.getItem('estatelens_neighbourhood_reviews') ||
    '{}'
  );
  const localList = localMap[neighbourhoodId] || [];

  const defaultList = DEFAULT_NEIGHBOURHOOD_REVIEWS[neighbourhoodId] || [];

  return [...dbReviews, ...localList, ...defaultList];
}

// 4. Submit Neighbourhood Review
export async function submitNeighbourhoodReview({
  neighbourhoodId,
  safetyRating = 8.0,
  infrastructureRating = 7.5,
  accessibilityRating = 8.0,
  cleanlinessRating = 7.5,
  overallRating = 8.0,
  comment,
  user,
  isVerifiedResident = true
}) {
  const newReview = {
    id: `nrev-${Date.now()}`,
    neighbourhoodId,
    reviewerName: user?.name || 'Local Resident',
    reviewerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    overallRating: Number(overallRating),
    safetyRating: Number(safetyRating),
    infrastructureRating: Number(infrastructureRating),
    accessibilityRating: Number(accessibilityRating),
    cleanlinessRating: Number(cleanlinessRating),
    comment: comment.trim(),
    isVerifiedResident,
    createdAt: 'Just now'
  };

  if (isSupabaseConfigured && user?.id) {
    try {
      await supabase
        .from('neighbourhood_reviews')
        .insert({
          neighbourhood_id: neighbourhoodId,
          reviewer_id: user.id,
          overall_rating: overallRating,
          safety_rating: safetyRating,
          infrastructure_rating: infrastructureRating,
          accessibility_rating: accessibilityRating,
          cleanliness_rating: cleanlinessRating,
          comment: comment.trim(),
          is_verified_resident: isVerifiedResident
        });
    } catch (err) {
      console.warn('Failed to insert neighbourhood review into Supabase:', err);
    }
  }

  // Persist locally
  const localMap = JSON.parse(
    localStorage.getItem('vettedhomes_neighbourhood_reviews') ||
    localStorage.getItem('estatelens_neighbourhood_reviews') ||
    '{}'
  );
  localMap[neighbourhoodId] = [newReview, ...(localMap[neighbourhoodId] || [])];
  localStorage.setItem('vettedhomes_neighbourhood_reviews', JSON.stringify(localMap));

  return { success: true, review: newReview };
}

