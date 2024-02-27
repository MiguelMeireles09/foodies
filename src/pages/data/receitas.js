const { getMongoCollection } = require('./mongodb')

const collectionName = "receitas"

async function encontrarReceita(titulo) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ titulo: { $eq: titulo } })
    return result
}

module.exports = { encontrarReceita }
