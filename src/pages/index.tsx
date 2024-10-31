import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {Button, Layout} from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';
import Upload from '@/components/uploadBlog';
import {useState} from "react";

const { Content } = Layout;

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Layout>
      <Content className={"flex"}>
        {isOpen &&  <Upload />  || <Button block className={"flex-grow w-1/3"} onClick={() => {setIsOpen(!isOpen)}}></Button>}
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
