import React from "react";
import {Button, Layout, Input, Avatar} from "antd";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {useAuth} from "@/contexts/AuthContext";
import Searchbar from "@/components/searchbar";

const HeaderComp: React.FC = () => {
    const router = useRouter();
    const {t} = useTranslation("common");
    const {isAuthenticated, username} = useAuth();
    const {Header} = Layout;
    const handleButtonClick = (page: string) => {
        router.push(`/auth/${page}`);
    };

    return (
        <Header className="bg-[#ffffff] bg-none flex flex-wrap shadow-sm items-center px-4 py-3 h-1/6 gap-2 "
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>

            <div
                className="flex items-center bg-[url('https://i.imgur.com/yzO7MiG.png')] sm:bg-[url('https://i.imgur.com/uGKflOp.png')] bg-cover bg-center h-10 w-full sm:h-16 sm:w-16  rounded-md"></div>
            <div className=" flex w-1/2 ">
                <Searchbar />
            </div>
            <div className="flex space-x-2 justify-center sm:justify-end  w-full sm:w-auto mt-2 sm:mt-0">
                {isAuthenticated ? (
                    <div className="flex items-center ">
                        <Avatar
                            size={30}
                            style={{backgroundColor: "#f56a00", verticalAlign: "middle"}}
                        >
                            {username?.toString().charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="text-black ml-2">{`${t("welcome_user")}, ${username}`}</span>
                    </div>
                ) : (
                    <>
                        <Button

                            className="px-4 py-2 text-base w-full md:w-auto bg-[#05ffe9] font-modak"
                            onClick={() => handleButtonClick("login")}
                            color={"#05ffe9"}
                            suppressHydrationWarning={true}
                        >
                            {t("login")}
                        </Button>
                        <Button
                            type="default"
                            className="px-4 py-2 text-base w-full md:w-auto"
                            onClick={() => handleButtonClick("register")}
                            suppressHydrationWarning={true}
                        >
                            {t("register")}
                        </Button>
                    </>
                )}
            </div>
        </Header>
    );
};

export default HeaderComp;
