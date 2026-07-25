import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Menu, 
  X, 
  Home, 
  LogIn, 
  UserPlus, 
  Grid3X3, 
  Info, 
  ChevronDown,
  WalletIcon,
} from "lucide-react";

function Header() {
  // Simulated auth status - you can toggle this to see different states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status); 

  const navItems = [
    { name: "Home", url: "/", active: true, icon: Home },
    { name: "Login", url: "/login", active: !authStatus, icon: LogIn },
    { name: "SignUp", url: "/signup", active: !authStatus, icon: UserPlus },
    { name: "Features", url: "/features", active: authStatus, icon: Grid3X3 },
    { name: "About", url: "/about", active: authStatus, icon: Info },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const navigate = useNavigate();

  return (
    <div className="bg-transparent">
      {/* Header Component */}
      <header className="sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <WalletIcon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur opacity-25"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Wallet
              </span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-1">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.url)}
                        className="group flex items-center space-x-2 text-gray-700 dark:text-gray-200 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 relative overflow-hidden"
                      >
                        <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span>{item.name}</span>
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="ml-4">
                  <div className="pl-4 border-l border-gray-200 dark:border-gray-700">
                    <LogoutButton />
                  </div>
                </li>
              )}
            </ul>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="relative inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Menu 
                  className={`${isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"} h-6 w-6 transition-all duration-200 absolute`}
                />
                <X 
                  className={`${isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"} h-6 w-6 transition-all duration-200 absolute`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-out ${
              isMobileMenuOpen 
                ? "max-h-96 opacity-100 pb-4 translate-y-0" 
                : "max-h-0 opacity-0 -translate-y-2"
            } overflow-hidden`}
          >
            <div className="mt-3 px-2 space-y-1 bg-transparent rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              {navItems.map(
                (item, index) =>
                  item.active && (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.url);
                        closeMobileMenu();
                      }}
                      className={`group flex items-center space-x-3 w-full text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                        index === 0 ? 'mt-2' : ''
                      } ${
                        index === navItems.filter(item => item.active).length - 1 ? 'mb-2' : ''
                      }`}
                    >
                      <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span className="flex-1">{item.name}</span>
                      <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -rotate-90" />
                    </button>
                  )
              )}
              {authStatus && (
                <div className="px-2 py-2 border-t border-gray-200/50 dark:border-gray-700/50 mt-2">
                  <LogoutButton />
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;

