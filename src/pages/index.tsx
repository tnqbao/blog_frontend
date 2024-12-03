import React from 'react';
import {Layout, theme} from 'antd';
import {BlogType} from "@/utils/types";
import {withAuth} from "@/utils/authGuard";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import MenuBar from "@/components/menu-bar";
import ListBlog from "@/components/list-blog";

const {Content, Sider} = Layout;

type TrendingPageProps = {
    Blogs: BlogType[] | null;
};

const HomePage: React.FC<TrendingPageProps> = ({Blogs}) => {
    return (
        <div className={"bg-white"}>
            <Layout style={{minHeight: '100vh'}}>
                <MenuBar />
                <Content >
                    <ListBlog Blogs={Blogs}/>
                </Content>
                <Sider className={"hidden md:block bg-white"} />
            </Layout>
        </div>
    );
};
export const getServerSideProps = withAuth(async ({locale, req, query}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
    try {
        const response = await userApiInstance.get(`/feed/allPosts/1`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true
        });

        const data = response.data;
        const Blogs: BlogType[] = Array.isArray(data?.postInPage)
            ? data.postInPage.map((blog: any) => {
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
            })
            : [];

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

