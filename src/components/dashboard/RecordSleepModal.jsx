import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Moon, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function RecordSleepModal({ isOpen, onClose }) {
  const { addSleepRecord } = useApp();
  const [bedtime, setBedtime] = useState('23:30');
  const [wakeTime, setWakeTime] = useState('07:15');
  const [quality, setQuality] = useState('Restful');
  const [notes, setNotes] = useState('');

  // Calculate duration between bedtime and wake time
  const calculateDuration = (bed, wake) => {
    const [bH, bM] = bed.split(':').map(Number);
    const [wH, wM] = wake.split(':').map(Number);

    let startMinutes = bH * 60 + bM;
    let endMinutes = wH * 60 + wM;

    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60; // crossed midnight
    }

    const diff = (endMinutes - startMinutes) / 60;
    return parseFloat(diff.toFixed(1));
  };

  const durationHours = calculateDuration(bedtime, wakeTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    addSleepRecord({
      date: today.toISOString().split('T')[0],
      day: dayNames[today.getDay()],
      bedtime,
      wakeTime,
      durationHours,
      quality,
      notes: notes.trim() || 'Logged via sleep record',
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Sleep Duration"
      subtitle="Consistent circadian rest strengthens memory consolidation during exam periods"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
              Bedtime
            </label>
            <input
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
              Wake-up Time
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>
        </div>

        {/* Calculated duration display */}
        <div className="p-3.5 rounded-2xl bg-[#F0EBFF] border border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#6D28D9]">Calculated Duration</span>
              <p className="text-[11px] text-[#858197]">Time asleep</p>
            </div>
          </div>
          <span className="text-xl font-bold font-heading text-[#6D28D9]">
            {durationHours} hrs
          </span>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
            Rest Quality Feel
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Restful', 'Moderate', 'Light'].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuality(q)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                  quality === q
                    ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                    : 'bg-white text-[#242039] border-[#ECE9F2] hover:bg-[#FAF9FC]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
            Notes (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Read for 15 mins before sleeping, no phone in bed."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ECE9F2]">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={Moon}>
            Save Sleep Record
          </Button>
        </div>
      </form>
    </Modal>
  );
}

