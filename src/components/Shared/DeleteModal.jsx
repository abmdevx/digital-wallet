import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteWalletModal({ wallet, onClose, onDelete }) {
  if (!wallet) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Delete Wallet</h2>
          <p className="text-white/70">
            Are you sure you want to delete "{wallet?.WalletName}"? This cannot be undone.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(wallet.$id)}
            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold transition-all cursor-pointer hover:bg-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}