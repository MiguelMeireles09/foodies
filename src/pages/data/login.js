const { getMongoCollection } = require('./mongodb')

const collectionName = "signupform"

async function findUserPassword(email) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ email: { $eq: email } })
    return result
}

module.exports = { findUserPassword }
