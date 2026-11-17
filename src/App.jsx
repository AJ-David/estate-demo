import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { AdminLoginPage } from './pages/AdminLoginPage';

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
                {/* Authentication Routes (Public Entryways) */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Closed-Wall Platform Routes: Strict Sign-In Required to Access Anything */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/properties" 
                  element={
                    <ProtectedRoute>
                      <PropertiesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/properties/:id" 
                  element={
                    <ProtectedRoute>
                      <PropertyDetailPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/neighbourhoods" 
                  element={
                    <ProtectedRoute>
                      <NeighbourhoodsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/neighbourhoods/:id" 
                  element={
                    <ProtectedRoute>
                      <NeighbourhoodDetailPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/community" 
                  element={
                    <ProtectedRoute>
                      <CommunityFeedPage />
                    </ProtectedRoute>
                  } 
                />

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
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminModerationPage />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminModerationPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Fallback: redirect any unknown or unauthenticated entry straight to /login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
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
