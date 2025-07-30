import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import UploadAndDistribute from './pages/UploadAndDistribute';
import TaskPage from './pages/TaskPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadAndDistribute /></ProtectedRoute>} />
      <Route path="/task" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
