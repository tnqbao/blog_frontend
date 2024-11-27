import NewFeeds from "@/components/newfeeds";
import {GetServerSideProps} from "next";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import {BlogType} from "@/utils/types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

type NewfeedsProps = {
    Blogs: BlogType[] | null;
    error?: string;
};

const NewfeedPage: React.FC<NewfeedsProps> = ({Blogs}) => {
    return (
        <div>
            <NewFeeds Blogs={Blogs} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({locale, req, query}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    const page = Number(query.page);
    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
    try {
        const response = await userApiInstance.get(`/feed/allPosts/${page}`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        const data = response.data;
        console.log(data);
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



export default NewfeedPage;