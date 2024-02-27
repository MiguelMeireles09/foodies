const { encontrarReceita } = require("../data/receitas")

async function procurarReceita(titulo) {
    const res = await encontrarReceita(titulo)
    return res
}

module.exports = { procurarReceita }