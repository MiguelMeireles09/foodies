const { getMongoCollection } = require('./mongodb');


//inutil?
const collectionName = "usuario";

async function findUser(user) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ titulo: { $eq: titulo } });
    return result;
}

module.exports = { findUser };
