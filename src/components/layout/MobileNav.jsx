import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Droplets,
  Moon,
  Users,
} from 'lucide-react';

const BOTTOM_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/routine', label: 'Routine', icon: CalendarCheck },
  { to: '/app/hydration', label: 'Hydration', icon: Droplets },
  { to: '/app/sleep', label: 'Sleep', icon: Moon },
  { to: '/app/buddy', label: 'Buddies', icon: Users },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#ECE9F2] px-3 py-1.5 z-40 flex items-center justify-around shadow-xs">
      {BOTTOM_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-medium transition-colors ${isActive
                ? 'text-[#8B5CF6] font-bold'
                : 'text-[#817D91] hover:text-[#242039]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-[#F1EBFF] text-[#8B5CF6]' : 'text-[#817D91]'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
