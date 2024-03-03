const { MongoClient } = require('mongodb');

const DEFAULT_DB_NAME = "foodies";
const URL = process.env.MONGO_URL ?? "mongodb+srv://admin:sJ.j22aZehDM8fn@cluster0.xwyynv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 3000;

let client;
let connectionTimeout;

async function connectToMongo() {
  try {
    if (!client) {
      client = await MongoClient.connect(URL);
      clearTimeout(connectionTimeout);
      connectionTimeout = setTimeout(closeMongoConnection, 10000);
    }

    return client;
  } catch (err) {
    console.log(err);
  }
}

async function getMongoCollection(collectionName, dbName = DEFAULT_DB_NAME) {
  const client = await connectToMongo();
  return client.db(dbName).collection(collectionName);
}

async function closeMongoConnection() {
  try {
    if (client) {
      await client.close();
      client = null;
      console.log("MongoDB connection closed.");
    }
  } catch (err) {
    console.log(err);
  }
}

process.on('SIGINT', async () => {
  await closeMongoConnection();
  process.exit(0);
});

process.on('exit', async () => {
  await closeMongoConnection();
});

module.exports = { getMongoCollection };
