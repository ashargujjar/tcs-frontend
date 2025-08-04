import React from "react";

import { Navigate } from "react-router-dom";
import cookie from "js-cookie";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = cookie.get("token");
  const role = cookie.get("role");

  if (!token) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
