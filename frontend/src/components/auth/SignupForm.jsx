import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signupUser(formData));
    if (signupUser.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_32%)] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/40 backdrop-blur xl:grid xl:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">New Producer</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Create your account and start collaborating.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
            Join the studio catalog, share feedback, and keep every track moving with clear context.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Create Account</h3>
            <p className="text-sm text-slate-400">Choose whether you want a normal user or producer account.</p>
          </div>

          <div className="mt-6 flex rounded-2xl border border-white/10 bg-slate-900/80 p-1">
            <button
              type="button"
              onClick={() => setFormData((current) => ({ ...current, role: 'user' }))}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${formData.role === 'user' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Normal User
            </button>
            <button
              type="button"
              onClick={() => setFormData((current) => ({ ...current, role: 'producer' }))}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${formData.role === 'producer' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Producer
            </button>
          </div>

          {error && <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Username</label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Register Producer Account'}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-amber-400 transition hover:text-amber-300">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
