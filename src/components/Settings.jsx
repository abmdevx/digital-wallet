// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import Button from "./Shared/Button";
import { ArrowLeft } from "lucide-react";

function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await authService.AuthgetCurrentUser();
        console.log("Fetched user:", currentUser);
        setUser(currentUser);
      } catch (err) {
        console.error("User not logged in", err);
        setError("User not logged in");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Loading user info...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error || "No user found"}</p>
      </div>
    );
  }

  return (
    <>
    <div>
        
    </div>
    <div className="p-6 max-w-md mx-auto mt-16 bg-white/10 backdrop-blur-xl rounded-2xl text-white shadow-lg">
        
      <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-3xl font-bold text-white mb-3">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h2 className="text-xl font-semibold">{user.name || "N/A"}</h2>
        <p className="text-sm text-white/60">{user.email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">User ID:</span>
          <span>{user.$id}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Account Created:</span>
          <span>{new Date(user.$createdAt).toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Account Accessed At:</span>
          <span>{new Date(user.accessedAt).toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Password Updated:</span>
          <span>{new Date(user.passwordUpdate).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center">
        <Button 
        onClick={() => navigate('/dashboard')}
        icon={ArrowLeft}
        iconPosition="left"
        >Go Back to Dashboard</Button>
      </div>
      
    </div>
    </>
  );
}

export default Settings;