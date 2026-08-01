import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from '../../store/trackSlice';
import { Link } from 'react-router-dom';
import { Disc } from 'lucide-react';

export default function CatalogTable() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.tracks);
  const [filter, setFilter] = useState({ genre: '', bpm: '' });

  useEffect(() => {
    dispatch(fetchTracks(filter));
  }, [dispatch, filter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">Music Assets Catalog</h2>
          <p className="text-stone-400 text-sm">Filter tracks by technical tags and specifications</p>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Filter Genre..."
            value={filter.genre}
            onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
            className="bg-stone-950 border border-stone-800 px-4 py-2 rounded text-stone-200 text-sm focus:outline-none focus:border-amber-500"
          />
          <input 
            type="number" 
            placeholder="Filter BPM..."
            value={filter.bpm}
            onChange={(e) => setFilter({ ...filter, bpm: e.target.value })}
            className="bg-stone-950 border border-stone-800 px-4 py-2 rounded text-stone-200 text-sm w-28 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Catalog Table */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Unable to load the catalog: {typeof error === 'string' ? error : error.detail || 'Please try again.'}
        </div>
      )}

      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-950 text-stone-400 text-xs uppercase border-b border-stone-800">
            <tr>
              <th className="p-4">Track Title</th>
              <th className="p-4">Genre</th>
              <th className="p-4">BPM</th>
              <th className="p-4">Key</th>
              <th className="p-4">Technical Notes</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800 text-sm">
            {items.map((track) => (
              <tr key={track.id} className="hover:bg-stone-850 transition">
                <td className="p-4 font-semibold text-stone-100 flex items-center gap-2">
                  <Disc className="w-4 h-4 text-amber-500" />
                  {track.title}
                </td>
                <td className="p-4 text-stone-300">{track.genre}</td>
                <td className="p-4 font-mono text-amber-400">{track.bpm}</td>
                <td className="p-4 text-stone-300">{track.musical_key}</td>
                <td className="p-4 text-stone-400 max-w-xs truncate">{track.technical_challenge || 'None'}</td>
                <td className="p-4 text-right">
                  <Link 
                    to={`/tracks/${track.id}`}
                    className="bg-stone-800 hover:bg-stone-700 text-amber-400 px-3 py-1.5 rounded text-xs transition"
                  >
                    View Q&A Thread
                  </Link>
                </td>
              </tr>
            ))}
            {!loading && !error && items.length === 0 && (
              <tr>
                <td colSpan="6" className="p-10 text-center text-stone-400">
                  No music matches these filters yet.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan="6" className="p-10 text-center text-stone-400">Loading music catalog…</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
