const { findAccount, insertUserDataBase } = require("../data/signup")

async function checkEmail(email) {
   const account = await findAccount(email)
   if(account){
      return account
   }
   throw new Error( "O utilizador não foi encontrado!" )
}
async function checkEmailSignUp(email) {
   const account = await findAccount(email)
   if(!account){
      return null
   }
}

function checkPassword(password, passwordConfirmation) {
      return password === passwordConfirmation
}

async function getId(email){
   const res = await findAccount(email)
   return res._id.toString()
}

async function createUser(email, password){
   await insertUserDataBase(email,password)
}



module.exports = { checkEmail, checkPassword , getId , createUser , checkEmailSignUp}