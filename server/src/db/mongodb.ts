// src/db/mongodb.ts
import { MongoClient, Db } from 'mongodb';

let db: Db;

export async function connectToDatabase() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  db = client.db('grpcDatabase'); // Database name
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database connection not established');
  }
  return db;
}
