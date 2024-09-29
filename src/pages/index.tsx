import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout>
      <Content>
        <div className="flex-row h-full items-center justify-center">
        <h1 className=''>Welcome to the Home Page</h1>
        </div>
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
