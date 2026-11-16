import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedPropertiesProvider } from './context/SavedPropertiesContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { NeighbourhoodsPage } from './pages/NeighbourhoodsPage';
import { NeighbourhoodDetailPage } from './pages/NeighbourhoodDetailPage';
import { CommunityFeedPage } from './pages/CommunityFeedPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { LandlordAgentDashboardPage } from './pages/LandlordAgentDashboardPage';
import { AdminModerationPage } from './pages/AdminModerationPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <AuthProvider>
      <SavedPropertiesProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-navy-deep text-slate-100 selection:bg-gold selection:text-navy-deep">
            {/* Top Navigation */}
            <Navbar />

            {/* Main Application Routes */}
            <main className="flex-1">
              <Routes>
                {/* Public Discovery Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/neighbourhoods" element={<NeighbourhoodsPage />} />
                <Route path="/neighbourhoods/:id" element={<NeighbourhoodDetailPage />} />
                <Route path="/community" element={<CommunityFeedPage />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* Protected User & Portal Routes */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/dashboard/buyer" 
                  element={
                    <ProtectedRoute allowedRoles={['buyer_tenant']}>
                      <BuyerDashboardPage />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/dashboard/saved" 
                  element={
                    <ProtectedRoute allowedRoles={['buyer_tenant']}>
                      <BuyerDashboardPage />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/dashboard/landlord" 
                  element={
                    <ProtectedRoute allowedRoles={['landlord_owner', 'agent']}>
                      <LandlordAgentDashboardPage />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/dashboard/moderation" 
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'agent', 'landlord_owner', 'buyer_tenant']}>
                      <AdminModerationPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Fallback */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            {/* Platform Footer */}
            <Footer />
          </div>
        </Router>
      </SavedPropertiesProvider>
    </AuthProvider>
  );
}

export default App;
