import { ListBlogType} from "@/utils/types";
import BlogContent from "@/components/contents/blog-content";


const ListBlog : React.FC<ListBlogType> = ({ Blogs, error}) => {

    return (
            <div className={"bg-white h-500px h-auto flex flex-col py-4 gap-2 w-full"}>
                {Blogs && Blogs.map((blog) => (
                    <div>
                        <BlogContent blog={blog} key={blog.id}/>
                    </div>
                ))}
            </div>
    );
}

export default ListBlog;