import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTracks } from '../store/trackSlice';
import { Compass, Music4, PlusCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(fetchTracks({}));
  }, [dispatch]);

  const role = user?.role || 'user';
  const isProducer = role === 'producer';
  const isAdmin = role === 'admin';

  const heroTitle = isAdmin
    ? 'Operations dashboard'
    : isProducer
      ? 'Producer workspace'
      : 'Welcome back';

  const heroBody = isAdmin
    ? 'Keep the studio moving with catalog oversight, QA visibility, and admin controls.'
    : isProducer
      ? 'Upload new tracks, review the catalog, and keep collaboration flowing.'
      : 'Browse shared tracks, follow the studio conversation, and stay close to the latest projects.';

  const quickActions = isAdmin
    ? [
        { to: '/admin', label: 'Open admin panel', icon: ShieldCheck },
        { to: '/catalog', label: 'Review catalog', icon: Compass },
        { to: '/faqs', label: 'Check studio FAQs', icon: Sparkles },
      ]
    : isProducer
      ? [
          { to: '/upload', label: 'Upload a track', icon: PlusCircle },
          { to: '/catalog', label: 'Browse catalog', icon: Compass },
          { to: '/faqs', label: 'Studio guidance', icon: Sparkles },
        ]
      : [
          { to: '/catalog', label: 'Browse catalog', icon: Compass },
          { to: '/faqs', label: 'View FAQS', icon: Sparkles },
          { to: '/profile', label: 'View profile', icon: Music4 },
        ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">{heroTitle}</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Hello, {user?.username || 'studio member'}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-400">{heroBody}</p>
          </div>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            <p className="font-semibold">Current catalog size</p>
            <p className="mt-1 text-2xl font-bold text-white">{items.length}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6">
          <h2 className="text-xl font-semibold text-white">Quick actions</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {quickActions.map(({ to, label, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-400/40 hover:bg-amber-500/10"
              >
                <Icon className="h-5 w-5 text-amber-400" />
                <p className="mt-3 text-sm font-medium text-white">{label}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6">
          <h2 className="text-xl font-semibold text-white">Studio snapshot</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Role</span>
              <span className="font-semibold capitalize text-white">{role}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Catalog entries</span>
              <span className="font-semibold text-white">{items.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Profile</span>
              <Link to="/profile" className="font-semibold text-amber-400">Open profile</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
