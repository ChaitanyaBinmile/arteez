import mongoose, { Connection } from 'mongoose';

import AppConfig from '../../lib/utils/AppConfig';

// Define a TypeScript interface for the Mongoose connection model
export async function mongooseConnection(): Promise<Connection> {
  try {
    await mongoose.connect(AppConfig.mongo.host_url, {
      serverSelectionTimeoutMS: 600000,
      autoIndex: false,
    });

    mongoose.set('debug', (collectionName, method, query, doc) => {
      console.info(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });

    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Close the connection when done with your operations
export async function closeMongooseConnection() {
  await mongoose.connection.close();
  console.log('Mongoose connection closed.');
}

// Export the Mongoose connection model
export const db = mongoose.connection;

// Optionally, you can listen for events on the connection
db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

db.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Call your transaction function and close the connection when done
