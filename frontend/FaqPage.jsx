import React from 'react';
import { useSelector } from 'react-redux';
import { UserCircle2, Mic2, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  const roleDetails = {
    admin: {
      title: 'Studio administrator',
      accent: 'text-amber-400',
      badge: 'Administrator',
      description: 'You manage the studio workspace, access oversight, and high-level collaboration settings.',
    },
    producer: {
      title: 'Producer',
      accent: 'text-amber-400',
      badge: 'Producer',
      description: 'You can upload tracks, monitor the catalog, and drive planning conversations with the team.',
    },
    user: {
      title: 'Studio member',
      accent: 'text-slate-300',
      badge: 'Member',
      description: 'You can browse the catalog, follow thread activity, and stay connected to shared projects.',
    },
  };

  const currentRole = roleDetails[user.role] || roleDetails.user;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
              <UserCircle2 className="h-10 w-10 text-amber-400" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-400">Profile</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">{user.username}</h1>
              <p className={`mt-2 text-sm font-medium ${currentRole.accent}`}>{currentRole.title}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            <p className="font-semibold">Role badge</p>
            <p className="mt-1 text-lg font-bold text-white">{currentRole.badge}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6">
          <div className="flex items-center gap-2">
            <Mic2 className="h-5 w-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-white">About this account</h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">{currentRole.description}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-white">Access summary</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Account</span>
              <span className="font-semibold text-white">{user.username}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Role</span>
              <span className="font-semibold capitalize text-white">{user.role}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span>Status</span>
              <span className="font-semibold text-emerald-400">Active</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <h2 className="text-xl font-semibold text-white">What you can do</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {user.role === 'producer' || user.role === 'admin' ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
              Upload and publish studio tracks
            </div>
          ) : null}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
            Browse the full catalog and track details
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
            Follow QA threads and studio feedback
          </div>
        </div>
      </section>
    </div>
  );
}
