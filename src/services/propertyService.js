import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEMO_PROPERTIES, DEMO_NEIGHBOURHOODS } from '../data/demoData';

// Helper to format Supabase row into frontend Property object
function formatSupabaseProperty(row) {
  if (!row) return null;

  const images = row.property_images && row.property_images.length > 0
    ? row.property_images.sort((a, b) => a.display_order - b.display_order).map(img => img.image_url)
    : [row.hero_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];

  const amenities = row.property_amenities && row.property_amenities.length > 0
    ? row.property_amenities.map(a => a.amenity)
    : ['24/7 Gated Security', 'Treated Water System'];

  const agent = row.profiles ? {
    name: row.profiles.full_name || 'Agent',
    company: 'PrimeStone Realty Partners',
    role: 'Verified Agent',
    phone: row.profiles.phone || '+234 800 000 0000',
    email: row.profiles.email || '',
    avatar: row.profiles.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: row.profiles.is_verified || true,
    listingsCount: 12,
    rating: 4.9
  } : {
    name: 'Verified Lister',
    company: 'VettedHomes Partner',
    role: 'Licensed Agent',
    phone: '+234 803 555 0192',
    email: 'agent@vettedhomes.ng',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true,
    listingsCount: 8,
    rating: 4.8
  };

  const nHood = row.neighbourhoods || DEMO_NEIGHBOURHOODS.find(n => n.id === row.neighbourhood_id) || DEMO_NEIGHBOURHOODS[0];

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: Number(row.price),
    pricePeriod: row.price_period || 'per annum',
    transactionType: row.transaction_type,
    category: row.category,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    toilets: row.toilets || row.bathrooms + 1,
    sizeSqm: row.size_sqm || 250,
    furnishingStatus: row.furnishing_status || 'Semi-Furnished',
    availabilityStatus: row.availability_status || 'Available Now',
    verificationStatus: row.verification_status || 'VettedHomes Verified',
    featured: row.featured || false,
    listingDate: row.created_at ? row.created_at.split('T')[0] : '2026-11-09',
    images,
    videoWalkthroughUrl: row.video_url || '',
    amenities,
    location: {
      address: row.location_address || 'Neighbourhood Enclave',
      neighbourhoodId: row.neighbourhood_id,
      neighbourhoodName: nHood ? nHood.name : 'Urban Enclave',
      city: row.city || nHood?.city || 'Lagos',
      state: row.state || nHood?.state || 'Lagos State',
      coordinates: {
        lat: Number(row.latitude) || nHood?.coordinates?.lat || 6.4485,
        lng: Number(row.longitude) || nHood?.coordinates?.lng || 3.4862
      },
      approximatePrecision: row.approximate_precision !== false
    },
    agent,
    neighbourhoodSnapshot: {
      id: nHood ? nHood.id : 'lekki-phase-1',
      name: nHood ? nHood.name : 'Lekki Phase 1',
      score: nHood ? Number(nHood.livability_score) || 8.4 : 8.4,
      safetyBadge: 'Low Crime Estate Close',
      powerEstimate: '18 hrs/day grid + backup',
      waterReliability: 'Industrial treatment verified'
    }
  };
}

// 1. Fetch properties with live filtering
export async function fetchProperties(filters = {}) {
  let allProperties = [];

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images (id, image_url, display_order, is_primary),
          property_amenities (amenity),
          neighbourhoods (*),
          profiles (id, full_name, email, phone, avatar_url, is_verified)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not query properties from Supabase:', error.message);
      } else if (data && data.length > 0) {
        allProperties = data.map(formatSupabaseProperty);
      }
    } catch (err) {
      console.warn('Error fetching properties from Supabase, using local data:', err);
    }
  }

  // Combine with initial properties or use catalog if database is empty
  const localSaved = JSON.parse(localStorage.getItem('vettedhomes_custom_properties') || localStorage.getItem('estatelens_custom_properties') || '[]');
  const combined = [...localSaved, ...allProperties];
  
  if (combined.length === 0) {
    allProperties = [...DEMO_PROPERTIES];
  } else {
    // Merge without duplicates
    const ids = new Set(combined.map(p => p.id));
    allProperties = [...combined, ...DEMO_PROPERTIES.filter(p => !ids.has(p.id))];
  }

  // Filter in-memory
  return allProperties.filter(property => {
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesTitle = property.title.toLowerCase().includes(query);
      const matchesLoc = property.location.neighbourhoodName.toLowerCase().includes(query) ||
                         property.location.city.toLowerCase().includes(query);
      const matchesCat = property.category.toLowerCase().includes(query);
      if (!matchesTitle && !matchesLoc && !matchesCat) return false;
    }

    if (filters.transactionType && filters.transactionType !== 'all') {
      if (property.transactionType !== filters.transactionType) return false;
    }

    if (filters.category && filters.category !== 'All Types') {
      if (property.category !== filters.category) return false;
    }

    if (filters.bedrooms && filters.bedrooms !== 'all') {
      const beds = parseInt(filters.bedrooms, 10);
      if (property.bedrooms < beds) return false;
    }

    if (filters.minPrice && property.price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseFloat(filters.maxPrice)) return false;

    if (filters.amenities && filters.amenities.length > 0) {
      const hasAll = filters.amenities.every(a =>
        property.amenities.some(item => item.toLowerCase().includes(a.toLowerCase()))
      );
      if (!hasAll) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'neighbourhood_score') {
      return (b.neighbourhoodSnapshot?.score || 0) - (a.neighbourhoodSnapshot?.score || 0);
    }
    return new Date(b.listingDate || 0) - new Date(a.listingDate || 0);
  });
}

// 2. Fetch single property by ID
export async function fetchPropertyById(id) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images (id, image_url, display_order, is_primary),
          property_amenities (amenity),
          neighbourhoods (*),
          profiles (id, full_name, email, phone, avatar_url, is_verified)
        `)
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return formatSupabaseProperty(data);
      }
    } catch (err) {
      console.warn('Could not fetch property by ID from Supabase:', err);
    }
  }

  // Check custom local storage
  const localSaved = JSON.parse(
    localStorage.getItem('vettedhomes_custom_properties') ||
    localStorage.getItem('estatelens_custom_properties') ||
    '[]'
  );
  const localMatch = localSaved.find(p => p.id === id);
  if (localMatch) return localMatch;

  // Fallback to demo properties
  return DEMO_PROPERTIES.find(p => p.id === id) || DEMO_PROPERTIES[0];
}

// 3. Create new property listing
export async function createProperty(propertyData, user) {
  const nHood = DEMO_NEIGHBOURHOODS.find(n => n.id === propertyData.neighbourhoodId) || DEMO_NEIGHBOURHOODS[0];

  const newPropertyObj = {
    id: `prop-${Date.now()}`,
    title: propertyData.title,
    description: propertyData.description,
    price: Number(propertyData.price),
    pricePeriod: propertyData.pricePeriod || (propertyData.transactionType === 'short-let' ? 'per night' : 'per annum'),
    transactionType: propertyData.transactionType || 'rent',
    category: propertyData.category || 'Duplexes',
    bedrooms: Number(propertyData.bedrooms) || 3,
    bathrooms: Number(propertyData.bathrooms) || 3,
    toilets: Number(propertyData.toilets) || Number(propertyData.bathrooms) + 1,
    sizeSqm: Number(propertyData.sizeSqm) || 300,
    furnishingStatus: propertyData.furnishingStatus || 'Semi-Furnished',
    availabilityStatus: propertyData.availabilityStatus || 'Available Now',
    verificationStatus: 'VettedHomes Verified',
    featured: Boolean(propertyData.featured),
    listingDate: new Date().toISOString().split('T')[0],
    images: propertyData.images && propertyData.images.length > 0 
      ? propertyData.images 
      : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    videoWalkthroughUrl: propertyData.videoWalkthroughUrl || '',
    amenities: propertyData.amenities || ['24/7 Gated Security', 'Treated Water System'],
    location: {
      address: propertyData.locationAddress || 'Off Admiralty Way, Lekki',
      neighbourhoodId: nHood.id,
      neighbourhoodName: nHood.name,
      city: nHood.city,
      state: nHood.state,
      coordinates: {
        lat: nHood.coordinates.lat + (Math.random() - 0.5) * 0.005,
        lng: nHood.coordinates.lng + (Math.random() - 0.5) * 0.005
      },
      approximatePrecision: true
    },
    agent: {
      name: user?.name || 'Verified Lister',
      company: 'VettedHomes Premier Partners',
      role: 'Verified Agent',
      phone: user?.phone || '+234 803 555 0192',
      email: user?.email || '',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 5,
      rating: 5.0
    },
    neighbourhoodSnapshot: {
      id: nHood.id,
      name: nHood.name,
      score: nHood.livabilityScore,
      safetyBadge: 'Low Crime Estate Close',
      powerEstimate: '18 hrs/day grid + backup',
      waterReliability: 'Industrial treatment verified'
    }
  };

  // If Supabase is connected, insert into PostgreSQL
  if (isSupabaseConfigured && user?.id) {
    try {
      // 1. Insert property row
      const { data: propRow, error: propErr } = await supabase
        .from('properties')
        .insert({
          landlord_or_agent_id: user.id,
          title: newPropertyObj.title,
          description: newPropertyObj.description,
          price: newPropertyObj.price,
          price_period: newPropertyObj.pricePeriod,
          transaction_type: newPropertyObj.transactionType,
          category: newPropertyObj.category,
          bedrooms: newPropertyObj.bedrooms,
          bathrooms: newPropertyObj.bathrooms,
          toilets: newPropertyObj.toilets,
          size_sqm: newPropertyObj.sizeSqm,
          furnishing_status: newPropertyObj.furnishingStatus,
          availability_status: newPropertyObj.availabilityStatus,
          verification_status: newPropertyObj.verificationStatus,
          featured: newPropertyObj.featured,
          location_address: newPropertyObj.location.address,
          neighbourhood_id: newPropertyObj.location.neighbourhoodId,
          city: newPropertyObj.location.city,
          state: newPropertyObj.location.state,
          latitude: newPropertyObj.location.coordinates.lat,
          longitude: newPropertyObj.location.coordinates.lng,
          approximate_precision: true,
          video_url: newPropertyObj.videoWalkthroughUrl
        })
        .select()
        .single();

      if (!propErr && propRow) {
        newPropertyObj.id = propRow.id;

        // 2. Insert images
        if (newPropertyObj.images.length > 0) {
          const imageInserts = newPropertyObj.images.map((url, idx) => ({
            property_id: propRow.id,
            image_url: url,
            display_order: idx,
            is_primary: idx === 0
          }));
          await supabase.from('property_images').insert(imageInserts);
        }

        // 3. Insert amenities
        if (newPropertyObj.amenities.length > 0) {
          const amenityInserts = newPropertyObj.amenities.map(a => ({
            property_id: propRow.id,
            amenity: a
          }));
          await supabase.from('property_amenities').insert(amenityInserts);
        }
      }
    } catch (err) {
      console.warn('Could not save property to Supabase, saving to local state:', err);
    }
  }

  // Always sync to localStorage as well for high reliability
  const currentCustom = JSON.parse(
    localStorage.getItem('vettedhomes_custom_properties') ||
    localStorage.getItem('estatelens_custom_properties') ||
    '[]'
  );
  localStorage.setItem('vettedhomes_custom_properties', JSON.stringify([newPropertyObj, ...currentCustom]));

  return newPropertyObj;
}

// 4. Update property
export async function updateProperty(id, updates, user) {
  if (isSupabaseConfigured && user?.id) {
    try {
      await supabase
        .from('properties')
        .update({
          title: updates.title,
          description: updates.description,
          price: updates.price ? Number(updates.price) : undefined,
          availability_status: updates.availabilityStatus,
          furnishing_status: updates.furnishingStatus,
          bedrooms: updates.bedrooms ? Number(updates.bedrooms) : undefined,
          bathrooms: updates.bathrooms ? Number(updates.bathrooms) : undefined
        })
        .eq('id', id);
    } catch (err) {
      console.warn('Could not update property in Supabase:', err);
    }
  }

  // Update local storage
  const currentCustom = JSON.parse(
    localStorage.getItem('vettedhomes_custom_properties') ||
    localStorage.getItem('estatelens_custom_properties') ||
    '[]'
  );
  const updated = currentCustom.map(p => p.id === id ? { ...p, ...updates } : p);
  localStorage.setItem('vettedhomes_custom_properties', JSON.stringify(updated));

  return { success: true };
}

// 5. Delete property
export async function deleteProperty(id, user) {
  if (isSupabaseConfigured && user?.id) {
    try {
      await supabase.from('properties').delete().eq('id', id);
    } catch (err) {
      console.warn('Could not delete property from Supabase:', err);
    }
  }

  const currentCustom = JSON.parse(
    localStorage.getItem('vettedhomes_custom_properties') ||
    localStorage.getItem('estatelens_custom_properties') ||
    '[]'
  );
  const filtered = currentCustom.filter(p => p.id !== id);
  localStorage.setItem('vettedhomes_custom_properties', JSON.stringify(filtered));

  return { success: true };
}

// 6. Seed demo listings directly to live Supabase (optional convenience)
export async function seedPropertiesToSupabase(user) {
  if (!isSupabaseConfigured || !user?.id) return { success: false };

  try {
    for (const demo of DEMO_PROPERTIES) {
      const { data: propRow } = await supabase
        .from('properties')
        .insert({
          landlord_or_agent_id: user.id,
          title: demo.title,
          description: demo.description,
          price: demo.price,
          price_period: demo.pricePeriod,
          transaction_type: demo.transactionType,
          category: demo.category,
          bedrooms: demo.bedrooms,
          bathrooms: demo.bathrooms,
          toilets: demo.toilets,
          size_sqm: demo.sizeSqm,
          furnishing_status: demo.furnishingStatus,
          availability_status: demo.availabilityStatus,
          verification_status: demo.verificationStatus,
          featured: demo.featured,
          location_address: demo.location.address,
          neighbourhood_id: demo.location.neighbourhoodId,
          city: demo.location.city,
          state: demo.location.state,
          latitude: demo.location.coordinates.lat,
          longitude: demo.location.coordinates.lng,
          approximate_precision: true,
          video_url: demo.videoWalkthroughUrl
        })
        .select()
        .single();

      if (propRow) {
        // images
        const imgs = demo.images.map((img, i) => ({
          property_id: propRow.id,
          image_url: img,
          display_order: i,
          is_primary: i === 0
        }));
        await supabase.from('property_images').insert(imgs);

        // amenities
        const ams = demo.amenities.map(a => ({
          property_id: propRow.id,
          amenity: a
        }));
        await supabase.from('property_amenities').insert(ams);
      }
    }
    return { success: true };
  } catch (err) {
    console.error('Seeding error:', err);
    return { success: false, error: err.message };
  }
}

