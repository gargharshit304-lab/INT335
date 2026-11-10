import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  BookOpen,
  Coffee,
  Droplets,
  Moon,
  Sparkles,
  Smile,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTime12h, getCategoryColor } from '../../utils/formatters';
import { triggerCelebration } from '../../utils/confetti';

export default function TodayRoutineTimeline({ onAddActivity }) {
  const { routines, toggleRoutine } = useApp();

  const completedCount = routines.filter((r) => r.completed).length;

  const handleToggle = (id, wasCompleted) => {
    toggleRoutine(id);
    if (!wasCompleted) {
      triggerCelebration();
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'study':
        return <BookOpen className="w-3.5 h-3.5" />;
      case 'breakfast':
      case 'lunch':
      case 'dinner':
        return <Coffee className="w-3.5 h-3.5" />;
      case 'hydration':
        return <Droplets className="w-3.5 h-3.5" />;
      case 'break':
        return <Smile className="w-3.5 h-3.5" />;
      case 'sleep':
        return <Moon className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col">
      {/* Fixed Card Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#ECE9F2] mb-3.5 shrink-0">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-bold font-heading text-[#242039] tracking-tight">
            Today's Routine
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F1EBFF] text-[#6D28D9]">
            {completedCount} of {routines.length} Done
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAddActivity}
            className="text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] px-2.5 py-1 rounded-lg hover:bg-[#F1EBFF] transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
          <Link
            to="/app/routine"
            className="text-xs font-medium text-[#817D91] hover:text-[#242039] flex items-center gap-1 transition-colors pl-2 border-l border-[#ECE9F2]"
          >
            <span className="hidden sm:inline">Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Independently Scrollable Routine Activity List */}
      <div className="overflow-y-auto max-h-[350px] sm:max-h-[370px] pr-1.5 space-y-2 thin-scrollbar">
        {routines.map((item) => {
          const color = getCategoryColor(item.category);
          return (
            <div
              key={item.id}
              className={`group flex items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-200 ${item.completed
                  ? 'bg-[#FAFAFC] border-[#ECE9F2]/80 opacity-75'
                  : 'bg-white border-[#ECE9F2] hover:border-[#DED9E7] hover:shadow-[0_2px_8px_rgba(36,32,57,0.03)]'
                }`}
            >
              {/* Checkbox & Details */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => handleToggle(item.id, item.completed)}
                  className={`shrink-0 rounded-lg p-0.5 transition-colors focus:outline-none ${item.completed
                      ? 'text-[#27AE82]'
                      : 'text-[#A19BAD] hover:text-[#8B5CF6]'
                    }`}
                  aria-label={`Toggle ${item.title}`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-4.5 h-4.5 fill-[#EAF8F2] text-[#27AE82]" />
                  ) : (
                    <Circle className="w-4.5 h-4.5" />
                  )}
                </button>

                {/* Category Icon Badge */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${color.bg} ${color.text} ${color.border}`}
                >
                  {getCategoryIcon(item.category)}
                </div>

                {/* Title & Time */}
                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-xs sm:text-sm font-semibold truncate transition-colors ${item.completed
                        ? 'line-through text-[#817D91]'
                        : 'text-[#242039]'
                      }`}
                  >
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#817D91] mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#A19BAD]" />
                      {formatTime12h(item.time)}
                    </span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>

              {/* Category Pill Tag & Quick Toggle Button */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${color.bg} ${color.text} ${color.border}`}
                >
                  {item.category}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggle(item.id, item.completed)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${item.completed
                      ? 'bg-[#EAF8F2] text-[#27AE82] border-emerald-100'
                      : 'bg-white text-[#817D91] border-[#ECE9F2] hover:text-[#242039] hover:bg-[#F7F5FA]'
                    }`}
                >
                  {item.completed ? 'Done' : 'Check'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Footer Insight */}
      <div className="pt-3 mt-3 border-t border-[#ECE9F2] flex items-center justify-between text-[11px] text-[#817D91] shrink-0">
        <span>Scroll to see all {routines.length} scheduled items</span>
        <span className="text-[#8B5CF6] font-medium">Auto-synced</span>
      </div>
    </div>
  );
}
