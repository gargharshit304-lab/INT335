import React, { useState } from 'react';
import {
  Droplets,
  Plus,
  Trash2,
  TrendingUp,
  Target,
  Sparkles,
  Clock,
  CheckCircle2,
  HelpCircle,
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

  // Custom Bar Chart Tooltip
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#ECE9F2] p-3 rounded-2xl shadow-xl text-xs">
          <p className="font-bold text-[#242039]">{label}</p>
          <p className="text-sky-600 font-semibold mt-1">
            Intake: {payload[0].value} ml
          </p>
          <p className="text-[10px] text-[#858197] mt-0.5">
            Target: {hydrationTarget} ml ({Math.round((payload[0].value / hydrationTarget) * 100)}%)
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
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 fill-current text-sky-500" />
              Brain Stamina & Alertness
            </span>
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-[#242039]">
            Hydration Tracker
          </h2>
          <p className="text-sm text-[#858197] mt-1 max-w-xl">
            Keep mental alertness sharp without energy drinks. Frequent hydration helps university students avoid mid-study headaches and fatigue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Visual Water Tumbler / Progress Indicator */}
        <div className="bg-gradient-to-br from-white via-white to-sky-50/40 border border-[#ECE9F2] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between pb-4 border-b border-[#ECE9F2]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#858197]">
              Today's Water Status
            </span>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
              {percentage}% of Daily Goal
            </span>
          </div>

          {/* Fluid Bottle / Tumbler Visualization */}
          <div className="my-6 relative w-36 h-56 rounded-3xl border-4 border-sky-200/80 bg-white p-1 overflow-hidden shadow-inner flex flex-col justify-end">
            {/* Water Fill with wave effect */}
            <div
              className="w-full bg-gradient-to-t from-sky-500 to-sky-300 rounded-2xl transition-all duration-700 ease-out relative"
              style={{ height: `${Math.max(percentage, 8)}%` }}
            >
              {/* Animated wave bubbles */}
              <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/40 animate-ping" />
              <div className="absolute top-3 right-4 w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>

            {/* Overlay readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black font-heading text-[#242039] drop-shadow-xs">
                {currentWaterIntake}
              </span>
              <span className="text-xs font-semibold text-[#858197] -mt-1">
                / {hydrationTarget} ml
              </span>
            </div>
          </div>

          <div className="w-full pt-4 border-t border-[#ECE9F2] flex items-center justify-around text-xs">
            <div>
              <span className="text-[#858197] block">Remaining</span>
              <strong className="text-sm font-bold text-[#242039]">{remaining} ml</strong>
            </div>
            <div className="h-6 w-px bg-[#ECE9F2]" />
            <div>
              <span className="text-[#858197] block">Logs Today</span>
              <strong className="text-sm font-bold text-[#242039]">{hydrationLogs.length} entries</strong>
            </div>
          </div>
        </div>

        {/* Quick Add Buttons & Custom Input (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-[#ECE9F2] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-5">
              <h3 className="text-base font-bold font-heading text-[#242039]">
                Quick Add Water
              </h3>
              <span className="text-xs text-[#858197]">Click to record intake</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { amount: 150, label: 'Cup', icon: '☕', sub: '150 ml' },
                { amount: 250, label: 'Glass', icon: '🥛', sub: '250 ml' },
                { amount: 350, label: 'Mug', icon: '🍵', sub: '350 ml' },
                { amount: 500, label: 'Bottle', icon: '🍶', sub: '500 ml' },
              ].map((item) => (
                <button
                  key={item.amount}
                  onClick={() => handleQuickAdd(item.amount, item.label)}
                  className="p-4 rounded-2xl border border-[#ECE9F2] hover:border-sky-300 hover:bg-sky-50/50 flex flex-col items-center justify-center gap-1.5 transition-all text-center group active:scale-95"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="text-xs font-bold text-[#242039]">{item.label}</span>
                  <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                    +{item.sub}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Amount Form */}
            <form onSubmit={handleCustomSubmit} className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#ECE9F2]">
              <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-2">
                Custom Milliliters Intake
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="number"
                  min="50"
                  max="2000"
                  step="50"
                  placeholder="Amount in ml (e.g. 400)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] bg-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Description (e.g. Library Desk Refill)"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] bg-white focus:outline-none focus:border-sky-500"
                />
                <Button type="submit" variant="primary" icon={Plus} className="shrink-0 bg-sky-600 hover:bg-sky-700">
                  Record
                </Button>
              </div>
            </form>
          </div>

          <div className="pt-4 mt-6 border-t border-[#ECE9F2] flex items-center gap-2 text-xs text-[#858197]">
            <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
            <span>
              Tip: Keep a water bottle directly on your study desk next to your notebook to naturally prompt regular sips.
            </span>
          </div>
        </div>
      </div>

      {/* 7-Day Hydration History Chart & Today's Logs Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-[#ECE9F2] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-[#242039] flex items-center gap-2">
                7-Day Hydration History
                <TrendingUp className="w-4 h-4 text-sky-500" />
              </h3>
              <p className="text-xs text-[#858197] mt-0.5">
                Intake volume compared against {hydrationTarget}ml daily target
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
              Exam Week Overview
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hydrationWeek} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={{ stroke: '#ECE9F2' }}
                  tick={{ fill: '#858197', fontSize: 11 }}
                />
                <YAxis
                  domain={[0, 3200]}
                  tickLine={false}
                  axisLine={{ stroke: '#ECE9F2' }}
                  tick={{ fill: '#858197', fontSize: 11 }}
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
                <Bar dataKey="intake" radius={[8, 8, 0, 0]}>
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
        <div className="bg-white border border-[#ECE9F2] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2] mb-3">
              <h4 className="text-sm font-bold font-heading text-[#242039] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                Today's Water Log
              </h4>
              <span className="text-[11px] font-semibold text-[#858197]">
                {hydrationLogs.length} logs
              </span>
            </div>

            {hydrationLogs.length === 0 ? (
              <p className="text-xs text-[#858197] py-8 text-center">
                No water logged today yet. Take a sip!
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {hydrationLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9FC] border border-[#ECE9F2] text-xs hover:border-sky-200 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#242039] truncate">{log.label}</p>
                        <p className="text-[10px] text-[#858197]">{log.time}</p>
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

          <p className="text-[11px] text-[#858197] text-center italic pt-3 border-t border-[#ECE9F2] mt-3">
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
            <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
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
            <p className="text-xs text-[#858197] mt-1">Recommended for students: 2000 - 3000 ml</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ECE9F2]">
            <Button variant="outline" onClick={() => setTargetModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-sky-600 hover:bg-sky-700">
              Save Target
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

