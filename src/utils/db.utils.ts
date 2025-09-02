/**
 * @file src/utils/db.util.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Manages the MongoDB database connection using Mongoose, with caching for efficiency.
 */

import mongoose from "mongoose";

if (!process.env.DB) {
  throw new Error(
    "Please define the DB environment variable inside .env.local",
  );
}

const DB_URI: string = process.env.DB;

/**
 * @interface MongooseCache
 * @description Defines the structure for the cached Mongoose connection.
 * @property {typeof mongoose | null} conn - The active Mongoose connection.
 * @property {Promise<typeof mongoose> | null} promise - The pending connection promise.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global NodeJS object to cache the Mongoose connection.
declare global {
  var mongoose: MongooseCache | undefined;
}

/**
 * @description Caches the Mongoose connection and promise to avoid reconnecting on every request,
 * which is crucial in serverless environments.
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

/**
 * @function connectDB
 * @description Establishes a connection to the MongoDB database.
 * It uses a cached connection if one is already available, or creates a new one if not.
 * @returns {Promise<typeof mongoose>} A promise that resolves to the Mongoose connection object.
 */
async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Recommended for serverless functions
    };

    cached.promise = mongoose.connect(DB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
