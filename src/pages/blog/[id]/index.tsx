import { GetServerSideProps } from 'next';
import BlogContent from "@/components/blog-content";
import { userApiInstance } from "@/utils/axios.config";
import Head from 'next/head';
import { parse } from 'cookie';
import {BlogType} from "@/utils/types";
import {withAuth} from "@/utils/authGuard";



type BlogPageProps = {
    blog: BlogType | null;
    error?: string;
};

const BlogPage: React.FC<BlogPageProps> = ({ blog, error }) => {
    return (
        <div>
            <Head>
                <title>{blog ? blog.title : 'Post Not Found'}</title>
                <meta
                    name="description"
                    content={blog ? blog.body.substring(0, 150) : 'Blog post not found'}
                />
            </Head>
            {error && <p className="error">{error}</p>}
            {blog ? <BlogContent blog={blog} /> : <p>Post not found</p>}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = withAuth(async ({ query, req }) => {
    const blogId = Number(query.id) || 1;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;

    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    try {
        const response = await userApiInstance.get(`/post/${blogId}`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        const data = response.data;
        const blog: BlogType = {
            id: data.id,
            title: data.title,
            body: data.body,
            upvote: data.upvote,
            downvote: data.downvote,
            createdAt: data.createdAt,
            user: {
                fullname: data.user.fullname,
            },
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
                blog: null,
                error: 'Could not fetch the post. Please try again later.',
            },
        };
    }
});

export default BlogPage;
