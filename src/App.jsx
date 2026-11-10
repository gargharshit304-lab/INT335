import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import AppLayout from './components/layout/AppLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';

// Authenticated Demo Pages
import DashboardPage from './pages/DashboardPage';
import RoutinePage from './pages/RoutinePage';
import HydrationPage from './pages/HydrationPage';
import SleepPage from './pages/SleepPage';
import ProgressPage from './pages/ProgressPage';
import BuddyPage from './pages/BuddyPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Authenticated Demo Application Routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="routine" element={<RoutinePage />} />
            <Route path="hydration" element={<HydrationPage />} />
            <Route path="sleep" element={<SleepPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="buddy" element={<BuddyPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
