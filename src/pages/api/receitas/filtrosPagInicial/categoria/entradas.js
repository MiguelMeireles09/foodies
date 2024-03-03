//filtrar categoria entras

import { filtrarPorEntradas } from "@/pages/services/receitas/filtrosPagInicial/categoria.js/entradas";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const entradas = await filtrarPorEntradas();  
            if (entradas) {
                return res.status(200).json(entradas);
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