const { getMongoCollection } = require("@/pages/data/mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitassopa() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { 
            $match: {
                titulo: { $regex: /sopa/i } // Case-insensitive match for titles containing 'sopa'
            } 
        },
        { $limit: 10 }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitassopa };  