import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  UserPlus,
  UserCheck,
  Heart,
  Droplets,
  Zap,
  Smile,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import ProgressRing from '../components/common/ProgressRing';

export default function BuddyPage() {
  const { buddies, toggleConnectBuddy, sendEncouragement } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'connected'

  const connectedBuddies = buddies.filter((b) => b.connected);
  const displayedBuddies =
    filter === 'connected' ? connectedBuddies : buddies;

  const handleEncourage = (buddyId, emoji, label) => {
    sendEncouragement(buddyId, emoji, label);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border border-[#ECE9F2] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0EBFF] text-[#6D28D9] border border-purple-100 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Peer Accountability Circle
            </span>
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-[#242039]">
            Study Buddy Companion
          </h2>
          <p className="text-sm text-[#858197] mt-1 max-w-xl">
            Stay steady through university exam weeks together. Nudge your peers to take water breaks, finish daily routines, and sleep without burnout.
          </p>
        </div>

        {/* Group circle badge */}
        <div className="bg-[#FAF9FC] border border-[#ECE9F2] rounded-2xl p-4 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold">
            ⚡
          </div>
          <div>
            <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wide">
              Active Circle
            </span>
            <p className="text-xs font-bold text-[#242039]">Exam Week Circle</p>
            <p className="text-[11px] text-[#858197]">LPU CSE • 5th Semester</p>
          </div>
        </div>
      </div>

      {/* Shared Group Daily Goal Card */}
      <div className="bg-gradient-to-r from-[#F0EBFF]/80 via-white to-[#E8F8F0]/50 border border-purple-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 text-purple-600 flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                Shared Daily Circle Goal
              </span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                74% Achieved
              </span>
            </div>
            <h3 className="text-base font-bold font-heading text-[#242039] mt-0.5">
              "Everyone hit 2,000ml hydration and take at least 3 paced study breaks today."
            </h3>
            <p className="text-xs text-[#858197] mt-0.5">
              3 of 4 connected study buddies have already checked in their afternoon routines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          <span className="text-xs text-[#858197] font-medium">Exam Week Pacing</span>
        </div>
      </div>

      {/* Buddies Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#ECE9F2] rounded-2xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#8B5CF6] text-white shadow-xs'
                : 'text-[#858197] hover:text-[#242039]'
            }`}
          >
            All Students ({buddies.length})
          </button>
          <button
            onClick={() => setFilter('connected')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'connected'
                ? 'bg-[#8B5CF6] text-white shadow-xs'
                : 'text-[#858197] hover:text-[#242039]'
            }`}
          >
            Connected Circle ({connectedBuddies.length})
          </button>
        </div>

        <span className="text-xs text-[#858197] hidden sm:block">
          Simulated peer interactions • No external network required
        </span>
      </div>

      {/* Buddy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedBuddies.map((buddy) => (
          <div
            key={buddy.id}
            className="bg-white border border-[#ECE9F2] hover:border-purple-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Top Row: Avatar, Name, Status, Connect Button */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        buddy.status === 'Online'
                          ? 'bg-emerald-500'
                          : buddy.status === 'Studying'
                          ? 'bg-purple-500'
                          : buddy.status === 'Break'
                          ? 'bg-amber-500'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-heading text-[#242039]">
                      {buddy.name}
                    </h4>
                    <p className="text-[11px] text-[#858197]">{buddy.program}</p>
                    <span className="text-[10px] font-semibold text-[#8B5CF6]">
                      {buddy.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleConnectBuddy(buddy.id)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                    buddy.connected
                      ? 'bg-[#E8F8F0] text-[#059669] border-emerald-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                      : 'bg-[#FAF9FC] text-[#242039] border-[#ECE9F2] hover:bg-[#F0EBFF] hover:text-[#6D28D9] hover:border-purple-200'
                  }`}
                  title={buddy.connected ? 'Disconnect Buddy' : 'Connect with Buddy'}
                >
                  {buddy.connected ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Linked</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Connect</span>
                    </>
                  )}
                </button>
              </div>

              {/* Exam & Routine Progress */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#ECE9F2] space-y-2.5 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#858197]">Subject Focus:</span>
                  <span className="font-semibold text-[#242039] truncate max-w-[150px]">
                    {buddy.currentExam}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#858197]">Routine Done:</span>
                    <strong className="text-[#8B5CF6] font-bold">{buddy.todayProgress}%</strong>
                  </div>
                  <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#ECE9F2]">
                    <div
                      className="bg-[#8B5CF6] h-full rounded-full transition-all duration-300"
                      style={{ width: `${buddy.todayProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#858197] pt-1 border-t border-[#ECE9F2]">
                  <span>Streak: 🔥 {buddy.streak} days</span>
                  <span>Cheered: {buddy.encouragementCount || 0} times</span>
                </div>
              </div>

              {/* Recent Activity */}
              <p className="text-xs text-[#858197] mb-4 flex items-center gap-1.5 line-clamp-1">
                <Clock className="w-3 h-3 text-[#8B5CF6] shrink-0" />
                {buddy.lastActivity}
              </p>
            </div>

            {/* Simulated Encouragement Action Buttons */}
            <div className="pt-3 border-t border-[#ECE9F2]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#858197] block mb-2">
                Send Peer Nudge
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleEncourage(buddy.id, '✋', 'High-Five')}
                  className="py-1.5 px-2 bg-white hover:bg-purple-50 text-[#242039] hover:text-[#6D28D9] border border-[#ECE9F2] hover:border-purple-200 rounded-xl text-xs font-medium transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>✋</span> High-Five
                </button>
                <button
                  onClick={() => handleEncourage(buddy.id, '💧', 'Hydrate')}
                  className="py-1.5 px-2 bg-white hover:bg-sky-50 text-[#242039] hover:text-sky-700 border border-[#ECE9F2] hover:border-sky-200 rounded-xl text-xs font-medium transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>💧</span> Hydrate
                </button>
                <button
                  onClick={() => handleEncourage(buddy.id, '⚡', 'Cheer')}
                  className="py-1.5 px-2 bg-white hover:bg-amber-50 text-[#242039] hover:text-amber-700 border border-[#ECE9F2] hover:border-amber-200 rounded-xl text-xs font-medium transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>⚡</span> Cheer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

