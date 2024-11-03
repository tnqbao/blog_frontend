import {Card, Space, Avatar} from 'antd';
import React, {FC} from 'react';
import {GetServerSideProps} from "next";
import {Divider, Typography} from 'antd';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const {Title, Text} = Typography;

type PostType = {
    title: string;
    body: string;
    upvote: number;
    downvote: number;
    createdAt: string;
};

type BlogContentProps = {
    data: PostType;
};
export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["login", "common"])),
        },
    };
};

const BlogContent: FC<BlogContentProps> = ({data}) => {
    return (
        <Card style={{maxWidth: 600, margin: 'auto', marginTop: 20}}>
            <Title level={3}>{data.title}</Title>
            <Text>{data.body}</Text>
            <Divider/>
            <Text strong>Upvotes:</Text> {data.upvote} | <Text strong>Downvotes:</Text> {data.downvote}
            <Divider/>
            <Space>
                <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                <Text>Author: John Doe</Text> | <Text>{data.createdAt}</Text>
            </Space>
        </Card>
    );
};

export default BlogContent;
