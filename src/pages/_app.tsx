import {useEffect, useState} from 'react';
import {appWithTranslation} from 'next-i18next';
import i18n from '../../i18n';

import {AppProps} from 'next/app';
import {Layout} from 'antd';

import HeaderComp from '@/components/header';
import FooterComp from '@/components/footer';

import {AuthProvider} from "@/providers/AuthContext";

import {Provider} from 'react-redux';
import {store} from '@/utils/redux';

import '@/styles/globals.css';



const {Content} = Layout;

function App({Component, pageProps}: AppProps) {
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
        <Provider store={store}>
            <AuthProvider>
                <Layout className='bg-[#05ffe9]/5'>
                    <HeaderComp/>
                    <Content className='w-full'>
                        <Component {...pageProps} />
                    </Content>
                    <FooterComp/>
                </Layout>
            </AuthProvider>
        </Provider>
    );
}

export default appWithTranslation(App);
