import { NextApiRequest, NextApiResponse } from 'next';
import { userApiInstance} from "@/utils/axios.config";
import { serialize } from 'cookie';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { username, password, keepLogin } = req.body;
            const data = { username, password, keepLogin };

            const response = await userApiInstance.post('/auth/login', data);

            if (response.status === 200) {
                const token = response.data.token;
                const shouldKeepLogin = keepLogin === 'true';
                res.setHeader('Set-Cookie', serialize('jwt', token, {
                    httpOnly: true,
                    maxAge: shouldKeepLogin ? 30 * 24 * 60 * 60 : undefined,
                    path: '/',
                }));
                res.status(200).json({ token, user: response.data.user });
            }
        } catch (error) {
            
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}