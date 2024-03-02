import { findToken, getUserToken } from "@/pages/services/user/tokens"

export default async function handler(req, res) {
    try {
        const token = req.headers.authorization
        const userId = req.query.id

        if (!token) {
            return res.status(403).json({ message: "Não foi enviado o token de autenticação!" }) //no token sent
        }
        const userToken = await getUserToken(userId)
        if (userToken !== token) {
            return res.status(403).json({ "message": "Não existe nenhuma sessão com o token indicado!" }) // no session with this token
        }
        
        return res.status(200).json({ sameUser : (userToken===token) })

    } catch (err) {
        return res.status(500).json({"message": "service internal error", "error": err.message})
    }
}

