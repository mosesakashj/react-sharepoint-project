import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'


const ProtectedRoute = ({ children }) => {
  const { userDetails } = useSelector((state) => state.userDetailsSlice)
  // if (!userDetails && Cookies.get(process.env.REACT_APP_USER)) dispatch(updateUserDetails(JSON.parse(Cookies.get(process.env.REACT_APP_USER))))

  const isAuthenticated = Boolean(userDetails)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;