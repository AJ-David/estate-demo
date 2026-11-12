import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function uploadPropertyImage(file, propertyId = 'temp') {
  if (!file) return null;

  // If running in local demo or Supabase not configured
  if (!isSupabaseConfigured) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${propertyId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.warn('Storage bucket upload warning:', error.message);
      // Fallback to data URL so listing creation still succeeds seamlessly
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    }

    const { data: { publicUrl } } = supabase.storage
      .from('property-images')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (err) {
    console.error('Failed to upload image:', err);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
}

export async function uploadMultiplePropertyImages(files, propertyId = 'temp') {
  if (!files || files.length === 0) return [];
  const uploadPromises = Array.from(files).map(file => uploadPropertyImage(file, propertyId));
  return Promise.all(uploadPromises);
}

