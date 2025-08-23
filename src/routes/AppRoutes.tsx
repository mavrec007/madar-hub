import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import GlobalSpinner from '@/components/layout/GlobalSpinner';

// Lazy load components
const LoginPage = React.lazy(() => import('@/pages/Auth/LoginPage'));
const DashboardPage = React.lazy(() => import('@/pages/Dashboard/DashboardPage'));
const ContractsPage = React.lazy(() => import('@/pages/Contracts/ContractsPage'));
const InvestigationsPage = React.lazy(() => import('@/pages/Legal/Investigations/InvestigationsPage'));
const LitigationsPage = React.lazy(() => import('@/pages/Legal/Litigations/LitigationsPage'));
const LegalAdvicesPage = React.lazy(() => import('@/pages/Legal/LegalAdvices/LegalAdvicesPage'));
const UserManagementPage = React.lazy(() => import('@/pages/Users/UserManagementPage'));
const ReportsPage = React.lazy(() => import('@/pages/Reports/ReportsPage'));
const ArchivePage = React.lazy(() => import('@/pages/Archive/ArchivePage'));
const ProfilePage = React.lazy(() => import('@/pages/Profile/ProfilePage'));
const SettingsPage = React.lazy(() => import('@/pages/Settings/SettingsPage'));
const ForbiddenPage = React.lazy(() => import('@/pages/Forbidden/ForbiddenPage'));

// Protected Route wrapper
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  requiredPermission?: string;
  requiredRole?: string;
}> = ({ children, requiredPermission, requiredRole }) => {
  const { isAuthenticated, hasPermission, hasRole, loading } = useAuth();

  if (loading) {
    return <GlobalSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/forbidden" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};

// Public Route wrapper (redirects to dashboard if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <GlobalSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<GlobalSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/contracts" 
          element={
            <ProtectedRoute requiredPermission="view_contracts">
              <ContractsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/investigations" 
          element={
            <ProtectedRoute requiredPermission="view_investigations">
              <InvestigationsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/litigations" 
          element={
            <ProtectedRoute requiredPermission="view_litigations">
              <LitigationsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/legal-advices" 
          element={
            <ProtectedRoute requiredPermission="view_legal_advices">
              <LegalAdvicesPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <ProtectedRoute requiredPermission="manage_users">
              <UserManagementPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute requiredPermission="view_reports">
              <ReportsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/archive" 
          element={
            <ProtectedRoute>
              <ArchivePage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute requiredPermission="manage_settings">
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/forbidden" element={<ForbiddenPage />} />
        
        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;