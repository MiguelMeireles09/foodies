const { getMongoCollection } = require('../mongodb/mongodb');
const { ObjectId } = require('mongodb'); 

const collectionName = "receitas";

async function apagarReceitaDataBase(idUsuario, idReceita) {
    try {
        let result; 
        const collection = await getMongoCollection(collectionName);
        if (idUsuario === "65e89d257f5aa8c1d93f84bb"){
            result = await collection.deleteOne({ _id: new ObjectId(idReceita) })
        }else{
            result = await collection.deleteOne({ _id: new ObjectId(idReceita), idUsuario: idUsuario })
        }
        console.log("A apagar receita com o ID:", idReceita, "e Id usuário:", idUsuario)
        return result.deletedCount
    } catch (error) {
        console.error("Erro apagar receita:", error)
        throw new Error('Falha a apagar receita')
    }
}
module.exports = { apagarReceitaDataBase }
