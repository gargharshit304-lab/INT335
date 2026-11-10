import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Droplets,
  Moon,
  BarChart3,
  Users,
  Coffee,
  CheckCircle2,
  Clock,
  Sparkles,
  Heart,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import Button from '../components/common/Button';
import ProgressRing from '../components/common/ProgressRing';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const { demoLogin } = useApp();
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    demoLogin();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#242039] selection:bg-purple-100 selection:text-purple-900">
      {/* SaaS Marketing Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#ECE9F2] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#242039] font-heading flex items-center gap-1.5">
                RECHARGE
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#858197]">
            <a href="#features" className="hover:text-[#242039] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-[#242039] transition-colors">
              How It Works
            </a>
            <a href="#problem" className="hover:text-[#242039] transition-colors">
              The Problem
            </a>
            <a href="#academic" className="hover:text-[#242039] transition-colors">
              About Project P13
            </a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-[#242039] hover:text-[#8B5CF6] px-3 py-2 transition-colors"
            >
              Log In
            </Link>
            <Button
              size="sm"
              variant="primary"
              onClick={handleDemoAccess}
              className="hidden sm:inline-flex"
            >
              Explore Demo →
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EBFF] text-[#6D28D9] border border-purple-200/80 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              LPU INT335 Project P13 • Exam Week Without the Crash
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-[#242039] tracking-tight leading-[1.1]">
              Your exams matter. <br />
              <span className="text-[#8B5CF6]">Your routine does too.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#858197] leading-relaxed max-w-xl">
              Study hard. Stay balanced. Don't crash. An exam-week routine companion built for university students to maintain eating habits, hydration, sleep consistency, and study breaks through MTT & ETT periods.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Button
                size="lg"
                variant="primary"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleDemoAccess}
              >
                Build My Routine
              </Button>
              <a href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Features
                </Button>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-[#ECE9F2] flex flex-wrap items-center gap-6 text-xs text-[#858197]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Zero medical claims</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Paced circadian balance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Simulated peer circles</span>
              </div>
            </div>
          </div>

          {/* Right Hero Dashboard Preview (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white border border-[#ECE9F2] rounded-3xl p-6 shadow-2xl shadow-purple-950/10 space-y-4 relative">
              {/* Top status bar inside mockup */}
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE9F2]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-xs">
                    R
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#242039]">Rohan Sharma</p>
                    <p className="text-[10px] text-[#858197]">LPU INT335 • Day 3 of MTT</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#059669] bg-[#E8F8F0] px-2.5 py-0.5 rounded-full">
                  81% Balanced
                </span>
              </div>

              {/* Mockup circular score */}
              <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#ECE9F2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#858197]">
                    Today's Progress
                  </span>
                  <h4 className="text-sm font-bold text-[#242039]">9 of 13 Activities Done</h4>
                  <p className="text-[11px] text-[#858197] mt-0.5">Hydration & study blocks on track</p>
                </div>
                <ProgressRing radius={36} stroke={6} progress={72} color="#8B5CF6">
                  <span className="text-xs font-bold text-[#242039]">72%</span>
                </ProgressRing>
              </div>

              {/* Mockup mini metrics */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                  <div className="flex items-center gap-1.5 text-sky-700 font-semibold mb-0.5">
                    <Droplets className="w-3.5 h-3.5 fill-current" />
                    Hydration
                  </div>
                  <strong className="text-sm font-bold text-[#242039]">1,750 / 2,500ml</strong>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                  <div className="flex items-center gap-1.5 text-indigo-700 font-semibold mb-0.5">
                    <Moon className="w-3.5 h-3.5 fill-current" />
                    Sleep Logged
                  </div>
                  <strong className="text-sm font-bold text-[#242039]">7.5 hrs Restful</strong>
                </div>
              </div>

              {/* Sample Timeline Item */}
              <div className="p-3 rounded-xl bg-white border border-purple-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <div>
                    <span className="font-semibold text-[#242039]">INT335 Mock Exam Review</span>
                    <p className="text-[10px] text-[#858197]">14:30 • 75 mins study block</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#8B5CF6] bg-[#F0EBFF] px-2 py-0.5 rounded-full">
                  Next Up
                </span>
              </div>

              {/* Interactive Demo Action Button */}
              <button
                onClick={handleDemoAccess}
                className="w-full py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Launch Interactive Prototype</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section A: The Problem */}
      <section id="problem" className="py-16 sm:py-24 bg-white border-y border-[#ECE9F2] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full">
              The Exam Week Reality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#242039]">
              How university exam pressure causes the crash
            </h2>
            <p className="text-sm sm:text-base text-[#858197]">
              During midterm and end-term exam weeks, students sacrifice fundamental routines in a rush to cram, resulting in cognitive fatigue and sudden crashes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: 'Skipping Meals',
                desc: 'Replacing nutritious meals with sugary snacks or missing food entirely, causing sharp glucose and energy dips.',
                color: 'text-amber-600 bg-amber-50',
              },
              {
                icon: Droplets,
                title: 'Severe Dehydration',
                desc: 'Sitting for hours in the library without drinking water, leading to headaches, dry eyes, and loss of concentration.',
                color: 'text-sky-600 bg-sky-50',
              },
              {
                icon: Moon,
                title: 'All-Nighter Burnout',
                desc: 'Disrupting circadian sleep rhythm with 3-4 hour erratic naps, damaging short-term memory consolidation.',
                color: 'text-indigo-600 bg-indigo-50',
              },
              {
                icon: Coffee,
                title: 'Cramming Without Breaks',
                desc: 'Studying continuously without neural rest intervals, resulting in diminishing retention and intense exam anxiety.',
                color: 'text-purple-600 bg-purple-50',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#FAF9FC] border border-[#ECE9F2] hover:border-gray-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${p.color}`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-[#242039] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#858197] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section B: Six Core Modules (Features) */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#F0EBFF] px-3 py-1 rounded-full border border-purple-100">
              Six Core Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#242039]">
              Engineered for student balance & focus
            </h2>
            <p className="text-sm sm:text-base text-[#858197]">
              Every module in RECHARGE directly addresses the four behavioural routines students neglect during exam pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CalendarCheck,
                title: 'Daily Routine Planner',
                desc: 'Chronological timeline dividing your day into paced morning, afternoon, and evening revision and nourishment slots.',
                badge: 'Routine',
                link: '/app/routine',
              },
              {
                icon: Droplets,
                title: 'Hydration Tracker',
                desc: 'Visual fluid gauge, custom presets, 7-day intake history, and gentle non-medical prompts to maintain stamina.',
                badge: 'Hydration',
                link: '/app/hydration',
              },
              {
                icon: Moon,
                title: 'Circadian Sleep Tracker',
                desc: 'Bedtime and wake-up recording, duration calculations, and target consistency bands for cognitive memory consolidation.',
                badge: 'Sleep',
                link: '/app/sleep',
              },
              {
                icon: Coffee,
                title: 'Study Breaks & Meals',
                desc: 'Structured break prompts and meal check-in tracking so you never sacrifice nutrition or mental resets.',
                badge: 'Rest & Fuel',
                link: '/app/dashboard',
              },
              {
                icon: BarChart3,
                title: 'Routine Analytics',
                desc: 'Comprehensive charts, habit heatmaps, and descriptive progress insights generated from your demonstration data.',
                badge: 'Insights',
                link: '/app/progress',
              },
              {
                icon: Users,
                title: 'Study Buddy Circle',
                desc: 'Simulated peer accountability: send high-fives, share circle goals, and remind peers to stay paced and rested.',
                badge: 'Accountability',
                link: '/app/buddy',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white border border-[#ECE9F2] hover:border-purple-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#F0EBFF] text-[#6D28D9] flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#FAF9FC] px-2.5 py-1 rounded-full border border-[#ECE9F2]">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-[#242039] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#858197] leading-relaxed">{f.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#ECE9F2] flex items-center justify-between text-xs font-semibold text-[#8B5CF6]">
                  <button onClick={handleDemoAccess} className="hover:underline flex items-center gap-1">
                    Try Module <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C: How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-[#ECE9F2] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#F0EBFF] px-3 py-1 rounded-full border border-purple-100">
              Simple 4-Step Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#242039]">
              How RECHARGE guides your exam week
            </h2>
            <p className="text-sm sm:text-base text-[#858197]">
              Simple, sustainable pacing that fits seamlessly into your university study schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Set Your Exam Schedule',
                desc: 'Input upcoming examination dates, subjects (MTT / ETT), and preferred daily study hours in seconds.',
              },
              {
                step: '02',
                title: 'Build Your Daily Routine',
                desc: 'Plan realistic morning, afternoon, and evening blocks with mandatory meal and break buffers.',
              },
              {
                step: '03',
                title: 'Track Everyday Habits',
                desc: 'Log water sips with one click, check in meals on time, and record restorative sleep intervals.',
              },
              {
                step: '04',
                title: 'Review Your Progress',
                desc: 'Gain clear descriptive insights and stay encouraged with your study circle without burning out.',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#FAF9FC] border border-[#ECE9F2] relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black font-heading text-[#8B5CF6]/25 block mb-2">
                    {s.step}
                  </span>
                  <h3 className="text-base font-bold font-heading text-[#242039] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#858197] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D: Academic Design Thinking Context */}
      <section id="academic" className="py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#F0EBFF]/70 via-white to-[#E8F8F0]/40 border border-purple-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8B5CF6]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
              Academic Design Thinking Prototype
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#242039]">
            LPU INT335 Project P13 — Exam Week Without The Crash
          </h3>

          <p className="text-sm text-[#858197] leading-relaxed">
            This application is an educational prototype developed under the <strong>Design Thinking & Innovation (INT335)</strong> curriculum at Lovely Professional University. It explores how student-centered routines, empathy-driven habit tracking, and non-judgmental accountability can help learners sustain cognitive endurance during heavy academic testing cycles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-purple-100/80 text-xs text-[#858197]">
            <div>
              <strong className="text-[#242039] block font-semibold">Course Code:</strong>
              INT335 Design Thinking
            </div>
            <div>
              <strong className="text-[#242039] block font-semibold">Project Code:</strong>
              Project P13
            </div>
            <div>
              <strong className="text-[#242039] block font-semibold">Core Focus:</strong>
              Exam Week Routine Companion
            </div>
          </div>
        </div>
      </section>

      {/* Section E: Closing CTA Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight">
            Make your exam week more balanced.
          </h2>
          <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto leading-relaxed">
            Step into the complete interactive prototype. Track routines, log hydration, manage sleep schedules, and connect with your study circle.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleDemoAccess}
              className="px-6 py-3 rounded-2xl bg-white text-[#6D28D9] font-bold text-sm shadow-lg hover:bg-purple-50 transition-all active:scale-98"
            >
              Launch Interactive Demo
            </button>
            <Link
              to="/signup"
              className="px-6 py-3 rounded-2xl bg-purple-700/60 hover:bg-purple-700 text-white font-semibold text-sm border border-purple-400/40 transition-all"
            >
              Create Student Account
            </Link>
          </div>
        </div>
      </section>

      {/* Section F: Footer */}
      <footer className="bg-white border-t border-[#ECE9F2] px-4 sm:px-8 py-10 text-xs text-[#858197]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="font-extrabold text-base text-[#242039] font-heading">
              RECHARGE
            </span>
            <span className="text-[11px]">• Study hard. Stay balanced. Don't crash.</span>
          </div>

          <p className="text-center sm:text-right">
            LPU INT335 Project P13 Prototype • Academic Design Thinking Demonstration
          </p>
        </div>
      </footer>
    </div>
  );
}

