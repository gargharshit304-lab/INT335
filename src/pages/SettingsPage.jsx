import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  User,
  Clock,
  Bell,
  RotateCcw,
  LogOut,
  Save,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

export default function SettingsPage() {
  const { user, updateUserSettings, resetDemoData, logout } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [university, setUniversity] = useState(user.university);
  const [program, setProgram] = useState(user.program);
  const [avatar, setAvatar] = useState(user.avatar);

  const [examName, setExamName] = useState(user.examName || 'Mid-Term Test (MTT)');
  const [examStartDate, setExamStartDate] = useState(user.examStartDate);
  const [examEndDate, setExamEndDate] = useState(user.examEndDate);

  const [wakeUp, setWakeUp] = useState(user.preferences?.targetWakeUp || '07:00');
  const [bedtime, setBedtime] = useState(user.preferences?.targetBedtime || '23:30');
  const [hydrationTarget, setHydrationTarget] = useState(user.preferences?.hydrationTarget || 2500);
  const [dailyStudyHours, setDailyStudyHours] = useState(user.preferences?.dailyStudyHours || 6);

  const [routineReminders, setRoutineReminders] = useState(user.preferences?.routineReminders ?? true);
  const [hydrationReminders, setHydrationReminders] = useState(user.preferences?.hydrationReminders ?? true);
  const [sleepReminders, setSleepReminders] = useState(user.preferences?.sleepReminders ?? true);

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleSaveAll = (e) => {
    e.preventDefault();
    updateUserSettings({
      ...user,
      name,
      email,
      university,
      program,
      avatar,
      examName,
      examStartDate,
      examEndDate,
      preferences: {
        ...user.preferences,
        targetWakeUp: wakeUp,
        targetBedtime: bedtime,
        hydrationTarget: Number(hydrationTarget),
        dailyStudyHours: Number(dailyStudyHours),
        routineReminders,
        hydrationReminders,
        sleepReminders,
      },
    });
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setName('Rohan Sharma');
    setEmail('rohan.sharma@lpu.in');
  };

  const handleConfirmLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F1EBFF] text-[#6D28D9] border border-purple-100 flex items-center gap-1.5">
              <SettingsIcon className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Configuration & Local Preferences
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#242039] tracking-tight">
            Application Settings
          </h2>
          <p className="text-xs sm:text-sm text-[#817D91] mt-0.5 max-w-xl">
            Customize student profile information, examination dates, daily targets, reminder notifications, and demonstration data.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="primary" size="sm" icon={Save} onClick={handleSaveAll}>
            Save Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-5">
        {/* Section 1: Student Profile */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#ECE9F2] mb-5">
            <User className="w-4 h-4 text-[#8B5CF6]" />
            <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039]">
              Student Profile Information
            </h3>
          </div>

          <div className="space-y-4">
            {/* Avatar Selector */}
            <div>
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-2">
                Select Profile Avatar
              </label>
              <div className="flex items-center gap-2.5">
                {AVATAR_OPTIONS.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatar(imgUrl)}
                    className={`relative rounded-xl p-0.5 transition-all ${avatar === imgUrl
                        ? 'ring-2 ring-[#8B5CF6] scale-105'
                        : 'opacity-70 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Avatar option ${i + 1}`}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    {avatar === imgUrl && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                  Student Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                  University / College
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                  Academic Degree & Program
                </label>
                <input
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Examination Schedule */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#ECE9F2] mb-5">
            <Calendar className="w-4 h-4 text-[#8B5CF6]" />
            <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039]">
              Examination Schedule Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                Exam Title
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={examStartDate}
                onChange={(e) => setExamStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                End Date
              </label>
              <input
                type="date"
                value={examEndDate}
                onChange={(e) => setExamEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Daily Routine Targets */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#ECE9F2] mb-5">
            <Clock className="w-4 h-4 text-[#8B5CF6]" />
            <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039]">
              Daily Routine Targets
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                Wake-up Time
              </label>
              <input
                type="time"
                value={wakeUp}
                onChange={(e) => setWakeUp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                Bedtime Target
              </label>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                Hydration Goal (ml)
              </label>
              <input
                type="number"
                min="1000"
                max="5000"
                step="100"
                value={hydrationTarget}
                onChange={(e) => setHydrationTarget(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#817D91] uppercase tracking-wider block mb-1">
                Target Study Hours
              </label>
              <input
                type="number"
                min="2"
                max="14"
                value={dailyStudyHours}
                onChange={(e) => setDailyStudyHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs sm:text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Routine Notification Preferences */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#ECE9F2] mb-5">
            <Bell className="w-4 h-4 text-[#8B5CF6]" />
            <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039]">
              Reminder & Nudge Preferences
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'routine',
                title: 'Daily Routine Activity Reminders',
                desc: 'Receive alerts when scheduled study blocks or meal times arrive.',
                checked: routineReminders,
                onChange: () => setRoutineReminders(!routineReminders),
              },
              {
                id: 'hydration',
                title: 'Hydration Intake Prompts',
                desc: 'Gentle hourly notification to take a sip of water during revision.',
                checked: hydrationReminders,
                onChange: () => setHydrationReminders(!hydrationReminders),
              },
              {
                id: 'sleep',
                title: 'Circadian Sleep & Wind-down Alerts',
                desc: 'Prompt to turn off study screens 30 minutes before target bedtime.',
                checked: sleepReminders,
                onChange: () => setSleepReminders(!sleepReminders),
              },
            ].map((pref) => (
              <div
                key={pref.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAFAFC] border border-[#ECE9F2]"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#242039]">{pref.title}</h4>
                  <p className="text-[11px] text-[#817D91]">{pref.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={pref.onChange}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${pref.checked ? 'bg-[#8B5CF6]' : 'bg-gray-200'
                    }`}
                  aria-pressed={pref.checked}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${pref.checked ? 'translate-x-4' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Account & Demo Data Controls */}
        <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)]">
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#ECE9F2] mb-5">
            <RotateCcw className="w-4 h-4 text-red-500" />
            <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039]">
              Prototype Demo Controls & Session
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-red-50/40 border border-red-100">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-red-900">
                Reset Demonstration Data
              </h4>
              <p className="text-[11px] text-red-700/80 mt-0.5 max-w-lg">
                Clears all customized routines, hydration entries, and sleep records from localStorage and restores initial INT335 demo data.
              </p>
            </div>
            <Button
              type="button"
              variant="danger"
              size="sm"
              icon={RotateCcw}
              onClick={() => setResetModalOpen(true)}
              className="shrink-0"
            >
              Reset Data
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FAFAFC] border border-[#ECE9F2] mt-3">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#242039]">
                Exit Demonstration Session
              </h4>
              <p className="text-[11px] text-[#817D91] mt-0.5">
                Logs out of the simulated session and returns to the login screen.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={() => setLogoutModalOpen(true)}
              className="shrink-0"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </form>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        title="Restore Initial Prototype Data?"
        message="This will reset all routines, hydration records, and sleep logs to the default mock student data. Any modifications you made will be cleared."
        confirmText="Reset to Initial Data"
        cancelText="Cancel"
        danger={true}
      />

      <ConfirmDialog
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Sign Out of RECHARGE?"
        message="You can sign back in instantly anytime using the one-click Demo Access button."
        confirmText="Log Out"
        cancelText="Stay Signed In"
        danger={false}
      />
    </div>
  );
}
