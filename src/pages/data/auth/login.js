const { getMongoCollection } = require('../mongodb/mongodb')

const collectionName = "signupform"


//login, verifica se existe algum email com a mesma pass associada
async function findUserPassword(email) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ email: { $eq: email } })
    return result
}

module.exports = { findUserPassword }
