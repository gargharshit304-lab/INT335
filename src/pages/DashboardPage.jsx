import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Droplets,
  Moon,
  Clock,
  ArrowRight,
  Plus,
  BarChart3,
  Calendar,
  Sparkles,
  Coffee,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressRing from '../components/common/ProgressRing';
import TodayRoutineTimeline from '../components/dashboard/TodayRoutineTimeline';
import WeeklyConsistencyChart from '../components/dashboard/WeeklyConsistencyChart';
import QuickAddWaterModal from '../components/hydration/QuickAddWaterModal';
import ActivityModal from '../components/routine/ActivityModal';
import RecordSleepModal from '../components/dashboard/RecordSleepModal';
import { calculateDaysUntil, formatTime12h } from '../utils/formatters';

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
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  const hydrationPct = Math.min(
    Math.round((currentWaterIntake / hydrationTarget) * 100),
    100
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* ROW 1: Compact Hero Welcome & Examination Countdown Section */}
      <div className="bg-[#F7F5FA] border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.025)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Greeting & Date Pills */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#ECE9F2] text-[11px] font-semibold text-[#817D91]">
              <Calendar className="w-3 h-3 text-[#8B5CF6]" />
              {todayFormatted}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF8F2] border border-emerald-100 text-[11px] font-semibold text-[#27AE82]">
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#242039] tracking-tight">
            {getGreeting()}, {user.name.split(' ')[0]}!
          </h2>
          <p className="text-xs sm:text-sm text-[#817D91]">
            Let's make today a balanced one. Study hard, stay paced, and don't crash.
          </p>
        </div>

        {/* Right: Compact Horizontal Exam Countdown Card */}
        <div className="bg-white border border-[#ECE9F2] rounded-2xl p-3 sm:py-3 sm:px-4 flex items-center gap-3.5 shadow-2xs shrink-0 self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex flex-col items-center justify-center font-heading font-extrabold shadow-xs shadow-purple-500/20 shrink-0">
            <span className="text-base leading-none">{daysUntilExam}</span>
            <span className="text-[8px] uppercase tracking-wider font-semibold opacity-90 -mt-0.5">days</span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#8B5CF6] uppercase tracking-wide">
              <Clock className="w-3 h-3" />
              <span>{user.examName || 'MTT Exam Week'}</span>
            </div>
            <p className="text-xs font-bold text-[#242039] truncate max-w-[170px] sm:max-w-[210px] mt-0.5">
              Next: {user.subjects?.[0]?.name || 'Design Thinking'}
            </p>
            <p className="text-[10px] text-[#A19BAD]">Starts {user.examStartDate}</p>
          </div>
        </div>
      </div>

      {/* ROW 2: Daily Balance Overview & Quick Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Today's Balance Card (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white border border-[#ECE9F2] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#ECE9F2]">
            <div>
              <h3 className="text-base font-bold font-heading text-[#242039] tracking-tight">
                Today's Balance
              </h3>
              <p className="text-xs text-[#817D91] mt-0.5">
                Your daily routine at a glance.
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F1EBFF] text-[#6D28D9]">
              {routineCompletionPercentage}%
            </span>
          </div>

          {/* Horizontally aligned metrics on desktop */}
          <div className="py-3 flex items-center justify-start gap-5">
            <ProgressRing
              radius={38}
              stroke={5}
              progress={routineCompletionPercentage}
              color="#8B5CF6"
              trackColor="#F1EBFF"
            >
              <div className="text-center">
                <span className="text-base font-black font-heading text-[#242039]">
                  {routineCompletionPercentage}%
                </span>
              </div>
            </ProgressRing>

            <div className="space-y-1.5 text-xs text-[#817D91] flex-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  Completed:
                </span>
                <strong className="text-[#242039] font-bold">{completedRoutines} items</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ECE9F2]" />
                  Remaining:
                </span>
                <strong className="text-[#242039] font-bold">{totalRoutines - completedRoutines} items</strong>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#ECE9F2]">
                <span>Total planned:</span>
                <strong className="text-[#242039]">{totalRoutines} activities</strong>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#ECE9F2] flex items-center justify-between text-xs">
            <button
              onClick={() => setRoutineModalOpen(true)}
              className="text-xs font-semibold text-[#8B5CF6] hover:underline"
            >
              + Add Activity
            </button>
            <Link
              to="/app/routine"
              className="text-xs font-medium text-[#817D91] hover:text-[#242039] flex items-center gap-1"
            >
              Routine Planner <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right: 3 Compact Quick Statistics Cards (7 cols on lg) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Quick Stat 1: Hydration */}
          <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-4 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-[#817D91]">Hydration</span>
                <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center">
                  <Droplets className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
              <h4 className="text-lg font-bold font-heading text-[#242039]">
                {currentWaterIntake} <span className="text-xs font-normal text-[#817D91]">/ {hydrationTarget}ml</span>
              </h4>
              <div className="w-full bg-[#FAFAFC] h-1.5 rounded-full overflow-hidden border border-[#ECE9F2] my-2">
                <div
                  className="bg-sky-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${hydrationPct}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#ECE9F2] flex items-center justify-between">
              <span className="text-[10px] text-[#817D91]">{hydrationPct}% met</span>
              <button
                onClick={() => addWater(250, 'Glass of Water')}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md transition-colors"
              >
                +250ml
              </button>
            </div>
          </div>

          {/* Quick Stat 2: Sleep */}
          <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-4 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-[#817D91]">Sleep Duration</span>
                <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                  <Moon className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
              <h4 className="text-lg font-bold font-heading text-[#242039]">
                {latestSleep ? `${latestSleep.durationHours} hrs` : '7.5 hrs'}
              </h4>
              <p className="text-[11px] text-[#817D91] mt-1 truncate">
                Quality: <strong className="text-[#242039]">{latestSleep?.quality || 'Restful'}</strong>
              </p>
            </div>

            <div className="pt-2 border-t border-[#ECE9F2] flex items-center justify-between text-[11px] text-[#817D91]">
              <span>7d avg: <strong className="text-[#242039]">{averageSleep}h</strong></span>
              <button
                onClick={() => setSleepModalOpen(true)}
                className="text-[11px] font-semibold text-indigo-600 hover:underline"
              >
                Record
              </button>
            </div>
          </div>

          {/* Quick Stat 3: Rest & Nourishment */}
          <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-4 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-[#817D91]">Pacing Check</span>
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#27AE82] flex items-center justify-center">
                  <Coffee className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="text-lg font-bold font-heading text-[#242039]">
                {studyBreaksCompleted} Breaks
              </h4>
              <p className="text-[11px] text-[#817D91] mt-1">
                Meals: <strong className="text-[#27AE82]">{mealsCheckedCount}/4 logged</strong>
              </p>
            </div>

            <div className="pt-2 border-t border-[#ECE9F2] flex items-center justify-between text-[11px] text-[#817D91]">
              <span>Target: &ge;3 breaks</span>
              <Link to="/app/progress" className="text-[11px] font-semibold text-[#8B5CF6] hover:underline">
                Analytics →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Today's Routine in an Independently Scrollable Card */}
      <div>
        <TodayRoutineTimeline onAddActivity={() => setRoutineModalOpen(true)} />
      </div>

      {/* ROW 4: Hydration & Sleep Summary Cards Placed Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hydration Card */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center">
                  <Droplets className="w-4 h-4 fill-current" />
                </div>
                <h4 className="text-sm font-bold font-heading text-[#242039]">
                  Hydration Tracker
                </h4>
              </div>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">
                {hydrationPct}% of {hydrationTarget}ml
              </span>
            </div>

            <div className="flex items-center justify-between text-xs my-3">
              <div>
                <span className="text-[#817D91] block">Current Intake</span>
                <strong className="text-base font-bold font-heading text-[#242039]">
                  {currentWaterIntake} ml
                </strong>
              </div>
              <div className="h-7 w-px bg-[#ECE9F2]" />
              <div>
                <span className="text-[#817D91] block">Remaining</span>
                <strong className="text-base font-bold font-heading text-[#242039]">
                  {Math.max(0, hydrationTarget - currentWaterIntake)} ml
                </strong>
              </div>
              <div className="h-7 w-px bg-[#ECE9F2]" />
              <div>
                <span className="text-[#817D91] block">Daily Goal</span>
                <strong className="text-base font-bold font-heading text-[#242039]">
                  {hydrationTarget} ml
                </strong>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => addWater(150, 'Cup of Water')}
                className="py-1.5 px-2 bg-[#FAFAFC] hover:bg-sky-50 text-[#242039] hover:text-sky-700 border border-[#ECE9F2] hover:border-sky-200 rounded-xl text-xs font-semibold transition-all text-center"
              >
                +150ml Cup
              </button>
              <button
                type="button"
                onClick={() => addWater(250, 'Glass of Water')}
                className="py-1.5 px-2 bg-[#FAFAFC] hover:bg-sky-50 text-[#242039] hover:text-sky-700 border border-[#ECE9F2] hover:border-sky-200 rounded-xl text-xs font-semibold transition-all text-center"
              >
                +250ml Glass
              </button>
              <button
                type="button"
                onClick={() => addWater(500, 'Bottle of Water')}
                className="py-1.5 px-2 bg-[#FAFAFC] hover:bg-sky-50 text-[#242039] hover:text-sky-700 border border-[#ECE9F2] hover:border-sky-200 rounded-xl text-xs font-semibold transition-all text-center"
              >
                +500ml Flask
              </button>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#ECE9F2] flex items-center justify-between text-xs">
            <button
              onClick={() => setWaterModalOpen(true)}
              className="font-semibold text-sky-600 hover:underline"
            >
              + Custom Amount
            </button>
            <Link to="/app/hydration" className="text-[#817D91] hover:text-[#242039] flex items-center gap-1">
              View History <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Sleep Card */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                  <Moon className="w-4 h-4 fill-current" />
                </div>
                <h4 className="text-sm font-bold font-heading text-[#242039]">
                  Circadian Sleep Summary
                </h4>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                7d Avg: {averageSleep}h
              </span>
            </div>

            <div className="flex items-center justify-between text-xs my-3">
              <div>
                <span className="text-[#817D91] block">Last Recorded</span>
                <strong className="text-base font-bold font-heading text-[#242039]">
                  {latestSleep ? `${latestSleep.durationHours} hrs` : '7.5 hrs'}
                </strong>
              </div>
              <div className="h-7 w-px bg-[#ECE9F2]" />
              <div>
                <span className="text-[#817D91] block">Bedtime Target</span>
                <strong className="text-base font-bold font-heading text-[#242039]">
                  {user.preferences?.targetBedtime || '23:30'}
                </strong>
              </div>
              <div className="h-7 w-px bg-[#ECE9F2]" />
              <div>
                <span className="text-[#817D91] block">Wake Target</span>
                <strong className="text-base font-bold font-heading text-[#242039]">
                  {user.preferences?.targetWakeUp || '07:00'}
                </strong>
              </div>
            </div>

            <p className="text-[11px] text-[#817D91] bg-[#FAFAFC] p-2 rounded-xl border border-[#ECE9F2] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
              <span>Stable bedtimes directly reinforce recall and memory consolidation during exams.</span>
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-[#ECE9F2] flex items-center justify-between text-xs">
            <button
              onClick={() => setSleepModalOpen(true)}
              className="font-semibold text-indigo-600 hover:underline"
            >
              + Record Sleep
            </button>
            <Link to="/app/sleep" className="text-[#817D91] hover:text-[#242039] flex items-center gap-1">
              Sleep Trends <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ROW 5: Weekly Consistency Chart */}
      <div>
        <WeeklyConsistencyChart />
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
