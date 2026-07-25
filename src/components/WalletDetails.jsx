import React, { useState , useEffect } from "react";
import { Eye, EyeOff, Copy, Send, ArrowUpRight, ArrowDownLeft, PencilIcon, Trash2Icon, Link , Edit3 , Trash2 } from "lucide-react";
import EditWalletModal from "./Shared/EditModal"
import DeleteWalletModal from "./Shared/DeleteModal"
import SendMoneyUI from "./Transaction";

function WalletDetailView({ wallet, setSelectedWallet , updateWallet, deleteWallet}) {
  const [showBalance, setShowBalance] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  const formatBalance = (amount) => {
  const value = Number(amount) || 0;
  return showBalance ? value.toFixed(2) : "••••••••";
};


  const formatUSD = (amount) => {
    return showBalance ? `$${amount.toLocaleString()}` : '$••••••';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl lg:mt-0 mt-20">
        <div className="flex items-center justify-between mb-4">
            <button
            onClick={() => setSelectedWallet(null)}
            className="text-white/60 hover:text-white transition-colors"
          >
            ← Back to Wallets
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
              title="Edit Wallet"
            >
              <Edit3 className="w-4 h-4 text-white/60 group-hover:text-blue-400" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
              title="Delete Wallet"
            >
              <Trash2 className="w-4 h-4 text-white/60 group-hover:text-red-400" />
            </button>

            {showEditModal && (
              <EditWalletModal
                wallet={wallet}
                onClose={() => setShowEditModal(false)}
                onUpdate={updateWallet} // call Appwrite service
              />
            )}

            {showDeleteModal && (
              <DeleteWalletModal
                wallet={wallet}
                onClose={() => setShowDeleteModal(false)}
                onDelete={deleteWallet} // call Appwrite service
              />
            )}
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {showBalance ? <Eye className="w-4 h-4 text-white/60" /> : <EyeOff className="w-4 h-4 text-white/60" />}
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{wallet?.WalletName}</h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <p className="text-white/70">{wallet?.WalletNumber}</p>
            <button
              onClick={() => copyToClipboard(wallet?.WalletNumber)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Copy className="w-4 h-4 text-white/60" />
            </button>
          </div>
          <div className="flex items-center justify-center text-4xl font-bold text-white mb-2 gap-3">
            <p>{formatBalance(wallet?.Balance)}</p>
            <p>{wallet?.CurrencyId}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white hover:shadow-lg transition-all">
            <ArrowDownLeft className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Receive</span>
          </button>
          <button
            onClick={() => setShowSendModal(true)}
            className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white hover:shadow-lg transition-all"
          >
            <Send className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Send</span>
          </button>

          {showSendModal && (
            <SendMoneyUI open={showSendModal} setOpen={setShowSendModal} />
          )}
        </div>

      {/* Recent Transactions */}
<div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl mt-7">
  <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
  {wallet?.transactions && wallet.transactions.length > 0 ? (
    <div className="space-y-3">
      {wallet.transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                tx.type === "receive" ? "bg-green-500/20" : "bg-red-500/20"
              }`}
            >
              {tx.type === "receive" ? (
                <ArrowDownLeft className="w-5 h-5 text-green-400" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div>
              <p className="text-white font-medium capitalize">{tx.type}</p>
              <p className="text-white/50 text-sm">{tx.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-semibold ${
                tx.type === "receive" ? "text-green-400" : "text-red-400"
              }`}
            >
              {tx.type === "receive" ? "+" : "-"}
              {tx.amount} {tx.currency}
            </p>
            <p className="text-white/50 text-sm">{tx.status}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-white/50 text-center py-4">No transactions yet</p>
  )}
</div>

{/* Wallet Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-7">
  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20">
    <h3 className="text-white/70 text-sm mb-2">Network</h3>
    <p className="text-white font-semibold capitalize">{wallet?.network}</p>
  </div>
  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20">
    <h3 className="text-white/70 text-sm mb-2">Transactions</h3>
    <p className="text-white font-semibold">
      {wallet?.transactions && wallet.transactions.length > 0
        ? wallet.transactions.length
        : "No transactions yet"}
    </p>
  </div>
  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20">
    <h3 className="text-white/70 text-sm mb-2">Created</h3>
    <p className="text-white font-semibold">
      {wallet?.CreatedAt ? new Date(wallet.CreatedAt).toLocaleDateString() : "-"}
    </p>
  </div>
</div>




        
      </div>
    </div>
  );
}

export default WalletDetailView;