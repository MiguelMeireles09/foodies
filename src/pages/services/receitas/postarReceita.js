const { inserirReceitaDataBase } = require("@/pages/data/receitas/postarReceita")

async function verificaSeExiste(ingredientes , modoPreparo){
    const res = await findReceita(ingredientes, modoPreparo)
      return res // true ou false se n existir
    }


async function createReceita (ingredientes, quantidades, tempoPreparo, preco, fotoReceita, titulo, dificuldade , calorias, modoPreparo ,idUsuario ){
    await inserirReceitaDataBase( ingredientes, quantidades, tempoPreparo, preco, fotoReceita, titulo, dificuldade , calorias, modoPreparo ,idUsuario )
}


module.exports = { createReceita }