import React, { useState } from "react";
import { X } from "lucide-react";
import InputField from "../components/Shared/InputField";
import Button from "../components/Shared/Button";

export default function SendMoneyUI({ open, setOpen }) {
  const [form, setForm] = useState({
    fromWallet: "",
    toWallet: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    console.log("Send transaction:", form);
    // 🔗 call TransactionService.CreateTransaction here
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex rounded-2xl"
      onClick={() => setOpen(false)}
    >
      {/* Desktop Modal (md and up) */}
      <div className="hidden md:flex w-full items-center justify-center mb-10">
        <div
          className="bg-gray-900 rounded-xl shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">💸 Send Money</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            <InputField
              label="From Wallet"
              name="fromWallet"
              value={form.fromWallet}
              onChange={handleChange}
            />
            <InputField
              label="Recipient Wallet ID"
              name="toWallet"
              value={form.toWallet}
              onChange={handleChange}
            />
            <InputField
              label="Amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
            <InputField
              label="Description (optional)"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Footer */}
          <div className="p-4 flex gap-3">
            <Button
              className="bg-gray-700 hover:bg-gray-600"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (below md) */}
      <div className="flex md:hidden w-full items-center">
        <div
          className="bg-gray-900 rounded-t-xl shadow-xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">💸 Send Money</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            <InputField
              label="From Wallet"
              name="fromWallet"
              value={form.fromWallet}
              onChange={handleChange}
            />
            <InputField
              label="Recipient Wallet ID"
              name="toWallet"
              value={form.toWallet}
              onChange={handleChange}
            />
            <InputField
              label="Amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
            <InputField
              label="Description (optional)"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Footer */}
          <div className="p-4 flex gap-3">
            <Button
              className="bg-gray-700 hover:bg-gray-600"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}