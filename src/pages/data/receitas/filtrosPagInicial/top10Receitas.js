const { getMongoCollection } = require("../../mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasMaisGostos() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        {
            $addFields: {
                likesCount: { $size: "$likes" } // Count the number of likes
            }
        },
        { $sort: { likesCount: -1 } }, // Sort by 'likesCount' in descending order
        { $limit: 10 }, // Limit to the first 10 documents
        { 
            $project: { 
                _id: 0, // Exclude the '_id' field
                titulo: 1, // Include 'titulo'
                fotoReceita: 1 // Include 'fotoReceita'
            } 
        }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitasMaisGostos };
