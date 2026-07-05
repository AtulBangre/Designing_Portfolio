'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const from = searchParams.get('from') || '/admin/dashboard';
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Incorrect password. Try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[80px] -z-10" />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/30 to-blue-600/20 border border-violet-500/20 mb-5 backdrop-blur-sm">
            <Sparkles className="text-violet-400" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">
            Portfolio CMS
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Sign in to manage your portfolio content
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex flex-col gap-2 mb-6">
            <label
              htmlFor="admin-password"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wider"
            >
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Lock size={16} className="text-gray-500" />
              </div>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your admin password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20 active:scale-[0.98]"
          >
            {loading ? 'Signing in…' : 'Sign In to CMS'}
          </button>

          <p className="text-center text-xs text-gray-600 mt-6">
            Password is set in{' '}
            <code className="text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">.env.local</code>
          </p>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          <a href="/" className="text-gray-400 hover:text-gray-200 transition-colors">
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}>
      <LoginForm />
    </Suspense>
  );
}
