const { MongoClient } = require('mongodb')

const DEFAULT_DB_NAME = "signupform"
const URL = process.env.MONGO_URL ?? "mongodb+srv://fabio:fabio@cluster0.jgcvz8b.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 3000

let client
async function connectToMongo() {
  try {
    if (!client) {

      client = await MongoClient.connect(URL)
    }

    return client;
  } catch (err) {
    console.log(err)
  }
}

async function getMongoCollection(collectionName, dbName = DEFAULT_DB_NAME) {
  const client = await connectToMongo()
  return client.db(dbName).collection(collectionName)
}

module.exports = { getMongoCollection }