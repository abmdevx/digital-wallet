import React, { useEffect, useState } from "react";
import { Users, Eye, Trash2, Wallet, Mail, User, Shield } from "lucide-react";
import w_service from "../appwrite/walletServices"; // your AppwriteService
import authService from "../appwrite/auth";
import AdminUserWallets from "./AdminUsersWallets";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await w_service.ListAllUsers(); // returns array of users
      if (!res) return;

      const usersWithWallets = await Promise.all(
        res.map(async (user) => {
          const wallets = await w_service.ListUserWallets({ UserId: user.$id });
          return { ...user, walletCount: wallets?.length || 0 };
        })
      );

      setUsers(usersWithWallets);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Delete all wallets first
        const wallets = await w_service.ListUserWallets({ UserId: userId });
        for (const wallet of wallets || []) {
          await w_service.DeleteWallet({ WalletId: wallet.$id });
        }

        // Delete user from Auth (if needed)
        await authService.deleteAccount(userId);

        // Refresh users
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const totalWallets = users.reduce((sum, user) => sum + (user.walletCount || 0), 0);
  const usersWithWallets = users.filter(user => (user.walletCount || 0) > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
              <p className="text-gray-300">Manage all users and their wallets</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-white mt-1">{users.length}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">Total Wallets</p>
                  <p className="text-3xl font-bold text-white mt-1">{totalWallets}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Wallet className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">Active Users</p>
                  <p className="text-3xl font-bold text-white mt-1">{usersWithWallets}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <User className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/20">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Users</span>
            </h3>
          </div>

          {users.length === 0 ? (
            <div className="p-12 text-center">
              <div className="p-4 bg-white/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-white text-lg font-medium">No users found</p>
              <p className="text-gray-400 text-sm mt-1">Users will appear here once they sign up</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/20 border-b border-white/10">
                    <th className="text-left py-4 px-6 font-semibold text-gray-200">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Name</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-200">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-200">
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-4 w-4" />
                        <span>Wallets Count</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr 
                      key={user.$id} 
                      className={`border-b border-white/5 hover:bg-white/5 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-black/10' : 'bg-transparent'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {(user?.Name || user?.name || user?.Email || user?.email || "U").charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-medium">
                            {user?.Name || user?.name || "-"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-300">{user?.Email || user?.email || "-"}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            (user?.walletCount || 0) > 0 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            {user?.walletCount || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-medium">View Wallets</span>
                          </button>
                          <button
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                            onClick={() => handleDeleteUser(user.$id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedUser && (
          <AdminUserWallets user={selectedUser} close={() => setSelectedUser(null)} />
        )}
      </div>
    </div>
  );
};

export default AdminUserTable;