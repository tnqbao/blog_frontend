import { ListBlogType} from "@/utils/types";
import BlogContent from "@/components/blog-content";


const ListBlog : React.FC<ListBlogType> = ({ Blogs, error}) => {

    return (
        <div>
            <div className={"bg-white h-500px h-auto flex flex-col p-4 gap-2"}>
                {Blogs && Blogs.map((blog) => (
                    <div>
                        <BlogContent blog={blog} key={blog.id}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListBlog;