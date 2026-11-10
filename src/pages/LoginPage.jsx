import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';

export default function LoginPage() {
  const { login, demoLogin } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('rohan.sharma@lpu.in');
  const [password, setPassword] = useState('recharge2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your student email and password.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid academic or personal email address.');
      return;
    }
    setError('');
    login(email, password);
    navigate('/app/dashboard');
  };

  const handleDemoAccess = () => {
    demoLogin();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#242039] font-heading">
            RECHARGE
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#242039]">
          Student Portal Sign In
        </h2>
        <p className="mt-1 text-xs text-[#858197]">
          Exam week routine companion • LPU INT335 Project P13
        </p>
      </div>

      {/* Main Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 border border-[#ECE9F2] shadow-xl shadow-purple-950/5 rounded-3xl space-y-6">
          {/* Instant Demo Access Button */}
          <div className="p-4 rounded-2xl bg-[#F0EBFF] border border-purple-200/80 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#6D28D9]">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              Interactive Prototype Demonstration
            </div>
            <p className="text-[11px] text-[#858197] leading-relaxed">
              No registration needed. Enter the full demo pre-configured as student Rohan Sharma (MTT Fall 2026).
            </p>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>Instant Demo Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#ECE9F2]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-[#858197] font-semibold text-[10px] tracking-wider">
                Or Sign In With Email
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs border border-red-200">
              {error}
            </div>
          )}

          {forgotSent && (
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Password reset instructions simulated for {email}.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                University Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="e.g. rohan.sharma@lpu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="text-xs font-semibold text-[#8B5CF6] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#858197]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-[#ECE9F2] text-[#8B5CF6] focus:ring-[#8B5CF6]"
                />
                Remember my session
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Sign In to RECHARGE
            </Button>
          </form>

          <p className="text-center text-xs text-[#858197]">
            Don't have an exam routine yet?{' '}
            <Link to="/signup" className="font-bold text-[#8B5CF6] hover:underline">
              Create account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

