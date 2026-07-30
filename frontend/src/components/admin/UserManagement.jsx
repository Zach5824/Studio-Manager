import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-500">Admin Control Panel</h2>
      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-950 text-stone-400 text-xs uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800 text-sm">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-4 font-mono text-stone-500">{u.id}</td>
                <td className="p-4 font-medium text-stone-200">{u.username}</td>
                <td className="p-4 text-stone-400">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${u.role === 'admin' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-stone-800 text-stone-300'}`}>
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}