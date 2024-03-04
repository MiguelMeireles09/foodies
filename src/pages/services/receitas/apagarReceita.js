const { apagarReceitaDataBase } = require("@/pages/data/receitas/apagarReceita");

async function apagarReceita(idUsuario, idReceita) {
    const deletedCount = await apagarReceitaDataBase(idUsuario, idReceita);
    return deletedCount;
}

module.exports = { apagarReceita }