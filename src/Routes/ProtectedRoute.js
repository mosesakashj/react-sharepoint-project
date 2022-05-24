import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from 'react-redux'


const ProtectedRoute = ({ children }) => {
  const { userDetails } = useSelector((state) => state.userDetailsSlice)
  const isAuthenticated = Boolean(userDetails)
  console.log("this", isAuthenticated, userDetails);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;