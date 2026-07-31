import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '', role: 'producer' });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(result)) {
      navigate('/catalog');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.2),_transparent_35%)] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/40 backdrop-blur xl:grid xl:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">Studio Manager</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Your production hub, made simple.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
            Review audio assets, coordinate feedback, and keep your team aligned in one calm, focused workspace.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Backend status</p>
            <p className="mt-2">Connects to the FastAPI service running at http://localhost:8000.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">{credentials.role === 'producer' ? 'Producer Sign In' : 'Normal User Sign In'}</h3>
            <p className="text-sm text-slate-400">Access your tracks, questions, and studio projects.</p>
          </div>

          <div className="mt-6 flex rounded-2xl border border-white/10 bg-slate-900/80 p-1">
            <button
              type="button"
              onClick={() => setCredentials((current) => ({ ...current, role: 'producer' }))}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${credentials.role === 'producer' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Producer
            </button>
            <button
              type="button"
              onClick={() => setCredentials((current) => ({ ...current, role: 'user' }))}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${credentials.role === 'user' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Normal User
            </button>
          </div>

          {error && <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Username</label>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Password</label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Need an account?{' '}
            <Link to="/signup" className="font-medium text-amber-400 transition hover:text-amber-300">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
