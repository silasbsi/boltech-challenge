import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
   useEffect(() => {
      const checkLocalStorage = () => {
         const isAuthenticated = localStorage.getItem("app-token");

         if (!isAuthenticated) {
            return <Navigate to="/" replace />;
         } else {
            return <Navigate to="/dashboard" replace />;
         }
      };

      checkLocalStorage();

      const handleStorageChange = (event) => {
         if (event.key === "app-token") {
            checkLocalStorage();
         }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
         window.removeEventListener("storage", handleStorageChange);
      };
   }, []);

   return <Outlet />;
};

export default PrivateRoute;
