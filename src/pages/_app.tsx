import { useEffect, useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { Layout } from 'antd';
import i18n from '../../i18n';
import HeaderComp from '@/components/header';
import FooterComp from '@/components/footer';
import { AuthProvider } from "@/contexts/AuthContext";
import '@/styles/globals.css';

const { Content } = Layout;

function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (i18n.isInitialized) {
      const browserLanguage = navigator.language || 'en';
      if (i18n.language !== browserLanguage) {
        i18n.changeLanguage(browserLanguage);
      }
    } else {
      i18n.on('initialized', () => {
        const browserLanguage = navigator.language || 'en';
        if (i18n.language !== browserLanguage) {
          i18n.changeLanguage(browserLanguage);
        }
      });
    }
  }, []);

  return (
      <AuthProvider>
        <Layout className='bg-[#05ffe9]/5'>
          <HeaderComp />
          <Content className='w-full'>
            <Component {...pageProps} />
          </Content>
          <FooterComp />
        </Layout>
      </AuthProvider>
  );
}

export default appWithTranslation(App);
