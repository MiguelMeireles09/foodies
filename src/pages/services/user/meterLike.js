


async function createTokens(email) {
    const userSession = await findSessionByUser(email)
    const userId = await getId(email)
    /* user tem like? se sim remover senao colocar? */
    
}

