const { verificaUserLike } = require("@/pages/data/user/like");


async function verificarLike(idUsuario, idReceita) {
    return await verificaUserLike(idUsuario, idReceita);
}

async function toggleLikeStatus(idUsuario, idReceita) {
    return await adicionarOuRemoverLikeDB(idUsuario, idReceita);
}

module.exports = { verificarLike, toggleLikeStatus};