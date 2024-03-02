const { findReceitasFavUser } = require("@/pages/data/user/receitasFav")

async function procurarReceitasFavoritas(idDoUsuario) {
    const res = await findReceitasFavUser(idDoUsuario)
    return res
}

module.exports = { procurarReceitasFavoritas }


