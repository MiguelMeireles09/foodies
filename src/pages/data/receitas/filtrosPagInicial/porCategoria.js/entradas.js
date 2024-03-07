const { getMongoCollection } = require("@/pages/data/mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasEntradas() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { 
            $match: {
                categoria: { $regex: /^entrada$/i } 
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

module.exports = { procurarReceitasEntradas };
