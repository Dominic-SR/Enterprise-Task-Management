import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myProject';

async function main() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    
    // You are now ready to perform CRUD operations
    return 'done.';
  } catch (err) {
    console.error(err);
  } finally {
    // Note: In a long-running app (like an API), 
    // you usually keep the connection open.
    // await client.close(); 
  }
}