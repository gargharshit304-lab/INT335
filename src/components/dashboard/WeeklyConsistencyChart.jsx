import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function WeeklyConsistencyChart() {
  const { weeklyAnalytics, routineCompletionPercentage } = useApp();

  // Custom chart tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#ECE9F2] p-3 rounded-2xl shadow-xl text-xs">
          <p className="font-bold text-[#242039]">{label}</p>
          <p className="text-[#8B5CF6] font-semibold mt-1">
            Routine Completion: {payload[0].value}%
          </p>
          <p className="text-[10px] text-[#858197] mt-0.5">
            {payload[0].value >= 80 ? '✓ Balanced Day' : 'Pacing needed'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-[#ECE9F2] rounded-3xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#ECE9F2]">
        <div>
          <h3 className="text-base font-bold font-heading text-[#242039] flex items-center gap-2">
            Weekly Routine Consistency
            <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
          </h3>
          <p className="text-xs text-[#858197] mt-0.5">
            7-day overview of daily routine completion rates
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F8F0] text-[#059669] border border-emerald-100 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Avg 81% Paced
          </span>
        </div>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weeklyAnalytics}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: '#ECE9F2' }}
              tick={{ fill: '#858197', fontSize: 11 }}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={{ stroke: '#ECE9F2' }}
              tick={{ fill: '#858197', fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={80}
              stroke="#10B981"
              strokeDasharray="4 4"
              label={{
                value: 'Target 80%',
                fill: '#10B981',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />
            <Area
              type="monotone"
              dataKey="routineRate"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#purpleGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-[#ECE9F2] flex items-center justify-between text-xs text-[#858197]">
        <span>Today's Live Rate: <strong className="text-[#242039]">{routineCompletionPercentage}%</strong></span>
        <span className="text-[11px] text-[#858197]">Goal: Complete basic routine without skipping meals or sleep</span>
      </div>
    </div>
  );
}

