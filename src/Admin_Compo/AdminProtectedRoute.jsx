import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { admin } = useAdminAuth();

  if (!admin) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
