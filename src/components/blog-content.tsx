import {Button, Card, Divider, Space, Typography} from 'antd';
import React, {FC} from 'react';
import {format} from 'date-fns';
import VoteButton from "@/components/vote-button";

const {Title, Text} = Typography;

type BlogType = {
    id: number;
    title: string;
    body: string;
    upvote: number;
    downvote: number;
    createdAt: string;
    user: {
        fullname: string;
    };
};

type BlogContentProps = {
    blog: BlogType;
};

function formatDateWithDateFns(isoDate: string): string {
    return format(new Date(isoDate), 'dd/MM/yyyy HH:mm');
}

const BlogContent: FC<BlogContentProps> = ({blog}) => {

    return (
        <Card style={{maxWidth: 600, margin: 'auto'}}>
            <Space className="flex justify-between">
                <div className="flex-grow flex items-center">
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {blog.user.fullname}
                    </Text>
                </div>
                <Text>{formatDateWithDateFns(blog.createdAt)}</Text>
            </Space>
            <Divider/>
            <Title level={3}>{blog.title}</Title>
            <Text>
                <div dangerouslySetInnerHTML={{ __html: blog.body }} />
            </Text>
            <Divider/>
            <Space style={{width: '100%'}}>
                <VoteButton blog={blog} />
                <Button style={{justifySelf: 'end'}}>Comment</Button>
            </Space>
        </Card>
    );
};

export default BlogContent;
