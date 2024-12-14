import {GetServerSideProps} from 'next';
import BlogContent from "@/components/contents/blog-content";
import {userApiInstance} from "@/utils/axios.config";
import {parse} from 'cookie';
import {BlogType} from "@/utils/types";
import {withAuth} from "@/utils/authGuard";
import MenuBar from "@/components/menu-bar";
import React from "react";
import Head from "next/head";
import {Typography} from "antd";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import History from "@/components/contents/history";

const {Title} = Typography

const BlogPage: React.FC<{ blog: BlogType }> = ({blog}) => {
    return (
        <>
            <Head>
                <Title> {blog.title}</Title>
                <meta
                    name="description"
                    content={(blog.body.length > 100) ? blog.body.slice(100) : blog.body}
                />
            </Head>
            <div className={"bg-none flex flex-wrap md:flex-nowrap min-h-screen"}>
                <div className={"flex md:w-1/5"}>
                    <MenuBar isResponsive={false} defaultSelected={'1'}/>
                </div>
                <div className={"flex md:w-3/5"}>
                    <BlogContent blog={blog}/>
                </div>
                <div className={"flex md:w-1/3"}>
                    <History />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withAuth(async ({query, req, locale}) => {
    const blogId = Number(query.id) || 1;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
    const currentLocale = locale || "en";

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
                id: data.user.id,
                fullname: data.user.fullname,
            },
        };

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["blog", "common", "menu"])),
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
