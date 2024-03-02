const { encontrarReceita, findReceitaTitulo } = require("../../data/receitas/receitas")

async function procurarReceita(titulo) {
    const res = await findReceitaTitulo(titulo)
    return res
}

module.exports = { procurarReceita }
