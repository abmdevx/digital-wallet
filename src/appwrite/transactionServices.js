import conf from "../config/ConfigID";
import { Client, Databases, ID, Query } from "appwrite";

export class TransactionService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite Project ID

        this.databases = new Databases(this.client);
    }

    // ✅ Create Transaction
    async CreateTransaction({ WalletId, CurrencyId, Amount, TransactionType, Description }) {
        try {
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritetransactionCollectionId, // Transaction Collection ID
                ID.unique(),
                {
                    WalletId,
                    CurrencyId,
                    Amount,
                    TransactionType,
                    Description,
                    CreatedAt: new Date().toISOString()
                }
            );
            return response;
        } catch (error) {
            console.error("Error creating transaction:", error);
            throw error;
        }
    }

    // ✅ Update Transaction
    async UpdateTransaction({ TransactionId, Amount, TransactionType, Description }) {
        try {
            const response = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritetransactionCollectionId,
                TransactionId,
                {
                    Amount,
                    TransactionType,
                    Description
                }
            );
            return response;
        } catch (error) {
            console.error("Error updating transaction:", error);
            throw error;
        }
    }

    // ✅ Delete Transaction
    async DeleteTransaction({ TransactionId }) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwritetransactionCollectionId,
                TransactionId
            );
            return true;
        } catch (error) {
            console.error("Error deleting transaction:", error);
            throw error;
        }
    }

    // ✅ List Transactions (filters: WalletId, CurrencyId, TransactionType)
    async ListTransactions({ WalletId, CurrencyId, TransactionType } = {}) {
        try {
            const filters = [];

            if (WalletId) filters.push(Query.equal("WalletId", WalletId));
            if (CurrencyId) filters.push(Query.equal("CurrencyId", CurrencyId));
            if (TransactionType) filters.push(Query.equal("TransactionType", TransactionType));

            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritetransactionCollectionId,
                filters
            );
            return response.documents;
        } catch (error) {
            console.error("Error listing transactions:", error);
            throw error;
        }
    }

    // ✅ Get Transaction by ID
    async GetTransactionDetails({ TransactionId }) {
        try {
            const response = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwritetransactionCollectionId,
                TransactionId
            );
            return response;
        } catch (error) {
            console.error("Error fetching transaction details:", error);
            throw error;
        }
    }

    // ✅ Get Transactions for a Wallet (with sorting by CreatedAt DESC)
    async GetWalletTransactions({ WalletId }) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritetransactionCollectionId,
                [
                    Query.equal("WalletId", WalletId),
                    Query.orderDesc("$createdAt")
                ]
            );
            return response.documents;
        } catch (error) {
            console.error("Error fetching wallet transactions:", error);
            throw error;
        }
    }
}

const t_service = new TransactionService();
export default t_service;