import { Card, Typography, Divider } from 'antd';
import { FC } from 'react';
import { post as PostType } from '@/utils/types';

const { Title, Text } = Typography;

interface BlogContentProps {
    post: PostType;
}

const BlogContent: FC<BlogContentProps> = ({ post }) => {
    return (
        <Card  style={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
            <Title level={3}>{post.title}</Title>
            <Text>{post.body}</Text>
            <Divider />
            <Text strong>Upvotes:</Text> {post.upvote} | <Text strong>Downvotes:</Text> {post.downvote}
            <Divider />
            <Text type="secondary">Author: {post.user?.username || "Anonymous"}</Text>
        </Card>
    );
};

export default BlogContent;