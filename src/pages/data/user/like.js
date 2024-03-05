const { ObjectId } = require('mongodb');
const { getMongoCollection } = require('../mongodb/mongodb');

const collectionName = "receitas";

async function verificaUserLike(idUsuario, idReceita) {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(idReceita), likes: idUsuario });
    return result !== null; 
}
async function adicionarOuRemoverLikeDB(idUsuario, idReceita) {
    const collection = await getMongoCollection(collectionName);
    const receita = await collection.findOne({ _id: new ObjectId(idReceita) });

    if (!receita) {
        throw new Error("Receita não encontrada.");
    }

    const usuarioJaDeuLike = receita.likes.includes(idUsuario);

    if (usuarioJaDeuLike) {
        await collection.updateOne({ _id: new ObjectId(idReceita) }, { $pull: { likes: idUsuario } });
        return false;
    } else {
        await collection.updateOne({ _id: new ObjectId(idReceita) }, { $push: { likes: idUsuario } });
        return true;
    }
}

module.exports = { verificaUserLike, adicionarOuRemoverLikeDB };