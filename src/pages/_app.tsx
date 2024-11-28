import {useEffect, useState} from 'react';
import {appWithTranslation} from 'next-i18next';
import i18n from '../../i18n';

import {AppProps} from 'next/app';
import {Layout} from 'antd';

import HeaderComp from '@/components/header';
import FooterComp from '@/components/footer';
import {Provider} from 'react-redux';
import '@/styles/globals.css';
import {PersistGate} from "redux-persist/integration/react";
import {persistor , store} from "@/utils/redux/store";



const {Content} = Layout;

function App({Component, pageProps}: AppProps) {
    const [isClient, setIsClient] = useState(false);
    const { isAuthenticated } = store.getState().auth;
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
        < Provider store={store} >
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <Layout className='bg-[#05ffe9]/5'>
                    <HeaderComp/>
                    <Content className='w-full'>
                        <Component {...pageProps} />
                    </Content>
                    <FooterComp/>
                </Layout>
            </PersistGate>
        </Provider>
    );
}

export default appWithTranslation(App);
