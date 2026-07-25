import React, { useEffect, useState } from "react";
import c_service from "../appwrite/currencyServices";
import { Loader2, Edit, Trash, Search, X } from "lucide-react";
import InputField from "./Shared/InputField"
import SelectOptions from "./Shared/SelectList";
import { useForm, Controller } from "react-hook-form";
import SuccessBadge from "./Shared/Toast"
import { Icon } from "@iconify/react";

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Inside CurrencyList component
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      Name: "",
      Symbol: "",
      Code: "",
      Rate: "",
      isActive: true,
    }
  });

  // Fetch currencies
  const fetchCurrencies = async () => {
    try {
      const response = await c_service.ListCurrencies();
      setCurrencies(response || []);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this currency?")) return;
    try {
      await c_service.DeleteCurrency({ CurrencyId: id });
      setCurrencies((prev) => prev.filter((c) => c.$id !== id));
      setToastMessage({ type: "deleted", text: "Currency Deleted!" });
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting currency:", error);
      setToastMessage({ type: "error", text: error.message });
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // When clicking Edit, prefill the form
  const handleEdit = (currency) => {
    setEditingCurrency(currency.$id);
    reset({
      Name: currency.Name,
      Symbol: currency.Symbol,
      Code: currency.Code,
      Rate: currency.Rate,
      isActive: currency.isActive,
    });
  };

  // Handle Save using react-hook-form
  const onSubmit = async (data) => {
    try {
      await c_service.UpdateCurrency({
        CurrencyId: editingCurrency,  // documentId
        ...data,                      // flatten Code, Name, Symbol, Rate, isActive
      });
      setToastMessage({ type: "success", text: "Currency Updated!" });
      setTimeout(() => setToastMessage(null), 3000); // auto close after 3s
      setEditingCurrency(null);
      fetchCurrencies();
    } catch (error) {
      setToastMessage({ type: "error", text: error.message });
      setTimeout(() => setToastMessage(null), 3000); // auto close after 3s
      console.error("Error updating currency:", error);
    }
  };

  // Filter logic
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.Name.toLowerCase().includes(search.toLowerCase()) ||
      currency.Symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Loader2 className="animate-spin w-12 h-12 text-blue-400" />
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse"></div>
            </div>
            <span className="text-white/90 text-lg font-medium">Loading currencies...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient text */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Currency Management
          </h2>
          <p className="text-white/70 text-lg">Manage your currency rates and settings</p>
        </div>

        {/* Search Bar with glassmorphism */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm"></div>
            <div className="relative flex items-center bg-white/10 backdrop-blur-lg rounded-xl px-4 py-3 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
              <Search className="text-blue-400 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Search currencies..."
                className="bg-transparent outline-none text-white w-full placeholder-white/50 font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/50 hover:text-white transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Table with glassmorphism */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/90 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/90 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/90 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/90 uppercase tracking-wider">Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/90 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/90 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredCurrencies.map((currency, index) => (
                    <tr 
                      key={currency.$id} 
                      className="text-white/90 hover:bg-white/5 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 font-mono text-sm font-semibold text-blue-300">{currency.Code}</td>
                      <td className="px-6 py-4 font-medium">{currency.Name}</td>
                      <td className="px-6 py-4 text-2xl font-bold text-white">
                          <Icon icon={currency.Symbol} width={28} height={28} />
                      </td>
                      <td className="px-6 py-4 font-mono text-green-400 font-semibold">{currency.Rate}</td>
                      <td className="px-6 py-4">
                        {currency.isActive ? (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg">
                            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300 transform hover:scale-110"
                            onClick={() => handleEdit(currency)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 transform hover:scale-110"
                            onClick={() => handleDelete(currency.$id)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enhanced Edit Form Modal */}
        {editingCurrency && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 animate-fadeIn">
            <div className="relative max-w-2xl w-full mx-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm mt-16"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 animate-slideUp mt-16">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Edit Currency
                  </h3>
                  <button
                    onClick={() => setEditingCurrency(null)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <InputField
                        label="Currency Code"
                        type="text"
                        placeholder="Code"
                        {...register("Code")}
                      />

                      <InputField
                        label="Currency Name"
                        type="text"
                        placeholder="Name"
                        {...register("Name")}
                      />
                    </div>

                    <div className="space-y-4">
                      <InputField
                        label="Currency Symbol"
                        type="text"
                        placeholder="Symbol"
                        {...register("Symbol")}
                        disabled
                      />

                      <InputField
                        label="Currency Rate"
                        type="number"
                        placeholder="Rate"              
                        {...register("Rate")}
                      />
                    </div>
                  </div>

                  <div className="w-full text-white">
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => (
                        <SelectOptions
                          {...field} // spreads value, onChange, onBlur
                          label="Status"
                          options={[
                            { label: "Active", value: true },
                            { label: "Inactive", value: false },
                          ]}
                          isBoolean
                        />
                      )}
                    />
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingCurrency(null)}
                      type="button"
                      className="px-6 py-3 bg-white/10 text-white/90 rounded-xl font-semibold hover:bg-white/20 border border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {toastMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <SuccessBadge
              message={toastMessage.text}
              type={toastMessage.type}
            />
          </div>
        )}

        {/* Enhanced Empty State */}
        {filteredCurrencies.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white/60" />
                </div>
                <p className="text-white/70 text-lg font-medium">No currencies found</p>
                <p className="text-white/50 text-sm mt-2">Try adjusting your search criteria</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        /* Custom scrollbar for table */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default CurrencyList;