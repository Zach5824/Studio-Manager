import React from 'react';
import { Bell, Check } from 'lucide-react';

export default function NotificationFeed() {
  const notifications = [
    { id: 1, text: 'ProducerDave commented on your track "Midnight Groove"', time: '2m ago' },
    { id: 2, text: 'Your mix recommendation received 5 upvotes', time: '1h ago' },
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 w-80 space-y-3">
      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
        <span className="text-xs uppercase font-bold text-amber-500 flex items-center gap-1.5">
          <Bell className="w-4 h-4" /> Studio Activity
        </span>
      </div>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className="p-2.5 bg-stone-950 rounded border border-stone-800/80 text-xs text-stone-300 space-y-1">
            <p>{n.text}</p>
            <span className="text-[10px] text-stone-500 block">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}