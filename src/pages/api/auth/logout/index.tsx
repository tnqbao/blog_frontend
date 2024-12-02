// import { NextApiRequest, NextApiResponse } from 'next';
// import { userApiInstance } from '@/utils/axios.config';
// import { serialize } from 'cookie';
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         try {
//             const response = await userApiInstance.post('/user/logout',
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization : `${req.cookies.auth_token}`,
//                     },
//
//                 });
//             if (response.status === 200) {
//                 res.setHeader('Set-Cookie', serialize('auth_token', '', {
//                     httpOnly: true,
//                     maxAge: 0,
//                     path: '/',
//                 }));
//                 res.status(200).json({ message: 'Logged out successfully' });
//             } else {
//                 res.status(400).json({ message: 'Failed to logout' });
//             }
//         } catch (error: unknown) {
//             const errorMessage =
//                 error instanceof Error
//                     ? error.message
//                     : 'An unknown error occurred';
//
//             res.status(500).json({ message: 'Server error', error: errorMessage });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
