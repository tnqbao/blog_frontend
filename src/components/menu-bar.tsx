import React, {useState} from "react";
import {Button, Drawer, DrawerProps, Layout, Menu, theme} from "antd";
import {useRouter} from "next/router";
import {FireOutlined, HomeOutlined, MenuOutlined, PlusCircleOutlined, TrophyOutlined} from "@ant-design/icons";

const MenuBar = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const {Sider} = Layout;
    const router = useRouter();
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const items2 = [
        {
            key: '1',
            label: 'Home',
            path: '../',
            icon: React.createElement(HomeOutlined)
        },
        {
            key: '2',
            label: 'Trending',
            path: '../trending',
            icon: React.createElement(TrophyOutlined)
        },
        {
            key: '3',
            label: 'Newfeeds',
            path: '../newfeeds/1',
            icon: React.createElement(FireOutlined)
        },
        {
            key: '4',
            label: 'Upload',
            path: '../blog/upload',
            icon: React.createElement(PlusCircleOutlined)
        }
    ];

    return (
        <div className={"bg-white"}>
            <Button type="primary" onClick={showDrawer} className={"flex justify-center md:hidden"}>
                <MenuOutlined/>
            </Button>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                className={"hidden md:block"}
            >
                {items2.map((item) => (
                    <Menu.Item key={item.key} onClick={() => {
                        router.push(item.path)
                    }} className={"text-md"}>
                        {item.icon} {item.label}
                    </Menu.Item>
                ))}
            </Menu>
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
                    defaultSelectedKeys={['1']}
                >
                    {items2.map((item) => (
                        <Menu.Item key={item.key} onClick={() => {
                            router.push(item.path)
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
