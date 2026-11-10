import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  UserPlus,
  UserCheck,
  Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BuddyPage() {
  const { buddies, toggleConnectBuddy, sendEncouragement } = useApp();
  const [filter, setFilter] = useState('all');

  const connectedBuddies = buddies.filter((b) => b.connected);
  const displayedBuddies =
    filter === 'connected' ? connectedBuddies : buddies;

  const handleEncourage = (buddyId, emoji, label) => {
    sendEncouragement(buddyId, emoji, label);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#ECE9F2] rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F1EBFF] text-[#6D28D9] border border-purple-100 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Peer Accountability Circle
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#242039] tracking-tight">
            Study Buddy Companion
          </h2>
          <p className="text-xs sm:text-sm text-[#817D91] mt-0.5 max-w-xl">
            Stay steady through university exam weeks together. Nudge your peers to take water breaks, finish daily routines, and sleep without burnout.
          </p>
        </div>

        {/* Group circle badge */}
        <div className="bg-[#FAFAFC] border border-[#ECE9F2] rounded-xl p-3 flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-xs">
            ⚡
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wide">
              Active Circle
            </span>
            <p className="text-xs font-bold text-[#242039]">Exam Week Circle</p>
            <p className="text-[10px] text-[#817D91]">LPU CSE • 5th Semester</p>
          </div>
        </div>
      </div>

      {/* Shared Group Daily Goal Card */}
      <div className="bg-[#F7F5FA] border border-[#ECE9F2] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.025)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#ECE9F2] text-[#8B5CF6] flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                Shared Daily Circle Goal
              </span>
              <span className="text-[10px] font-semibold bg-[#EAF8F2] text-[#27AE82] px-2 py-0.5 rounded-full border border-emerald-100">
                74% Achieved
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold font-heading text-[#242039] mt-0.5">
              "Everyone hit 2,000ml hydration and take at least 3 paced study breaks today."
            </h3>
            <p className="text-xs text-[#817D91] mt-0.5">
              3 of 4 connected study buddies have already checked in their afternoon routines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          <span className="text-xs text-[#817D91] font-medium">Exam Week Pacing</span>
        </div>
      </div>

      {/* Buddies Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-white border border-[#ECE9F2] rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${filter === 'all'
                ? 'bg-[#8B5CF6] text-white shadow-2xs'
                : 'text-[#817D91] hover:text-[#242039]'
              }`}
          >
            All Students ({buddies.length})
          </button>
          <button
            onClick={() => setFilter('connected')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${filter === 'connected'
                ? 'bg-[#8B5CF6] text-white shadow-2xs'
                : 'text-[#817D91] hover:text-[#242039]'
              }`}
          >
            Connected Circle ({connectedBuddies.length})
          </button>
        </div>

        <span className="text-[11px] text-[#A19BAD] hidden sm:block">
          Simulated peer interactions • No external network required
        </span>
      </div>

      {/* Buddy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedBuddies.map((buddy) => (
          <div
            key={buddy.id}
            className="bg-white border border-[#ECE9F2] hover:border-[#DDD8E8] rounded-[20px] p-5 shadow-[0_4px_20px_rgba(36,32,57,0.035)] flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Top Row: Avatar, Name, Status, Connect Button */}
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="w-10 h-10 rounded-xl object-cover border border-[#ECE9F2]"
                    />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${buddy.status === 'Online'
                          ? 'bg-[#27AE82]'
                          : buddy.status === 'Studying'
                            ? 'bg-[#8B5CF6]'
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
                    <p className="text-[10px] text-[#817D91]">{buddy.program}</p>
                    <span className="text-[10px] font-semibold text-[#8B5CF6]">
                      {buddy.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleConnectBuddy(buddy.id)}
                  className={`p-1.5 px-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${buddy.connected
                      ? 'bg-[#EAF8F2] text-[#27AE82] border-emerald-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                      : 'bg-[#FAFAFC] text-[#242039] border-[#ECE9F2] hover:bg-[#F1EBFF] hover:text-[#6D28D9] hover:border-purple-200'
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
              <div className="p-3 rounded-xl bg-[#FAFAFC] border border-[#ECE9F2] space-y-2 mb-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#817D91]">Focus:</span>
                  <span className="font-semibold text-[#242039] truncate max-w-[140px]">
                    {buddy.currentExam}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#817D91]">Routine Done:</span>
                    <strong className="text-[#8B5CF6] font-bold">{buddy.todayProgress}%</strong>
                  </div>
                  <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border border-[#ECE9F2]">
                    <div
                      className="bg-[#8B5CF6] h-full rounded-full transition-all duration-300"
                      style={{ width: `${buddy.todayProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#817D91] pt-1 border-t border-[#ECE9F2]">
                  <span>Streak: 🔥 {buddy.streak} days</span>
                  <span>Cheered: {buddy.encouragementCount || 0} times</span>
                </div>
              </div>

              <p className="text-[11px] text-[#817D91] mb-3 flex items-center gap-1.5 line-clamp-1">
                <Clock className="w-3 h-3 text-[#8B5CF6] shrink-0" />
                {buddy.lastActivity}
              </p>
            </div>

            {/* Simulated Encouragement Action Buttons */}
            <div className="pt-2.5 border-t border-[#ECE9F2]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A19BAD] block mb-1.5">
                Send Peer Nudge
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleEncourage(buddy.id, '✋', 'High-Five')}
                  className="py-1 px-1.5 bg-white hover:bg-purple-50 text-[#242039] hover:text-[#6D28D9] border border-[#ECE9F2] hover:border-purple-200 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>✋</span> High-Five
                </button>
                <button
                  onClick={() => handleEncourage(buddy.id, '💧', 'Hydrate')}
                  className="py-1 px-1.5 bg-white hover:bg-sky-50 text-[#242039] hover:text-sky-700 border border-[#ECE9F2] hover:border-sky-200 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>💧</span> Hydrate
                </button>
                <button
                  onClick={() => handleEncourage(buddy.id, '⚡', 'Cheer')}
                  className="py-1 px-1.5 bg-white hover:bg-amber-50 text-[#242039] hover:text-amber-700 border border-[#ECE9F2] hover:border-amber-200 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center gap-1"
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
