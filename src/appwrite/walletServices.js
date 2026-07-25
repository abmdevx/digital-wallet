import conf from "../config/ConfigID";
import { Client, Databases, ID , Query , Account} from "appwrite";

export class AppwriteService {
    client = new Client();
    
    databases;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite Project ID

        this.databases = new Databases(this.client);
        this.account = new Account(this.client); // ✅ ADD THIS LINE
    }

    async CreateWallet({ UserId, CurrencyId, WalletNumber, WalletName, Balance = 0, Status = "Active" }) {
    try {
        const response = await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwritewalletCollectionId,
            ID.unique(),
            {
                UserId,
                CurrencyId,
                WalletNumber,
                WalletName,
                Balance,
                Status,
                CreatedAt: new Date().toISOString()
            }
        );
        return response;
        } catch (error) {
            console.error("Error creating wallet:", error);
            throw error;
        }
    }

    async UpdateWallet({ WalletId, WalletName, Status, Balance, CurrencyId }) {
    try {
        const response = await this.databases.updateDocument(
            conf.appwriteDatabaseId,              // Your database ID
            conf.appwritewalletCollectionId,      // Your Wallet collection ID
            WalletId,                             // Document ID to update
            {
                WalletName,
                Status,
                Balance,
                CurrencyId
            }
        );
        return response;
        } catch (error) {
            console.error("Error updating wallet:", error);
            throw error;
        }
    }

    async DeleteWallet({WalletId}){
        try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,    // Your database ID
            conf.appwritewalletCollectionId, // Your Wallet collection ID
            WalletId        // Document ID to delete
        );
        return true;
        } catch (error) {
            console.error("Error deleting wallet:", error);
            throw error;
        }
    }

    async ListUserWallets({ UserId, WalletNumber, Status } = {}) {
    try {
        const filters = [];

        if (UserId) filters.push(Query.equal("UserId", (UserId)));
        if (WalletNumber) filters.push(Query.equal("WalletNumber", (WalletNumber)));
        if (Status) filters.push(Query.equal("Status", Status));

        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwritewalletCollectionId,
            filters
        );

        return response.documents;
        } catch (error) {
            console.error("Error listing wallets:", error);
            throw error;
        }
    }

    async GetWalletDetails({ WalletId }) {
    try {
        const response = await this.databases.getDocument(
            conf.appwriteDatabaseId,        // Your database ID
            conf.appwritewalletCollectionId, // Your Wallet collection ID
            WalletId                        // Document ID to fetch
        );
        return response;
        } catch (error) {
            console.error("Error fetching wallet details:", error);
            throw error;
        }
    }

    async ListAllUsers() {
        try {
            const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,       // Your database ID
            conf.appwriteUsersCollectionId // Your Users collection ID
            );
            return response.documents; // Returns an array of all user documents
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }

}

const w_service = new AppwriteService();

export default w_service;