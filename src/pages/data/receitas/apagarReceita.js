const { getMongoCollection } = require('../mongodb/mongodb');
const { ObjectId } = require('mongodb'); // Import ObjectId for converting string ID to ObjectId

const collectionName = "receitas";

async function apagarReceitaDataBase(idUsuario, idReceita) {
    try {
        const collection = await getMongoCollection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(idReceita), idUsuario: (idUsuario) })
        console.log("Deleting recipe with ID:", idReceita, "and User ID:", idUsuario);
        return result.deletedCount;
    } catch (error) {
        console.error("Error deleting the recipe:", error);
        throw new Error('Failed to delete the recipe'); // Throw an error to be caught by the calling function
    }
}
module.exports = { apagarReceitaDataBase }