import Login from "@/components/login";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const LoginPage: React.FC = () => {
    return (
        <>
            <title>Login</title>
            <Login/>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["login", "common"])),
        },
    };
};

export default LoginPage;
