import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';
import Upload from '@/components/uploadBlog';

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout>
      <Content>
        <Upload></Upload>
      </Content>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || 'en';
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ['common'], nextI18NextConfig)),
    },
  };
};

export default HomePage;
