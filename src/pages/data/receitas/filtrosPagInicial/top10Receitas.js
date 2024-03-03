const { getMongoCollection } = require("../../mongodb/mongodb");


const collectionName = "receitas";

async function procurarReceitasMaisGostos() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        {
            $addFields: {
                likesCount: { $size: "$likes" } 
            }
        },
        { $sort: { likesCount: -1 } }, 
        { $limit: 10 }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitasMaisGostos };