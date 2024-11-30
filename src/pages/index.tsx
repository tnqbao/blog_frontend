import NewFeeds from "@/components/newfeeds";
import {GetServerSideProps} from "next";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import {BlogType} from "@/utils/types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";

type NewfeedsProps = {
    Blogs: BlogType[] | null;
    error?: string;
};

const HomePage: React.FC<NewfeedsProps> = ({Blogs}) => {
    return (
        <div>
            <NewFeeds Blogs={Blogs} />
        </div>
    );
}

export const getServerSideProps = withAuth(async ({locale, req, query}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    try {
        const response = await userApiInstance.get(`/feed/allPosts/0`, {
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
});



export default HomePage;