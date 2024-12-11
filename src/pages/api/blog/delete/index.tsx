import {NextApiRequest, NextApiResponse} from "next";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method Not Allowed'});
    }
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    const blogId = req.body.blogId;
    try {
        const response = await userApiInstance.delete(`/post/${blogId}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        if (response.status === 200) {
            return res.status(200).json({message: 'Post deleted successfully'});
        }
    } catch (error) {
        return res.status(500).json({error: 'Server error'});
    }
}