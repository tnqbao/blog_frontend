import React from "react";
import { Button, Layout } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';

const { Header } = Layout;

const HeaderComp: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleButtonClick = (page: string) => {
    router.push(`/auth/${page}`);
  };

  return (
    <Header className="bg-[#121111] flex flex-wrap shadow-md justify-between items-center px-4 py-3 h-auto">
      <div className="flex items-center bg-[url('https://i.imgur.com/dS76zJ4.png')] bg-cover bg-center h-16 w-16 rounded-md">
      </div>

      <div className="text-center flex-grow min-w-[150px]">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Mindmap Blog
        </h1>
      </div>

      <div className="flex space-x-2 justify-end w-full md:w-auto mt-2 md:mt-0">
        <Button
          type="primary"
          className="px-4 py-2 text-base w-full md:w-auto"
          onClick={() => handleButtonClick("login")}
        >
          {t('login')}
        </Button>
        <Button
          type="default"
          className="px-4 py-2 text-base w-full md:w-auto"
          onClick={() => handleButtonClick("register")}
        >
          {t('register')}
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComp;
