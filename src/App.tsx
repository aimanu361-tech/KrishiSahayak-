import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CropAlertsPage } from './pages/CropAlertsPage';
import { AlertGuardPage } from './pages/AlertGuardPage';
import { AgriNewsPage } from './pages/AgriNewsPage';

// Protected Route wrapper: if not logged in, allows accessing login/register, or defaults to dashboard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dashboard and Core Agri Pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketplace"
              element={
                <ProtectedRoute>
                  <MarketplacePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/crop-alerts"
              element={
                <ProtectedRoute>
                  <CropAlertsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alertguard"
              element={
                <ProtectedRoute>
                  <AlertGuardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agri-news"
              element={
                <ProtectedRoute>
                  <AgriNewsPage />
                </ProtectedRoute>
              }
            />

            {/* Default root path redirects to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* Fallback for any unknown route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
