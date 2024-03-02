const { getMongoCollection } = require('../mongodb/mongodb')

const collectionName = "signupform"

async function findAccount(email) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ email: { $eq: email } })
    return result
}

async function insertUserDataBase(email,password,nomeUsuario){
    const collection = await getMongoCollection(collectionName)
    const result = await collection.insertOne({
        email,
        password,
        nomeUsuario
    })
}

module.exports = { findAccount , insertUserDataBase }

