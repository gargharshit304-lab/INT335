import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Droplets,
  Moon,
  Utensils,
  Coffee,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../context/AppContext';

export default function ProgressPage() {
  const {
    weeklyAnalytics,
    hydrationTarget,
    routines,
    sleepRecords,
  } = useApp();

  const [timeRange, setTimeRange] = useState('7d');

  const completedRoutinesCount = routines.filter((r) => r.completed).length;
  const avgSleep = (
    sleepRecords.reduce((acc, curr) => acc + curr.durationHours, 0) /
    sleepRecords.length
  ).toFixed(1);

  const insights = [
    {
      id: 1,
      title: 'Routine Consistency Trend',
      desc: `You completed ${completedRoutinesCount} routine activities today. Your completion pace indicates steady exam preparation without cramming.`,
      tag: 'Routine',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      id: 2,
      title: 'Circadian Sleep Rhythm',
      desc: `Your 7-day average sleep duration stands at ${avgSleep} hours per night, safely within the restorative memory consolidation band.`,
      tag: 'Sleep',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      id: 3,
      title: 'Hydration Intake Pattern',
      desc: `Hydration logged on all 7 recorded days this week. Peak intake observed during afternoon revision blocks.`,
      tag: 'Hydration',
      color: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      id: 4,
      title: 'Nourishment Regularity',
      desc: `Meal check-ins indicate breakfast and afternoon nourishment were prioritized, preventing midday cognitive crashes.`,
      tag: 'Nutrition',
      color: 'text-[#27AE82] bg-[#EAF8F2] border-emerald-100',
    },
  ];

  const calendarDays = [
    { day: 1, rate: 85 }, { day: 2, rate: 70 }, { day: 3, rate: 90 }, { day: 4, rate: 80 }, { day: 5, rate: 75 }, { day: 6, rate: 85 }, { day: 7, rate: 95 },
    { day: 8, rate: 90 }, { day: 9, rate: 65 }, { day: 10, rate: 88 }, { day: 11, rate: 92 }, { day: 12, rate: 80 }, { day: 13, rate: 75 }, { day: 14, rate: 85 },
    { day: 15, rate: 90 }, { day: 16, rate: 82 }, { day: 17, rate: 78 }, { day: 18, rate: 88 }, { day: 19, rate: 95 }, { day: 20, rate: 90 }, { day: 21, rate: 85 },
    { day: 22, rate: 70 }, { day: 23, rate: 80 }, { day: 24, rate: 88 }, { day: 25, rate: 92 }, { day: 26, rate: 85 }, { day: 27, rate: 95 }, { day: 28, rate: 78 },
  ];

  const getHeatmapColor = (rate) => {
    if (rate >= 90) return 'bg-[#8B5CF6] text-white';
    if (rate >= 80) return 'bg-[#A78BFA] text-white';
    if (rate >= 70) return 'bg-[#C4B5FD] text-purple-900';
    return 'bg-[#DDD6FE] text-purple-900';
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F1EBFF] text-[#6D28D9] border border-purple-100 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Routine Analytics & Balance Metrics
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#242039] tracking-tight">
            My Exam Week Progress
          </h2>
          <p className="text-xs sm:text-sm text-[#817D91] mt-0.5 max-w-xl">
            Descriptive analysis of your daily habits, hydration consistency, sleep timing, and study breaks during examination week.
          </p>
        </div>

        {/* Time Range Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#FAFAFC] border border-[#ECE9F2] rounded-xl self-start md:self-auto">
          {[
            { id: '7d', label: '7 Days' },
            { id: '14d', label: '14 Days' },
            { id: '30d', label: '30 Days' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setTimeRange(r.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${timeRange === r.id
                  ? 'bg-white text-[#8B5CF6] shadow-2xs border border-[#ECE9F2]'
                  : 'text-[#817D91] hover:text-[#242039]'
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((ins) => (
          <div
            key={ins.id}
            className="bg-white border border-[#ECE9F2] rounded-[20px] p-4.5 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between"
          >
            <div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border inline-block mb-2 ${ins.color}`}
              >
                {ins.tag} Insight
              </span>
              <h4 className="text-sm font-bold font-heading text-[#242039] mb-1">
                {ins.title}
              </h4>
              <p className="text-xs text-[#817D91] leading-relaxed">{ins.desc}</p>
            </div>
            <div className="pt-2.5 mt-3 border-t border-[#ECE9F2] flex items-center justify-between text-[11px] text-[#A19BAD]">
              <span>Sample analytics</span>
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid: Routine Completion Rate & Hydration History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Routine Completion Trend */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039] flex items-center gap-2">
                Routine Completion Rate (%)
                <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
              </h3>
              <p className="text-xs text-[#817D91] mt-0.5">
                Target: Maintain &ge;80% daily schedule fulfillment
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F1EBFF] text-[#6D28D9]">
              Overall 81%
            </span>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyAnalytics} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: '#ECE9F2' }} tick={{ fill: '#817D91', fontSize: 11 }} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={{ stroke: '#ECE9F2' }} tick={{ fill: '#817D91', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip />
                <ReferenceLine y={80} stroke="#27AE82" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="routineRate" stroke="#8B5CF6" strokeWidth={2} fill="url(#purpleGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hydration Volume History */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039] flex items-center gap-2">
                Hydration Volume (ml)
                <Droplets className="w-4 h-4 text-sky-500 fill-current" />
              </h3>
              <p className="text-xs text-[#817D91] mt-0.5">
                Baseline goal: {hydrationTarget} ml / day
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
              Avg 2,300ml
            </span>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAnalytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: '#ECE9F2' }} tick={{ fill: '#817D91', fontSize: 11 }} />
                <YAxis domain={[0, 3000]} tickLine={false} axisLine={{ stroke: '#ECE9F2' }} tick={{ fill: '#817D91', fontSize: 11 }} tickFormatter={(v) => `${v}ml`} />
                <Tooltip />
                <ReferenceLine y={hydrationTarget} stroke="#0284C7" strokeDasharray="3 3" />
                <Bar dataKey="waterMl" fill="#38BDF8" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sleep & Breaks Comparison Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Sleep Hours Trend */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039] flex items-center gap-2">
                Sleep Consistency (Hours)
                <Moon className="w-4 h-4 text-indigo-500" />
              </h3>
              <p className="text-xs text-[#817D91] mt-0.5">
                Recommended 7.0 - 8.5h window
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              Avg 7.5h
            </span>
          </div>

          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyAnalytics} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: '#ECE9F2' }} tick={{ fill: '#817D91', fontSize: 11 }} />
                <YAxis domain={[5, 9]} tickLine={false} axisLine={{ stroke: '#ECE9F2' }} tick={{ fill: '#817D91', fontSize: 11 }} tickFormatter={(v) => `${v}h`} />
                <Tooltip />
                <ReferenceLine y={7.5} stroke="#6366F1" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="sleepHours" stroke="#6366F1" strokeWidth={2} dot={{ r: 3, fill: '#6366F1' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Breaks & Meals Adherence */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
              <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039] flex items-center gap-2">
                Rest & Fuel Maintenance
                <Coffee className="w-4 h-4 text-amber-500" />
              </h3>
              <span className="text-xs text-[#817D91]">7-Day Cumulative</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-[#ECE9F2]">
                <div className="flex items-center gap-2 text-amber-600 mb-1">
                  <Coffee className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Study Breaks</span>
                </div>
                <span className="text-xl font-black font-heading text-[#242039]">
                  26 Breaks
                </span>
                <p className="text-[10px] text-[#817D91] mt-0.5">
                  ~3.7 rest intervals taken per study day
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-[#ECE9F2]">
                <div className="flex items-center gap-2 text-[#27AE82] mb-1">
                  <Utensils className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Meals Eaten</span>
                </div>
                <span className="text-xl font-black font-heading text-[#242039]">
                  19 Meals
                </span>
                <p className="text-[10px] text-[#817D91] mt-0.5">
                  Zero meals skipped on recorded exam days
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#EAF8F2] border border-emerald-100 flex items-center gap-2.5 mt-3">
            <CheckCircle2 className="w-4 h-4 text-[#27AE82] shrink-0" />
            <p className="text-xs text-[#27AE82] font-medium leading-relaxed">
              Healthy pacing achieved: Brain fatigue is substantially reduced by combining scheduled breaks with consistent meal check-ins.
            </p>
          </div>
        </div>
      </div>

      {/* Routine Heatmap Calendar Simulation */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ECE9F2] mb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8B5CF6]" />
              Exam Prep Consistency Calendar (4 Weeks)
            </h3>
            <p className="text-xs text-[#817D91] mt-0.5">
              Visual map of routine completion over time
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#817D91]">
            <span>Low</span>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-xs bg-[#DDD6FE]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#C4B5FD]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#A78BFA]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#8B5CF6]" />
            </div>
            <span>High Consistency</span>
          </div>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 pt-1">
          {calendarDays.map((c) => (
            <div
              key={c.day}
              className={`p-1.5 rounded-lg text-center flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-default ${getHeatmapColor(
                c.rate
              )}`}
              title={`Day ${c.day}: ${c.rate}% Routine Completed`}
            >
              <span className="text-[9px] opacity-80">D{c.day}</span>
              <span className="text-[11px] font-bold">{c.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
