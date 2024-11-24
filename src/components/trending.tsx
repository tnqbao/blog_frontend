import {BlogType} from "@/utils/types";
import BlogContent from "@/components/blog-content";

type TrendingPageProps = {
    Blogs: BlogType[] | null;
    error?: string;
}

const Trending : React.FC<TrendingPageProps> = ({ Blogs, error}) => {

    return (
        <div>
            <div className={"bg-white h-500px h-auto flex flex-col gap-10"}>
                {Blogs && Blogs.map((blog) => (
                    <div>
                        <BlogContent blog={blog} key={blog.id}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trending;