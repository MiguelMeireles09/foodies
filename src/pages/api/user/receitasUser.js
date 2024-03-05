import { procurarReceitasUsuario } from "@/pages/services/user/receitasUser";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { idDoUsuario } = req.body;
            const receitasUsuario = await procurarReceitasUsuario(idDoUsuario);
            if (receitasUsuario) {
                return res.status(200).json(receitasUsuario);
            } else {
                return res.status(404).json({ message: "Usuario não encontrado" });
            }
        } else {
            // Método não permitido
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}