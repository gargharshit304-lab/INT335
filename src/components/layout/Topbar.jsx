import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Plus,
  Droplets,
  RotateCcw,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ConfirmDialog from '../common/ConfirmDialog';
import CommandPalette from '../common/CommandPalette';

export default function Topbar({ onOpenMobile, onQuickAddWater, onQuickAddRoutine }) {
  const { user, notifications, resetDemoData, routineCompletionPercentage } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
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

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes('/routine')) return { title: 'Daily Routine', subtitle: 'Paced daily schedule' };
    if (path.includes('/hydration')) return { title: 'Hydration Tracker', subtitle: `${user.preferences?.hydrationTarget || 2500}ml target` };
    if (path.includes('/sleep')) return { title: 'Sleep Routine', subtitle: 'Circadian consistency' };
    if (path.includes('/progress')) return { title: 'My Progress', subtitle: 'Exam routine analytics' };
    if (path.includes('/buddy')) return { title: 'Study Buddy Circle', subtitle: 'Peer encouragement' };
    if (path.includes('/settings')) return { title: 'Settings', subtitle: 'Preferences & demo data' };
    return { title: 'Dashboard', subtitle: 'Today at a glance' };
  };

  const { title, subtitle } = getBreadcrumbs();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="h-14 bg-white/95 backdrop-blur-md border-b border-[#ECE9F2] px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 transition-all">
        {/* Left: Mobile Toggle & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-1.5 text-[#242039] hover:bg-[#F7F5FA] rounded-xl border border-[#ECE9F2] transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-baseline gap-2.5 min-w-0">
            <h1 className="text-base font-bold font-heading text-[#242039] tracking-tight">
              {title}
            </h1>
            <span className="hidden sm:inline text-xs text-[#817D91] font-normal truncate">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Right: Search, Actions, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setShowCommandPalette(true)}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#F7F5FA] hover:bg-[#F1EBFF]/60 text-[#817D91] hover:text-[#242039] border border-[#ECE9F2] text-xs font-medium transition-colors"
            title="Search & Commands (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#A19BAD]" />
            <span className="text-[11px]">Search...</span>
            <kbd className="text-[10px] text-[#A19BAD] bg-white border border-[#ECE9F2] px-1.5 py-0.2 rounded font-sans">
              ⌘K
            </kbd>
          </button>

          {/* Quick Water Button */}
          <button
            onClick={onQuickAddWater}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F1EBFF] hover:bg-[#E8DEFF] text-[#6D28D9] border border-purple-100 text-xs font-semibold transition-all shadow-2xs active:scale-98"
          >
            <Droplets className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Log Water</span>
          </button>

          {/* Add Activity Button (Primary action) */}
          <button
            onClick={onQuickAddRoutine}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold transition-all shadow-xs shadow-purple-500/20 active:scale-98"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Add Activity</span>
            <span className="xs:hidden">Add</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => setShowResetConfirm(true)}
            title="Reset Demonstration Data"
            className="p-1.5 text-[#817D91] hover:text-[#8B5CF6] hover:bg-[#F1EBFF] rounded-xl transition-colors border border-transparent hover:border-purple-200"
            aria-label="Reset demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 text-[#817D91] hover:text-[#242039] hover:bg-[#F7F5FA] rounded-xl relative transition-colors border border-[#ECE9F2]"
              aria-label="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#8B5CF6] ring-2 ring-white"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#ECE9F2] rounded-2xl shadow-xl shadow-purple-950/10 p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#ECE9F2]">
                  <h4 className="text-xs font-bold text-[#242039] font-heading">
                    Notifications
                  </h4>
                  <span className="text-[10px] font-semibold bg-[#F1EBFF] text-[#6D28D9] px-2 py-0.5 rounded-full">
                    {notifications.length}
                  </span>
                </div>

                <div className="mt-2.5 space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-[#FAFAFC] hover:bg-[#F1EBFF]/30 border border-[#ECE9F2] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-[#242039]">{n.title}</p>
                        <span className="text-[10px] text-[#A19BAD]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#817D91] mt-0.5 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2.5 mt-2 border-t border-[#ECE9F2] text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/app/routine');
                    }}
                    className="text-[11px] font-semibold text-[#8B5CF6] hover:underline"
                  >
                    View All Routine Reminders →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => navigate('/app/settings')}
            className="flex items-center gap-2 pl-1.5 border-l border-[#ECE9F2] hover:opacity-85 transition-opacity"
            title="Profile & Settings"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-[#8B5CF6]/50"
            />
            <span className="hidden xl:block text-xs font-semibold text-[#242039]">
              {user.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onQuickAddWater={onQuickAddWater}
        onQuickAddRoutine={onQuickAddRoutine}
      />

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
