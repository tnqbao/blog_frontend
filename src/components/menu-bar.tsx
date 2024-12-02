import React from "react";
import {Menu, theme} from "antd";
import {Layout} from "antd";
import {useRouter} from "next/router";
import {FireOutlined, HomeOutlined, PlusCircleOutlined, TrophyOutlined} from "@ant-design/icons";

const MenuBar = () => {
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
            icon : React.createElement(HomeOutlined)
        },
        {
            key: '2',
            label: 'Trending',
            path: '../trending',
            icon : React.createElement(FireOutlined)
        },
        {
            key: '3',
            label: 'Newfeeds',
            path: '../newfeeds/1',
            icon: React.createElement(TrophyOutlined)
        },
        {
            key: '4',
            label: 'Upload',
            path: '../blog/upload',
            icon: React.createElement(PlusCircleOutlined)
        }
    ];

    return (
        <Sider
            breakpoint="md"
            collapsedWidth="0"
            style={{ background: colorBgContainer }}
        >
            <div className="demo-logo-vertical"/>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
            >
                {items2.map((item) => (
                    <Menu.Item key={item.key} onClick={() => {router.push(item.path)}} className={"text-md"} >
                        {item.icon} { item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>

    );
};

export default MenuBar;
