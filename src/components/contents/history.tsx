import { BlogType } from "@/utils/types";
import BriefBlogContent from "@/components/contents/brief-blog-content";
import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

const History: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const { t } = useTranslation('menu');
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
                <h1 className={"text-xl font-bold text-black/70"}>{t('recent')}</h1>
            </div>
            {blogs && blogs.map((blog: BlogType) => (
                <BriefBlogContent key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default History;