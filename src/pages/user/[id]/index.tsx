import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import Profile from "@/components/contents/profile";
import {ListBlogType, UserTypeProps} from "@/utils/types";
import Head from "next/head";
import MenuBar from "@/components/menu-bar";
import React from "react";
import ListBlog from "@/components/contents/list-blog";

const UserProfilePage: React.FC<{ user: UserTypeProps['user'], blogs: ListBlogType["Blogs"] }> = ({ user, blogs }) => {
    return (
        <>
            <Head>
                <title> {user.fullname  + " - Profile"}</title>
                <meta
                    name="description"
                    content={user.fullname + " - " + user.username}
                />
            </Head>
            <div className={"bg-white flex flex-wrap md:flex-nowrap "}>
                <div className={"flex md:w-1/5"}>
                    <MenuBar isResponsive={false} defaultSelected={'2'}/>
                </div>
                <div className={"flex flex-col w-full md:w-3/5 md:px-5"}>
                    <Profile user={user}/>
                    <ListBlog  Blogs={blogs} />
                </div>
                <div className={"flex md:w-1/5"}></div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withAuth(async ({locale, req, query}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.jwt;
    const userId = query.id;
    try {
        const response = await userApiInstance.get(`/user/${userId}`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        if (response.status != 200) {
            return {
                props: {
                    user: {},
                    blogs: [],
                    ...(await serverSideTranslations(currentLocale, ["blog", "common", "menu"])),
                },
            };
        }
        const user = response.data;


        const responseBlog = await userApiInstance.get(`/post/user/${userId}`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        if (responseBlog.status !== 200) {
            return {
                props: {
                    user: user,
                    blogs: [],
                    ...(await serverSideTranslations(currentLocale, ["blog", "common", "menu"])),
                },
            };
        }
        return {
            props: {
                user: user,
                blogs: responseBlog.data,
                ...(await serverSideTranslations(currentLocale, ["blog", "common", "menu"])),
            },
        };
    } catch (error) {
        console.error("Error fetching user data:");
    }

    return {
        props: {
            user: {},
            blogs: [],
            ...(await serverSideTranslations(currentLocale, ["blog", "common", "menu"])),
        },
    };
});

export default UserProfilePage;
