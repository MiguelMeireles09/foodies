const { getMongoCollection } = require("@/pages/data/mongodb/mongodb");

const collectionName = "receitas";

async function procurarReceitasPratosPrincipais() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { 
            $match: {
                categoria: { $regex: /^prato principal$/i } // Case-insensitive match for 'prato principal'
            } 
        },
        { $limit: 10 }, // Limit to the first 10 matching documents
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

module.exports = { procurarReceitasPratosPrincipais };
