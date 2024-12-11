import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Register from "@/components/register";


const RegisterPage: React.FC = () => {
  return (
      <>
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
