import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection{
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose 

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async ()=>{
  if (cached.conn)
    return cached.conn;
  if (!MONGODB_URL)
    throw new Error('MONGODB_URL is not defined');
  
  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {dbName: 'imaginify', bufferCommands: false})
  cached.conn = await cached.promise;

  return cached.conn;
}




// // Connection state tracking
// let isConnected = false;
// let connectionPromise: Promise<Mongoose> | null = null;

// // MongoDB connection options for optimization
// const MONGODB_OPTIONS = {
//   maxPoolSize: 10, // Maximum number of connections in the pool
//   minPoolSize: 2,  // Minimum number of connections in the pool
//   maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
//   serverSelectionTimeoutMS: 5000, // Timeout for server selection
//   socketTimeoutMS: 45000, // Socket timeout
//   bufferMaxEntries: 0, // Disable mongoose buffering
//   bufferCommands: false, // Disable mongoose buffering
//   autoIndex: false, // Disable automatic index creation in production
//   retryWrites: true, // Enable retryable writes
// };

// // Get MongoDB URI from environment variables
// const getMongoURI = (): string => {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) {
//     throw new Error('MONGODB_URI environment variable is not defined');
//   }
//   return uri;
// };

// // Connect to MongoDB with optimization
// export const connectToDatabase = async (): Promise<Mongoose> => {
//   // Return existing connection if already connected
//   if (isConnected && mongoose.connection.readyState === 1) {
//     return mongoose;
//   }

//   // Return existing connection promise if connection is in progress
//   if (connectionPromise) {
//     return connectionPromise;
//   }

//   // Create new connection promise
//   connectionPromise = mongoose.connect(getMongoURI(), MONGODB_OPTIONS);

//   try {
//     const mongooseInstance = await connectionPromise;
    
//     // Set up connection event handlers
//     mongoose.connection.on('connected', () => {
//       console.log('✅ MongoDB connected successfully');
//       isConnected = true;
//     });

//     mongoose.connection.on('error', (error) => {
//       console.error('❌ MongoDB connection error:', error);
//       isConnected = false;
//       connectionPromise = null;
//     });

//     mongoose.connection.on('disconnected', () => {
//       console.log('⚠️ MongoDB disconnected');
//       isConnected = false;
//       connectionPromise = null;
//     });

//     // Graceful shutdown handling
//     process.on('SIGINT', async () => {
//       await disconnectFromDatabase();
//       process.exit(0);
//     });

//     process.on('SIGTERM', async () => {
//       await disconnectFromDatabase();
//       process.exit(0);
//     });

//     return mongooseInstance;
//   } catch (error) {
//     console.error('❌ Failed to connect to MongoDB:', error);
//     connectionPromise = null;
//     throw error;
//   }
// };

// // Disconnect from MongoDB
// export const disconnectFromDatabase = async (): Promise<void> => {
//   try {
//     if (mongoose.connection.readyState !== 0) {
//       await mongoose.disconnect();
//       console.log('✅ MongoDB disconnected successfully');
//     }
//     isConnected = false;
//     connectionPromise = null;
//   } catch (error) {
//     console.error('❌ Error disconnecting from MongoDB:', error);
//     throw error;
//   }
// };

// // Get connection status
// export const getConnectionStatus = (): {
//   isConnected: boolean;
//   readyState: number;
//   readyStateText: string;
// } => {
//   const readyStateMap: { [key: number]: string } = {
//     0: 'disconnected',
//     1: 'connected',
//     2: 'connecting',
//     3: 'disconnecting',
//   };

//   return {
//     isConnected,
//     readyState: mongoose.connection.readyState,
//     readyStateText: readyStateMap[mongoose.connection.readyState] || 'unknown',
//   };
// };

// // Health check function
// export const checkDatabaseHealth = async (): Promise<boolean> => {
//   try {
//     if (mongoose.connection.readyState !== 1) {
//       return false;
//     }
    
//     // Ping the database
//     const db = mongoose.connection.db;
//     if (!db) {
//       return false;
//     }
    
//     await db.admin().ping();
//     return true;
//   } catch (error) {
//     console.error('Database health check failed:', error);
//     return false;
//   }
// };

// // Export mongoose instance for direct use
// export { mongoose };

// // Default export for convenience
// export default mongoose;


