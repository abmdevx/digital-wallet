import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { login, logout } from "./store/AuthSlice";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DarkParticlesDemo from "./components/AnimatedBackground";
import LoadingScreen from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await authService.AuthgetCurrentUser();
        if (currentUser) {
          dispatch(login({ userData: currentUser }));
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [dispatch]);

  if (loading) return <LoadingScreen />;

  // Hide header on dashboard + wallet detail pages
  const isWalletPage =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/create-wallet") || 
    location.pathname.includes("/settings");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <DarkParticlesDemo backgroundOnly />
      </div>

      {/* Header */}
      {!isWalletPage && <Header />}

      {/* Main content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;