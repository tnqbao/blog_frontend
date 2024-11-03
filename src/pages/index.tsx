import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {Button, Layout} from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';
import {useRouter} from "next/router";

const {Content} = Layout;


const HomePage = () => {
    const  router = useRouter();
    return (
        <Layout className={""}>
            <Content
                className={"flex flex-wrap justify-center flex-grow h-[700px] mx-5 sm:mx-10 border border-x-blue-300 "}>
                <Button
                    className="w-1/4 text-sm mt-5"
                    onClick={() => {
                        router.push("/blog/upload");
                    }}
                >
                    Hôm nay bạn nghĩ gì?
                </Button>
            </Content>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const currentLocale = locale || 'en';
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ['common'], nextI18NextConfig)),
        },
    };
};

export default HomePage;
