import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../appwrite/auth"; // your Appwrite service

const PrivateRoute = ({ adminOnly = false , children}) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ✅ Check current user
        const user = await authService.AuthgetCurrentUser();

        if (user) {
          // If adminOnly route → check labels
          if (adminOnly) {
            if (user.labels?.includes("admin")) {
              setIsAuthorized(true);
            } else {
              setIsAuthorized(false);
            }
          } else {
            setIsAuthorized(true);
          }
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthorized(false);
      } 
      finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    checkAuth();
  }, [adminOnly]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-black">
        Checking authentication...
      </div>
    );
  }

  // ✅ If not authorized → go back
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  // return <Outlet />;
  return children ? children : <Outlet />;

};

export default PrivateRoute;