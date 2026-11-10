import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Droplets,
  Moon,
  Utensils,
  Coffee,
  Calendar,
  Sparkles,
  ArrowRight,
  Plus,
  BarChart3,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressRing from '../components/common/ProgressRing';
import TodayRoutineTimeline from '../components/dashboard/TodayRoutineTimeline';
import WeeklyConsistencyChart from '../components/dashboard/WeeklyConsistencyChart';
import DailyEncouragementCard from '../components/dashboard/DailyEncouragementCard';
import MealCheckinCard from '../components/dashboard/MealCheckinCard';
import QuickAddWaterModal from '../components/hydration/QuickAddWaterModal';
import ActivityModal from '../components/routine/ActivityModal';
import RecordSleepModal from '../components/dashboard/RecordSleepModal';
import { calculateDaysUntil } from '../utils/formatters';

export default function DashboardPage() {
  const {
    user,
    routines,
    totalRoutines,
    completedRoutines,
    routineCompletionPercentage,
    currentWaterIntake,
    hydrationTarget,
    latestSleep,
    averageSleep,
    mealsCheckedCount,
    studyBreaksCompleted,
    addWater,
  } = useApp();

  const navigate = useNavigate();

  // Modals state
  const [waterModalOpen, setWaterModalOpen] = useState(false);
  const [routineModalOpen, setRoutineModalOpen] = useState(false);
  const [sleepModalOpen, setSleepModalOpen] = useState(false);

  const daysUntilExam = calculateDaysUntil(user.examStartDate);

  // Dynamic greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const hydrationPct = Math.min(
    Math.round((currentWaterIntake / hydrationTarget) * 100),
    100
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner / Greeting Section */}
      <div className="bg-gradient-to-r from-white via-white to-[#F0EBFF]/40 border border-[#ECE9F2] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0EBFF] text-[#6D28D9] border border-purple-100 flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#8B5CF6]" />
              {todayFormatted}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#059669] border border-emerald-100 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#10B981]" />
              INT335 Prototype
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#242039] tracking-tight">
            {getGreeting()}, {user.name.split(' ')[0]}!
          </h2>
          <p className="text-sm text-[#858197] mt-1">
            Let's make today a balanced one. Study hard, stay hydrated, and don't skip sleep.
          </p>
        </div>

        {/* Exam Countdown Widget */}
        <div className="bg-white border border-[#ECE9F2] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-xs shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6] text-white flex flex-col items-center justify-center font-heading font-extrabold shadow-sm shadow-purple-500/20">
            <span className="text-lg leading-none">{daysUntilExam}</span>
            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-85">days</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6] uppercase tracking-wide">
              <Clock className="w-3.5 h-3.5" />
              {user.examName}
            </div>
            <p className="text-xs font-bold text-[#242039] mt-0.5">
              Next: {user.subjects?.[0]?.name}
            </p>
            <p className="text-[11px] text-[#858197]">Start date: {user.examStartDate}</p>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid: Daily Completion + 4 Core Area Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Daily Completion Card */}
        <div className="lg:col-span-2 bg-white border border-[#ECE9F2] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#858197]">
                Daily Routine Completion
              </span>
              <h3 className="text-lg font-bold font-heading text-[#242039] mt-0.5">
                Today's Balance Score
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F0EBFF] text-[#6D28D9]">
              {completedRoutines}/{totalRoutines} Activities
            </span>
          </div>

          <div className="py-4 flex items-center justify-around gap-4">
            <ProgressRing
              radius={55}
              stroke={10}
              progress={routineCompletionPercentage}
              color="#8B5CF6"
              trackColor="#F0EBFF"
            >
              <div className="text-center">
                <span className="text-2xl font-black font-heading text-[#242039]">
                  {routineCompletionPercentage}%
                </span>
                <span className="block text-[10px] font-semibold text-[#858197] uppercase">
                  Paced
                </span>
              </div>
            </ProgressRing>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                <span className="text-[#858197]">Completed:</span>
                <strong className="text-[#242039] font-bold">{completedRoutines} items</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F0EBFF] border border-purple-200"></span>
                <span className="text-[#858197]">Remaining:</span>
                <strong className="text-[#242039] font-bold">{totalRoutines - completedRoutines} items</strong>
              </div>
              <p className="text-[11px] text-[#858197] italic pt-1 border-t border-[#ECE9F2]">
                Target: Complete routines without crash or cramming.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#ECE9F2] flex items-center justify-between">
            <button
              onClick={() => setRoutineModalOpen(true)}
              className="text-xs font-semibold text-[#8B5CF6] hover:underline"
            >
              + Add New Activity
            </button>
            <button
              onClick={() => navigate('/app/routine')}
              className="text-xs font-semibold text-[#858197] hover:text-[#242039] flex items-center gap-1"
            >
              View Timeline <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Hydration Summary Card */}
        <div className="bg-white border border-[#ECE9F2] rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                <Droplets className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                {hydrationPct}%
              </span>
            </div>
            <p className="text-xs text-[#858197] font-medium">Hydration Intake</p>
            <h4 className="text-xl font-black font-heading text-[#242039] mt-0.5">
              {currentWaterIntake} <span className="text-xs font-normal text-[#858197]">/ {hydrationTarget}ml</span>
            </h4>
          </div>

          {/* Mini progress bar */}
          <div className="my-3">
            <div className="w-full bg-[#FAF9FC] h-2 rounded-full overflow-hidden border border-[#ECE9F2]">
              <div
                className="bg-sky-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${hydrationPct}%` }}
              />
            </div>
            <p className="text-[11px] text-[#858197] mt-1.5">
              {Math.max(0, hydrationTarget - currentWaterIntake)}ml remaining
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#ECE9F2]">
            <button
              onClick={() => addWater(250, 'Glass of Water')}
              className="flex-1 py-1.5 px-2 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold rounded-xl text-center transition-colors"
            >
              +250ml
            </button>
            <button
              onClick={() => setWaterModalOpen(true)}
              className="p-1.5 hover:bg-[#FAF9FC] text-[#858197] rounded-xl border border-[#ECE9F2]"
              title="Custom Log"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sleep Duration Summary Card */}
        <div className="bg-white border border-[#ECE9F2] rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <Moon className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                7-day Avg: {averageSleep}h
              </span>
            </div>
            <p className="text-xs text-[#858197] font-medium">Last Night's Sleep</p>
            <h4 className="text-xl font-black font-heading text-[#242039] mt-0.5">
              {latestSleep ? `${latestSleep.durationHours} hrs` : '7.5 hrs'}
            </h4>
          </div>

          <div className="my-3 text-xs text-[#858197]">
            <p className="flex items-center justify-between">
              <span>Quality:</span>
              <strong className="text-[#242039] font-semibold">{latestSleep?.quality || 'Restful'}</strong>
            </p>
            <p className="flex items-center justify-between mt-1">
              <span>Wake Target:</span>
              <strong className="text-[#242039] font-semibold">{user.preferences?.targetWakeUp || '07:00'}</strong>
            </p>
          </div>

          <div className="pt-2 border-t border-[#ECE9F2]">
            <button
              onClick={() => setSleepModalOpen(true)}
              className="w-full py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1"
            >
              <Moon className="w-3.5 h-3.5" />
              Record Sleep
            </button>
          </div>
        </div>

        {/* Breaks & Meals Quick Status */}
        <div className="bg-white border border-[#ECE9F2] rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                {studyBreaksCompleted} Taken
              </span>
            </div>
            <p className="text-xs text-[#858197] font-medium">Rest & Breaks</p>
            <h4 className="text-xl font-black font-heading text-[#242039] mt-0.5">
              Paced Study
            </h4>
          </div>

          <div className="my-3 space-y-1.5 text-xs text-[#858197]">
            <div className="flex items-center justify-between">
              <span>Meals logged:</span>
              <strong className="text-emerald-600 font-bold">{mealsCheckedCount}/4</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Break interval:</span>
              <strong className="text-[#242039] font-semibold">{user.preferences?.breakInterval || 60}m</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-[#ECE9F2]">
            <button
              onClick={() => navigate('/app/progress')}
              className="w-full py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              View Full Metrics
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="bg-white border border-[#ECE9F2] rounded-3xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#858197] px-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setWaterModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#F0EBFF] text-[#242039] hover:text-[#6D28D9] border border-[#ECE9F2] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Droplets className="w-3.5 h-3.5 text-sky-500" />
            + Log Water
          </button>
          <button
            onClick={() => setRoutineModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#F0EBFF] text-[#242039] hover:text-[#6D28D9] border border-[#ECE9F2] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#8B5CF6]" />
            + Add Routine
          </button>
          <button
            onClick={() => setSleepModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#F0EBFF] text-[#242039] hover:text-[#6D28D9] border border-[#ECE9F2] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
            Record Sleep
          </button>
          <button
            onClick={() => navigate('/app/progress')}
            className="px-3.5 py-1.5 rounded-xl bg-[#FAF9FC] hover:bg-[#F0EBFF] text-[#242039] hover:text-[#6D28D9] border border-[#ECE9F2] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
            View Analytics
          </button>
        </div>
      </div>

      {/* Main Grid: Today's Routine Timeline & Sidebar Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timeline (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <TodayRoutineTimeline onAddActivity={() => setRoutineModalOpen(true)} />
          <WeeklyConsistencyChart />
        </div>

        {/* Sidebar Cards (1 col) */}
        <div className="space-y-6">
          <MealCheckinCard />
          <DailyEncouragementCard />

          {/* Exam Subjects Card */}
          <div className="bg-white border border-[#ECE9F2] rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
              <h4 className="text-sm font-bold font-heading text-[#242039]">
                Exam Schedule (MTT)
              </h4>
              <span className="text-[10px] font-semibold text-[#8B5CF6] bg-[#F0EBFF] px-2 py-0.5 rounded-full">
                4 Papers
              </span>
            </div>

            <div className="space-y-2.5">
              {user.subjects?.map((sub) => (
                <div
                  key={sub.code}
                  className="p-2.5 rounded-xl bg-[#FAF9FC] border border-[#ECE9F2] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#242039]">{sub.code}</span>
                    <p className="text-[11px] text-[#858197] truncate max-w-[170px]">
                      {sub.name}
                    </p>
                  </div>
                  <span className="font-semibold text-[#8B5CF6] text-[11px] bg-white px-2 py-1 rounded-lg border border-[#ECE9F2]">
                    {sub.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <QuickAddWaterModal
        isOpen={waterModalOpen}
        onClose={() => setWaterModalOpen(false)}
      />
      <ActivityModal
        isOpen={routineModalOpen}
        onClose={() => setRoutineModalOpen(false)}
      />
      <RecordSleepModal
        isOpen={sleepModalOpen}
        onClose={() => setSleepModalOpen(false)}
      />
    </div>
  );
}

