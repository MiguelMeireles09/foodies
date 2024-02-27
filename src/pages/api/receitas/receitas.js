
import { encontrarReceita } from '@/pages/services/recipes';

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const { titulo } = req.query;
            const recipe = await encontrarReceita(titulo);
            if (recipe) {
                return res.status(200).json(recipe);
            } else {
                return res.status(404).json({ message: "Recipe not found" });
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