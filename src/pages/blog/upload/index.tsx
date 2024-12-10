import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";
import MenuBar from "@/components/menu-bar";
import Upload from "@/components/contents/blog-upload";
import Head from "next/head";
import {Typography} from "antd";

const {Title} = Typography;
const UpLoadPage: React.FC = () => {
    return (
        <>
            <Head>
                <Title> Upload </Title>
                <meta
                    name="description"
                    content={"Hôm nay bạn nghĩ gì??"}
                />
            </Head>
            <div className={"bg-white flex flex-wrap md:flex-nowrap min-h-screen"}>
                <div className={"flex md:w-1/6"}>
                    <MenuBar isResponsive={false} defaultSelected={'4'}/>
                </div>
                <Upload/>

            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withAuth(async ({locale}) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
        },
    };
});


export default UpLoadPage;