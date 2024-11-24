import Trending from "@/components/trending";
import {GetServerSideProps} from "next";
import NewPost from "@/pages/blog/upload";
import {userApiInstance} from "@/utils/axios.config";
import {BlogType} from "@/utils/types";
import {parse} from "cookie";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

type TrendingPageProps = {
    Blogs: BlogType[] | null;
    error?: string;
};


const TrendingPage: React.FC<TrendingPageProps> = ({Blogs, error}) => {
    return (
        <div className={"bg-white h-500px h-auto"}>
            <Trending Blogs={Blogs} error={error}/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({locale, req}) => {
    const currentLocale = locale || "en";
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
        const response = await userApiInstance.get(`/feed/top30`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        const data = response.data;
        const Blogs: BlogType[] = data.map((blog: any) => {
            return {
                id: blog.id,
                title: blog.title,
                body: blog.body,
                upvote: blog.upvote,
                downvote: blog.downvote,
                createdAt: blog.createdAt,
                user: {
                    fullname: blog.user.fullname,
                },
            };
        });

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
                Blogs,
            },
        };
    } catch (error) {
        console.error("Error fetching post:", error);

        return {
            props: {
                Blogs: null,
                error: 'Could not fetch the post. Please try again later.',
            },
        };
    }
};


export default TrendingPage;
