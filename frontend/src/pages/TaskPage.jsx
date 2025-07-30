import React, { useEffect, useState } from 'react';
import API from '../services/Axios';
import { useAuth } from '../context/AuthContext';

export default function TaskPage() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

 useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await API.get('/task/all-task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle both possible response formats
      const responseData = Array.isArray(res.data) ? res.data : res.data.tasks;

      setTasks(responseData || []);
    } catch (err) {
      setError('Failed to load tasks.');
    }
  };

  fetchTasks();
}, [token]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl">
      <h2 className="text-2xl font-bold mb-6">All Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-auto max-h-[60vh] border rounded-lg">
        <table className="min-w-full table-fixed text-sm border border-gray-200">
          <thead className="bg-white sticky top-0 z-10 text-gray-800 border-b border-gray-500">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">FIRST NAME</th>
              <th className="px-4 py-3 text-left font-semibold">PHONE</th>
              <th className="px-4 py-3 text-left font-semibold">NOTES</th>
              <th className="px-4 py-3 text-left font-semibold">ASSIGNED TO</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="bg-white hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="px-4 py-2">{task.firstName || '-'}</td>
                <td className="px-4 py-2">{task.phone || '-'}</td>
                <td className="px-4 py-2">{task.notes || '-'}</td>
                <td className="px-4 py-2">
                  {task.assignedTo?.name || 'Unassigned'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
