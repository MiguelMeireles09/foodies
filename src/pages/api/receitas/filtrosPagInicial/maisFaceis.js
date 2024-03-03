// receitas Ordenadas Por Facilidade (devo restringir a apenas 10/20 receitas?)

import { filtrarPorFacilidade } from "@/pages/services/receitas/filtrosPagInicial/maisFaceis";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const facilidade = await filtrarPorFacilidade();  
            if (facilidade) {
                return res.status(200).json(facilidade);
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