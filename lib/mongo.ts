import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.set("strictQuery", true);
    let conn = await mongoose.connect(
      String(process.env.MONGO_DB_CONNECTION_STRING)
    );
    return conn;
  } catch (e) {
    if (e instanceof Error) throw new Error(e as any);
  }
}
