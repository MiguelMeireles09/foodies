//Receitas Ordenadas Por tempo (devo restringir a apenas 10/20 receitas?)

const { getMongoCollection } = require("../../mongodb/mongodb");


const collectionName = "receitas";

async function procurarReceitasMenosDuracao() {
    const collection = await getMongoCollection(collectionName);
    const result = await collection.aggregate([
        { $sort: { duracao: -1 } }, 
        { $limit: 10 }
    ]).toArray();
    return result;
}

module.exports = { procurarReceitasMenosDuracao };