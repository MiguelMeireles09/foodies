//Receitas por likes  -> FEITO

import { filtrarPorLikes } from "@/pages/services/receitas/filtrosPagInicial/top10Receitas";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const top10 = await filtrarPorLikes();  
            if (top10) {
                return res.status(200).json(top10);
            } else {
                return res.status(404).json({ message: "Receitas não encontradas." });
            }
        } else {
            // Método não permitido
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}