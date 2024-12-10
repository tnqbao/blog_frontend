import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Register from "@/components/register";
import {useTranslation} from "react-i18next";
import Head from "next/head";


const RegisterPage: React.FC = () => {
  const {t} = useTranslation("register");
  return (
      <>
        <Head>
          <title> {t("title")}</title>
          <meta
              name="description"
              content={t("description")}
          />
        </Head>
        <Register />
      </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["register", "common"])),
    },
  };
};

export default RegisterPage;
