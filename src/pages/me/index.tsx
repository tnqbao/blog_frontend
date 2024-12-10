import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import Profile from "@/components/contents/profile";
import {UserTypeProps} from "@/utils/types";
import Head from "next/head";
import MenuBar from "@/components/menu-bar";
import React from "react";

const ProfilePage: React.FC<UserTypeProps> = ({user}) => {
    return (
        <>
            <Head>
                <title> {"Treding in MindScape"}</title>
                <meta
                    name="description"
                    content={"Nhung bai viet duoc yeu thich nhat tren BlogMindScape"}
                />
            </Head>
            <div className={"bg-white flex flex-wrap md:flex-nowrap"}>
                <div className={"flex md:w-1/5"}>
                    <MenuBar isResponsive={false} defaultSelected={'2'}/>
                </div>
                <div className={"flex w-full md:w-3/5"}>
                    <Profile user={user}/>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withAuth(async ({locale, req}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.jwt;

    try {
        const response = await userApiInstance.get("/user/current/me", {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            const data = response.data;
            return {
                props: {
                    user: data,
                    ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
                },
            };
        }
    } catch (error) {
        console.error("Error fetching user data:");
    }

    return {
        props: {
            user: null,
            ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
        },
    };
});

export default ProfilePage;
