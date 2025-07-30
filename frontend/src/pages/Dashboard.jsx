import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UploadAndDistribute from './UploadAndDistribute';
import Agents from './Agents';
import TaskPage from './TaskPage';

export default function Dashboard() {
  const [activePage, setActivePage] = useState('agents'); // Default to 'agents'

  useEffect(() => {
    setActivePage('agents'); // Ensure it resets on reload
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-x-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 p-6">
        {activePage === 'upload' && <UploadAndDistribute />}
        {activePage === 'agents' && <Agents />}
        {activePage === 'tasks' && <TaskPage />}
      </div>
    </div>
  );
}
