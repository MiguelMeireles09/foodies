
const { getMongoCollection } = require('./mongodb');

const collectionName = "receitas";

async function findReceitas() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.find({}).toArray();
    return result;
}

module.exports = { findReceitas };
