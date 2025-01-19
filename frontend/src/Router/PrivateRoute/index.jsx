import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = localStorage.getItem("app-token");

const PrivateRoute = () => {
   if (!isAuthenticated) {
      return <Navigate to="/" replace />;
   }

   return <Outlet />;
};

export default PrivateRoute;
