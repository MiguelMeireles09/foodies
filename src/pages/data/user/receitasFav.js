const { getMongoCollection } = require('../mongodb/mongodb');

const collectionName = "receitas";

async function findReceitasFavUser(idDoUsuario) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.find(
        { likes: { $in: [idDoUsuario] } },
        { projection: { _id: 1, titulo: 1, fotoReceita: 1} } 
    ).toArray();
    return result;
}

module.exports = { findReceitasFavUser };



