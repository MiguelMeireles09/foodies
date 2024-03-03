const { getMongoCollection } = require("@/pages/data/mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasPratosPrincipais() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { 
            $match: {
                categoria: { $regex: /^prato principal$/i } // Case-insensitive match for 'PratosPrprocurarReceitasPratosPrincipais'
            } 
        },
        { $limit: 10 }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitasPratosPrincipais };