// Utility formatters for RECHARGE

export const formatTime12h = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${minutes} ${ampm}`;
};

export const getCategoryColor = (category) => {
  switch (category?.toLowerCase()) {
    case 'study':
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        accent: '#8B5CF6',
        iconBg: 'bg-purple-100',
      };
    case 'breakfast':
    case 'lunch':
    case 'dinner':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        accent: '#10B981',
        iconBg: 'bg-emerald-100',
      };
    case 'hydration':
      return {
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        accent: '#0284C7',
        iconBg: 'bg-sky-100',
      };
    case 'break':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        accent: '#D97706',
        iconBg: 'bg-amber-100',
      };
    case 'sleep':
      return {
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
        accent: '#6366F1',
        iconBg: 'bg-indigo-100',
      };
    case 'personal':
    default:
      return {
        bg: 'bg-violet-50',
        text: 'text-violet-700',
        border: 'border-violet-200',
        accent: '#7C3AED',
        iconBg: 'bg-violet-100',
      };
  }
};

export const calculateDaysUntil = (targetDateString) => {
  if (!targetDateString) return 0;
  const target = new Date(targetDateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

