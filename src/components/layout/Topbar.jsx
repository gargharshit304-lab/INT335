import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Plus,
  Droplets,
  RotateCcw,
  Sparkles,
  Check,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import ConfirmDialog from '../common/ConfirmDialog';

export default function Topbar({ onOpenMobile, onQuickAddWater, onQuickAddRoutine }) {
  const { user, notifications, resetDemoData, routineCompletionPercentage } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const notifRef = useRef(null);

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes('/routine')) return { title: 'Daily Routine', subtitle: 'Paced daily schedule' };
    if (path.includes('/hydration')) return { title: 'Hydration Tracker', subtitle: 'Target: ' + user.preferences?.hydrationTarget + 'ml' };
    if (path.includes('/sleep')) return { title: 'Sleep Routine', subtitle: 'Circadian consistency' };
    if (path.includes('/progress')) return { title: 'My Progress', subtitle: 'Exam week routine analytics' };
    if (path.includes('/buddy')) return { title: 'Study Buddy Circle', subtitle: 'Peer encouragement' };
    if (path.includes('/settings')) return { title: 'Settings', subtitle: 'Preferences & demo data' };
    return { title: 'Dashboard', subtitle: 'Today at a glance' };
  };

  const { title, subtitle } = getBreadcrumbs();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="h-18 bg-white border-b border-[#ECE9F2] px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 text-[#242039] hover:bg-[#FAF9FC] rounded-xl border border-[#ECE9F2]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-heading text-[#242039] leading-tight">
                {title}
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E8F8F0] text-[#059669] border border-emerald-100">
                {routineCompletionPercentage}% Complete
              </span>
            </div>
            <p className="hidden sm:block text-xs text-[#858197] leading-none mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Water Button */}
          <Button
            size="sm"
            variant="secondary"
            icon={Droplets}
            onClick={onQuickAddWater}
            className="hidden sm:inline-flex"
          >
            Log Water
          </Button>

          {/* Quick Add Routine Button */}
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={onQuickAddRoutine}
            className="hidden md:inline-flex"
          >
            Add Activity
          </Button>

          {/* Demo Reset Button */}
          <button
            onClick={() => setShowResetConfirm(true)}
            title="Reset Demo Data"
            className="p-2 text-[#858197] hover:text-[#8B5CF6] hover:bg-[#F0EBFF] rounded-xl transition-colors border border-transparent hover:border-purple-200"
            aria-label="Reset demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#858197] hover:text-[#242039] hover:bg-[#FAF9FC] rounded-xl relative transition-colors border border-[#ECE9F2]"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B5CF6] ring-2 ring-white"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#ECE9F2] rounded-2xl shadow-xl shadow-purple-950/10 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2]">
                  <div>
                    <h4 className="text-sm font-bold text-[#242039] font-heading">
                      Notifications
                    </h4>
                    <p className="text-[11px] text-[#858197]">Exam routine alerts</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-[#F0EBFF] text-[#6D28D9] px-2 py-0.5 rounded-full">
                    {notifications.length} alerts
                  </span>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-[#FAF9FC] hover:bg-[#F0EBFF]/40 border border-[#ECE9F2]/60 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-[#242039]">{n.title}</p>
                        <span className="text-[10px] text-[#858197]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#858197] mt-1 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 mt-2 border-t border-[#ECE9F2] text-center">
                  <button
                    onClick={() => navigate('/app/routine')}
                    className="text-xs font-semibold text-[#8B5CF6] hover:underline"
                  >
                    View All Routine Reminders →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Link to Settings */}
          <button
            onClick={() => navigate('/app/settings')}
            className="flex items-center gap-2 pl-2 border-l border-[#ECE9F2] hover:opacity-90 transition-opacity"
            title="Profile & Settings"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-[#8B5CF6]"
            />
            <span className="hidden lg:block text-xs font-semibold text-[#242039]">
              {user.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </header>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={resetDemoData}
        title="Reset Demonstration Data?"
        message="This will restore all daily routines, hydration logs, sleep tracking, and study buddies to their original initial sample state."
        confirmText="Reset All Data"
        cancelText="Keep My Changes"
        danger={false}
      />
    </>
  );
}

