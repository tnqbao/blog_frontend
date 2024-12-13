import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import {message} from "antd";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }
    res.setHeader('Set-Cookie', serialize('jwt', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/',
    }));
    res.status(200).end(message + 'Logout successful');
}