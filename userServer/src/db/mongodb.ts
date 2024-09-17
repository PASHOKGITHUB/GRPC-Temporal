import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // MongoDB connection string
const client = new MongoClient(uri);

let db: Db;

export async function connectToMongoDB() {
  if (!db) {
    await client.connect();
    db = client.db('grpcDatabase'); //  database name
  }
  return db;
}

export async function findUserById(userId: string): Promise<boolean> {
  const db = await connectToMongoDB();
  const user = await db.collection('users').findOne({ userId });
  return !!user;  // Return true if user exists, false otherwise
}
