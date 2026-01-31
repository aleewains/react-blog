import { Client, Storage, ID, TablesDB, Query } from "appwrite";
import conf from "../conf/conf";

interface Post {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}
export class Service {
  client = new Client();
  tablesDB: TablesDB;
  storage: Storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: Post) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),

        data: {
          userId,
          title,
          slug,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      // throw error; // Or return false
      return false;
    }
  }
  async deletePost(id: string) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: id,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }
  async updatePost(
    id: string,
    { title, slug, content, featuredImage, status, userId }: Post,
  ) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: id,

        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }
  async getPost(id: string) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: id,
        // queries: [], // optional
        // transactionId: "<TRANSACTION_ID>",  // optional
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }
  async getAllPosts() {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries: [Query.equal("status", "active")],
        // transactionId: "<TRANSACTION_ID>", // optional
        // total: false, // optional
      });
    } catch (error) {
      console.log("Appwrite service :: getAllPosts :: error", error);
      return false;
    }
  }

  //file upload service
  async uploadFile(file: any) {
    try {
      return this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }
  async deleteFile(fileId: string) {
    try {
      return this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId: string) {
    return this.storage.getFilePreview({
      bucketId: conf.appwriteBucketId,
      fileId: fileId,
      //   width: 0, // optional
      //   height: 0, // optional
      //   gravity: ImageGravity.Center, // optional
      //   quality: -1, // optional
      //   borderWidth: 0, // optional
      //   borderColor: "", // optional
      //   borderRadius: 0, // optional
      //   opacity: 0, // optional
      //   rotation: -360, // optional
      //   background: "", // optional
      //   output: ImageFormat.Jpg, // optional
      //   token: "<TOKEN>", // optional
    });
  }
}

const service = new Service();
export default service;
