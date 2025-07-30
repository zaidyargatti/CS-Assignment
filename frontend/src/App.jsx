import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import UploadAndDistribute from './pages/UploadAndDistribute';
import TaskPage from './pages/TaskPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<UploadAndDistribute />} />
      <Route path="/task" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
