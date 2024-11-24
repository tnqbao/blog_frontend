import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Layout } from 'antd';
import nextI18NextConfig from '../../../next-i18next.config.js';
import CommentUpload from "@/components/comment-upload";

const { Content } = Layout;


const Comment = () => {
    return (
        <Layout>
            <Content>
                <CommentUpload></CommentUpload>
            </Content>
        </Layout>
    )
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const currentLocale = locale || 'en';
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ['common'], nextI18NextConfig)),
        },
    };
};

export default Comment;