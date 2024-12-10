import Login from "@/components/login";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import {useTranslation} from "react-i18next";

const LoginPage: React.FC = () => {
    const {t} = useTranslation("login");
    return (
        <>
            <Head>
                <title> {t("title")}</title>
                <meta
                    name="description"
                    content={t("description")}
                />
            </Head>
            <Login/>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["login", "common"])),
        },
    };
};

export default LoginPage;
