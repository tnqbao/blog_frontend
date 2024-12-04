import { NextApiRequest, NextApiResponse } from 'next';
import { parse, serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const cookies = parse(req.headers.cookie || '');
        const token = cookies.jwt;
        console.log(token);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/user/logout`, {
                method: 'POST',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                res.setHeader('Set-Cookie', serialize('jwt', '', {
                    httpOnly: true,
                    maxAge: 0,
                    path: '/',
                }));
                res.status(200).json({ message: 'Logged out successfully' });
            } else {
                res.status(400).json({ message: 'Failed to logout' });
            }
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'An unknown error occurred';
            console.log(errorMessage);
            res.status(500).json({ message: 'Server error', error: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}