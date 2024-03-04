import { apagarReceita } from "@/pages/services/receitas/apagarReceita";
export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        const { idUsuario, idReceita } = req.body;
        const deletedCount = await apagarReceita(idUsuario, idReceita);
        if (deletedCount === 0) {
            return res.status(404).json({
                message: "Receita not found or user is not the creator.",
            });
        }
        return res.status(200).json({
            message: "Receita Apagada com Sucesso.",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
