import React, { useState , useEffect } from 'react';
import { User, DollarSign, Wallet, AlertCircle, CheckCircle, Calendar, Shield, CreditCard, ArrowLeft, Home, LogIn, createLucideIcon } from 'lucide-react';
import Button from './Shared/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import w_service from '../appwrite/walletServices'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import InputField from './Shared/InputField';
import SelectOptions from './Shared/SelectList';
import c_service from '../appwrite/currencyServices';
import { Icon } from "@iconify/react";
import { Controller , useWatch } from 'react-hook-form';
import SuccessBadge from "../components/Shared/Toast"

function CreateWalletForm ({wallet}) {
  
  const navigate = useNavigate()
  const [currencies, setCurrencies] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  
  const { register, handleSubmit, setValue, control, getValues , watch } = useForm({
    defaultValues: {
      CurrencyId: wallet?.currencyId || "",
      WalletNumber: wallet?.walletNumber || "",
      WalletName: wallet?.walletName || "",
      Balance: wallet?.balance || 0,
      Status: wallet?.status || "Active",
      CreatedAt: wallet?.createdAt || new Date().toISOString(),
    },
  })
  
  const selectedCurrencyId = useWatch({ control, name: "CurrencyId" });
  const selectedCurrency = currencies.find(c => c.Code === selectedCurrencyId);

  const userData = useSelector((state) => state.auth.userData);
  
  const handleData = async (data) => {
  try {
    // ✅ force attach logged-in user ID
    const payload = {
      UserId: userData?.userData?.$id, // 💥 corrected nesting
      ...data,
      Balance: parseFloat(data.Balance) || 0, // ensure float
    };

    let dbWallet;

    if (wallet) {
      dbWallet = await w_service.UpdateWallet({
        walletId: wallet.$id,
        ...payload,
      });
      if (dbWallet) {
        navigate(`/wallet/${dbWallet.$id}`);
      }
    } else {
      dbWallet = await w_service.CreateWallet(payload);
      if (dbWallet) {
        navigate(`/dashboard`);
        setToastMessage({ type: "success", text: "Wallet Created!" });
        setTimeout(() => setToastMessage(null), 3000);
      }
    }
  } catch (error) {
    console.error("Error handling wallet:", error);
    let errorMsg = "Something went wrong";
    if (error.message.includes("Document with the requested ID already exists")) {
    errorMsg = "Same wallet number cannot be used again please try a different one!";
  }
    // show toast error safely
    setToastMessage({ type: "error", text: errorMsg });
    setTimeout(() => setToastMessage(null), 3000);
  }
};

    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
          const docs = await c_service.ListCurrencies({ isActive: true });

          // fetch wallets of current user
          const userWallets = await w_service.ListUserWallets({ UserId: userData?.userData?.$id });

          // get all currency codes already used in wallets
          const usedCurrencyCodes = userWallets.map(w => w.CurrencyId);

          // filter out used currencies
          const availableCurrencies = docs.filter(c => !usedCurrencyCodes.includes(c.Code));

          setCurrencies(availableCurrencies);
        } catch (err) {
          console.error("Failed to fetch currencies:", err);
        }
      };
      fetchCurrencies();
    }, [userData]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden w-full">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-8 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <CreditCard className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Create Wallet</h1>
                  <p className="text-indigo-100 opacity-90">Digital Asset Management</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-indigo-100">
                <Shield className="w-4 h-4" />
                <span>Secure & Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleData)}>
        <div className="p-8 space-y-6">
          {/* User ID Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-slate-300 mb-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-2">
                <User className="w-3 h-3 text-indigo-400" />
              </div>
              Wallet Number <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <InputField
              type="text"
              inputMode="numeric"
              maxLength={8}
              {...register("WalletNumber", { 
                required: true,
                pattern: /^\d{8}$/  // ensure exactly 8 digits
              })}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                setValue("WalletNumber", value, { shouldValidate: true });
              }}
                className="w-full px-4 py-4 bg-slate-700/50 rounded-xl focus:outline-none focus:ring-indigo-500/30 transition-all duration-200 text-white placeholder-slate-400"
              placeholder="Enter your 8-digit Wallet Number"
            />

            </div>
          </div>

          {/* Currency Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-slate-300 mb-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2">
                <DollarSign className="w-3 h-3 text-emerald-400" />
              </div>
              Base Currency <span className="text-red-400 ml-1">*</span>
            </label>

          {/* Currency Select */}
          <Controller
          name="CurrencyId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectOptions
              {...field} // gives value, onChange, name, ref
              options={currencies.map(c => ({
                value: c.Code,
                label: c.Name,
              }))}
              className="mb-3"
              placeholder="-- Select Currency --"
            />
          )}
        />
        {/* Auto-filled symbol (read-only) */}

        {selectedCurrency && (
        <div className="mt-2 flex items-center gap-2 text-slate-300">
          <span className="font-medium text-md">Selected Symbol:</span>
          <Icon icon={selectedCurrency.Symbol} width={24} height={24} />
            </div>
            )}
        </div>

          {/* Wallet Name Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-slate-300 mb-3">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                <Wallet className="w-3 h-3 text-purple-400" />
              </div>
              Wallet Name <span className="text-red-400 ml-1">*</span>
            </label>
            <InputField
              type="text"
              className={`w-full px-4 py-4 bg-slate-700/50 rounded-xl focus:outline-none focus:ring-indigo-500/30 transition-all duration-200 text-white placeholder-slate-400 `}
              placeholder="e.g., Personal Savings, Business Account"
              {...register("WalletName", { required: true , minLength: 3})} // validation rule:
              required
            />
          </div>

          {/* Initial Balance and Status Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Initial Balance Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Initial Balance
              </label>
              <InputField
                type="number"
                min="0"
                step="0.01"
                className={`w-full px-4 py-4 bg-slate-700/50 rounded-xl focus:outline-none focus:ring-indigo-500/30 transition-all duration-200 text-white placeholder-slate-400`}
                placeholder="0.00"
                {...register("Balance")}
              />
            </div>
        </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-3 h-3 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-blue-300 font-medium mb-1">Automatic Timestamp</p>
                <p className="text-xs text-blue-400/80">Creation date and time will be recorded automatically upon wallet generation.</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
            <Button type='submit' icon={CheckCircle}>
            <div className="flex items-center space-x-2">
              <span>Create Digital Wallet</span>
            </div>
           </Button>
           {/* Back Button */}
            <Link to={"/dashboard"}>
           <Button icon={ArrowLeft} iconPosition='left'>
            <div className="flex items-center space-x-2">
              <span>Back to Dashboard</span>
            </div>
           </Button>
            </Link>
        </div>
      </form>

       {toastMessage && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <SuccessBadge
          message={toastMessage.text}
          type={toastMessage.type}
        />
      </div>
        )}

      </div>
    </div>
  );
};

export default CreateWalletForm;