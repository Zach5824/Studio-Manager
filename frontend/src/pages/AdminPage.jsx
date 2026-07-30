import React from 'react';
import UserManagement from '../components/admin/UserManagement';

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-amber-500">Administration Hub</h1>
        <p className="text-stone-400 text-sm mt-1">Manage system accounts and access rights</p>
      </header>

      <UserManagement />
    </div>
  );
}