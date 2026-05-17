import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const clearDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connection.db.dropCollection("users").catch(() => {});
    await mongoose.connection.db.dropCollection("messages").catch(() => {});
    await mongoose.connection.db.dropCollection("friendrequests").catch(() => {});
    console.log("Database cleared");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
clearDB();
