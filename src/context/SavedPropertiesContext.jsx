import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedPropertiesContext = createContext();

export function SavedPropertiesProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('estatelens_saved_props');
      return stored ? JSON.parse(stored) : ['prop-101', 'prop-102'];
    } catch {
      return ['prop-101', 'prop-102'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('estatelens_saved_props', JSON.stringify(savedIds));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [savedIds]);

  const toggleSave = (propertyId) => {
    setSavedIds(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
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

