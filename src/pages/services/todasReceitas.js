const { encontrarReceita, findReceitaTitulo } = require("../data/receitas")
const { findReceitas } = require("../data/todasReceitas")

async function procurarReceitas() {
    const res = await findReceitas()
    return res
}

module.exports = { procurarReceitas }

