import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";
import {Layout} from "antd";
import MenuBar from "@/components/menu-bar";
import Upload from "@/components/contents/blog-upload";

const UpLoadPage: React.FC = () => {
    return (
        <div className={"bg-white flex flex-wrap md:flex-nowrap"}>
            <title>Upload</title>
            <div className={"flex md:w-1/6"}>
                <MenuBar isResponsive={false} defaultSelected={'4'}/>
            </div>
            <Upload />

        </div>
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