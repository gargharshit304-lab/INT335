import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Droplets,
  Moon,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Zap,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDaysUntil } from '../../utils/formatters';

const NAV_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/routine', label: 'My Routine', icon: CalendarCheck },
  { to: '/app/hydration', label: 'Hydration', icon: Droplets },
  { to: '/app/sleep', label: 'Sleep Tracker', icon: Moon },
  { to: '/app/progress', label: 'My Progress', icon: BarChart3 },
  { to: '/app/buddy', label: 'Study Buddy', icon: Users, badge: 'Circle' },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ onCloseMobile }) {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const daysUntilExam = calculateDaysUntil(user.examStartDate);

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 bg-white border-r border-[#ECE9F2] flex flex-col h-full shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 pb-4 border-b border-[#ECE9F2]">
        <NavLink
          to="/app/dashboard"
          className="flex items-center gap-2.5 group"
          onClick={onCloseMobile}
        >
          <div className="w-9 h-9 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-xs shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-4.5 h-4.5 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-[#242039] font-heading flex items-center gap-1.5">
              RECHARGE
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#27AE82]"></span>
            </span>
            <p className="text-[10px] font-medium text-[#817D91] -mt-0.5 tracking-tight">
              Exam Week Routine Companion
            </p>
          </div>
        </NavLink>

        {/* Academic Prototype Notice */}
        <div className="mt-3.5 px-2.5 py-1.5 bg-[#F1EBFF] rounded-xl border border-purple-100 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
          <span className="text-[10px] font-semibold text-[#6D28D9] leading-tight">
            LPU INT335 Prototype • P13
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 pb-1.5 text-[10px] font-bold text-[#A19BAD] tracking-wider uppercase">
          Daily Routine
        </p>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${isActive
                  ? 'bg-[#8B5CF6] text-white shadow-xs shadow-purple-500/20 font-semibold'
                  : 'text-[#242039] hover:bg-[#F7F5FA] hover:text-[#8B5CF6]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-[#817D91]'
                        }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F1EBFF] text-[#6D28D9]'
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Exam Countdown Card inside Sidebar */}
        <div className="pt-4 px-1">
          <div className="p-3 rounded-2xl bg-[#F7F5FA] border border-[#ECE9F2]">
            <div className="flex items-center justify-between text-xs text-[#817D91] font-medium mb-1">
              <span className="flex items-center gap-1.5 text-[#242039] font-semibold text-[11px]">
                <Clock className="w-3 h-3 text-[#8B5CF6]" />
                Next Exam
              </span>
              <span className="text-[#8B5CF6] font-bold text-[11px]">
                {daysUntilExam > 0 ? `${daysUntilExam}d left` : 'Today'}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#242039] truncate">
              {user.subjects?.[0]?.name || 'Design Thinking'}
            </p>
            <p className="text-[10px] text-[#A19BAD] mt-0.5">Stay steady & paced</p>
          </div>
        </div>
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-3.5 border-t border-[#ECE9F2] bg-[#FAFAFC]">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-[#ECE9F2]"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#242039] truncate">{user.name}</p>
              <p className="text-[10px] text-[#817D91] truncate">{user.university}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 text-[#817D91] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
