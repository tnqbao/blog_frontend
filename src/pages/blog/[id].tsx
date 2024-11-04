import BlogContent from "@/components/blogContent";
import Head from 'next/head';
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

type PostType = {
    title: string;
    body: string;
    upvote: number;
    downvote: number;
    createdAt: string;
    user : {
        fullname: string;
    }
};

type BlogPageProps = {
    post: PostType | null;
    error?: string;
};

const BlogPage: React.FC<BlogPageProps> = ({ post, error }) => {
    return (
        <div>
            <Head>
                <title>{post ? post.title : 'Post Not Found'}</title>
                <meta name="description" content={post ? post.body.substring(0, 150) : 'Blog post not found'} />
            </Head>
            {error && <p className="error">{error}</p>}
            {post ? <BlogContent data={post} /> : <p>Post not found</p>}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["login", "common"])),
        },
    };
};

export default BlogPage;
