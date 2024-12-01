import { BlogType } from "@/utils/types";
import BlogContent from "@/components/blog-content";
import {Layout} from "antd";

const { Content } = Layout;
type TrendingPageProps = {
    Blogs: BlogType[] | null;
    error?: string;
};



const NewFeeds: React.FC<TrendingPageProps> = ({ Blogs, error }) => {
    return (
        <Content className="bg-white p-4">
            <div className="flex flex-col gap-2">
                {Blogs && Array.isArray(Blogs) && Blogs.map((blog) => (
                    <div key={blog.id} className="w-full">
                        <BlogContent blog={blog} />
                    </div>
                ))}
            </div>
        </Content>
    );
};

export default NewFeeds;
