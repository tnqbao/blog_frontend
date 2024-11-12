import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {Button, Layout} from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const {Content} = Layout;


const HomePage = () => {
    const  router = useRouter();
    const { t } = useTranslation('common');
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
                    {t('postButton')}
                </Button>
            </Content>
            <Button className={"bg-black"} onClick={
                () => {
                    router.push("/blog/1");
                }
            }>ABCD</Button>
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
