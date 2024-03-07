const { getMongoCollection } = require("@/pages/data/mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasPratosPrincipais() {
    const collection = await getMongoCollection(collectionName)
    const result = await collection.aggregate([
        { 
            $match: {
                categoria: { $regex: /^prato principal$/i } 
            } 
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" } 
            }
        },
        { $sort: { likesCount: -1 } }, 
        { $limit: 10 }, 
        { 
            $project: { 
                _id: 0, 
                titulo: 1, 
                fotoReceita: 1 
            } 
        }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitasPratosPrincipais }
