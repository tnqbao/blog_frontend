import React from 'react';
import Mindmap from "@/components/contents/mindmap-search";
import { BlogType, ListBlogType, MindmapDataTypes } from "@/utils/types";
import MenuBar from "@/components/menu-bar";
import History from "@/components/contents/history";
import ListBlog from "@/components/contents/list-blog";
import { userApiInstance } from "@/utils/axios.config";
import { useRouter } from "next/router";

const SearchPage = () => {
    const [mindMapData, setMindMapData] = React.useState<MindmapDataTypes[]>([]);
    const aiDomain = localStorage.getItem("ai_domain");
    const router = useRouter();
    const keyword = router.query.keyword;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userApiInstance.post(`${aiDomain}/search`, {
                    keyword: keyword,
                });
                if (response.status === 200) {
                    setMindMapData(response.data.result);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [aiDomain, keyword]);

    const listBlog: MindmapDataTypes[] = [
        {
            title: "canh dep dem khuya",
            similarity: 0.35241783,
            content: "đứaad ",
        },
        {
            title: "CHUYỆN KỂ CỦA NGƯỜI GẶP MA RỪNG !",
            similarity: 0.32552302,
            content: "Mà ít ra ông ta cũng 50 năm ở và lượn lờ qua cái bãi rừng Đá Đụn này rồi chứ...",
        },
        {
            title: "Vết Cắt Không Lành",
            similarity: 0.30465505,
            content: "Tôi không nghĩ rằng chia tay lại đau đến thế. Mỗi lần nghe thấy tên em, trái tim tôi...",
        },
    ];

    const listBlogPara: BlogType[] = listBlog.map((blog, index) => ({
        id: index,
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

    const rootKeyword = "Cảnh đẹp";

    return (
        <div className={"flex flex-wrap md:flex-nowrap bg-white min-h-screen"}>
            <title>Search</title>
            <div className={"flex md:w-1/5"}>
                <MenuBar isResponsive={false} defaultSelected={'1'} />
            </div>
            <div className={"flex flex-col md:w-3/5 gap-4 items-center md:px-5"}>
                <h1>Search: {rootKeyword}</h1>
                <Mindmap data={listBlog} rootKeyword={rootKeyword} />
                <ListBlog Blogs={listBlogPara} />
            </div>
            <div className={"flex md:w-1/5"}>
                <History />
            </div>
        </div>
    );
}

export default SearchPage;