import ListBlog from "@/components/contents/list-blog";
import {GetServerSideProps} from "next";
import {userApiInstance} from "@/utils/axios.config";
import {BlogType} from "@/utils/types";
import {parse} from "cookie";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import MenuBar from "@/components/menu-bar";
import {withAuth} from "@/utils/authGuard";
import React from "react";
import Head from "next/head";
import {Typography} from "antd";
import History from "@/components/contents/history";

const {Title} = Typography;


type TrendingPageProps = {
    Blogs: BlogType[] | null;
    error?: string;
};


const TrendingPage: React.FC<TrendingPageProps> = ({Blogs, error}) => {
    return (
        <>
            <Head>
                <Title> {"Treding in MindScape"}</Title>
                <meta
                    name="description"
                    content={"Nhung bai viet duoc yeu thich nhat tren BlogMindScape"}
                />
            </Head>
            <div className={"bg-white flex flex-wrap md:flex-nowrap"}>
                <title>Trending</title>
                <div className={"flex md:w-1/5"}>
                    <MenuBar isResponsive={false} defaultSelected={'2'}/>
                </div>
                <div className={"flex md:w-3/5 md:px-5"}>
                    <ListBlog Blogs={Blogs}/>
                </div>
                <div className={"flex md:w-1/5"}>
                    <History />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withAuth(async ({locale, req}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
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
                    id : blog.user.id,
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


export default TrendingPage;
