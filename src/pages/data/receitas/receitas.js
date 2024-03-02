const { getMongoCollection } = require('../mongodb/mongodb');

//faz o get de uma receita atraves do titulo passado
const collectionName = "receitas";

async function findReceitaTitulo(titulo) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ titulo: { $eq: titulo } });
    return result;
}

module.exports = { findReceitaTitulo };
