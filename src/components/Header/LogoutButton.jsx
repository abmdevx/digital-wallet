import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/AuthSlice';
import { clearWallets } from '../../store/WalletSlice';   // 👈 import clearWallets
import { useNavigate } from "react-router-dom";
import authService from '../../appwrite/auth';
import { LogOutIcon } from 'lucide-react';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.AuthLogout();
      dispatch(logout());
      dispatch(clearWallets());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full group flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-lg transition-all duration-200"
    >
      <LogOutIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
      <span>Logout</span>
    </button>
  );
}

export default LogoutButton;