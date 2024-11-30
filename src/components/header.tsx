import React from "react";
import {Button, Layout, Avatar, Divider} from "antd";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import SearchBar from "@/components/search-bar";
import {useSelector} from "react-redux";

const HeaderComp: React.FC = () => {
    const router = useRouter();
    const {t} = useTranslation("common");
    const { user } = useSelector((state: any) => state.auth);
    const isAuthenticated = (localStorage.getItem("token")!=null || sessionStorage.getItem("token")!=null) || false;
    const {Header} = Layout;
    const handleButtonClick = async (page: string) => {
       await router.push(`/auth/${page}`);
    };

    return (
        <Header className={"bg-[#ffffff] bg-none flex flex-wrap shadow-sm items-center px-4 py-3 h-1/6 gap-2 justify-evenly"} >
            <div
                className="flex items-center bg-[url('https://i.imgur.com/yzO7MiG.png')] sm:bg-[url('https://i.imgur.com/uGKflOp.png')] bg-cover bg-center h-10 w-full sm:h-16 sm:w-16  rounded-md"></div>
            <div className=" flex w-1/2 ">
                <SearchBar/>
            </div>
            <div className="flex space-x-2 justify-center sm:justify-end  w-full sm:w-auto mt-2 sm:mt-0">
                {isAuthenticated ? (
                    <div className="flex items-center ">
                        <Avatar
                            size={30}
                            style={{backgroundColor: "#f56a00", verticalAlign: "middle"}}
                        >
                            {user.fullname?.toString().charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="text-black ml-2">{`${t("welcome_user")}${user.fullname}`}</span>
                    </div>
                ) : (
                    <div className={"flex"}>
                        <Button
                            className="px-4 py-2 text-base align-text-top w-full md:w-auto font-semibold"
                            onClick={() => handleButtonClick("login")}
                            type={"text"}
                            suppressHydrationWarning={true}
                        >
                            {t("login")}
                        </Button>
                        <Button
                            type="text"
                            className="px-4 py-2 text-base w-full md:w-auto"
                            onClick={() => handleButtonClick("register")}
                            suppressHydrationWarning={true}
                        >
                            {t("register")}
                        </Button>
                    </div>
                )}
            </div>
            {/*<Divider />*/}
        </Header>
    );
};


export default HeaderComp;
