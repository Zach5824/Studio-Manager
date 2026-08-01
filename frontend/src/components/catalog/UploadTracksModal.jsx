import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrack, fetchTracks } from '../../store/trackSlice';
import { useNavigate } from 'react-router-dom';

export default function UploadTrackModal() {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    bpm: '',
    musical_key: '',
    technical_challenge: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.tracks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, bpm: Number(formData.bpm) };
    const result = await dispatch(createTrack(payload));
    if (createTrack.fulfilled.match(result)) {
      await dispatch(fetchTracks({}));
      navigate('/catalog');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-stone-900 border border-stone-800 p-8 rounded-xl shadow-xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-amber-500">Upload Track & Asset</h2>
        <p className="text-stone-400 text-sm mt-1">Specify technical metadata for studio collaboration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {typeof error === 'string' ? error : error.detail || 'Unable to add music. Please try again.'}
          </div>
        )}
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Track Title</label>
          <input 
            type="text" required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-stone-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Genre</label>
            <input 
              type="text" required placeholder="e.g. Trap"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">BPM</label>
            <input 
              type="number" required placeholder="140"
              value={formData.bpm}
              onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Key</label>
            <input 
              type="text" required placeholder="C Min"
              value={formData.musical_key}
              onChange={(e) => setFormData({ ...formData, musical_key: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Technical Challenge / Mix Notes</label>
          <textarea 
            rows="4"
            placeholder="Describe any issues with low-end mud, vocal harshness, or DAW settings..."
            value={formData.technical_challenge}
            onChange={(e) => setFormData({ ...formData, technical_challenge: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-stone-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button disabled={loading} type="submit" className="w-full bg-amber-600 hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-70 text-stone-950 font-bold py-3 rounded transition">
          {loading ? 'Adding Music…' : 'Add Music to Catalog'}
        </button>
      </form>
    </div>
  );
}
