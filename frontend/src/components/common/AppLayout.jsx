import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Music, PlusCircle, Shield, LogOut, BookOpen, Home, UserCircle2 } from 'lucide-react';

export default function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.12),_transparent_28%)] text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-white/10 bg-slate-950/80 p-6 backdrop-blur lg:w-72 lg:border-b-0 lg:border-r">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">Studio Manager</p>
              <h1 className="mt-3 text-2xl font-semibold text-white">Production Hub</h1>
              <p className="mt-2 text-sm text-slate-400">Track requests, mix feedback, and studio collaboration.</p>
            </div>

            <nav className="space-y-2">
              <Link to="/home" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-amber-400">
                <Home className="h-5 w-5" /> Home
              </Link>
              <Link to="/catalog" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-amber-400">
                <Music className="h-5 w-5" /> Catalog
              </Link>
              <Link to="/profile" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-amber-400">
                <UserCircle2 className="h-5 w-5" /> Profile
              </Link>
              {(user?.role === 'producer' || user?.role === 'admin') && (
                <Link to="/upload" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-amber-400">
                  <PlusCircle className="h-5 w-5" /> Upload Track
                </Link>
              )}
              <Link to="/faqs" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-amber-400">
                <BookOpen className="h-5 w-5" /> Studio FAQs
              </Link>

              {user?.role === 'admin' && (
                <Link to="/admin" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-amber-400 transition hover:bg-white/10">
                  <Shield className="h-5 w-5" /> Admin Panel
                </Link>
              )}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}