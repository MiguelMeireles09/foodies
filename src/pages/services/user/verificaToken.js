const { verificaTokenLogado, dadosAtravesToken } = require("../../data/user/verificaToken")



async function tokenLogado(token) {
    const user = await verificaTokenLogado(token)
    return user
}


async function buscarDadosToken(pegaId){
    const user = await dadosAtravesToken(pegaId)
    return user
}

module.exports = { tokenLogado , buscarDadosToken }