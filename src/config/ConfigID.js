const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwritewalletCollectionId: String(import.meta.env.VITE_APPWRITE_WALLETS_COLLECTION_ID),
    appwritecurrencyCollectionId: String(import.meta.env.VITE_APPWRITE_CURRENCIES_COLLECTION_ID),
    appwritetransactionCollectionId: String(import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID),

  redirectSuccess:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_REDIRECT_SUCCESS_LOCAL
      : import.meta.env.VITE_REDIRECT_SUCCESS_PROD,

  redirectFailure:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_REDIRECT_FAILURE_LOCAL
      : import.meta.env.VITE_REDIRECT_FAILURE_PROD,
};

export default conf;