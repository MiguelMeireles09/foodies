import { procurarReceita } from '@/pages/services/receitas';


export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { titulo } = req.body;
            console.log(titulo)
            const receita = await procurarReceita(titulo);
            if (receita) {
                return res.status(200).json(receita);
            } else {
                return res.status(404).json({ message: "ioiuoiuoiuoiuio not found" });
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