import React from "react";
import { Wallet, Settings, Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useState, useEffect } from "react";
import authService from "../../appwrite/auth";
import { useNavigate } from 'react-router-dom';

function WalletHeader() {
 const navItems = [
  { id: 'wallet', icon: Wallet, label: 'Wallet', path: '/dashboard' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
];

  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet');
  const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchUser() {
        try {
          const currentUser = await authService.AuthgetCurrentUser();
          setUser(currentUser);
        } catch (err) {
          console.log("User not logged in", err);
        }
      }
      fetchUser();
    }, []);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CryptoWallet</h1>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar / Header */}
      <aside className={`
        fixed lg:relative top-16 lg:top-0 left-0
        w-80 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col 
        lg:rounded-3xl rounded-r-3xl lg:rounded-l-none
        transform transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="hidden lg:block p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CryptoWallet</h1>
              <p className="text-sm text-white/60">Digital Assets</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 lg:px-6 space-y-3 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id); // optional if you still want active style
                  navigate(item.path);   // navigate to route
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-white/20 shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-300' : 'group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>}
              </button>
            );
          })}
          <LogoutButton/>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-white">{user?.name}</p>
              {/* <p className="text-xs text-white/60">Premium User</p> */}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default WalletHeader;