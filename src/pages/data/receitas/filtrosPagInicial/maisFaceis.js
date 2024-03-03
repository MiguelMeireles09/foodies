const { getMongoCollection } = require("../../mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasFacilidade() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { 
            $match: {
                dificuldade: { $regex: /^fácil$/i } // Case-insensitive match for 'fácil'
            } 
        },
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

module.exports = { procurarReceitasFacilidade };
