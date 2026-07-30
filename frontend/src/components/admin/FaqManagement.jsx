import React, { useState } from 'react';
import api from '../../services/api';

export default function FaqManagement({ onFaqCreated }) {
  const [formData, setFormData] = useState({ category: '', question: '', answer: '' });
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/faqs', formData);
      setStatusMsg('FAQ successfully added!');
      setFormData({ category: '', question: '', answer: '' });
      if (onFaqCreated) onFaqCreated();
    } catch (err) {
      setStatusMsg('Failed to create FAQ');
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
      <h3 className="text-xl font-semibold text-white">Create Studio FAQ</h3>
      {statusMsg && <p className="mt-3 text-sm text-amber-400">{statusMsg}</p>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Category</label>
          <input
            type="text"
            required
            placeholder="e.g. Mixing & Mastering"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Question</label>
          <input
            type="text"
            required
            placeholder="e.g. How do I upload multi-track stems?"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Answer</label>
          <textarea
            rows="3"
            required
            placeholder="Provide studio guidelines..."
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
          />
        </div>
        <button type="submit" className="rounded-2xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
          Publish FAQ
        </button>
      </form>
    </div>
  );
}