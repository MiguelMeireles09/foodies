const { getMongoCollection } = require("./mongodb");


const collectionName = "sessions"

async function insertSession(email,token , userId ) {
    const collection = await getMongoCollection(collectionName);
    await collection.insertOne({ email , token , userId})

}

async function findSession (token){
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ token: { $eq: token } })
   
    return result
}

async function findSessionByUser (email){
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ email: { $eq: email } })

    return result
}


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

async function findUserSession(userId){
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ userId: { $eq: userId } })
    return result
}



module.exports = { insertSession , findSession , findSessionByUser , updateUserSession , findUserSession}
