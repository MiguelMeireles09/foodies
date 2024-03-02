
const { ObjectId } = require('mongodb');
const { getMongoCollection } = require('../mongodb/mongodb');


const collectionName = "sessions";

async function verificaTokenLogado(token) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ token: { $eq: token } });
    return result;
}

// outra collection aqui deve ser errado 
const collectionNameSignUp = "signupform"
async function dadosAtravesToken(pegaId){
    const collection = await getMongoCollection(collectionNameSignUp)
    const result = await collection.findOne({_id : new ObjectId(pegaId)})
    return result
}


module.exports = { verificaTokenLogado , dadosAtravesToken}