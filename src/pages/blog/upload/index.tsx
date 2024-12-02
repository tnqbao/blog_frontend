import Upload from "@/components/blog-upload";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";
import {Layout} from "antd";
import MenuBar from "@/components/menu-bar";

const {Sider, Content} = Layout;
const UpLoadPage: React.FC = () => {
    return (
        <Layout className={"bg-white w-full h-[550px]"}>
            <MenuBar/>
            <Content style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
                background: '#f0f2f5',
                borderRadius: '10px',
            }}>
                <Upload/>
            </Content>
            <Sider className={"hidden sm:block"}/>
        </Layout>
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