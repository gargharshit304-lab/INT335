import React, { useState } from 'react';
import { DAILY_ENCOURAGEMENTS } from '../../context/defaultData';
import { Quote, RefreshCw, Heart } from 'lucide-react';

export default function DailyEncouragementCard() {
  const [index, setIndex] = useState(0);

  const item = DAILY_ENCOURAGEMENTS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % DAILY_ENCOURAGEMENTS.length);
  };

  return (
    <div className="bg-gradient-to-br from-[#F0EBFF]/70 via-white to-[#FAF9FC] border border-purple-200/70 rounded-3xl p-6 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold tracking-wider uppercase text-[#8B5CF6] bg-white px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1.5 shadow-2xs">
          <Heart className="w-3 h-3 fill-purple-400 text-purple-400" />
          Daily Routine Encouragement • {item.theme}
        </span>
        <button
          onClick={handleNext}
          title="Next Reflection"
          className="p-1.5 text-[#858197] hover:text-[#8B5CF6] hover:bg-white rounded-xl transition-colors"
          aria-label="Cycle next encouragement"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="my-2">
        <p className="text-sm sm:text-base font-semibold text-[#242039] leading-relaxed italic">
          "{item.quote}"
        </p>
      </div>

      <div className="mt-3 pt-2 border-t border-purple-100/60 flex items-center justify-between text-xs text-[#858197]">
        <span className="font-medium text-[#6D28D9]">{item.author}</span>
        <span className="text-[11px] text-[#858197]">Non-medical routine guide</span>
      </div>
    </div>
  );
}

