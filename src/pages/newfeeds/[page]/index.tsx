import {GetServerSideProps} from "next";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import {BlogType, ListBlogType} from "@/utils/types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";
import ListBlog from "@/components/contents/list-blog";
import MenuBar from "@/components/menu-bar";
import React from "react";
import Head from "next/head";
import {Typography} from "antd";
import PaginationComponent from "@/components/pagination";
import History from "@/components/contents/history";
const {Title} = Typography;

const NewfeedPage: React.FC<ListBlogType & { totalPage: number }> = ({Blogs, totalPage}) => {
    return (
        <>
            <Head>
                <Title> {"Trending in BlogMindScape" } </Title>
                <meta
                    name="description"
                    content={"Những bài viết thú vị nhất từ BlogMindScape"}
                />
            </Head>
            <div className={"bg-white flex flex-wrap md:flex-nowrap"}>
                <div className={"flex md:w-1/5"}>
                    <MenuBar isResponsive={false} defaultSelected={'3'}/>
                </div>
                <div className={"flex md:w-3/5 md:px-5"}>
                    <ListBlog Blogs={Blogs} />
                </div>
                <div className={"flex md:w-1/5"}>
                    <History />
                </div>
            </div>
            <PaginationComponent totalPage={totalPage} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withAuth(async ({locale, req, query}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
    const page = Number(query.page);
    try {
        const response = await userApiInstance.get(`/feed/allPosts/${page}`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
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
                        id: blog.user.id,
                        fullname: blog.user.fullname,
                    },
                };
            })
            : [];
        const totalPage: number = data.totalPage || 0;
        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["blog", "common", "menu"])),
                Blogs,
                totalPage,
            },
        };
    } catch (error) {
        console.error("Error fetching post:", error);

        return {
            props: {
                Blogs: null,
                totalPage: 0,
                error: 'Could not fetch the post. Please try again later.',
            },
        };
    }
});

export default NewfeedPage;