import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {Button, Card, Layout} from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';
import Upload from '@/components/blogUpload';
import {useAuth} from "@/contexts/AuthContext";


const {Content} = Layout;

const HomePage = () => {
    const {isOpen, changeIsOpen} = useAuth();
    return (
        <Layout className={""}>
            <Content
                className={"flex flex-wrap justify-center flex-grow h-[700px] mx-5 sm:mx-10 border border-x-blue-300 " + (isOpen ? "bg-black/20" : "bg-white")}>
                <Button
                    className="w-1/4 text-sm mt-5"
                    onClick={() => {
                        changeIsOpen()
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
