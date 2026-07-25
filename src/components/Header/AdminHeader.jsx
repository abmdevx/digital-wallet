import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Coins, Plus, Eye, ArrowLeft, ChevronDown, Menu, X } from "lucide-react";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCurrencyDropdownOpen, setMobileCurrencyDropdownOpen] = useState(false);

  // Use RELATIVE paths (child paths only, since navigate will be inside /admin-portal)
  const navigationItems = [
    { path: "/dashboard", label: "Back to User Dashboard", icon: ArrowLeft, type: "back" },
    { path: "/admin-portal", label: "Admin Dashboard", icon: Shield, type: "main" },
    { 
      label: "Currencies", 
      icon: Coins, 
      type: "dropdown",
      children: [
        { path: "create-currency", label: "Create Currency", icon: Plus },
        { path: "view-currencies", label: "View Currencies", icon: Eye }
      ]
    }
  ];

  const handleNavigation = (path) => {
    // If relative path (child), use relative navigation
    if (!path.startsWith("/")) {
      navigate(path, { relative: "path" }); // navigates relative to current parent (/admin-portal)
    } else {
      navigate(path);
    }
    setCurrencyDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileCurrencyDropdownOpen(false);
  };

  const isActive = (path) => {
    const fullPath = path.startsWith("/") ? path : `/admin-portal/${path}`;
    return location.pathname === fullPath;
  };
  const isCurrencyActive = () => ["/admin-portal/create-currency", "/admin-portal/view-currencies"].includes(location.pathname);

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white sticky top-0 z-50 border-b border-slate-700 shadow-lg">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg"><Shield className="h-5 w-5" /></div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

          {/* Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, idx) => {
              if (item.type === "dropdown") {
                return (
                  <div key={idx} className="relative">
                    <button 
                      onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isCurrencyActive() ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${currencyDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {currencyDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-600 py-2">
                        {item.children.map((child, cIdx) => (
                          <button 
                            key={cIdx} 
                            onClick={() => handleNavigation(child.path)}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-slate-700 transition-colors ${isActive(child.path) ? "bg-slate-700 text-blue-400" : ""}`}
                          >
                            <child.icon className="h-4 w-4" />
                            <span>{child.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <button 
                    key={idx} 
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive(item.path) ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              }
            })}
          </nav>

          {/* Mobile */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <div className="space-y-2">
              {navigationItems.map((item, idx) => {
                if (item.type === "dropdown") {
                  return (
                    <div key={idx}>
                      <button
                        onClick={() => setMobileCurrencyDropdownOpen(!mobileCurrencyDropdownOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${isCurrencyActive() ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileCurrencyDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {mobileCurrencyDropdownOpen && (
                        <div className="mt-2 ml-4 space-y-1">
                          {item.children.map((child, cIdx) => (
                            <button key={cIdx} onClick={() => handleNavigation(child.path)} className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left hover:bg-slate-700 transition-colors">
                              <child.icon className="h-4 w-4" />
                              <span>{child.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <button key={idx} onClick={() => handleNavigation(item.path)} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-all">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                }
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;