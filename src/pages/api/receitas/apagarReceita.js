import { apagarReceita } from "@/pages/services/receitas/apagarReceita";
export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Método não permitido" });
    }
    try {
        const { idUsuario, idReceita } = req.body;
        const deletedCount = await apagarReceita(idUsuario, idReceita);
        if (deletedCount === 0) {
            return res.status(404).json({
                message: "Receita não encontrada ou usuário inválido",
            });
        }
        return res.status(200).json({
            message: "Receita Apagada com Sucesso.",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro" });
    }
}
