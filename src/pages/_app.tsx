import React, {useEffect, useState} from 'react';
import {appWithTranslation} from 'next-i18next';
import i18n from '@/../i18n';

import {AppProps} from 'next/app';
import {Layout, Menu, theme} from 'antd';

import HeaderComp from '@/components/header';
import FooterComp from '@/components/footer';
import {Provider} from 'react-redux';
import '@/styles/globals.css';
import {PersistGate} from "redux-persist/integration/react";
import {persistor , store} from "@/utils/redux/store";
import MenuBar from "@/components/menu-bar";



const {Content, Sider} = Layout;

function App({Component, pageProps}: AppProps) {
    const [isClient, setIsClient] = useState(false);
    const { isAuthenticated } = store.getState().auth;
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
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
                    <Layout>
                        <MenuBar />
                        <Layout style={{padding: '0 24px 24px'}}>
                            <Content
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    minHeight: 280,
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                <Component {...pageProps} />
                            </Content>
                        </Layout>
                    </Layout>
                    <FooterComp/>
                </Layout>
            </PersistGate>
        </Provider>
    );
}

export default appWithTranslation(App);
