import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  CalendarCheck,
  Droplets,
  Moon,
  BarChart3,
  Users,
  Settings,
  Plus,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CommandPalette({
  isOpen,
  onClose,
  onQuickAddWater,
  onQuickAddRoutine,
}) {
  const navigate = useNavigate();
  const { addWater } = useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    {
      id: 'dashboard',
      title: 'Go to Dashboard',
      category: 'Navigation',
      icon: LayoutDashboard,
      action: () => {
        navigate('/app/dashboard');
        onClose();
      },
    },
    {
      id: 'routine',
      title: 'View Daily Routine Schedule',
      category: 'Navigation',
      icon: CalendarCheck,
      action: () => {
        navigate('/app/routine');
        onClose();
      },
    },
    {
      id: 'hydration',
      title: 'Hydration Tracker & Water Intake',
      category: 'Navigation',
      icon: Droplets,
      action: () => {
        navigate('/app/hydration');
        onClose();
      },
    },
    {
      id: 'sleep',
      title: 'Circadian Sleep Tracker',
      category: 'Navigation',
      icon: Moon,
      action: () => {
        navigate('/app/sleep');
        onClose();
      },
    },
    {
      id: 'progress',
      title: 'Exam Week Progress Analytics',
      category: 'Navigation',
      icon: BarChart3,
      action: () => {
        navigate('/app/progress');
        onClose();
      },
    },
    {
      id: 'buddy',
      title: 'Study Buddy Circle',
      category: 'Navigation',
      icon: Users,
      action: () => {
        navigate('/app/buddy');
        onClose();
      },
    },
    {
      id: 'settings',
      title: 'Preferences & Settings',
      category: 'Navigation',
      icon: Settings,
      action: () => {
        navigate('/app/settings');
        onClose();
      },
    },
    {
      id: 'action-water-250',
      title: 'Quick Log: +250ml Glass of Water',
      category: 'Action',
      icon: Plus,
      action: () => {
        addWater(250, 'Quick 250ml Glass');
        onClose();
      },
    },
    {
      id: 'action-water-modal',
      title: 'Open Hydration Logger Modal',
      category: 'Action',
      icon: Droplets,
      action: () => {
        onClose();
        onQuickAddWater();
      },
    },
    {
      id: 'action-routine-modal',
      title: 'Add New Routine Activity',
      category: 'Action',
      icon: Plus,
      action: () => {
        onClose();
        onQuickAddRoutine();
      },
    },
  ];

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#242039]/40 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-white rounded-3xl border border-[#ECE9F2] shadow-2xl shadow-purple-950/15 overflow-hidden z-10"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#ECE9F2]">
              <Search className="w-5 h-5 text-[#858197] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search modules, actions, or type a command... (Esc to close)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-sm text-[#242039] placeholder-[#858197] focus:outline-none"
              />
              <span className="text-[10px] font-semibold text-[#858197] bg-[#FAF9FC] border border-[#ECE9F2] px-2 py-0.5 rounded-md shrink-0">
                ESC
              </span>
            </div>

            {/* Results */}
            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#858197]">
                  No matching modules or actions found for "{query}".
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#F0EBFF]/60 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#FAF9FC] group-hover:bg-white text-[#858197] group-hover:text-[#8B5CF6] border border-[#ECE9F2] flex items-center justify-center transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#242039] group-hover:text-[#6D28D9]">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-[#858197]">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-[#858197] group-hover:text-[#8B5CF6] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Select →
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-2.5 bg-[#FAF9FC] border-t border-[#ECE9F2] flex items-center justify-between text-[11px] text-[#858197]">
              <span>RECHARGE Command Navigation</span>
              <span>LPU INT335 Project P13</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

