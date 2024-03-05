import { findAccount } from "@/pages/data/auth/signup";
import { findToken } from "@/pages/services/user/tokens";

export default async function handler(req, res) {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(403).json({ message: "Não foi enviado o token de autenticação!" })
        }
        const email = await findToken(token)
        if (!email) {
            return res.status(403).json({ "message": "Não existe nenhuma sessão com o token indicado!" })
        }
        const account = await findAccount(email)
        const _id = account._id.toString()
        return res.status(200).json({ _id , email })
    } catch (err) {
        console.log(err);
        return res.status(500).json({"message": "service internal error"})
    }
}