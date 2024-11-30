import React from "react";
import {Menu, theme} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {Layout} from "antd";
import {useRouter} from "next/router";


const MenuBar = () => {
    const {Sider} = Layout;
    const router = useRouter();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const items2 = [
        {
            key: '1',
            label: 'Home',
            path: '../',
        },
        {
            key: '2',
            label: 'Trending',
            path: '../trending',
        },
        {
            key: '3',
            label: 'Newfeeds',
            path: '../newfeeds/0',
        },
    ];

    return (
        <Sider
            breakpoint="md"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            style={{ background: colorBgContainer }}
        >
            <div className="demo-logo-vertical"/>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
            >
                {items2.map((item) => (
                    <Menu.Item key={item.key} onClick={() => {router.push(item.path)}} >
                        { item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>

    );
};

export default MenuBar;
