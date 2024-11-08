import {Card, Space, Avatar, Button} from 'antd';
import React, {FC} from 'react';
import {Divider, Typography} from 'antd';
const {Title, Text} = Typography;
type BlogType = {
    title: string;
    body: string;
    upvote: number;
    downvote: number;
    createdAt: string;
    user : {
        fullname: string;
    }
};

type BlogContentProps = {
    blog: BlogType;
};


const BlogContent: FC<BlogContentProps> = ({blog}) => {
    return (
        <Card style={{maxWidth: 600, margin: 'auto', marginTop: 20}}>
            <Space>
                <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                <Text>Author: {blog.user.fullname}</Text> | <Text>{blog.createdAt}</Text>
            </Space>
            <Divider />
            <Title level={3}>{blog.title}</Title>
            <Text>{blog.body}</Text>
            <Divider/>
            <Button >Upvotes: {blog.upvote} </Button>  | <Button >Downvotes: {blog.downvote}</Button>
            <Divider/>
        </Card>
    );
};

export default BlogContent;
