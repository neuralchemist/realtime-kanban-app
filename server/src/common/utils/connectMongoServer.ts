import mongoose from "mongoose";
import { log } from "./logger";
import config from "config";

export async function connectMongoServer() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    log.info(`🚀 mongodb connected to ${dbUri}`);
  } catch (error) {
    log.error("❌ Could not connect to db");
    process.exit(1);
  }
}
