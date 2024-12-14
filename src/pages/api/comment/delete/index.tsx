import {NextApiRequest, NextApiResponse} from "next";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        return res.status(405).json({message: "Method not allowed"});
    }
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const {commentId} = req.body;
    try {
        const response = await userApiInstance.delete(`/comment/${commentId}`, {
                headers: {
                    Authorization: `${token}`,
                },
                withCredentials: true,
            }
        );
        if (response.status != 200) {
            return res.status(404).json({message: "Endpoint Not Found"});
        }
        return res.status(200).json({message: "Comment deleted successfully"});
    } catch
        (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}