import React, { useState } from 'react';
import {
  Moon,
  Clock,
  Sparkles,
  TrendingUp,
  Plus,
  Bed,
  Sun,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import RecordSleepModal from '../components/dashboard/RecordSleepModal';
import { formatTime12h } from '../utils/formatters';

export default function SleepPage() {
  const {
    user,
    sleepRecords,
    latestSleep,
    averageSleep,
    updateUserSettings,
  } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [preferredBed, setPreferredBed] = useState(user.preferences?.targetBedtime || '23:30');
  const [preferredWake, setPreferredWake] = useState(user.preferences?.targetWakeUp || '07:00');

  const handleUpdatePreferences = (e) => {
    e.preventDefault();
    updateUserSettings({
      ...user,
      preferences: {
        ...user.preferences,
        targetBedtime: preferredBed,
        targetWakeUp: preferredWake,
      },
    });
  };

  // Prepare 7-day sleep chart data
  const chartData = sleepRecords.slice(-7).map((r) => ({
    day: r.day,
    duration: r.durationHours,
    quality: r.quality,
    date: r.date,
  }));

  // Calculate consistency: percentage of days between 7.0 and 8.5 hours
  const consistentDays = sleepRecords.filter(
    (r) => r.durationHours >= 7.0 && r.durationHours <= 8.5
  ).length;
  const consistencyRate =
    sleepRecords.length > 0
      ? Math.round((consistentDays / sleepRecords.length) * 100)
      : 85;

  const CustomSleepTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#ECE9F2] p-3 rounded-2xl shadow-xl text-xs">
          <p className="font-bold text-[#242039]">{label}</p>
          <p className="text-indigo-600 font-semibold mt-1">
            Duration: {payload[0].value} hours
          </p>
          <p className="text-[10px] text-[#858197] mt-0.5">
            {payload[0].value >= 7 ? '✓ Balanced restorative window' : 'Shorter duration'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border border-[#ECE9F2] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 fill-current text-indigo-500" />
              Circadian Routine & Memory Consolidation
            </span>
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-[#242039]">
            Sleep Consistency Tracker
          </h2>
          <p className="text-sm text-[#858197] mt-1 max-w-xl">
            Maintain regular bedtimes and wake-up times throughout examination periods. Stable sleep routines protect focus, cognitive stamina, and long-term recall.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
            Record Sleep
          </Button>
        </div>
      </div>

      {/* Primary 3 Sleep Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#ECE9F2] rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#858197]">
              Latest Recorded Sleep
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bed className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold font-heading text-[#242039]">
            {latestSleep ? `${latestSleep.durationHours} hrs` : '7.5 hrs'}
          </h3>
          <p className="text-xs text-[#858197] mt-1">
            Bedtime: {formatTime12h(latestSleep?.bedtime || '23:30')} • Wake: {formatTime12h(latestSleep?.wakeTime || '07:15')}
          </p>
        </div>

        <div className="bg-white border border-[#ECE9F2] rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#858197]">
              7-Day Average
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold font-heading text-[#242039]">
            {averageSleep} hrs / day
          </h3>
          <p className="text-xs text-[#858197] mt-1">
            Recommended student target: 7.0 — 8.5 hrs
          </p>
        </div>

        <div className="bg-white border border-[#ECE9F2] rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#858197]">
              Bedtime Consistency
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold font-heading text-emerald-600">
            {consistencyRate}%
          </h3>
          <p className="text-xs text-[#858197] mt-1">
            {consistentDays} of {sleepRecords.length} nights in restorative window
          </p>
        </div>
      </div>

      {/* 7-Day Sleep Consistency Chart */}
      <div className="bg-white border border-[#ECE9F2] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ECE9F2] mb-4">
          <div>
            <h3 className="text-base font-bold font-heading text-[#242039] flex items-center gap-2">
              Sleep Duration & Consistency Trend
              <TrendingUp className="w-4 h-4 text-indigo-500" />
            </h3>
            <p className="text-xs text-[#858197] mt-0.5">
              Target band highlighted between 7.0 and 8.5 hours
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 self-start sm:self-auto">
            Target 7.5h Standard
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={{ stroke: '#ECE9F2' }}
                tick={{ fill: '#858197', fontSize: 11 }}
              />
              <YAxis
                domain={[4, 10]}
                tickLine={false}
                axisLine={{ stroke: '#ECE9F2' }}
                tick={{ fill: '#858197', fontSize: 11 }}
                tickFormatter={(v) => `${v}h`}
              />
              <Tooltip content={<CustomSleepTooltip />} />
              <ReferenceArea y1={7} y2={8.5} fill="#EEF2FF" fillOpacity={0.6} />
              <ReferenceLine y={7.5} stroke="#6366F1" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 5, fill: '#6366F1', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Target Setting & Sleep History Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preferred Target Setting Form (1 col) */}
        <div className="bg-white border border-[#ECE9F2] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold font-heading text-[#242039] pb-3 border-b border-[#ECE9F2] mb-4">
              Circadian Preferences
            </h4>

            <form onSubmit={handleUpdatePreferences} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  Target Bedtime
                </label>
                <input
                  type="time"
                  value={preferredBed}
                  onChange={(e) => setPreferredBed(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  Target Wake-up Time
                </label>
                <input
                  type="time"
                  value={preferredWake}
                  onChange={(e) => setPreferredWake(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <Button type="submit" variant="secondary" size="sm" className="w-full">
                Save Routine Targets
              </Button>
            </form>
          </div>

          <p className="text-[11px] text-[#858197] pt-4 border-t border-[#ECE9F2] mt-4 italic">
            Non-medical companion: Designed to keep your routine balanced during exam stress.
          </p>
        </div>

        {/* Seven-Day History Log Table (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-[#ECE9F2] rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-4">
            <h4 className="text-sm font-bold font-heading text-[#242039] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              Recorded Sleep Sessions
            </h4>
            <span className="text-xs text-[#858197]">{sleepRecords.length} records</span>
          </div>

          <div className="space-y-2.5">
            {sleepRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#ECE9F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#ECE9F2] flex flex-col items-center justify-center font-bold text-[#242039]">
                    <span className="text-[10px] text-[#858197] uppercase -mb-0.5">{rec.day}</span>
                    <span>{rec.durationHours}h</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#242039]">
                        {formatTime12h(rec.bedtime)} → {formatTime12h(rec.wakeTime)}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white border border-[#ECE9F2] text-[10px] font-semibold text-indigo-600">
                        {rec.quality}
                      </span>
                    </div>
                    {rec.notes && (
                      <p className="text-[#858197] text-[11px] mt-0.5">{rec.notes}</p>
                    )}
                  </div>
                </div>

                <div className="text-right sm:self-center">
                  <span className="text-[11px] text-[#858197]">{rec.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Record Sleep Modal */}
      <RecordSleepModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

