import React from "react";
import { Copy, Wallet } from "lucide-react";
import { useParams } from "react-router-dom";
import w_service from "../appwrite/walletServices";
import { useState , useEffect } from "react";

function WalletOverview({wallet , showBalance, setSelectedWallet}) {

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const formatAddress = (address) => {
  if (!address) return "••••••••";
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

 const formatBalance = (amount) => {
  if (amount == null) return "••••••••";
  return showBalance ? amount.toFixed(8) : "••••••••";
};

 const formatUSD = (amount) => {
  if (amount == null) return "$••••••"; // handles undefined or null
  return showBalance ? `$${amount.toLocaleString()}` : "$••••••";
};

  if (!wallet) {
    return (
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
        <p className="text-white text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer hover:scale-102"
      onClick={() => setSelectedWallet(wallet)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{wallet?.WalletName}</h3>
            <p className="text-white/60 text-sm">{formatAddress(wallet?.$id)}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(wallet.WalletName);
          }}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4 text-white/60" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-white/70 text-sm">Wallet Currency</span>
          <span className="text-xl font-bold text-white">{(wallet?.CurrencyId)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/70 text-sm">Wallet Balance</span>
          <span className="text-xl font-bold text-white">{(wallet?.Balance)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-white/50 text-xs">
        <span>Created: {new Date(wallet?.CreatedAt).toLocaleDateString()}</span>
        <span className="flex items-center space-x-1">
          <div className={`w-2 h-2 ${wallet?.Status === "Active" ? "bg-green-400" : "bg-red-400"} rounded-full`}></div>
          <span className="capitalize">{wallet?.Status}</span>
        </span>
      </div>
    </div>
  );
}

export default WalletOverview;