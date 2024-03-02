async function  checkEmailPassword(account, password) {
    if(!account || !password){
        return false
    }
    const userPassword = account.password
    return userPassword === password
}


module.exports = { checkEmailPassword }