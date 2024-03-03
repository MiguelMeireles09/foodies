const { getMongoCollection } = require("@/pages/data/mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitassobremesa() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { 
            $match: {
                categoria: { $regex: /^sobremesa$/i } // Case-insensitive match for 'PratosPrprocurarReceitassobremesa'
            } 
        },
        { $limit: 10 }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitassobremesa };