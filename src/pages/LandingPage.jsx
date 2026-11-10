import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  ArrowRight,
  Droplets,
  Moon,
  CalendarCheck,
  Utensils,
  BarChart3,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Coffee,
} from 'lucide-react';
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
    <div className="min-h-screen bg-[#FCFBFE] text-[#25213A] selection:bg-purple-100 selection:text-purple-900 font-sans">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAE6F0] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Brand Logo with Custom Symbol */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-xs shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-4.5 h-4.5 fill-current" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#25213A] font-heading flex items-center gap-1.5">
              RECHARGE
              <span className="w-1.5 h-1.5 rounded-full bg-[#27AE82]"></span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#777387]">
            <a href="#problem" className="hover:text-[#25213A] transition-colors">
              The Reality
            </a>
            <a href="#product" className="hover:text-[#25213A] transition-colors">
              Product
            </a>
            <a href="#features" className="hover:text-[#25213A] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-[#25213A] transition-colors">
              How It Works
            </a>
            <a href="#project" className="hover:text-[#25213A] transition-colors">
              INT335 Story
            </a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-[#777387] hover:text-[#25213A] px-2.5 py-1.5 transition-colors"
            >
              Log In
            </Link>
            <button
              onClick={handleDemoAccess}
              className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#6D42D8] text-white text-xs font-semibold shadow-xs shadow-purple-500/20 transition-all active:scale-98 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION — TWO COLUMN EDITORIAL PRESENTATION */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typography & CTAs (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EDFF] text-[#6D42D8] border border-purple-100 text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Your Exam Week Companion
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black font-heading text-[#25213A] tracking-tight leading-[1.08]">
              Your exams matter. <br />
              <span className="text-[#6D42D8] relative inline-block">
                Your well-being
                <span className="absolute bottom-1.5 left-0 w-full h-2.5 bg-[#F2EDFF] -z-10 rounded-full" />
              </span>{' '}
              does too.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#777387] leading-relaxed max-w-xl">
              Exam season gets demanding. RECHARGE helps you stay on top of your daily routines, from meals and hydration to sleep and study breaks.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handleDemoAccess}
                className="px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#6D42D8] text-white text-sm font-bold shadow-sm shadow-purple-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Build My Routine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#features"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#F2EDFF]/40 text-[#25213A] border border-[#EAE6F0] hover:border-purple-200 text-sm font-semibold transition-all text-center"
              >
                Explore Features
              </a>
            </div>

            {/* Trust Statement */}
            <div className="pt-4 border-t border-[#EAE6F0] flex items-center gap-2.5 text-xs text-[#777387]">
              <div className="w-5 h-5 rounded-full bg-[#E9F7F0] text-[#27AE82] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span>Designed for real student routines during examination weeks.</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Lifestyle Photography with Overlaid UI Cards (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Editorial Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/10 border border-[#EAE6F0] bg-white aspect-[4/3.8] sm:aspect-[4/3.5]">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=85"
                alt="University student studying calmly at a desk with notebook, laptop, and natural window light"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlaid Floating UI Element 1: Hydration Progress */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-4 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#EAE6F0] rounded-2xl p-3.5 shadow-xl shadow-purple-950/8 flex items-center gap-3 z-10"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 fill-current" />
              </div>
              <div className="pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                    Hydration Logged
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                </div>
                <p className="text-xs font-bold text-[#25213A] mt-0.5">
                  1,750 / 2,500 ml <span className="text-[10px] font-normal text-[#777387]">• 70%</span>
                </p>
              </div>
            </motion.div>

            {/* Overlaid Floating UI Element 2: Today's Routine Completion Ring */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#EAE6F0] rounded-2xl p-3.5 shadow-xl shadow-purple-950/8 flex items-center gap-3.5 z-10"
            >
              <ProgressRing radius={26} stroke={4} progress={81} color="#8B5CF6">
                <span className="text-[11px] font-bold text-[#25213A]">81%</span>
              </ProgressRing>
              <div>
                <p className="text-xs font-bold text-[#25213A]">Today's Balance</p>
                <p className="text-[11px] text-[#777387]">8 of 10 habits completed</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION — EXAM WEEK REALITY (EDITORIAL TWO-COLUMN LAYOUT) */}
      <section id="problem" className="py-20 sm:py-28 bg-white border-y border-[#EAE6F0] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Editorial Photo of Late-Night Study Environment (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#EAE6F0] shadow-lg shadow-purple-950/5 aspect-[4/4.5] sm:aspect-[4/3.8] lg:aspect-[4/4.5]">
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&auto=format&fit=crop&q=85"
                  alt="Student study desk with open books, stationery, and laptop during late revision"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#25213A]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40">
                  <p className="text-xs font-semibold text-[#25213A]">
                    "When exams approach, student routines are typically the first thing to collapse."
                  </p>
                  <span className="text-[10px] text-[#777387] mt-0.5 block">
                    — LPU INT335 Project P13 Student Research
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative & 4 Compact Problem Statements (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full inline-block">
                  The Exam Week Reality
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#25213A] tracking-tight leading-tight">
                  Exam pressure shouldn't mean neglecting yourself.
                </h2>
                <p className="text-sm sm:text-base text-[#777387] leading-relaxed">
                  During examination weeks, everyday routines are often the first things students sacrifice. In the scramble to cover syllabus notes, students inadvertently compromise the very biological habits that power memory, focus, and emotional stamina.
                </p>
              </div>

              {/* 4 Compact Problem Statements (Not Large Identical Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FCFBFE] border border-[#EAE6F0] flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#25213A]">Skipping Meals</h3>
                    <p className="text-xs text-[#777387] mt-0.5 leading-relaxed">
                      Replacing wholesome nutrition with sugary snacks or missing lunch, creating sudden glucose and cognitive dips.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FCFBFE] border border-[#EAE6F0] flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Droplets className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#25213A]">Forgetting Hydration</h3>
                    <p className="text-xs text-[#777387] mt-0.5 leading-relaxed">
                      Hours of sitting in the library without water, sparking headaches, dry eyes, and sluggish brain processing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FCFBFE] border border-[#EAE6F0] flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Moon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#25213A]">All-Night Sessions</h3>
                    <p className="text-xs text-[#777387] mt-0.5 leading-relaxed">
                      Trading restorative circadian sleep for erratic naps, which actively degrades memory consolidation before test day.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FCFBFE] border border-[#EAE6F0] flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center shrink-0 mt-0.5">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#25213A]">Missing Study Breaks</h3>
                    <p className="text-xs text-[#777387] mt-0.5 leading-relaxed">
                      Cramming non-stop without neural rest intervals, leading to diminishing retention and intense exam anxiety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE — INTRODUCING RECHARGE */}
      <section id="product" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#F2EDFF] border border-purple-100 px-3 py-1 rounded-full inline-block">
            Introducing RECHARGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#25213A] tracking-tight">
            One place for your everyday balance.
          </h2>
          <p className="text-sm sm:text-base text-[#777387] leading-relaxed">
            Build routines, track your progress, and make room for the things that keep you going.
          </p>
        </div>

        {/* Desktop Browser Window Mockup with Implemented UI Representation */}
        <div className="relative max-w-5xl mx-auto">
          {/* Laptop / Browser Shell */}
          <div className="bg-white border border-[#EAE6F0] rounded-3xl shadow-2xl shadow-purple-950/10 overflow-hidden text-left">
            {/* Window Chrome Header */}
            <div className="h-10 bg-[#FAF9FC] border-b border-[#EAE6F0] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="px-4 py-1 rounded-lg bg-white border border-[#EAE6F0] text-[10px] text-[#777387] font-mono flex items-center gap-2">
                <span>app.recharge.study/dashboard</span>
              </div>
              <span className="w-12" />
            </div>

            {/* Mockup Dashboard Content */}
            <div className="p-6 sm:p-8 bg-[#FCFBFE] space-y-5">
              {/* Top Banner Row inside mockup */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE6F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-[#777387] mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#F2EDFF] text-[#6D42D8]">
                      Tue, Nov 10
                    </span>
                    <span>• LPU INT335 Prototype</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold font-heading text-[#25213A]">
                    Good evening, Rohan!
                  </h4>
                  <p className="text-xs text-[#777387]">Let's make today a balanced one.</p>
                </div>

                <div className="flex items-center gap-3 bg-[#FCFBFE] border border-[#EAE6F0] p-2.5 rounded-xl self-start sm:self-auto">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] text-white flex flex-col items-center justify-center font-bold text-xs">
                    <span>4</span>
                    <span className="text-[7px] uppercase leading-none">days</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-[10px] font-bold text-[#8B5CF6] uppercase">MTT Exam Week</span>
                    <p className="font-bold text-[#25213A]">Design Thinking</p>
                  </div>
                </div>
              </div>

              {/* 3 Metric Cards inside mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-[#EAE6F0]">
                  <span className="text-[10px] font-bold uppercase text-[#777387]">Today's Balance</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-bold font-heading text-[#25213A]">81%</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E9F7F0] text-[#27AE82]">
                      On Track
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777387] mt-1">8 of 10 habits completed</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EAE6F0]">
                  <span className="text-[10px] font-bold uppercase text-[#777387]">Hydration</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-bold font-heading text-[#25213A]">1,750 ml</span>
                    <span className="text-[10px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                      70%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777387] mt-1">750 ml remaining to goal</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EAE6F0]">
                  <span className="text-[10px] font-bold uppercase text-[#777387]">Sleep Consistency</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-bold font-heading text-[#25213A]">7.5 hrs</span>
                    <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Restful
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777387] mt-1">Bedtime kept within target band</p>
                </div>
              </div>

              {/* Sample Routine Checklist inside mockup */}
              <div className="p-4 rounded-2xl bg-white border border-[#EAE6F0] space-y-2">
                <span className="text-xs font-bold text-[#25213A]">Today's Paced Timeline</span>
                <div className="space-y-1.5 pt-1">
                  {[
                    { time: '08:00 AM', title: 'Nourishing Breakfast (Oats & fruit)', tag: 'Meal', done: true },
                    { time: '09:00 AM', title: 'Deep Focus: Design Thinking Revision', tag: 'Study', done: true },
                    { time: '10:30 AM', title: 'Hydration & Shoulder Stretch Break', tag: 'Break', done: true },
                    { time: '14:30 PM', title: 'Operating Systems Problem Sets', tag: 'Study', done: false },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#FCFBFE] border border-[#EAE6F0] text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${item.done
                              ? 'bg-[#E9F7F0] text-[#27AE82]'
                              : 'border border-[#EAE6F0] text-gray-300'
                            }`}
                        >
                          {item.done ? '✓' : ''}
                        </span>
                        <span className={item.done ? 'line-through text-[#777387]' : 'font-medium text-[#25213A]'}>
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#777387]">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Button Overlay */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleDemoAccess}
              className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#6D42D8] text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center gap-2"
            >
              <span>Explore Interactive Live Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FEATURES — SIX DISTINCT MODULES WITH PHOTOGRAPHY */}
      <section id="features" className="py-20 sm:py-28 bg-white border-t border-[#EAE6F0] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#F2EDFF] border border-purple-100 px-3 py-1 rounded-full inline-block">
              Balanced System
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#25213A] tracking-tight">
              Everything you need to stay balanced.
            </h2>
            <p className="text-sm sm:text-base text-[#777387] leading-relaxed">
              Six dedicated areas engineered to maintain your everyday rhythm while studying for examinations.
            </p>
          </div>

          {/* 6 Image-Led Feature Cards (Balanced 3-column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature A: Daily Routine Planner */}
            <div className="rounded-3xl border border-[#EAE6F0] bg-[#FCFBFE] overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden bg-gray-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80"
                    alt="Student organizing daily checklist and planner on desk"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider border border-[#EAE6F0]">
                    Paced Schedule
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold font-heading text-[#25213A]">
                    Daily Routine Planner
                  </h3>
                  <p className="text-xs text-[#777387] leading-relaxed">
                    Chronological timeline dividing your day into sustainable morning, afternoon, and evening revision and break buffers.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={handleDemoAccess}
                  className="text-xs font-bold text-[#8B5CF6] hover:text-[#6D42D8] flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Routine Planner</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feature B: Hydration Tracker */}
            <div className="rounded-3xl border border-[#EAE6F0] bg-[#FCFBFE] overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden bg-gray-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&auto=format&fit=crop&q=80"
                    alt="Aesthetic water bottle and glass with sunlight on desk"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-sky-600 uppercase tracking-wider border border-[#EAE6F0]">
                    Hydration Habits
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold font-heading text-[#25213A]">
                    Hydration Tracker
                  </h3>
                  <p className="text-xs text-[#777387] leading-relaxed">
                    Visual fluid progress indicator with custom quick-add presets, 7-day intake charts, and gentle desk reminders.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={handleDemoAccess}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Hydration</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feature C: Sleep Routine Tracker */}
            <div className="rounded-3xl border border-[#EAE6F0] bg-[#FCFBFE] overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden bg-gray-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80"
                    alt="Calm peaceful bedroom with soft daylight on linen"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-wider border border-[#EAE6F0]">
                    Circadian Rest
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold font-heading text-[#25213A]">
                    Sleep Routine Tracker
                  </h3>
                  <p className="text-xs text-[#777387] leading-relaxed">
                    Bedtime and wake-up duration recording with target consistency bands to preserve cognitive consolidation.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={handleDemoAccess}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Sleep Module</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feature D: Study Breaks & Meals */}
            <div className="rounded-3xl border border-[#EAE6F0] bg-[#FCFBFE] overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden bg-gray-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80"
                    alt="Fresh healthy meal bowl and nutritious student lunch"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#27AE82] uppercase tracking-wider border border-[#EAE6F0]">
                    Fuel & Reset
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold font-heading text-[#25213A]">
                    Study Breaks & Meals
                  </h3>
                  <p className="text-xs text-[#777387] leading-relaxed">
                    Meal check-in tracking and structured break intervals to guarantee your brain gets fuel and mental rests.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={handleDemoAccess}
                  className="text-xs font-bold text-[#27AE82] hover:text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Breaks & Meals</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feature E: Routine Analytics */}
            <div className="rounded-3xl border border-[#EAE6F0] bg-[#FCFBFE] overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden bg-gray-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
                    alt="Modern data visualization charts and trends on screen"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider border border-[#EAE6F0]">
                    Descriptive Insights
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold font-heading text-[#25213A]">
                    Routine Analytics
                  </h3>
                  <p className="text-xs text-[#777387] leading-relaxed">
                    7-day trend charts, 28-day habit consistency heatmaps, and local descriptive insights without clinical jargon.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={handleDemoAccess}
                  className="text-xs font-bold text-[#8B5CF6] hover:text-[#6D42D8] flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Progress</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feature F: Study Buddy Circle */}
            <div className="rounded-3xl border border-[#EAE6F0] bg-[#FCFBFE] overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden bg-gray-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                    alt="Group of university students studying together in a warm library"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-600 uppercase tracking-wider border border-[#EAE6F0]">
                    Peer Accountability
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold font-heading text-[#25213A]">
                    Study Buddy Circle
                  </h3>
                  <p className="text-xs text-[#777387] leading-relaxed">
                    Simulated peer accountability: share daily circle goals and send encouraging reaction nudges to keep peers steady.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={handleDemoAccess}
                  className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Study Circle</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS — HORIZONTAL 4-STEP PROCESS TIMELINE */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-[#FCFBFE] border-t border-[#EAE6F0] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#F2EDFF] border border-purple-100 px-3 py-1 rounded-full inline-block">
              Clear Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#25213A] tracking-tight">
              Small habits. Better exam weeks.
            </h2>
            <p className="text-sm sm:text-base text-[#777387] leading-relaxed">
              A straightforward four-step approach designed to fit naturally into your revision schedule.
            </p>
          </div>

          {/* Horizontal Step Timeline on Desktop, Vertical on Mobile */}
          <div className="relative">
            {/* Connecting Line on Desktop */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#EAE6F0] -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: '01',
                  title: 'Set Your Exam Schedule',
                  desc: 'Add your upcoming assessments and important dates into your calendar countdown.',
                },
                {
                  step: '02',
                  title: 'Build Your Daily Routine',
                  desc: 'Plan meals, study sessions, hydration breaks, and non-negotiable sleep windows.',
                },
                {
                  step: '03',
                  title: 'Track Everyday Habits',
                  desc: 'Check in with your daily activities, log water with one click, and stay steady.',
                },
                {
                  step: '04',
                  title: 'Review Your Progress',
                  desc: 'See your weekly patterns, maintain pacing, and avoid pre-exam fatigue.',
                },
              ].map((s, idx) => (
                <div key={idx} className="space-y-3 bg-[#FCFBFE] lg:bg-transparent p-5 lg:p-0 rounded-2xl border lg:border-0 border-[#EAE6F0]">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#EAE6F0] shadow-xs flex items-center justify-center font-black font-heading text-lg text-[#8B5CF6]">
                    {s.step}
                  </div>
                  <h3 className="text-base font-bold font-heading text-[#25213A]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#777387] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. INT335 PROJECT INFORMATION — ACADEMIC DESIGN THINKING IDENTITY */}
      <section id="project" className="py-16 sm:py-24 bg-white border-t border-[#EAE6F0] px-4 sm:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-[#EAE6F0] p-8 sm:p-12 bg-[#FCFBFE] space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8B5CF6]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6D42D8]">
              Academic Design Thinking Project
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#25213A] tracking-tight">
            Built around a real campus challenge.
          </h3>

          <p className="text-sm text-[#777387] leading-relaxed">
            RECHARGE was created as an educational prototype for <strong>LPU INT335 (Design Thinking & Innovation)</strong> under the theme <em>Project P13 — Exam Week Without the Crash</em>.
          </p>

          <p className="text-xs text-[#777387] leading-relaxed">
            Through campus empathy interviews and user journey mapping, the project revealed that university students don't need another generic study timer; they need behavioral scaffolding to protect eating, drinking, and sleeping during heavy assessment weeks.
          </p>

          <div className="pt-4 border-t border-[#EAE6F0] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#777387]">
            <div>
              <span className="font-bold text-[#25213A] block">Curriculum:</span>
              INT335 Design Thinking
            </div>
            <div>
              <span className="font-bold text-[#25213A] block">Design Project:</span>
              P13 Exam Week Companion
            </div>
            <div>
              <span className="font-bold text-[#25213A] block">Prototype Type:</span>
              Academic Frontend Simulation
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION — EDITORIAL PHOTOGRAPHIC BANNER */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-[#EAE6F0] shadow-2xl shadow-purple-950/10 min-h-[360px] sm:min-h-[400px] flex items-center justify-center p-8 sm:p-14 text-center">
          {/* Background Photography with Warm/Soft Dark Overlay */}
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&auto=format&fit=crop&q=85"
            alt="Warm library with clean wooden study desks in natural afternoon daylight"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#25213A]/75 backdrop-blur-2xs" />

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6 text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight">
              Make your exam week more balanced.
            </h2>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-lg mx-auto">
              Build routines that make room for studying, resting, and everything in between.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={handleDemoAccess}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#6D42D8] text-white text-sm font-bold shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/signup"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-semibold transition-all text-center"
              >
                Create Student Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-white border-t border-[#EAE6F0] px-4 sm:px-8 py-12 text-xs text-[#777387]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#EAE6F0]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-extrabold text-lg text-[#25213A] font-heading">
                RECHARGE
              </span>
            </div>
            <p className="text-xs text-[#777387]">
              Study hard. Stay balanced. Don't crash.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-[#777387]">
            <div className="flex items-center gap-6">
              <a href="#problem" className="hover:text-[#25213A] transition-colors">
                The Reality
              </a>
              <a href="#product" className="hover:text-[#25213A] transition-colors">
                Product
              </a>
              <a href="#features" className="hover:text-[#25213A] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-[#25213A] transition-colors">
                How It Works
              </a>
              <a href="#project" className="hover:text-[#25213A] transition-colors">
                About Project P13
              </a>
            </div>

            <p className="text-[#777387]">
              LPU INT335 Project P13 Prototype • Academic Design Thinking Demonstration
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
