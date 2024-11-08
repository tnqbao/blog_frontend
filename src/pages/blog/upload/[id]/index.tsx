import { GetServerSideProps } from 'next';
import BlogContent from "@/components/blogContent";
import { userApiInstance } from "@/utils/axiosConfig";
import Head from 'next/head';

type BlogType = {
    title: string;
    body: string;
    upvote: number;
    downvote: number;
    createdAt: string;
    user : {
        fullname : string;
    }
}

type BlogPageProps = {
    blog: BlogType | null;
    error?: string;
};

const BlogPage: React.FC<BlogPageProps> = ({ blog, error }) => {
    return (
        <div>
            <Head>
                <title>{blog ? blog.title : 'Post Not Found'}</title>
                <meta name="description" content={blog ? blog.body.substring(0, 150) : 'Blog post not found'} />
            </Head>
            {error && <p className="error">{error}</p>}
            {blog ? <BlogContent blog={blog} /> : <p>Post not found</p>}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const blogId = Number(query.id) || 1;
    try {
        const response = await userApiInstance.get(`/post/${blogId}`, { withCredentials: true });
        const data = await response.data;

        const blog: BlogType = {
            title: data.title,
            body: data.body,
            upvote: data.upvote,
            downvote: data.downvote,
            createdAt: data.createdAt,
            user : {
                fullname : data.user.fullname
            }
        };

        return {
            props: {
                blog,
            },
        };
    } catch (error) {
        console.error("Error fetching post:", error);

        return {
            props: {
                post: null,
                error: 'Could not fetch the post. Please try again later.',
            },
        };
    }
};

export default BlogPage;