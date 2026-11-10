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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTime12h, getCategoryColor } from '../../utils/formatters';
import { triggerCelebration } from '../../utils/confetti';

export default function TodayRoutineTimeline({ onAddActivity }) {
  const { routines, toggleRoutine } = useApp();

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
    <div className="bg-white border border-[#ECE9F2] rounded-3xl p-6 shadow-xs">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#ECE9F2]">
        <div>
          <h3 className="text-base font-bold font-heading text-[#242039] flex items-center gap-2">
            Today's Chronological Routine
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F0EBFF] text-[#6D28D9]">
              {routines.filter((r) => r.completed).length}/{routines.length} Done
            </span>
          </h3>
          <p className="text-xs text-[#858197] mt-0.5">
            Check off daily routines as you go through your study day
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAddActivity}
            className="text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] px-3 py-1.5 rounded-xl hover:bg-[#F0EBFF] transition-colors"
          >
            + Add
          </button>
          <Link
            to="/app/routine"
            className="text-xs font-semibold text-[#858197] hover:text-[#242039] flex items-center gap-1 transition-colors"
          >
            Full Planner <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Routine Timeline Items */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#ECE9F2]">
        {routines.map((item) => {
          const color = getCategoryColor(item.category);
          return (
            <div
              key={item.id}
              className={`relative flex items-start justify-between gap-3 p-3.5 rounded-2xl border transition-all duration-150 ${
                item.completed
                  ? 'bg-[#FAF9FC]/70 border-[#ECE9F2]/70 opacity-80'
                  : 'bg-white border-[#ECE9F2] hover:border-purple-200 hover:shadow-xs'
              }`}
            >
              {/* Timeline marker node */}
              <button
                onClick={() => handleToggle(item.id, item.completed)}
                className={`absolute -left-[27px] top-4 rounded-full p-0.5 bg-white border transition-colors ${
                  item.completed
                    ? 'text-emerald-500 border-emerald-500'
                    : 'text-[#858197] border-[#ECE9F2] hover:text-[#8B5CF6] hover:border-[#8B5CF6]'
                }`}
                title={item.completed ? 'Mark pending' : 'Mark completed'}
                aria-label={`Toggle ${item.title}`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-4 h-4 fill-emerald-50 text-emerald-600" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </button>

              {/* Activity Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${color.bg} ${color.text} ${color.border}`}
                  >
                    {getCategoryIcon(item.category)}
                    {item.category}
                  </span>
                  <span className="text-[11px] font-medium text-[#858197] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime12h(item.time)} • {item.duration}
                  </span>
                </div>

                <h4
                  className={`text-sm font-semibold text-[#242039] transition-all ${
                    item.completed ? 'line-through text-[#858197]' : ''
                  }`}
                >
                  {item.title}
                </h4>

                {item.description && (
                  <p className="text-xs text-[#858197] mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Complete Action Button */}
              <button
                onClick={() => handleToggle(item.id, item.completed)}
                className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                  item.completed
                    ? 'bg-[#E8F8F0] text-[#059669] border-emerald-200'
                    : 'bg-white text-[#242039] border-[#ECE9F2] hover:bg-[#F0EBFF] hover:text-[#6D28D9] hover:border-purple-200'
                }`}
              >
                {item.completed ? 'Completed' : 'Done'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

