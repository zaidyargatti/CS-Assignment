import React from 'react';
import { FaUser } from 'react-icons/fa';

export default function AgentCard({ agent }) {
  return (
    <div className="flex items-center gap-4 border p-3 rounded-md shadow-sm">
      <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg">
        {agent.name?.charAt(0)?.toUpperCase() || <FaUser />}
      </div>
      <div>
        <h3 className="font-medium text-sm">{agent.name}</h3>
        <p className="text-xs text-gray-500">{agent.email}</p>
        <p className="text-xs text-gray-400">{agent.mobile}</p>
      </div>
    </div>
  );
}
