const { getMongoCollection } = require('../mongodb/mongodb');
const { ObjectId } = require('mongodb'); 

const collectionName = "receitas";

async function apagarReceitaDataBase(idUsuario, idReceita) {
    try {
        let result; // Define result outside the if-else block
        const collection = await getMongoCollection(collectionName);
        if (idUsuario === "65e89d257f5aa8c1d93f84bb"){
            // Delete document based on _id only for specific idUsuario
            result = await collection.deleteOne({ _id: new ObjectId(idReceita) });
        }else{
            // Delete document based on _id and idUsuario for other users
            result = await collection.deleteOne({ _id: new ObjectId(idReceita), idUsuario: idUsuario });
        }
        console.log("A apagar receita com o ID:", idReceita, "e Id usuário:", idUsuario);
        return result.deletedCount; // Moved inside the try block
    } catch (error) {
        console.error("Error deleting recipe:", error);
        throw new Error('Falha a apagar receita');
    }
}
module.exports = { apagarReceitaDataBase };
