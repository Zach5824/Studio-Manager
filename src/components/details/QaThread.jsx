import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, CheckCircle, MessageSquare } from 'lucide-react';
import api from '../../services/api';

export default function QaThread() {
  const { id } = useParams();
  const [track, setTrack] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrackAndReplies = async () => {
      try {
        const [trackResponse, repliesResponse] = await Promise.all([
          api.get(`/tracks/${id}`),
          api.get(`/tracks/${id}/replies`),
        ]);
        setTrack(trackResponse.data);
        setReplies(repliesResponse.data);
      } catch (error) {
        console.error('Failed to load discussion', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTrackAndReplies();
    }
  }, [id]);

  const handleVote = async (replyId) => {
    try {
      const response = await api.post(`/tracks/${id}/replies/${replyId}/vote`);
      setReplies((current) => current.map((reply) => (reply.id === replyId ? response.data : reply)));
    } catch (error) {
      console.error('Failed to vote', error);
    }
  };

  const handleAddReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      const response = await api.post(`/tracks/${id}/replies`, { content: newReply });
      setReplies((current) => [...current, response.data]);
      setNewReply('');
    } catch (error) {
      console.error('Failed to post reply', error);
    }
  };

  if (loading) {
    return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-sm text-slate-400">Loading discussion…</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">Active Discussion</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">{track?.title || 'Track Discussion'}</h1>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1">Genre: {track?.genre || 'Unknown'}</span>
          <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1">BPM: {track?.bpm || '—'}</span>
          <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1">Key: {track?.musical_key || '—'}</span>
        </div>
        {track?.technical_challenge && <p className="mt-5 text-sm leading-7 text-slate-400">{track.technical_challenge}</p>}
      </div>

      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-200">
          <MessageSquare className="h-5 w-5 text-amber-400" /> Technical Feedback & Solutions
        </h3>

        {replies.map((reply) => (
          <div
            key={reply.id}
            className={`rounded-2xl border p-6 transition ${reply.votes_count > 3 ? 'border-amber-500/50 bg-amber-500/10' : 'border-white/10 bg-slate-900/70'}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Producer {reply.user_id}</span>
                  {reply.votes_count > 3 && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-slate-950">
                      <CheckCircle className="h-3 w-3" /> Top Mix Solution
                    </span>
                  )}
                </div>
                <p className="text-sm leading-7 text-slate-300">{reply.content}</p>
              </div>

              <button
                onClick={() => handleVote(reply.id)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-amber-400 transition hover:border-amber-500"
              >
                <ThumbsUp className="h-4 w-4" /> {reply.votes_count}
              </button>
            </div>
          </div>
        ))}

        <form onSubmit={handleAddReply} className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <textarea
            rows="3"
            placeholder="Offer technical advice, EQ tips, or a mix workaround..."
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
          />
          <button type="submit" className="rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
            Post Solution
          </button>
        </form>
      </div>
    </div>
  );
}