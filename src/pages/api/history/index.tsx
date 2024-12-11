import {NextApiRequest, NextApiResponse} from "next";
import {userApiInstance} from "@/utils/axios.config";
import {parse} from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "GET") {
        return res.status(405).json({message: "Method not allowed"});
    }
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const responseUpvoteList = await userApiInstance.get("/user/current/userUpvotes", {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        if (responseUpvoteList.status != 200) {
            return res.status(404).json({message: "Endpoint Not Found"});
        }


        const responseDownVoreList = await userApiInstance.get("/user/current/posts", {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        if (responseDownVoreList.status !== 200) {
            return res.status(404).json({message: "Endpoint Not Found"});
        }

        const upvoteBlogs = responseUpvoteList.data;
        const downvoteBlogs = responseDownVoreList.data;
        return res.status(200).json({upvoteBlogs : upvoteBlogs, downvoteBlogs : downvoteBlogs});
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}