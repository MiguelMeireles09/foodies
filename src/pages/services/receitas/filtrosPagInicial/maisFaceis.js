// receitas Ordenadas Por Facilidade (devo restringir a apenas 10/20 receitas?)

const { procurarReceitasFacilidade } = require("@/pages/data/receitas/filtrosPagInicial/maisFaceis")


async function filtrarPorFacilidade() {
    const res = await procurarReceitasFacilidade()
    return res
}

module.exports = { filtrarPorFacilidade }

