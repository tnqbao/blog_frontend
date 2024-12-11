import { ListBlogType} from "@/utils/types";
import BlogContent from "@/components/contents/blog-content";


const ListBlog : React.FC<ListBlogType> = ({ Blogs, error}) => {

    return (
        <div className="bg-white min-h-screen h-auto flex flex-col py-4 gap-4 w-full items-center">
            {Blogs && Blogs.map((blog) => (
                <div key={blog.id} className="w-full max-w-2xl">
                    <BlogContent blog={blog}/>
                </div>
            ))}
        </div>
    );
}

export default ListBlog;