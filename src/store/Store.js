import { configureStore } from '@reduxjs/toolkit';
import authSlice from './AuthSlice';
import walletSlice from './WalletSlice';

const Store = configureStore({
    reducer:{
        auth: authSlice,
        wallet: walletSlice
    }
})

export default Store;