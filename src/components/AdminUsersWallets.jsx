import React, { useEffect, useState } from "react";
import { Trash2, X, Wallet, CreditCard, DollarSign, Activity, PencilIcon } from "lucide-react";
import w_service from "../appwrite/walletServices";

const AdminUserWallets = ({ user, close }) => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const res = await w_service.ListUserWallets({ UserId: user.$id });
      setWallets(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusWallet = async (walletId) => {
      try {
        // get wallet details
        const wallet = wallets.find(w => w.$id === walletId);
        if (!wallet) return;

        const currentStatus = wallet.Status?.toLowerCase();

        // toggle logic
        let newStatus = "Active";
        if (currentStatus === "active") {
          newStatus = "Suspended";
        } else if (currentStatus === "suspended") {
          newStatus = "Active";
        }

        // confirm popup
        if (window.confirm(`Do you want to set this wallet to "${newStatus}"?`)) {
          await w_service.UpdateWallet({
            WalletId: walletId,
            Status: newStatus, // ✅ always wrap in data
          });

          fetchWallets(); // refresh list
        }
      } catch (err) {
        console.error("Error updating status:", err);
      }
    };

  const handleDeleteWallet = async (walletId) => {
    if (window.confirm("Delete this wallet?")) {
      try {
        await w_service.DeleteWallet({ WalletId: walletId });
        fetchWallets(); // refresh
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                User Wallets
              </h3>
              <p className="text-blue-100 text-sm">
                {user.name || user.email}
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 group"
          >
            <X className="h-5 w-5 text-white group-hover:text-gray-200" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {wallets.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Wallet className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No wallets found</p>
            <p className="text-gray-400 text-sm mt-1">This user hasn't created any wallets yet</p>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">Total Wallets</span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-1">{wallets.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Total Balance</span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  ${wallets.reduce((sum, wallet) => sum + (parseFloat(wallet.Balance) || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-600 font-medium">Active Wallets</span>
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-1">
                  {wallets.filter(w => w.Status?.toLowerCase() === 'active').length}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Wallet Name</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Wallet Number</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Balance</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Currency</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wallets.map((wallet, index) => (
                      <tr key={wallet.$id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Wallet className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">{wallet.WalletName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-full">
                            {wallet.WalletNumber}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-lg font-semibold text-green-600">
                            ${parseFloat(wallet.Balance || 0).toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-lg font-semibold text-green-600">
                            {(wallet.CurrencyId || "")}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(wallet.Status)}`}>
                            {wallet.Status || 'Unknown'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleDeleteWallet(wallet.$id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
                              title="Delete wallet"
                            >
                              <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            </button>
                            <button
                              onClick={() => handleStatusWallet(wallet.$id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                              title="Update status"
                            >
                              <PencilIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            </button>
                            {/* Future: Add Edit / View Details buttons here */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserWallets;