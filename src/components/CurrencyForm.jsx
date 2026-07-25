import React, { useState , useEffect } from "react";
import { Icon } from '@iconify/react';
import Button from './Shared/Button';
import { useForm } from 'react-hook-form'
import InputField from "./Shared/InputField"
import c_service from "../appwrite/currencyServices"
import SuccessBadge from "./Shared/Toast"

import { 
  DollarSign, 
  CheckCircle, 
  Code, 
  Type, 
  Hash, 
  TrendingUp, 
  Power,
  Plus,
  Sparkles,
  BitcoinIcon
} from "lucide-react";

const iconNames = [
  "cryptocurrency:1inch",
  "cryptocurrency:agrs",
  "cryptocurrency:chz",
  "cryptocurrency:xp",
  "cryptocurrency:req",
  "cryptocurrency:xmo",
  "cryptocurrency:rvn",
  "cryptocurrency:sumo",
  "cryptocurrency:stox",
  "cryptocurrency:iq",
  "cryptocurrency:fjc",
  "cryptocurrency:ksm",
  "cryptocurrency:etn",
  "cryptocurrency:hight",
  "cryptocurrency:ht",
  "cryptocurrency:coqui",
  "cryptocurrency:bsv",
  "cryptocurrency:dbc",
  "cryptocurrency:btch",
  "cryptocurrency:mona",
  "cryptocurrency:tnb",
  "cryptocurrency:xtz",
  "cryptocurrency:steem",
  "cryptocurrency:qiwi",
  "cryptocurrency:safemoon",
  "cryptocurrency:grin",
  "cryptocurrency:dcr",
  "cryptocurrency:elix",
  "cryptocurrency:bco",
  "cryptocurrency:ape",
  "cryptocurrency:exp",
  "cryptocurrency:ndz",
  "cryptocurrency:one",
  "cryptocurrency:maid",
  "cryptocurrency:nuls",
  "cryptocurrency:dash",
  "cryptocurrency:nano",
  "cryptocurrency:lun",
  "cryptocurrency:med",
  "cryptocurrency:max",
  "cryptocurrency:mith",
  "cryptocurrency:mnz",
  "cryptocurrency:mod",
  "cryptocurrency:slr",
  "cryptocurrency:smart",
  "cryptocurrency:spank",
  "cryptocurrency:sphtx",
  "cryptocurrency:stak",
  "cryptocurrency:storj",
  "cryptocurrency:storm",
  "cryptocurrency:strat",
  "cryptocurrency:uni",
  "cryptocurrency:zest",
];

// Mock currency service

const CurrencyForm = ({currency}) => {
  // --- NO CHANGES TO YOUR LOGIC ---
   const { register, handleSubmit, setValue , watch , reset } = useForm({
    defaultValues: {
      Code: currency?.Code || "",
      Name: currency?.Name || "",
      Symbol: currency?.Symbol || "",
      Rate: currency?.Rate || "",
      isActive: currency?.isActive || true,
    },
  })

  const [usedSymbols, setUsedSymbols] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [btcPrice, setBtcPrice] = useState(null); // store live BTC price
  const rate = watch("Rate"); // watch Rate input

  useEffect(() => {
      const fetchCurrencies = async () => {
        try {
          const currencies = await c_service.ListCurrencies();
          setUsedSymbols(currencies.map((c) => c.Symbol));
        } catch (err) {
          console.error("Failed to load currencies", err);
        }
      };
      fetchCurrencies();
    }, []);

   useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const data = await res.json();
        setBtcPrice(data.bitcoin.usd); // store BTC price in USD
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    fetchBTCPrice();
    const interval = setInterval(fetchBTCPrice, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const btcEquivalent =
    btcPrice && rate ? (parseFloat(rate) / btcPrice).toFixed(6) : 0;

  const availableIcons = iconNames.filter((icon) => !usedSymbols.includes(icon));

  useEffect(() => {
  if (currency) {
    setValue("CurrencyId", currency.$id);
    setValue("Name", currency.Name);
    setValue("Symbol", currency.Symbol);
    setValue("Rate", currency.Rate);
    setValue("isActive", currency.isActive);
  }
}, [currency, setValue]);

    const onSubmit = async (data) => {
    try {
      let res;
      if (currency) {
        // Update existing currency
        res = await c_service.UpdateCurrency({
          CurrencyId: currency.$id,
          ...data,
        });
      } else {
        // Create new currency
        res = await c_service.CreateCurrency(data);

        setUsedSymbols((prev) => [...prev, data.Symbol]);
        reset();

        setToastMessage({ type: "success", text: "Currency Created!" });
        setTimeout(() => setToastMessage(null), 3000); // auto close after 3s
      }

    } catch (error) {
        console.error("Error saving currency:", error);
        setToastMessage({ type: "error", text: error.message });
        setTimeout(() => setToastMessage(null), 3000); // auto close after 3s
    }
  };

  const selectedSymbol = watch("Symbol");
  const isActive = watch("isActive");

  // --- END OF LOGIC SECTION ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="relative w-full">
        {/* Main form container with glassmorphism effect */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 text-center border-b border-gray-700/50">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <DollarSign className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2 text-blue-400" />
              Create Currency
            </h2>
            <p className="text-gray-400">
              Add a new currency to your digital wallet system
            </p>
          </div>

          {/* Form content */}
          <div className="p-8">

      <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="space-y-6">

              <InputField
                label="Code"
                type="text"
                name="Code"
                placeholder="e.g., USD, EUR, BTC"
                icon={Code}
                {...register("Code", { required: true })}
              />
              
              <InputField
                label="Name"
                type="text"
                name="Name"
                placeholder="e.g., United States Dollar"
                icon={Type}
                {...register("Name", { required: true })}
              />
              
              <InputField
                label="Symbol"
                type="text"
                name="Symbol"
                placeholder="e.g., $, €, ₿"
                icon={Hash}
                {...register("Symbol", { required: true })}
                disabled
              />

              {selectedSymbol && (
              <div className="flex items-center gap-2 mb-6 text-white">
                <Icon icon={selectedSymbol} width={28} height={28} />
                <span className="text-sm">Selected : {selectedSymbol}</span>
              </div>
              )}

              {/* Grid of selectable icons */}
              <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-4 max-h-64 overflow-y-auto text-white">
                {availableIcons.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    className={`p-2 rounded-lg border transition-colors ${
                    selectedSymbol === iconName 
                      ? 'border-blue-500 bg-blue-500/30' 
                      : 'hover:border-blue-500 hover:bg-blue-500/20'
                  }`}
                    onClick={() => setValue("Symbol", iconName)} // ✅ updates form
                  >
                    <Icon icon={iconName} width={34} height={34}/>
                  </button>
                ))}
              </div>

              <button
              type="button"
              className="mb-4 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              onClick={() => setValue("Symbol", "")}
              >
                Clear Selection
              </button>
              
              <InputField
                label="Rate"
                type="number"
                name="Rate"
                placeholder="e.g., 1.00"
                icon={TrendingUp}
                {...register("Rate", { required: true })}
              />

              <InputField
              label="Equivalent in BTC"
              type="text"
              name="btcEquivalent"
              value={`${btcEquivalent} BTC`}
              icon={BitcoinIcon}
              disabled
              />

              {/* Enhanced checkbox with better styling */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center">
                  <Power className="w-4 h-4 mr-2 text-blue-400" />
                  Status
                </label>
                <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-md border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                        isActive
                          ? 'bg-blue-500 border-blue-500'
                          : 'bg-gray-700 border-gray-600'
                      }`}
                    onClick={() => setValue("isActive", !isActive)} // ✅ updates form
                    >
                      {isActive  && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="isActive"
                      className="text-gray-300 font-medium cursor-pointer flex items-center"
                    >
                      <Power className="w-4 h-4 mr-2 text-green-400" />
                      Active Currency
                    </label>
                    <p className="text-gray-500 text-sm">
                      Enable this currency for transactions
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced submit button */}
              <Button icon={Plus} iconPosition="left" type="submit">Create Currency</Button>
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
      </div>
    </div>
  );
};

export default CurrencyForm;