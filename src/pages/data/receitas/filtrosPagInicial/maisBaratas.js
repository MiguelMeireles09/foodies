const { getMongoCollection } = require("../../mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasPreco() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        {
            $sort: { preco: 1 } // Sort by 'preco' in ascending order
        },
        {
            $limit: 10 // Limit the results to the top 10 (change to 20 if needed)
        },
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

module.exports = { procurarReceitasPreco };
