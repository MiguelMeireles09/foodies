const { inserirReceitaDataBase } = require("@/pages/data/receitas/postarReceita")


async function createReceita (ingredientes, quantidades, tempoPreparo, preco, fotoReceita, titulo, dificuldade , calorias, modoPreparo ,idUsuario, categoria ){
    await inserirReceitaDataBase( ingredientes, quantidades, tempoPreparo, preco, fotoReceita, titulo, dificuldade , calorias, modoPreparo ,idUsuario ,categoria)
}


module.exports = { createReceita }