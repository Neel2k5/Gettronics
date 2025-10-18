import mongoose from "mongoose";

export const connectMongoDB = (mongoUri) => {
  try {
    mongoose.connect(mongoUri);
  } catch (error) {
    console.error(
      `Error while connecting to mongodb database...\n${error}\nStopping Server`
    );
    process.exit(1);
  }
};
