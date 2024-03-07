import { buscarDadosToken, buscarToken, tokenLogado } from "@/pages/services/user/verificaToken";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            // Extrai o token do cabeçalho Authorization
            const token = req.headers.authorization?.split(" ")[1]
            if (!token) {
                return res.status(401).json({ message: "Token não enviado" })
            }
            const userSession = await tokenLogado(token);
            if (userSession) {
                const pegaId = userSession.userId
                const dadosPeloId = await buscarDadosToken(pegaId)
                return res.status(200).json(dadosPeloId); 
            } else {
                return res.status(404).json({ message: "Token não encontrado" })
            }
        } else {
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Metodo ${req.method} não permitido.`)
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}