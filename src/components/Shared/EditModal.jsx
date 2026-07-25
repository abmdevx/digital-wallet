import React, { useState, useEffect } from "react";

export default function EditWalletModal({ wallet, onClose, onUpdate }) {
  const [editingWallet, setEditingWallet] = useState(null);

  useEffect(() => {
    setEditingWallet({ ...wallet });
  }, [wallet]);

  if (!editingWallet) return null;

  return (
    <div className="min-h-screen fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 mb-20">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Wallet Number</label>
            <input
              type="text"
              value={wallet.WalletNumber || ""}
              disabled
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-500 placeholder-white/50 focus:border-purple-400 focus:outline-none"
              placeholder="Enter wallet name"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Wallet Name</label>
            <input
              type="text"
              value={editingWallet.WalletName || ""}
              onChange={(e) =>
                setEditingWallet({ ...editingWallet, WalletName: e.target.value })
              }
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
              placeholder="Enter wallet name"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Balance</label>
            <input
                type="number"
                value={editingWallet.Balance || ""}
                min={0} // prevents negative numbers
                onChange={(e) => {
                const value = e.target.value;

                if (value === "") {
                  // allow clearing input
                  setEditingWallet({ ...editingWallet, Balance: "" });
                } else {
                  const num = parseFloat(value);
                  if (!isNaN(num) && num >= 0) {
                    setEditingWallet({ ...editingWallet, Balance: num });
                  }
                }
              }}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
              placeholder="Enter wallet balance"
              step="0.00000001"
            />
            </div>

        </div>
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
          onClick={() => {
              onUpdate(editingWallet);  // update wallet
              onClose();                // close modal
            }}
            disabled={!editingWallet.WalletName?.trim()}
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
