import React, { useRef } from 'react';
import { FaUsers, FaUpload, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import API from '../services/Axios';

export default function Sidebar({ activePage, setActivePage }) {
  const { admin, logout, token, setAdmin } = useAuth();
  const fileInputRef = useRef(null);

  const getInitial = () => admin?.email?.charAt(0)?.toUpperCase() || '?';

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.put('/user/profile-pic', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setAdmin(res.data.admin);
      console.log("Updated admin:", res.data.admin);

      localStorage.setItem('admin', JSON.stringify(res.data.admin));
    } catch (err) {
      alert('Failed to upload profile picture');
    }
  };

  return (
    <div className="h-[95vh] w-64 bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between mt-4 ml-4">
      <div>
        {/* Profile */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <div
            className="w-14 h-14 rounded-full overflow-hidden cursor-pointer border-2 border-blue-500"
            onClick={handleAvatarClick}
            title="Click to change profile picture"
          >
            {admin?.profilePic ? (
              <img
                src={admin.profilePic}  // or use VITE_BASE_URL
                alt="Profile"
                className="w-full h-full object-cover"
              />

            ) : (
              <div className="bg-blue-600 text-white w-full h-full flex items-center justify-center text-xl font-bold">
                {getInitial()}
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="text-center">
            <h2 className="text-sm font-semibold break-words">{admin?.email}</h2>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-5 px-3">
          <NavItem icon={<FaUsers />} label="Agents" active={activePage === 'agents'} onClick={() => setActivePage('agents')} />
          <NavItem icon={<FaUpload />} label="Upload List" active={activePage === 'upload'} onClick={() => setActivePage('upload')} />
          <NavItem icon={<FaClipboardList />} label="Tasks" active={activePage === 'tasks'} onClick={() => setActivePage('tasks')} />
        </nav>
      </div>

      {/* Logout */}
      <button onClick={logout} className="flex items-center gap-2 text-red-500 text-sm hover:text-red-700 px-3">
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

function NavItem({ icon, label, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 text-sm cursor-pointer transition ${active ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
        }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
