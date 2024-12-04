import {GetServerSideProps} from "next";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import {BlogType, ListBlogType} from "@/utils/types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";
import ListBlog from "@/components/contents/list-blog";
import MenuBar from "@/components/menu-bar";
import React from "react";

const NewfeedPage: React.FC<ListBlogType> = ({Blogs}) => {

    return (
        <div className={"bg-white flex flex-wrap md:flex-nowrap"}>
            <title>Newfeed</title>
            <div className={"flex md:w-1/3"}>
                <MenuBar isResponsive={false}/>
            </div>
            <ListBlog Blogs={Blogs}/>
            <div className={"flex md:w-1/3"}></div>
        </div>
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



export default NewfeedPage;