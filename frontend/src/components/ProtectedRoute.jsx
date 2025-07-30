// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  console.log('Token in ProtectedRoute:', token); 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
