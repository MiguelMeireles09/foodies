async function  checkEmailPassword(account, password) {
    const userPassword = account.password
    return userPassword === password
}


module.exports = { checkEmailPassword }