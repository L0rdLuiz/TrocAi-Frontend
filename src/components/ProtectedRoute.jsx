import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  
  if (!token) {
    // Se não tiver token, redireciona para login
    return <Navigate to="/" replace />;
  }
  
  // Se tiver token, renderiza o componente filho
  return children;
};

export default ProtectedRoute;
