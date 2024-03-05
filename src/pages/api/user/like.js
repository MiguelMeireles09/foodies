import { adicionarOuRemoverLikeDB } from "@/pages/data/user/like";
import { verificarLike } from "@/pages/services/user/like";

export default async function handler(req, res) {
    try {
        const { idUsuario, idReceita } = req.body;
        console.log(idUsuario, idReceita)
        if (!idUsuario || !idReceita) {
            return res.status(400).json({ message: "idUsuario e idReceita são obrigatórios." });
        }
        if (req.method === "GET") {
            const userLiked = await verificarLike(idUsuario, idReceita);
            return res.status(200).json({ likes: userLiked });
        } else if (req.method === "POST") {
            const addedOrRemoved = await adicionarOuRemoverLikeDB(idUsuario, idReceita);
            return res.status(200).json({ addedOrRemoved });
        } else {
            return res.status(405).json({ message: "Método não permitido." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
