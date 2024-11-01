import { GetServerSideProps } from 'next';
import { userApiInstance } from "@/utils/axiosConfig";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "@/../next-i18next.config";
import BlogContent from "@/components/blogContent";
import { post as PostType } from '@/utils/types';

interface BlogPageProps {
  post: PostType | null;
}

const BlogPage: React.FC<BlogPageProps> = ({ post }) => {
  return (
      <div>
        {post ? <BlogContent post={post} /> : <p>Post not found</p>}
      </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const currentLocale = locale || "en";
  const id = query.id as string;
  try {
    const response = await userApiInstance.get(`/posts/${id}`);
    const data = response.data;
    const post: PostType = {
      id: data.id,
      title: data.title,
      body: data.body,
      upvote: data.upvote,
      downvote: data.downvote,
      user: data.user,
    }
    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"], nextI18NextConfig)),
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);

    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"], nextI18NextConfig)),
        post: null,
      },
    };
  }
};

export default BlogPage;