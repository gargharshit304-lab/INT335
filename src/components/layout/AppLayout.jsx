import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import Toast from '../common/Toast';
import QuickAddWaterModal from '../hydration/QuickAddWaterModal';
import ActivityModal from '../routine/ActivityModal';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

export default function AppLayout() {
  const { isAuthenticated } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [waterModalOpen, setWaterModalOpen] = useState(false);
  const [routineModalOpen, setRoutineModalOpen] = useState(false);

  // Protected route simulation
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-[#FAF9FC] overflow-hidden">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 rounded-xl"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar onCloseMobile={() => setMobileDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar
          onOpenMobile={() => setMobileDrawerOpen(true)}
          onQuickAddWater={() => setWaterModalOpen(true)}
          onQuickAddRoutine={() => setRoutineModalOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Quick Modals */}
      <QuickAddWaterModal
        isOpen={waterModalOpen}
        onClose={() => setWaterModalOpen(false)}
      />
      <ActivityModal
        isOpen={routineModalOpen}
        onClose={() => setRoutineModalOpen(false)}
      />

      {/* Global Toast Notifications */}
      <Toast />
    </div>
  );
}

