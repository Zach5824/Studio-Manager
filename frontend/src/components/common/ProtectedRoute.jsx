import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ requireRole, strictRole = false, children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const isProducer = user?.role === 'producer' || user?.role === 'admin';
  const hasAccess = !requireRole || user?.role === requireRole || (!strictRole && ((requireRole === 'producer' && isProducer) || user?.role === 'admin'));

  if (!hasAccess) {
    return <Navigate to="/catalog" replace />;
  }

  return children ?? <Outlet />;
}
