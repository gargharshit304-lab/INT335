import React, { useState } from 'react';
import {
  Plus,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  Edit2,
  Trash2,
  BookOpen,
  Coffee,
  Droplets,
  Moon,
  Sparkles,
  Smile,
  CalendarCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTime12h, getCategoryColor } from '../utils/formatters';
import Button from '../components/common/Button';
import ActivityModal from '../components/routine/ActivityModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { triggerCelebration } from '../utils/confetti';

export default function RoutinePage() {
  const {
    routines,
    toggleRoutine,
    deleteRoutine,
    totalRoutines,
    completedRoutines,
    routineCompletionPercentage,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'morning', 'afternoon', 'evening'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);

  const categories = [
    'all',
    'Study',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Hydration',
    'Break',
    'Sleep',
    'Personal',
  ];

  const handleToggle = (id, wasCompleted) => {
    toggleRoutine(id);
    if (!wasCompleted) {
      triggerCelebration();
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  // Filter routines
  const filteredRoutines = routines.filter((r) => {
    const matchesSection =
      activeFilter === 'all' || r.section === activeFilter;
    const matchesCategory =
      categoryFilter === 'all' || r.category === categoryFilter;
    return matchesSection && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'study':
        return <BookOpen className="w-4 h-4" />;
      case 'breakfast':
      case 'lunch':
      case 'dinner':
        return <Coffee className="w-4 h-4" />;
      case 'hydration':
        return <Droplets className="w-4 h-4" />;
      case 'break':
        return <Smile className="w-4 h-4" />;
      case 'sleep':
        return <Moon className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const renderSectionHeader = (title, count, timeWindow) => (
    <div className="flex items-center justify-between pb-2 border-b border-[#ECE9F2] pt-3 first:pt-0">
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-bold font-heading text-[#242039] uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-xs text-[#817D91] font-normal">• {timeWindow}</span>
      </div>
      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FAFAFC] text-[#817D91] border border-[#ECE9F2]">
        {count} activities
      </span>
    </div>
  );

  const morningItems = filteredRoutines.filter((r) => r.section === 'morning');
  const afternoonItems = filteredRoutines.filter((r) => r.section === 'afternoon');
  const eveningItems = filteredRoutines.filter((r) => r.section === 'evening');

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F1EBFF] text-[#6D28D9] border border-purple-100 flex items-center gap-1.5">
              <CalendarCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Exam Week Routine Companion
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#242039] tracking-tight">
            Daily Routine Planner
          </h2>
          <p className="text-xs sm:text-sm text-[#817D91] mt-0.5 max-w-xl">
            Structure your day into study blocks, nourishment, hydration, and restorative sleep to prevent pre-exam fatigue and crash.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <Button variant="primary" icon={Plus} size="sm" onClick={handleOpenAdd}>
            Add Activity
          </Button>
        </div>
      </div>

      {/* Routine Progress Overview Bar */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-heading text-[#242039]">
              Today's Schedule Progress
            </span>
            <span className="text-xs font-bold text-[#8B5CF6] bg-[#F1EBFF] px-2 py-0.5 rounded-full">
              {routineCompletionPercentage}%
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#817D91]">
            <span>
              Completed: <strong className="text-[#242039]">{completedRoutines}</strong>
            </span>
            <span>
              Pending: <strong className="text-[#242039]">{totalRoutines - completedRoutines}</strong>
            </span>
            <span>
              Total: <strong className="text-[#242039]">{totalRoutines}</strong>
            </span>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFC] h-2.5 rounded-full overflow-hidden border border-[#ECE9F2]">
          <div
            className="bg-[#8B5CF6] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${routineCompletionPercentage}%` }}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-3 sm:p-4 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-wrap items-center justify-between gap-2.5">
        {/* Day Section Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Day' },
            { id: 'morning', label: 'Morning' },
            { id: 'afternoon', label: 'Afternoon' },
            { id: 'evening', label: 'Evening & Night' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeFilter === tab.id
                  ? 'bg-[#8B5CF6] text-white shadow-2xs'
                  : 'bg-[#FAFAFC] text-[#817D91] hover:text-[#242039] hover:bg-[#F1EBFF]/40'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#817D91]" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-medium text-[#242039] bg-[#FAFAFC] border border-[#ECE9F2] rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#8B5CF6]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c === 'all' ? 'All' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline Routine List */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] space-y-6">
        {filteredRoutines.length === 0 ? (
          <div className="py-12 text-center">
            <CalendarCheck className="w-10 h-10 text-[#A19BAD]/40 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#242039]">No activities match filters</h4>
            <p className="text-xs text-[#817D91] mt-0.5">Try switching to "All Day" or add a new activity.</p>
            <Button variant="secondary" size="sm" className="mt-3" onClick={handleOpenAdd}>
              + Add Activity
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Morning Section */}
            {(activeFilter === 'all' || activeFilter === 'morning') && morningItems.length > 0 && (
              <div className="space-y-2.5">
                {renderSectionHeader('Morning Sprint', morningItems.length, '07:00 - 12:00')}
                <div className="space-y-2">
                  {morningItems.map((item) => renderRoutineCard(item))}
                </div>
              </div>
            )}

            {/* Afternoon Section */}
            {(activeFilter === 'all' || activeFilter === 'afternoon') && afternoonItems.length > 0 && (
              <div className="space-y-2.5">
                {renderSectionHeader('Afternoon Revision & Breaks', afternoonItems.length, '12:00 - 17:00')}
                <div className="space-y-2">
                  {afternoonItems.map((item) => renderRoutineCard(item))}
                </div>
              </div>
            )}

            {/* Evening Section */}
            {(activeFilter === 'all' || activeFilter === 'evening') && eveningItems.length > 0 && (
              <div className="space-y-2.5">
                {renderSectionHeader('Evening Review & Wind-down', eveningItems.length, '17:00 - 23:30')}
                <div className="space-y-2">
                  {eveningItems.map((item) => renderRoutineCard(item))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Routine Modals */}
      <ActivityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingItem}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteConfirmItem)}
        onClose={() => setDeleteConfirmItem(null)}
        onConfirm={() => {
          if (deleteConfirmItem) {
            deleteRoutine(deleteConfirmItem.id);
            setDeleteConfirmItem(null);
          }
        }}
        title="Delete Routine Activity?"
        message={`Are you sure you want to remove "${deleteConfirmItem?.title}" from your daily schedule?`}
        confirmText="Delete Activity"
        danger={true}
      />
    </div>
  );

  function renderRoutineCard(item) {
    const color = getCategoryColor(item.category);
    return (
      <div
        key={item.id}
        className={`group p-3 sm:p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 ${item.completed
            ? 'bg-[#FAFAFC] border-[#ECE9F2]/80 opacity-75'
            : 'bg-white border-[#ECE9F2] hover:border-[#DDD8E8] hover:shadow-2xs'
          }`}
      >
        {/* Toggle Checkbox */}
        <button
          onClick={() => handleToggle(item.id, item.completed)}
          className={`shrink-0 rounded-lg p-0.5 transition-colors ${item.completed
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

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${color.bg} ${color.text} ${color.border}`}
            >
              {getCategoryIcon(item.category)}
              {item.category}
            </span>
            <span className="text-[11px] font-normal text-[#817D91] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A19BAD]" />
              {formatTime12h(item.time)} • {item.duration}
            </span>
          </div>

          <h4
            className={`text-xs sm:text-sm font-semibold transition-all ${item.completed ? 'line-through text-[#817D91]' : 'text-[#242039]'
              }`}
          >
            {item.title}
          </h4>

          {item.description && (
            <p className="text-[11px] text-[#817D91] mt-0.5 line-clamp-1">
              {item.description}
            </p>
          )}
        </div>

        {/* Actions (Edit / Delete) */}
        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleOpenEdit(item)}
            className="p-1.5 text-[#817D91] hover:text-[#8B5CF6] hover:bg-[#F1EBFF] rounded-lg transition-colors"
            title="Edit Activity"
            aria-label="Edit activity"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteConfirmItem(item)}
            className="p-1.5 text-[#817D91] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Activity"
            aria-label="Delete activity"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }
}
