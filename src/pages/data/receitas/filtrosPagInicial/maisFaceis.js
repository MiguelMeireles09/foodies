// receitas Ordenadas Por Facilidade (devo restringir a apenas 10/20 receitas?)

const { getMongoCollection } = require("../../mongodb/mongodb");


const collectionName = "receitas";

async function procurarReceitasFacilidade() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { 
            $match: {
                dificuldade: { $regex: /^fácil$/i } // Case-insensitive match for 'facil'
            } 
        },
        { $limit: 10 }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitasFacilidade };