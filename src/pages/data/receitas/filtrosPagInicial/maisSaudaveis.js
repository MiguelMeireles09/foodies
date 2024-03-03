const { getMongoCollection } = require("../../mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasMenosCalorias() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { $sort: { calorias: 1 } }, // Sort by 'calorias' in ascending order
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

module.exports = { procurarReceitasMenosCalorias };
