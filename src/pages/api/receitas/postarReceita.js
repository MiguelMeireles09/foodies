import { verificaSeExiste } from "@/pages/data/receitas/postarReceita";
import { createReceita } from "@/pages/services/receitas/postarReceita";

/* POST /api/receitas/postarReceitas*/
export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        const { ingredientes, quantidades, tempoPreparo, preco, fotoReceita, titulo, dificuldade, calorias, modoPreparo, idUsuario, categoria } = req.body;
        const isUnique = await verificaSeExiste(ingredientes, modoPreparo);
        if (!isUnique) {
            return res.status(400).json({
                message: "A receita já existe no nosso site.",
                error: "A receita não parece bem."
            });
        }
        await createReceita(ingredientes, quantidades, tempoPreparo, preco, fotoReceita, titulo, dificuldade, calorias, modoPreparo, idUsuario,categoria);
        return res.status(201).json({
            message: "Receita Postada com sucesso, Obrigado pela partilha!",
            titulo
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Errorqwewqewqe" });
    }
}