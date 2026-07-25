import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import WalletHeader from "../components/Header/WalletHeader";
import { Link } from "react-router-dom";
import WalletOverview from "../components/WalletCard";
import WalletDetailView from "../components/WalletDetails";
import w_service from "../appwrite/walletServices";
import { useSelector , useDispatch } from "react-redux";
import { clearWallets, fetchWallets } from "../store/WalletSlice";
import SearchBar from "../components/Shared/SearchBar";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("wallet");
  const [showBalance, setShowBalance] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state.auth.userData);

  const { wallets, loading, error } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();

  const handleSearch = () => {
      if (searchQuery.trim()) {
        dispatch(fetchWallets({ WalletNumber: searchQuery }));
      } else if (user?.userData?.$id) {
        dispatch(fetchWallets({ UserId: user.userData.$id }));
      }
  };

   useEffect(() => {
    if (user?.userData?.$id && !searchQuery.trim()) {
      // always pass the correct shape
      console.log("Fetching wallets for User:", user.userData.$id);
      dispatch(fetchWallets({ UserId: user.userData.$id }));
    }
  }, [user?.userData?.$id, dispatch]);

  const filteredWallets = wallets.filter(wallet =>
    wallet.WalletNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-white text-lg">
        Loading wallets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500 text-lg">
        Error loading wallets: {error}
      </div>
    );
  }

const handleUpdateWallet = async (updatedWallet) => {
  try {
    // Call Appwrite service
    await w_service.UpdateWallet({
      WalletId: updatedWallet.$id,           // Appwrite document ID
      WalletName: updatedWallet.WalletName,  // updated name
      Status: updatedWallet.Status,          // updated status
      Balance: updatedWallet.Balance,        // updated balance
      CurrencyId: updatedWallet.CurrencyId   // updated currency
    });

    dispatch(fetchWallets({UserId: user.userData.$id}));
    setSelectedWallet(null); 
  } catch (err) {
    console.error("Failed to update wallet", err);
  }
};


const handleDeleteWallet = async (walletId) => {
  try {
    await w_service.DeleteWallet({ WalletId: walletId });

    dispatch(fetchWallets(user.userData.$id));
    setSelectedWallet(null);
  } catch (err) {
    console.error("Failed to delete wallet", err);
  }
};


  return (
    <div className="min-h-screen relative overflow-hidden flex">
      <WalletHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showBalance={showBalance}
        setShowBalance={setShowBalance}
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 min-h-0">
        {selectedWallet ? (
          // Wallet Details Page
          <WalletDetailView
           wallet={selectedWallet}
           setSelectedWallet={setSelectedWallet}
           updateWallet={handleUpdateWallet}   // pass update function
           deleteWallet={handleDeleteWallet}   // pass delete function
           />
        ) : (

          <div className="max-w-6xl mx-auto">
            {wallets.length === 0 ? (
              /* Empty State */
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md w-full">
                  <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 lg:p-10 border border-white/20 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl mx-auto mb-4 lg:mb-6 flex items-center justify-center shadow-lg">
                      <Plus className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                      Create Your First Wallet
                    </h2>
                    <p className="text-white/70 mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base">
                      Start your journey by creating a secure wallet. Store,
                      send, and receive funds with confidence.
                    </p>
                    <Link to={"/create-wallet"}>
                      <button className="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold text-base lg:text-lg shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 overflow-hidden w-full sm:w-auto">
                        <span className="relative z-10">Create Wallet</span>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* Wallet Grid */
              <div>
                <div className="flex items-center justify-between mb-4 lg:mt-0 mt-18">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      My Wallets
                    </h1>
                    <p className="text-white/70">Manage your wallets</p>
                  </div>

                  <Link to={"/create-wallet"}>
                    <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <Plus className="w-5 h-5" />
                      <span>Create Wallet</span>
                    </button>
                  </Link>
                </div>

                <SearchBar
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onSearch={handleSearch}
                 />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {filteredWallets.length === 0 ? (
                      <p className="text-white text-center">No wallets yet. Create one!</p>
                    ) : (
                      filteredWallets.map((wallet) => (
                        <WalletOverview
                          key={wallet.$id}
                          wallet={wallet} // pass full wallet object
                          showBalance={showBalance}
                          setSelectedWallet={setSelectedWallet}
                        />
                      ))
                    )}
                </div>
              </div>
            )}
          </div>
  

        )}
      </main>
    </div>
  );
}

export default Dashboard