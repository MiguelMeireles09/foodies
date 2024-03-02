// criacao tokens  
const { v4: uuidv4 } = require('uuid');
const { insertSession, findSession, updateUserSession, findSessionByUser, findUserSession } = require('../../data/user/sessions');
const { getId } = require('../auth/signup');


//cria token, se user tiver token muda token para o novo senao cria um session para o user
async function createTokens(email) {
    const tokenId = uuidv4()
    const userSession = await findSessionByUser(email)
    const userId = await getId(email)
    userSession ? updateUserSession(userId, tokenId) : insertSession(email, tokenId, userId)
    return tokenId
}


// 
async function findToken(token) {
    const user = await findSession(token)
    return user.email
}


async function getUserToken(userId) {
    const session = await findUserSession(userId)
    const userToken = session.token
    return userToken
}




module.exports = { createTokens, findToken, getUserToken }