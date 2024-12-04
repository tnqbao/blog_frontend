import React from "react";
import {Dropdown, MenuProps, Space} from 'antd';
import {Avatar, Button, Layout} from "antd";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import SearchBar from "@/components/search-bar";
import {useSelector} from "react-redux";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import MenuBar from "@/components/menu-bar";

const HeaderComp: React.FC = () => {
    const router = useRouter();
    const {t} = useTranslation("common");
    const {user} = useSelector((state: any) => state.auth);
    const isAuthenticated = (localStorage.getItem("token") != null || sessionStorage.getItem("token") != null) || false;
    const {Header} = Layout;

    const handleButtonClick = async (page: string) => {
        await router.push(`/auth/${page}`);
    };

    const handleLogout = async () => {
        try {
            const resp = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (resp.status === 200) {
                localStorage.clear();
                sessionStorage.clear();
                await router.push("../auth/login");
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const items: MenuProps['items'] = [
        {
            label: <div onClick={() => {
                router.push("../profile")
            }}>Profile</div>,
            key: '0',
            icon: React.createElement(UserOutlined)
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={handleLogout}>Logout</div>,
            key: '1',
            icon: React.createElement(LogoutOutlined),
            danger: true,
        },
    ];

    return (
        <Header
            className={"bg-[#ffffff] bg-none flex flex-wrap shadow-sm items-center px-4 py-3 h-1/6 gap-2 justify-evenly"}>
            <div className={"block md:hidden"}>
                <MenuBar isResponsive={true}/>
            </div>
            <div
                className="flex items-center bg-[url('https://i.imgur.com/yzO7MiG.png')] sm:bg-[url('https://i.imgur.com/uGKflOp.png')] bg-cover bg-center h-10 w-full sm:h-16 sm:w-16  rounded-md"></div>
            <div className=" flex w-1/2 ">
                <SearchBar/>
            </div>
            <div className="flex space-x-2 justify-center sm:justify-end  w-full sm:w-auto mt-2 sm:mt-0">
                {isAuthenticated ? (
                    <Dropdown menu={{items}} trigger={['click']}>
                        <Space>
                            <div className="flex items-center ">
                                <Avatar
                                    size={30}
                                    style={{backgroundColor: "#f56a00", verticalAlign: "middle"}}
                                >
                                    {user.fullname?.toString().charAt(0).toUpperCase()}
                                </Avatar>
                                <span className="text-black ml-2">{`${t("welcome_user")} ${user.fullname}`}</span>
                            </div>
                        </Space>
                    </Dropdown>

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