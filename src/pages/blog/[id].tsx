// import { GetServerSideProps } from 'next';
// import nextI18NextConfig from "@/../next-i18next.config";
// import BlogContent from "@/components/blogContent";
// import { userApiInstance } from "@/utils/axiosConfig";
// import Head from 'next/head';
//
// type PostType = {
//     title: string;
//     body: string;
//     upvote: number;
//     downvote: number;
//     createdAt: string;
// };
//
// type BlogPageProps = {
//     post: PostType | null;
//     error?: string;
// };
//
// const BlogPage: React.FC<BlogPageProps> = ({ post, error }) => {
//     return (
//         <div>
//             <Head>
//                 <title>{post ? post.title : 'Post Not Found'}</title>
//                 <meta name="description" content={post ? post.body.substring(0, 150) : 'Blog post not found'} />
//             </Head>
//             {error && <p className="error">{error}</p>}
//             {post ? <BlogContent data={post} /> : <p>Post not found</p>}
//         </div>
//     );
// };
//
// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//     const id = query.id as string;
//
//     try {
//         const response = await userApiInstance.get(`/post/${id}`, { withCredentials: true });
//         const data = await response.data;
//
//         const post: PostType = {
//             title: data.title,
//             body: data.body,
//             upvote: data.upvote,
//             downvote: data.downvote,
//             createdAt: data.createdAt,
//         };
//
//         return {
//             props: {
//                 post,
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching post:", error);
//
//         return {
//             props: {
//                 post: null,
//                 error: 'Could not fetch the post. Please try again later.',
//             },
//         };
//     }
// };
//
// export default BlogPage;
