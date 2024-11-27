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
        <div>

        </div>
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
