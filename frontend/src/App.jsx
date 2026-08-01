import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/common/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Developer 1 Pages
import LoginPage from './pages/LoginPage';
import SignupForm from './components/auth/SignupForm';
import AdminPage from './pages/AdminPage';

// Developer 2 Pages
import CatalogPage from './pages/CatalogPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TrackDetailPage from './pages/TrackDetailsPage';
import UploadTrackModal from './components/catalog/UploadTracksModal';
import FaqPage from './pages/FaqPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupForm />} />
      
      {/* Protected Main Shell */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload" element={<ProtectedRoute requireRole="producer" strictRole><UploadTrackModal /></ProtectedRoute>} />
          <Route path="/tracks/:id" element={<TrackDetailPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          
          {/* Admin Restricted Route */}
          <Route element={<ProtectedRoute requireRole="admin" />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
