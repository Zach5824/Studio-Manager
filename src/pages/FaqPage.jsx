import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FaqManagement from '../components/admin/FaqManagement';
import { useSelector } from 'react-redux';
import { HelpCircle } from 'lucide-react';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const fetchFaqs = async () => {
    try {
      const res = await api.get('/admin/faqs');
      setFaqs(res.data);
    } catch (err) {
      console.error('Failed to load FAQs');
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-amber-400" />
          <h2 className="text-2xl font-semibold text-white">Studio Knowledge Base</h2>
        </div>
        <p className="mt-2 text-sm text-slate-400">Frequently asked technical workflow questions for the studio team.</p>
      </div>

      {user?.role === 'admin' && <FaqManagement onFaqCreated={fetchFaqs} />}

      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              {f.category}
            </span>
            <h4 className="mt-4 text-lg font-semibold text-white">{f.question}</h4>
            <p className="mt-2 text-sm leading-7 text-slate-400">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}