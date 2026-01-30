import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
interface User {
  // id: string;
  email: string;
  password: string;
  name?: string | undefined;
}

interface Login {
  email: string;
  password: string;
}
export class AuthService {
  client = new Client();
  account: Account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }: User) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });
      console.log(user);
      if (user) {
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      console.log("Appwrite service :: createUser :: User not created", error);
      throw error;
    }
  }

  async login({ email, password }: Login) {
    try {
      const account = await this.account.createEmailPasswordSession({
        email,
        password,
      });
      return account;
    } catch (error) {
      console.log("Appwrite service :: LoginUser :: User not Login", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(
        "Appwrite service :: getCurrentUser :: No active session found",
        error,
      );
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service :: logout :: error ", error);
    }
  }
}
const authService = new AuthService();
export default authService;

export { ID } from "appwrite";
