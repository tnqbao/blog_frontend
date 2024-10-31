import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {Button, Layout} from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';
import Upload from '@/components/uploadBlog';
import {useAuth} from "@/contexts/AuthContext";


const { Content } = Layout;

const HomePage = () => {
  const {isOpen, changeIsOpen} = useAuth();
  return (
    <Layout>
      <Content className={"flex justify-center flex-grow h-[500px] w-full mt-5"}>
        {isOpen &&  <Upload />  || <Button
            className="w-1/4 text-sm"
            onClick={() => { changeIsOpen() }}
        >
          Hôm nay bạn nghĩ gì?
        </Button>}
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
