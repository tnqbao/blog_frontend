import React from 'react';
import {Layout, Menu, theme} from 'antd';
import NewFeeds from "@/components/newfeeds";
import {BlogType} from "@/utils/types";
import {withAuth} from "@/utils/authGuard";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
const {Content, Sider} = Layout;

type TrendingPageProps = {
    Blogs: BlogType[] | null;
};

const HomePage: React.FC<TrendingPageProps> = ({Blogs}) => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    return (
        <div className={"bg-white"}><Layout style={{minHeight: '100vh'}}>
                <Layout style={{padding: '0 0 24px'}}>
                    <Content
                        style={{
                            padding: 0,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <NewFeeds Blogs={Blogs}/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};
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

