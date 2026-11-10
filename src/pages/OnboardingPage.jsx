import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  CheckCircle2,
  Calendar,
  Clock,
  Droplets,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Smile,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import { triggerCelebration } from '../utils/confetti';

export default function OnboardingPage() {
  const { user, completeOnboarding } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Step 1: Welcome & Profile
  const [studentName, setStudentName] = useState(user.name || 'Rohan Sharma');
  const [university, setUniversity] = useState(user.university || 'Lovely Professional University');
  const [program, setProgram] = useState(user.program || 'B.Tech Computer Science & Engineering');

  // Step 2: Examination Schedule
  const [examStartDate, setExamStartDate] = useState(user.examStartDate || '2026-11-14');
  const [examEndDate, setExamEndDate] = useState(user.examEndDate || '2026-11-21');
  const [subjects, setSubjects] = useState([
    { code: 'INT335', name: 'Design Thinking & Innovation' },
    { code: 'CSE316', name: 'Operating Systems' },
    { code: 'CSE325', name: 'Computer Networks' },
  ]);
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubName, setNewSubName] = useState('');

  // Step 3: Routine Preferences
  const [wakeUpTime, setWakeUpTime] = useState(user.preferences?.targetWakeUp || '07:00');
  const [bedtime, setBedtime] = useState(user.preferences?.targetBedtime || '23:30');
  const [studyHours, setStudyHours] = useState(user.preferences?.dailyStudyHours || 6);
  const [hydrationTarget, setHydrationTarget] = useState(user.preferences?.hydrationTarget || 2500);

  // Step 4: Challenges (Multi-select)
  const [selectedChallenges, setSelectedChallenges] = useState([
    'Skipping meals during revision',
    'Forgetting to drink water',
    'Irregular sleep or all-nighters',
  ]);

  const challengeOptions = [
    { id: 'meals', label: 'Skipping meals during revision' },
    { id: 'water', label: 'Forgetting to drink water' },
    { id: 'sleep', label: 'Irregular sleep or all-nighters' },
    { id: 'breaks', label: 'Studying continuously without breaks' },
    { id: 'routine', label: 'Difficulty sticking to a routine' },
  ];

  const toggleChallenge = (label) => {
    if (selectedChallenges.includes(label)) {
      setSelectedChallenges(selectedChallenges.filter((c) => c !== label));
    } else {
      setSelectedChallenges([...selectedChallenges, label]);
    }
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubCode.trim() || !newSubName.trim()) return;
    setSubjects([...subjects, { code: newSubCode.trim(), name: newSubName.trim() }]);
    setNewSubCode('');
    setNewSubName('');
  };

  const handleRemoveSubject = (code) => {
    setSubjects(subjects.filter((s) => s.code !== code));
  };

  const handleFinish = () => {
    triggerCelebration();
    completeOnboarding({
      name: studentName,
      university,
      program,
      examStartDate,
      examEndDate,
      subjects,
      wakeUpTime,
      bedtime,
      studyHours: Number(studyHours),
      hydrationTarget: Number(hydrationTarget),
      challenges: selectedChallenges,
    });
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl">
        {/* Top brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="font-extrabold text-xl text-[#242039] font-heading">
              RECHARGE
            </span>
          </div>
          <p className="text-xs text-[#858197]">
            Step-by-step Exam Week Routine Setup • LPU INT335 Project P13
          </p>
        </div>

        {/* Step Progress Dots */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
              Step {step} of 5
            </span>
            <span className="text-xs text-[#858197] font-semibold">
              {step === 1 && 'Welcome & Profile'}
              {step === 2 && 'Exam Dates & Subjects'}
              {step === 3 && 'Daily Routine Target'}
              {step === 4 && 'Main Exam Challenges'}
              {step === 5 && 'Ready to Launch'}
            </span>
          </div>

          <div className="w-full bg-[#ECE9F2] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#8B5CF6] h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Container Card */}
        <div className="bg-white border border-[#ECE9F2] shadow-xl shadow-purple-950/5 rounded-3xl p-6 sm:p-10 space-y-6">
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#8B5CF6] tracking-wider">
                  Welcome to RECHARGE
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-[#242039]">
                  Let's personalize your exam routine
                </h3>
                <p className="text-xs text-[#858197] leading-relaxed">
                  During exams, routines fall apart first. Tell us who you are so we can tailor hydration alerts, study pacing, and sleep targets.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                    University / Institution
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                    Program / Department
                  </label>
                  <input
                    type="text"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EXAMINATION SCHEDULE */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#8B5CF6] tracking-wider">
                  Academic Milestones
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-[#242039]">
                  When are your examinations?
                </h3>
                <p className="text-xs text-[#858197] leading-relaxed">
                  We calculate countdowns and adapt your routine intensity relative to your test period.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                    Exam Period Starts
                  </label>
                  <input
                    type="date"
                    value={examStartDate}
                    onChange={(e) => setExamStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                    Exam Period Ends
                  </label>
                  <input
                    type="date"
                    value={examEndDate}
                    onChange={(e) => setExamEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-2">
                  Upcoming Exam Subjects
                </label>
                <div className="space-y-2 mb-3">
                  {subjects.map((s) => (
                    <div
                      key={s.code}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9FC] border border-[#ECE9F2] text-xs"
                    >
                      <div>
                        <strong className="text-[#242039] mr-2">{s.code}</strong>
                        <span className="text-[#858197]">{s.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(s.code)}
                        className="text-gray-400 hover:text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code (e.g. CSE408)"
                    value={newSubCode}
                    onChange={(e) => setNewSubCode(e.target.value)}
                    className="w-1/3 px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                  <input
                    type="text"
                    placeholder="Subject Name (e.g. Algorithms)"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-[#ECE9F2] text-xs text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                  <Button size="sm" variant="secondary" onClick={handleAddSubject}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ROUTINE PREFERENCES */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#8B5CF6] tracking-wider">
                  Target Rhythm
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-[#242039]">
                  Set your target daily rhythm
                </h3>
                <p className="text-xs text-[#858197] leading-relaxed">
                  Consistency matters far more than extreme hours. Pick realistic targets you can stick to.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    Target Wake-up Time
                  </label>
                  <input
                    type="time"
                    value={wakeUpTime}
                    onChange={(e) => setWakeUpTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    Target Bedtime
                  </label>
                  <input
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-sky-500" />
                    Daily Hydration Target (ml)
                  </label>
                  <input
                    type="number"
                    min="1500"
                    max="4000"
                    step="250"
                    value={hydrationTarget}
                    onChange={(e) => setHydrationTarget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                    Target Study Hours / Day
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="12"
                    value={studyHours}
                    onChange={(e) => setStudyHours(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: MAIN ROUTINE CHALLENGES */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#8B5CF6] tracking-wider">
                  Empathy Mapping
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-[#242039]">
                  What are your main exam week challenges?
                </h3>
                <p className="text-xs text-[#858197] leading-relaxed">
                  Select all that apply. RECHARGE will highlight these modules on your dashboard.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {challengeOptions.map((opt) => {
                  const isSelected = selectedChallenges.includes(opt.label);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleChallenge(opt.label)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#F0EBFF] border-purple-300 text-[#6D28D9]'
                          : 'bg-[#FAF9FC] border-[#ECE9F2] text-[#242039] hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xs font-semibold">{opt.label}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                          isSelected ? 'bg-[#8B5CF6] text-white' : 'border border-gray-300'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: COMPLETION */}
          {step === 5 && (
            <div className="text-center space-y-5 animate-in fade-in duration-200 py-4">
              <div className="w-16 h-16 rounded-3xl bg-[#E8F8F0] text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
                  All Setup Complete
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-[#242039]">
                  You're all set, {studentName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#858197] max-w-md mx-auto leading-relaxed">
                  Your personalized exam week routine has been structured. Remember: study hard, stay balanced, and don't crash.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#ECE9F2] text-xs text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#858197]">Wake / Bedtime:</span>
                  <strong className="text-[#242039]">{wakeUpTime} — {bedtime}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#858197]">Hydration Target:</span>
                  <strong className="text-sky-600 font-bold">{hydrationTarget} ml</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#858197]">Exam Countdown:</span>
                  <strong className="text-[#8B5CF6] font-bold">Starts {examStartDate}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Controls Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#ECE9F2]">
            {step > 1 ? (
              <Button
                variant="outline"
                size="sm"
                icon={ArrowLeft}
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => setStep(step + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                icon={Sparkles}
                onClick={handleFinish}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Launch Dashboard →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

