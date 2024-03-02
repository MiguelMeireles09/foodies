const { getMongoCollection } = require("../mongodb/mongodb");

const collectionName = "sessions"

//coloca o session na base de dados
async function insertSession(email, token , userId ) {
    const collection = await getMongoCollection(collectionName);
    await collection.insertOne({ email , token , userId})
}

//procura um token igual ao token passado
async function findSession (token){
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ token: { $eq: token } })
    return result
}

//procura uma session associada a um email
async function findSessionByUser (email){
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ email: { $eq: email } })
    return result
}

//muda o token sempre que login é feito -> update n necessita de return
async function updateUserSession (userId,token){
    const collection = await getMongoCollection(collectionName);
    const result = await collection.updateOne({
        userId
    }, {
        $set: {
            token : token
        }
    })
}

//procura a session de um user
async function findUserSession(userId){
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ userId: { $eq: userId } })
    return result
}


module.exports = { insertSession , findSession , findSessionByUser , updateUserSession , findUserSession}
