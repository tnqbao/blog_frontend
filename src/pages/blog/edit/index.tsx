import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";
import MenuBar from "@/components/menu-bar";
import Head from "next/head";
import {Typography} from "antd";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import {BlogType} from "@/utils/types";
import React from "react";
import UploadEdit from "@/components/contents/blog-edit";

const {Title} = Typography;


const BlogEditPage: React.FC<{ blog: BlogType }> = ({blog}) => {
    return (
        <>
            <Head>
                <Title> Upload </Title>
                <meta
                    name="description"
                    content={"Chỉnh sửa nội dung"}
                />
            </Head>
            <div className={"bg-white flex flex-wrap md:flex-nowrap min-h-screen"}>
                <div className={"flex md:w-1/5"}>
                    <MenuBar isResponsive={false} defaultSelected={'4'}/>
                </div>
                <UploadEdit id={blog.id} body={blog.body} title={blog.title}/>
                <div className={"flex md:w-1/3"}></div>
            </div>
        </>
    );
}

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


export default BlogEditPage;