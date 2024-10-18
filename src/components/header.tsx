import React from "react";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useAuth } from "@/contexts/AuthContext";

const HeaderComp: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { isAuthenticated, username } = useAuth(); 

  const handleButtonClick = (page: string) => {
    router.push(`/auth/${page}`);
  };

  return (
    <header className="bg-black/80">
      <div className="bg-none flex flex-wrap shadow-md justify-around items-center px-4 py-3 h-auto">
        <div className="flex items-center bg-[url('https://i.imgur.com/aMY5YTJ.png')] bg-cover bg-center h-16 w-16 rounded-md"></div>
        <div className="text-start ml-3 flex-grow min-w-[150px]">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Blog MindMap
          </h1>
        </div>
        <div className="flex space-x-2 justify-end w-full md:w-auto mt-2 md:mt-0">
          {isAuthenticated ? (
            <div className="flex items-center">
              <span className="text-white ml-2">{`${t("welcome_user")}, ${username}`}</span>
            </div>
          ) : (
            <>
              <Button
                type="primary"
                className="px-4 py-2 text-base w-full md:w-auto"
                onClick={() => handleButtonClick("login")}
              >
                {t("login")}
              </Button>
              <Button
                type="default"
                className="px-4 py-2 text-base w-full md:w-auto"
                onClick={() => handleButtonClick("register")}
              >
                {t("register")}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComp;
