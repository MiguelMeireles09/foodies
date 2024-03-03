const { getMongoCollection } = require("@/pages/data/mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasLanches() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { 
            $match: {
                categoria: { $regex: /^lanche$/i } // Case-insensitive match for 'lanches'
            } 
        },
        { $limit: 10 }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitasLanches };