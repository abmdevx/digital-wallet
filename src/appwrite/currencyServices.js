import conf from "../config/ConfigID";
import { Client, Databases, ID, Query } from "appwrite";

export class CurrencyService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // ✅ Create
  async CreateCurrency({ Code, Name, Symbol, Rate, isActive = true }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritecurrencyCollectionId,
        ID.unique(),
        {
          Code,
          Name,
          Symbol,
          Rate: parseFloat(Rate),
          isActive: Boolean(isActive),
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating currency:", error);
      throw error;
    }
  }

  // ✅ Update
  async UpdateCurrency({ CurrencyId, Code, Name, Symbol, Rate, isActive }) {
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritecurrencyCollectionId,
        CurrencyId,
        {
          Code,
          Name,
          Symbol,
          Rate: parseFloat(Rate),
          isActive: Boolean(isActive),
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating currency:", error);
      throw error;
    }
  }

  // ✅ Delete
  async DeleteCurrency({ CurrencyId }) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritecurrencyCollectionId,
        CurrencyId
      );
      return true;
    } catch (error) {
      console.error("Error deleting currency:", error);
      throw error;
    }
  }

  // ✅ List (with filters)
  async ListCurrencies({ Code, Name, Symbol, isActive } = {}) {
    try {
      const filters = [];

      if (Code) filters.push(Query.equal("Code", Code));
      if (Name) filters.push(Query.equal("Name", Name));
      if (Symbol) filters.push(Query.equal("Symbol", Symbol));
      if (typeof isActive === "boolean") filters.push(Query.equal("isActive", isActive));

      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritecurrencyCollectionId,
        filters
      );
      return response.documents;
    } catch (error) {
      console.error("Error listing currencies:", error);
      throw error;
    }
  }

  // ✅ Get by ID (optional helper)
  async GetCurrencyById(CurrencyId) {
    try {
      const response = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritecurrencyCollectionId,
        CurrencyId
      );
      return response;
    } catch (error) {
      console.error("Error fetching currency:", error);
      throw error;
    }
  }
}

const c_service = new CurrencyService();
export default c_service;