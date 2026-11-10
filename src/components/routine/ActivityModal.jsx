import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  'Study',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Hydration',
  'Break',
  'Sleep',
  'Personal',
];

export default function ActivityModal({
  isOpen,
  onClose,
  initialData = null, // if provided, edit mode
}) {
  const { addRoutine, editRoutine } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Study');
  const [time, setTime] = useState('09:00');
  const [section, setSection] = useState('morning');
  const [duration, setDuration] = useState('45m');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || 'Study');
      setTime(initialData.time || '09:00');
      setSection(initialData.section || 'morning');
      setDuration(initialData.duration || '45m');
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setCategory('Study');
      setTime('09:00');
      setSection('morning');
      setDuration('45m');
      setDescription('');
    }
    setError('');
  }, [initialData, isOpen]);

  // Automatically adjust section based on time
  const handleTimeChange = (e) => {
    const val = e.target.value;
    setTime(val);
    const hour = parseInt(val.split(':')[0], 10);
    if (hour < 12) setSection('morning');
    else if (hour < 17) setSection('afternoon');
    else setSection('evening');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an activity title.');
      return;
    }

    const payload = {
      title: title.trim(),
      category,
      time,
      section,
      duration: duration.trim() || '30m',
      description: description.trim(),
    };

    if (initialData && initialData.id) {
      editRoutine(initialData.id, payload);
    } else {
      addRoutine(payload);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Routine Activity' : 'Add Routine Activity'}
      subtitle="Keep your exam week schedule balanced and paced"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
            Activity Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Operating Systems Chapter 4 Flashcards"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] bg-white focus:outline-none focus:border-[#8B5CF6]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
              Scheduled Time
            </label>
            <input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="w-full px-3 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
              Duration
            </label>
            <input
              type="text"
              placeholder="e.g. 45m or 1h 15m"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
              Day Section
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] bg-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="morning">Morning (until 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening / Night (5 PM+)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
            Description or Focus Notes (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="Key concepts to cover, materials needed, or reminder to stay calm..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ECE9F2]">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initialData ? 'Save Changes' : 'Add to Routine'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

