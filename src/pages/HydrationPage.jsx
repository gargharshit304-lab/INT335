import React, { useState } from 'react';
import {
  Droplets,
  Plus,
  Trash2,
  TrendingUp,
  Target,
  Sparkles,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { triggerCelebration } from '../utils/confetti';

export default function HydrationPage() {
  const {
    hydrationLogs,
    currentWaterIntake,
    hydrationTarget,
    hydrationWeek,
    addWater,
    removeWaterLog,
    updateHydrationTarget,
  } = useApp();

  const [customAmount, setCustomAmount] = useState('');
  const [customLabel, setCustomLabel] = useState('Study Water');
  const [targetModalOpen, setTargetModalOpen] = useState(false);
  const [newTargetValue, setNewTargetValue] = useState(hydrationTarget);

  const percentage = Math.min(
    Math.round((currentWaterIntake / hydrationTarget) * 100),
    100
  );
  const remaining = Math.max(0, hydrationTarget - currentWaterIntake);

  const handleQuickAdd = (amount, label) => {
    addWater(amount, label);
    if (currentWaterIntake + amount >= hydrationTarget) {
      triggerCelebration();
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customAmount || isNaN(customAmount) || Number(customAmount) <= 0) return;
    const amt = Number(customAmount);
    addWater(amt, customLabel.trim() || 'Custom Hydration');
    if (currentWaterIntake + amt >= hydrationTarget) {
      triggerCelebration();
    }
    setCustomAmount('');
  };

  const handleSaveTarget = (e) => {
    e.preventDefault();
    if (newTargetValue >= 1000 && newTargetValue <= 5000) {
      updateHydrationTarget(newTargetValue);
      setTargetModalOpen(false);
    }
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#ECE9F2] p-2.5 rounded-xl shadow-lg text-xs">
          <p className="font-bold text-[#242039]">{label}</p>
          <p className="text-sky-600 font-semibold mt-0.5">
            Intake: {payload[0].value} ml
          </p>
          <p className="text-[10px] text-[#817D91]">
            Target: {hydrationTarget} ml ({Math.round((payload[0].value / hydrationTarget) * 100)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 fill-current text-sky-500" />
              Brain Stamina & Alertness
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#242039] tracking-tight">
            Hydration Tracker
          </h2>
          <p className="text-xs sm:text-sm text-[#817D91] mt-0.5 max-w-xl">
            Keep mental alertness sharp without energy drinks. Frequent hydration helps university students avoid mid-study headaches and fatigue.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={Target}
            onClick={() => {
              setNewTargetValue(hydrationTarget);
              setTargetModalOpen(true);
            }}
          >
            Target: {hydrationTarget}ml
          </Button>
        </div>
      </div>

      {/* Main Hydration Visual Widget & Quick Add */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Visual Water Gauge */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col items-center justify-between text-center relative">
          <div className="w-full flex items-center justify-between pb-3 border-b border-[#ECE9F2]">
            <span className="text-xs font-semibold text-[#817D91]">
              Today's Water Status
            </span>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
              {percentage}% of Goal
            </span>
          </div>

          {/* Fluid Bottle / Tumbler Visualization */}
          <div className="my-5 relative w-32 h-52 rounded-3xl border-3 border-sky-200/80 bg-[#FAFAFC] p-1 overflow-hidden shadow-inner flex flex-col justify-end">
            <div
              className="w-full bg-gradient-to-t from-sky-500 to-sky-300 rounded-2xl transition-all duration-700 ease-out relative"
              style={{ height: `${Math.max(percentage, 8)}%` }}
            >
              <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-white/40 animate-ping" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black font-heading text-[#242039]">
                {currentWaterIntake}
              </span>
              <span className="text-xs text-[#817D91] -mt-0.5">
                / {hydrationTarget} ml
              </span>
            </div>
          </div>

          <div className="w-full pt-3 border-t border-[#ECE9F2] flex items-center justify-around text-xs">
            <div>
              <span className="text-[#817D91] block text-[11px]">Remaining</span>
              <strong className="text-sm font-bold text-[#242039]">{remaining} ml</strong>
            </div>
            <div className="h-5 w-px bg-[#ECE9F2]" />
            <div>
              <span className="text-[#817D91] block text-[11px]">Logged Today</span>
              <strong className="text-sm font-bold text-[#242039]">{hydrationLogs.length} sips</strong>
            </div>
          </div>
        </div>

        {/* Quick Add Buttons & Custom Input (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-4">
              <h3 className="text-base font-bold font-heading text-[#242039]">
                Quick Add Water
              </h3>
              <span className="text-xs text-[#817D91]">Select preset to record</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
              {[
                { amount: 150, label: 'Cup', icon: '☕', sub: '150 ml' },
                { amount: 250, label: 'Glass', icon: '🥛', sub: '250 ml' },
                { amount: 350, label: 'Mug', icon: '🍵', sub: '350 ml' },
                { amount: 500, label: 'Flask', icon: '🍶', sub: '500 ml' },
              ].map((item) => (
                <button
                  key={item.amount}
                  onClick={() => handleQuickAdd(item.amount, item.label)}
                  className="p-3.5 rounded-2xl border border-[#ECE9F2] hover:border-sky-300 hover:bg-sky-50/40 flex flex-col items-center justify-center gap-1 transition-all text-center group active:scale-98"
                >
                  <span className="text-xl group-hover:scale-105 transition-transform">
                    {item.icon}
                  </span>
                  <span className="text-xs font-bold text-[#242039]">{item.label}</span>
                  <span className="text-[10px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                    +{item.sub}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Amount Form */}
            <form onSubmit={handleCustomSubmit} className="p-3.5 rounded-2xl bg-[#FAFAFC] border border-[#ECE9F2]">
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-2">
                Custom Milliliters Intake
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="number"
                  min="50"
                  max="2000"
                  step="50"
                  placeholder="Amount in ml (e.g. 400)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs text-[#242039] bg-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Description (e.g. Library Refill)"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs text-[#242039] bg-white focus:outline-none focus:border-sky-500"
                />
                <Button type="submit" variant="primary" size="sm" icon={Plus} className="shrink-0 bg-sky-600 hover:bg-sky-700">
                  Record
                </Button>
              </div>
            </form>
          </div>

          <div className="pt-3 mt-4 border-t border-[#ECE9F2] flex items-center gap-2 text-xs text-[#817D91]">
            <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>
              Tip: Keep a water bottle directly on your study desk next to your notebook to naturally prompt regular sips.
            </span>
          </div>
        </div>
      </div>

      {/* 7-Day Hydration History Chart & Today's Logs Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 7-Day Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
            <div>
              <h3 className="text-base font-bold font-heading text-[#242039] flex items-center gap-2">
                7-Day Hydration Volume
                <TrendingUp className="w-4 h-4 text-sky-500" />
              </h3>
              <p className="text-xs text-[#817D91] mt-0.5">
                Intake volume compared against {hydrationTarget}ml daily target
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
              Exam Week Overview
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hydrationWeek} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={{ stroke: '#ECE9F2' }}
                  tick={{ fill: '#817D91', fontSize: 11 }}
                />
                <YAxis
                  domain={[0, 3200]}
                  tickLine={false}
                  axisLine={{ stroke: '#ECE9F2' }}
                  tick={{ fill: '#817D91', fontSize: 11 }}
                  tickFormatter={(v) => `${v}ml`}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <ReferenceLine
                  y={hydrationTarget}
                  stroke="#0284C7"
                  strokeDasharray="4 4"
                  label={{
                    value: `Target ${hydrationTarget}ml`,
                    fill: '#0284C7',
                    fontSize: 10,
                    position: 'insideTopRight',
                  }}
                />
                <Bar dataKey="intake" radius={[6, 6, 0, 0]}>
                  {hydrationWeek.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.intake >= hydrationTarget ? '#38BDF8' : '#93C5FD'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Intake History Log (1 col) */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
              <h4 className="text-sm font-bold font-heading text-[#242039] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                Today's Water Log
              </h4>
              <span className="text-[11px] font-semibold text-[#817D91]">
                {hydrationLogs.length} sips
              </span>
            </div>

            {hydrationLogs.length === 0 ? (
              <p className="text-xs text-[#817D91] py-8 text-center">
                No water logged today yet. Take a sip!
              </p>
            ) : (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 thin-scrollbar">
                {hydrationLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAFC] border border-[#ECE9F2] text-xs hover:border-sky-200 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#242039] truncate">{log.label}</p>
                        <p className="text-[10px] text-[#A19BAD]">{log.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-sky-600">+{log.amount}ml</span>
                      <button
                        onClick={() => removeWaterLog(log.id)}
                        className="text-gray-300 hover:text-red-500 p-1 rounded-md transition-colors"
                        title="Delete entry"
                        aria-label="Delete water entry"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-[11px] text-[#817D91] text-center italic pt-3 border-t border-[#ECE9F2] mt-3">
            Logs update your dashboard metrics in real time.
          </p>
        </div>
      </div>

      {/* Target Setting Modal */}
      <Modal
        isOpen={targetModalOpen}
        onClose={() => setTargetModalOpen(false)}
        title="Adjust Daily Hydration Target"
        subtitle="Set a realistic daily water target based on your study habits"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveTarget} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1.5">
              Daily Target (ml)
            </label>
            <input
              type="number"
              min="1000"
              max="5000"
              step="100"
              required
              value={newTargetValue}
              onChange={(e) => setNewTargetValue(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-sky-500"
            />
            <p className="text-xs text-[#817D91] mt-1">Recommended for students: 2000 - 3000 ml</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ECE9F2]">
            <Button variant="outline" size="sm" onClick={() => setTargetModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-sky-600 hover:bg-sky-700">
              Save Target
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
