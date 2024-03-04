const { getMongoCollection } = require('../mongodb/mongodb')

const collectionName = "receitas"


async function verificaSeExiste(ingredientes, modoPreparo) {
    const collection = await getMongoCollection(collectionName);
    const recipe = await collection.findOne({ ingredientes, modoPreparo });
    return !recipe
}

async function inserirReceitaDataBase(ingredientes, quantidades, tempoPreparo, preco, fotoReceita, titulo, dificuldade, calorias, modoPreparo, idUsuario, categoria) {
    const collection = await getMongoCollection(collectionName);
    await collection.insertOne({ ingredientes, quantidades, tempoPreparo, preco, fotoReceita, titulo, dificuldade, calorias, modoPreparo, idUsuario, categoria, likes: []  });
}

module.exports = { inserirReceitaDataBase, verificaSeExiste }
