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
import { TrendingUp } from 'lucide-react';

export default function WeeklyConsistencyChart() {
  const { weeklyAnalytics, routineCompletionPercentage } = useApp();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#ECE9F2] p-2.5 rounded-xl shadow-lg text-xs">
          <p className="font-bold text-[#242039]">{label}</p>
          <p className="text-[#8B5CF6] font-semibold mt-0.5">
            Routine: {payload[0].value}%
          </p>
          <p className="text-[10px] text-[#817D91]">
            {payload[0].value >= 80 ? '✓ Balanced day' : 'Pacing needed'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
      <div className="flex items-center justify-between pb-3.5 border-b border-[#ECE9F2] mb-3">
        <div>
          <h3 className="text-base font-bold font-heading text-[#242039] flex items-center gap-2 tracking-tight">
            Weekly Routine Consistency
            <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
          </h3>
          <p className="text-xs text-[#817D91] mt-0.5">
            7-day completion overview relative to 80% pacing target
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EAF8F2] text-[#27AE82] border border-emerald-100">
          Avg 81% Paced
        </span>
      </div>

      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weeklyAnalytics}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="purpleGradientMinimal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: '#ECE9F2' }}
              tick={{ fill: '#817D91', fontSize: 11 }}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={{ stroke: '#ECE9F2' }}
              tick={{ fill: '#817D91', fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={80}
              stroke="#27AE82"
              strokeDasharray="4 4"
              label={{
                value: 'Target 80%',
                fill: '#27AE82',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />
            <Area
              type="monotone"
              dataKey="routineRate"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#purpleGradientMinimal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2.5 pt-2.5 border-t border-[#ECE9F2] flex items-center justify-between text-xs text-[#817D91]">
        <span>Today's Live Rate: <strong className="text-[#242039]">{routineCompletionPercentage}%</strong></span>
        <span className="text-[11px] text-[#A19BAD]">Maintains memory consolidation without crash</span>
      </div>
    </div>
  );
}
