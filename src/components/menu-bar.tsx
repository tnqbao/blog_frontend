import React, {useState} from "react";
import {Button, Divider, Drawer, DrawerProps, Menu} from "antd";
import {useRouter} from "next/router";
import {
    FireOutlined,
    HomeOutlined,
    MenuOutlined,
    PlusCircleOutlined,
    TrophyOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

const MenuBar = ({isResponsive, defaultSelected} : {isResponsive : boolean, defaultSelected: string}) => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');
    const { t } = useTranslation("menu");
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const router = useRouter();
    const items = [
        {
            key: '1',
            label: t('home'),
            path: '../',
            icon: React.createElement(HomeOutlined)
        },
        {
            key: '2',
            label: t('trending'),
            path: '../trending',
            icon: React.createElement(TrophyOutlined)
        },
        {
            key: '3',
            label: t('newfeed'),
            path: '../newfeeds/1',
            icon: React.createElement(FireOutlined)
        },
        {
            key: '4',
            label: t('upload'),
            path: '../blog/upload',
            icon: React.createElement(PlusCircleOutlined)
        },
        {
            key: '5',
            label: t('profile'),
            path: '../me',
            icon: React.createElement(UserOutlined)
        }
    ];

    return (
        <div className={"flex md:block w-full pt-4 md:bg-white md:border-r-2 pr-2" }>
            {isResponsive === true ?
                <Button type="primary" onClick={showDrawer} className={"flex justify-center md:hidden bg-black/95"}>
                    <MenuOutlined/>
                </Button> : null}
            <Menu
                theme={"light"}
                mode="inline"
                defaultSelectedKeys={[defaultSelected]}
                className={"hidden md:flex flex-col px-4"}

            >
                {items.map((item) => (
                    <Menu.Item key={item.key} onClick={() => {
                        router.push(item.path)
                    }} className={"text-md hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 "}>
                        {item.icon} {item.label}
                    </Menu.Item>
                ))}
            </Menu>
            <Divider />
            <Drawer
                placement={placement}
                closable={false}
                onClose={onClose}
                open={open}
                key={placement}
            >
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={[defaultSelected]}
                >
                    {items.map((item) => (
                        <Menu.Item key={item.key} onClick={() => {
                            router.push(item.path)
                            setOpen(false);

                        }} className={"text-md"}>
                            {item.icon} {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Drawer>
        </div>
    )
        ;
};

export default MenuBar;
