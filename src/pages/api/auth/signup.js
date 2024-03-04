import {
  checkEmailSignUp,checkPassword,createUser,getId,} from "@/pages/services/auth/signup";

/* POST /api/auth/signup */
export default async function handler(req, res) {
    try {
        const { email, password, confirmacaoPassword , nomeUsuario } = req.body
        if (req.method === "POST") {
            const checkEmail1 = await checkEmailSignUp(email)
            if (checkEmail1 === null) {
                if (checkPassword(password, confirmacaoPassword)) {
                    await createUser(email, password,nomeUsuario)

                    const id = await getId(email)
                    return res.status(201).json({
                        "message": "Utilizador Criado com Sucesso!",
                        "_id": id,
                        nomeUsuario
                    });
                } return res.status(400).json({
                    message: "Os dados introduzidos não são válidos.",
                    error: "As passwords não coincidem."
                });

            }
            return res.status(400).json({
                message: "Os dados introduzidos não são válidos.",
                error: "O endereço introduzido já está registado."
            });
        } return res.status(400).json({
            message: "Os dados introduzidos não são válidos.",
            errors: {
                "email": "O endereço introduzido já está registado.",
                "confirmacaoPassword": "As passwords não coincidem."
            }
        })
    } catch (err) {
        console.log(err)
    }
}