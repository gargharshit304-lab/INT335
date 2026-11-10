import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, User, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';

export default function SignupPage() {
  const { signup, demoLogin } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your full student name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid university email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setError('');
    signup(name.trim(), email.trim(), password);
    navigate('/onboarding');
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
          Build Your Routine
        </h2>
        <p className="mt-1 text-xs text-[#858197]">
          Create your student profile and configure your exam schedule
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 border border-[#ECE9F2] shadow-xl shadow-purple-950/5 rounded-3xl space-y-6">
          {/* Demo shortcut */}
          <div className="p-3.5 rounded-2xl bg-[#F0EBFF] border border-purple-200/80 text-center">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center justify-center gap-1.5 w-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Skip setup? Instant Demo Access as Rohan Sharma →
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                University Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya.verma@lpu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#858197] uppercase tracking-wider block mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#ECE9F2] text-sm text-[#242039] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Proceed to Exam Setup →
            </Button>
          </form>

          <p className="text-center text-xs text-[#858197]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#8B5CF6] hover:underline">
              Sign In →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

