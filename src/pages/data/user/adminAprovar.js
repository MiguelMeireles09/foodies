const { ObjectId } = require('mongodb');
const { getMongoCollection } = require('../mongodb/mongodb');

const collectionName = "receitas";

async function updateReceitaEstado(idReceita) {
    const idObjeto = new ObjectId(idReceita)
    const collection = await getMongoCollection(collectionName);
    const result = await collection.updateOne(
        { _id : idObjeto }, // Find the document by idReceita
        { $set: { ativa : true } } // Set estado to true
    );
    return result;
}

module.exports = { updateReceitaEstado };


