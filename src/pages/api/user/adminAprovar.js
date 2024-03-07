import { updateReceita } from "@/pages/services/user/adminAprovar";


export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { idReceita } = req.body;
            const receita = await updateReceita(idReceita)
            if (receita) {
                console.log("Apagada com sucesso")
                return res.status(200).json(receita);
            } else {
                return res.status(404).json({ message: "Usuario não encontrado" });
            }
        } else {
            // Método não permitido
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Metodo ${req.method} não permitido.`);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}