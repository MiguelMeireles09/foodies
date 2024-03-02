const { getMongoCollection } = require('../mongodb/mongodb');

const collectionName = "receitas"


//vou receber um id de usuario e um id receita?
async function colocarOuTirarLike(idReceita) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.find(

    )
}







module.exports = { findReceitasFavUser };