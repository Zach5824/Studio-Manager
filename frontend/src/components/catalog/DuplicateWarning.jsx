import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DuplicateWarning({ isOpen, onClose, duplicateTrackName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-stone-900 border border-amber-500/50 rounded-xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-stone-300">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 text-amber-500">
          <AlertTriangle className="w-8 h-8" />
          <h3 className="text-lg font-bold">Possible Duplicate Track</h3>
        </div>
        <p className="text-stone-300 text-sm">
          A track matching <span className="font-semibold text-amber-400">"{duplicateTrackName}"</span> already exists in the catalog. Consider adding a version or stem reply instead of re-uploading.
        </p>
        <button 
          onClick={onClose} 
          className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 py-2 rounded text-sm font-bold transition"
        >
          Acknowledge & Dismiss
        </button>
      </div>
    </div>
  );
}