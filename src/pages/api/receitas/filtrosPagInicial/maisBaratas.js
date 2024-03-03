// receitas ordenadas Por preço (devo restringir a apenas 10/20 receitas?)

import { filtrarPorPreco } from "@/pages/services/receitas/filtrosPagInicial/maisBaratas";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const custo = await filtrarPorPreco();  
            if (custo) {
                return res.status(200).json(custo);
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