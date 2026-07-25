import React, { useState } from "react";
import InputField from "./Shared/InputField";
import Button from "./Shared/Button";
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { login } from '../store/AuthSlice'
import { fetchWallets , clearWallets } from "../store/WalletSlice";
import SuccessBadge from "../components/Shared/Toast";
import { performLogin } from "../store/AuthSlice";

import { Link , useNavigate } from 'react-router-dom'

import { 
  Mail, 
  Lock, 
  Github,
  Twitter,
  Wallet2,
  LogInIcon,
  LogIn,
} from "lucide-react";
import { div } from "motion/react-client";

function LoginComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState('');
    const [toastMessage, setToastMessage] = useState(null);
    
    const loginUser = async (data) => {
        setError('');
        setToastMessage(null); // reset old message
        try {
            const userData = await authService.AuthLogin(data);
            if(userData){
                // dispatch(login(userData));
                dispatch(performLogin(userData));
                // dispatch(clearWallets());
                // dispatch(fetchWallets({ UserId: userData.userData.$id }));
                navigate('/dashboard');
                setToastMessage({ type: "success", text: "Success!" });
                setTimeout(() => setToastMessage(null), 1500);
            }
        } catch (error) {
            setError(error.message);
            setToastMessage({ type: "error", text: error.message || "Login failed" });
            setTimeout(() => setToastMessage(null), 3000);
        }
    }

  const handleLoginWithGoogle = () => {
    authService.LoginWithGoogle(); // this triggers Appwrite OAuth2 flow
  };  

    if(error){
      <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-lg">{error}</p>
      </div>
    }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      {/* ✅ Success Badge Overlay */}
        {toastMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <SuccessBadge
              message={toastMessage.text}
              type={toastMessage.type}
            />
          </div>
        )}

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-transparent backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Wallet2 className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur opacity-25"></div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to your account
            </p>
          </div>

          {/* Social Login */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <button 
              className="w-12 h-12 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl"
              title="Continue with GitHub"
            >
              <Github className="w-5 h-5" />
            </button>
            
            <button 
              className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl"
              title="Continue with Google"
              onClick={handleLoginWithGoogle}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            
            <button 
              className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl"
              title="Continue with Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 rounded-xl">Or sign in with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(loginUser)} className=''>

          <div className="space-y-4">
            <InputField
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email Address"
            {...register('email', { required: true,
            validate:{
            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            "Email address must be a valid address",
                }
            })}
            />
            
            <InputField
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              showToggle={true}
              onToggle={() => setShowPassword(!showPassword)}
              {...register('password', { required: true,
            })}
            />

            {/* Additional Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <Button type="submit" icon={LogIn}>
                Login
            </Button>
          </div>
        </form>


          {/* Toggle to Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account? {" "}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;