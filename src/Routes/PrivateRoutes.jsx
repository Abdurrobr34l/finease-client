import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-ring w-md bg-primary"></span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={"/register"} state={{ from: location }} replace />
  }

  return children;
};

export default PrivateRoutes;