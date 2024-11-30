import { BlogType } from "@/utils/types";
import BlogContent from "@/components/blog-content";

type TrendingPageProps = {
    Blogs: BlogType[] | null;
    error?: string;
};

const NewFeeds: React.FC<TrendingPageProps> = ({ Blogs, error }) => {
    return (
        <div className="bg-white p-4">
            <div className="flex flex-col gap-8">
                {Blogs && Blogs.map((blog) => (
                    <div key={blog.id} className="w-full">
                        <BlogContent blog={blog} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewFeeds;
