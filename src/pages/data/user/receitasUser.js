const { getMongoCollection } = require('../mongodb/mongodb');

const collectionName = "receitas"

async function findReceitasUsuario(idDoUsuario) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.find(
        { 
            //exists é necessário pois algumas receitas são da plataforma e não de usuarios, logo não existe idUsuario
            idUsuario: { $exists: true, $in: [idDoUsuario] } 
        },
        { projection: { _id: 1, titulo: 1, fotoReceita: 1} } //envia isto para o front
    ).toArray()
    return result
}

module.exports = { findReceitasUsuario }
