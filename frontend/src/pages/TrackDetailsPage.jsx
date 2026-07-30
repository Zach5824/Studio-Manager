import React from 'react';
import { useParams } from 'react-router-dom';
import QaThread from '../components/details/QaThread';

export default function TrackDetailPage() {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <QaThread trackId={id} />
    </div>
  );
}