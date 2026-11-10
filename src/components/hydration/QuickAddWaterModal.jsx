import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Droplets, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function QuickAddWaterModal({ isOpen, onClose }) {
  const { addWater, currentWaterIntake, hydrationTarget } = useApp();
  const [customAmount, setCustomAmount] = useState('');
  const [label, setLabel] = useState('Study Break Water');

  const presets = [
    { amount: 150, label: 'Cup (150ml)' },
    { amount: 250, label: 'Glass (250ml)' },
    { amount: 350, label: 'Mug (350ml)' },
    { amount: 500, label: 'Flask (500ml)' },
  ];

  const handleAdd = (amount, customLabel) => {
    addWater(amount, customLabel || label);
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customAmount || isNaN(customAmount) || Number(customAmount) <= 0) return;
    addWater(Number(customAmount), label || 'Custom Water');
    setCustomAmount('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Hydration"
      subtitle={`Current intake: ${currentWaterIntake}ml of ${hydrationTarget}ml daily target`}
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        <div>
          <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-2">
            Quick Select Preset
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {presets.map((p) => (
              <button
                key={p.amount}
                type="button"
                onClick={() => handleAdd(p.amount, p.label)}
                className="flex items-center justify-between p-3 rounded-2xl border border-[#ECE9F2] hover:border-[#8B5CF6] hover:bg-[#F0EBFF]/40 transition-all text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Droplets className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-sm font-semibold text-[#242039]">{p.label}</span>
                </div>
                <span className="text-xs font-bold text-[#8B5CF6]">+{p.amount}ml</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-[#ECE9F2]">
          <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-2">
            Custom Milliliters
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="e.g. 400"
              min="50"
              max="2000"
              step="50"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
            />
            <Button type="submit" variant="primary" icon={Plus}>
              Add
            </Button>
          </div>
        </form>

        <p className="text-[11px] text-[#858197] text-center italic bg-[#FAF9FC] p-2.5 rounded-xl border border-[#ECE9F2]">
          💡 University exam studies show steady hydration wards off fatigue and afternoon headaches.
        </p>
      </div>
    </Modal>
  );
}

