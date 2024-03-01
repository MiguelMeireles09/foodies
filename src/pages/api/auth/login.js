import { checkEmailPassword } from '@/pages/services/login';
import { checkEmail } from '@/pages/services/signup';
import { createTokens } from '@/pages/services/tokens';

/* POST /api/auth/login */


export default async function handler(req, res) {
    try {
        
        const { email, password } = req.body
        
        if (req.method === "POST") {
            const account = await checkEmail(email)
            if (await checkEmailPassword(account, password)) {
                const tokenId = await createTokens(email)
                return res.status(200).json({ tokenId, email })
            } else {
                return res.status(401).json({ message: "A password introduzida é inválida!" });
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
}