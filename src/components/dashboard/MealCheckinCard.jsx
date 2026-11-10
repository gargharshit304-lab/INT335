import React from 'react';
import { useApp } from '../../context/AppContext';
import { Utensils, CheckCircle2, Circle } from 'lucide-react';

export default function MealCheckinCard() {
  const { mealCheckins, toggleMealCheckin, mealsCheckedCount } = useApp();

  const meals = [
    { key: 'breakfast', label: 'Breakfast', icon: '🥣' },
    { key: 'lunch', label: 'Lunch', icon: '🥗' },
    { key: 'dinner', label: 'Dinner', icon: '🍲' },
    { key: 'snacks', label: 'Snack', icon: '🍎' },
  ];

  return (
    <div className="bg-white border border-[#ECE9F2] rounded-3xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#ECE9F2]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Utensils className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold font-heading text-[#242039]">
            Meal Check-ins
          </span>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-[#E8F8F0] px-2 py-0.5 rounded-full">
          {mealsCheckedCount}/4 Logged
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {meals.map((m) => {
          const item = mealCheckins[m.key] || { checked: false };
          return (
            <button
              key={m.key}
              onClick={() => toggleMealCheckin(m.key)}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                item.checked
                  ? 'bg-[#E8F8F0]/60 border-emerald-200 text-[#059669]'
                  : 'bg-[#FAF9FC] border-[#ECE9F2] text-[#858197] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm">{m.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#242039] truncate">{m.label}</p>
                  <p className="text-[10px] text-[#858197] truncate">
                    {item.checked ? item.time || 'Logged' : 'Pending'}
                  </p>
                </div>
              </div>
              {item.checked ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

