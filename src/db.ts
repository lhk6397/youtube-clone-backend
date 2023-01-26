import mongoose from "mongoose";
const config = require("./config/key");

mongoose.set("strictQuery", true);
async function connect() {
  try {
    await mongoose.connect(config.mongoURI as string);
    console.log("🚀 Connected to DB");
  } catch (error) {
    console.log("❌ DB Error", error);
    process.exit(1);
  }
}

export default connect;
