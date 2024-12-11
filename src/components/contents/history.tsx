import { BlogType } from "@/utils/types";
import BriefBlogContent from "@/components/contents/brief-blog-content";
import React, { useEffect, useState } from "react";

const History: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/history', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setBlogs(data.upvoteBlogs);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className={"bg-white min-h-screen h-auto flex flex-col py-4 gap-2 w-full mb-2 bg-blue-400/20 px-2"}>
            <div >
                <h1 className={"text-xl font-bold text-black/70"}>Recent Votes</h1>
            </div>
            {blogs && blogs.map((blog: BlogType) => (
                <BriefBlogContent key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default History;