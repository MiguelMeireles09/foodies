const { encontrarReceita, findReceitaTitulo } = require("../data/receitas")

async function procurarReceita(titulo) {
    const res = await findReceitaTitulo(titulo)
    return res
}

module.exports = { procurarReceita }
