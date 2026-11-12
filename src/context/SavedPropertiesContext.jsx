import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

const SavedPropertiesContext = createContext();

export function SavedPropertiesProvider({ children }) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('estatelens_saved_props');
      return stored ? JSON.parse(stored) : ['prop-101', 'prop-102'];
    } catch {
      return ['prop-101', 'prop-102'];
    }
  });

  // Sync from Supabase when user logs in
  useEffect(() => {
    async function loadSavedFromDb() {
      if (!isSupabaseConfigured || !user?.id) return;

      try {
        const { data, error } = await supabase
          .from('saved_properties')
          .select('property_id')
          .eq('user_id', user.id);

        if (!error && data) {
          const dbIds = data.map(item => item.property_id);
          // Merge with local state, avoiding duplicates
          setSavedIds(prev => Array.from(new Set([...prev, ...dbIds])));
        }
      } catch (err) {
        console.warn('Failed to load saved properties from Supabase:', err);
      }
    }

    loadSavedFromDb();
  }, [user?.id]);

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('estatelens_saved_props', JSON.stringify(savedIds));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [savedIds]);

  const toggleSave = async (propertyId) => {
    const isCurrentlySaved = savedIds.includes(propertyId);

    // Optimistic UI update
    setSavedIds(prev =>
      isCurrentlySaved
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );

    // Sync with Supabase if logged in
    if (isSupabaseConfigured && user?.id) {
      try {
        if (isCurrentlySaved) {
          await supabase
            .from('saved_properties')
            .delete()
            .match({ user_id: user.id, property_id: propertyId });
        } else {
          // If it's a UUID property, save directly
          await supabase
            .from('saved_properties')
            .insert({ user_id: user.id, property_id: propertyId });
        }
      } catch (err) {
        console.warn('Could not sync saved property to Supabase:', err);
      }
    }
  };

  const isSaved = (propertyId) => savedIds.includes(propertyId);

  return (
    <SavedPropertiesContext.Provider
      value={{
        savedIds,
        toggleSave,
        isSaved,
        savedCount: savedIds.length
      }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  );
}

export function useSavedProperties() {
  const context = useContext(SavedPropertiesContext);
  if (!context) {
    throw new Error('useSavedProperties must be used within SavedPropertiesProvider');
  }
  return context;
}
