import React from 'react';
import Mindmap from "@/components/contents/mindmap-search";
import { BlogType, MindmapDataTypes } from "@/utils/types";
import MenuBar from "@/components/menu-bar";
import History from "@/components/contents/history";
import ListBlog from "@/components/contents/list-blog";
import { useRouter } from "next/router";
import {GetServerSideProps} from "next";
import {withAuth} from "@/utils/authGuard";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const SearchPage = () => {
    const [mindMapData, setMindMapData] = React.useState<MindmapDataTypes[]>([]);
    const aiDomain = localStorage.getItem("ai_domain");
    const router = useRouter();
    const keyword = router.query.keyword;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${aiDomain}/search`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ content : keyword , limit : 5 }),
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setMindMapData(data.results);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [aiDomain, keyword]);

    const listBlogPara: BlogType[] = mindMapData.map((blog, index) => ({
        id: blog.id,
        title: blog.title,
        body: blog.content,
        upvote: 0,
        downvote: 0,
        createdAt: new Date().toISOString(),
        user: {
            id: 0,
            fullname: "Anonymous",
        },
    }));

    const rootKeyword = keyword as string;

    return (
        <div className={"flex flex-wrap md:flex-nowrap bg-white min-h-screen"}>
            <title>Search</title>
            <div className={"flex md:w-1/5"}>
                <MenuBar isResponsive={false} defaultSelected={'1'} />
            </div>
            <div className={"flex flex-col md:w-3/5 gap-4 items-center md:px-5"}>
                <h1>: {rootKeyword}</h1>
                <Mindmap data={mindMapData} rootKeyword={rootKeyword} />
                <ListBlog Blogs={listBlogPara} />
            </div>
            <div className={"flex md:w-1/5"}>
                <History />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = withAuth(async ({locale}) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["blog", "common", "menu"])),
        },
    };
});

export default SearchPage;