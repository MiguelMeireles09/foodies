const { encontrarReceita, findReceitaTitulo } = require("../../data/receitas/receitas")
const { findReceitas } = require("../../data/receitas/todasReceitas")

async function procurarReceitas() {
    const res = await findReceitas()
    return res
}

module.exports = { procurarReceitas }

