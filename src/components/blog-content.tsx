import {Button, Card, Divider, Space, Typography} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {DislikeOutlined} from '@ant-design/icons';
import {format} from 'date-fns';
import {useWebSocket} from '@/utils/hooks/useWebSocket';

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
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(blog.upvote);
    const [downvoteCount, setDownvoteCount] = useState(blog.downvote);

    const {sendMessage} = useWebSocket();

    const jwt = localStorage.getItem('token') || sessionStorage.getItem('token') || '';

    useEffect(() => {
        setIsUpvoted(localStorage.getItem(`isUpvote@${blog.id}`) === 'true');
        setIsDownvoted(localStorage.getItem(`isDownVote@${blog.id}`) === 'true');
    }, [blog.id]);

    const handleUpvote = async () => {
        try {
            if (isUpvoted) {
                setUpvoteCount((prev) => prev - 1);
                setIsUpvoted(false);
                localStorage.removeItem(`isUpvote@${blog.id}`);
                sendMessage({
                    token: jwt,
                    type: 'cancelUpvote',
                    postId: blog.id,
                });
            } else if (!isDownvoted) {
                setUpvoteCount((prev) => prev + 1);
                setIsUpvoted(true);
                localStorage.setItem(`isUpvote@${blog.id}`, 'true');
                sendMessage({
                    token: jwt,
                    type: 'upvote',
                    postId: blog.id,
                });
            } else {
                setDownvoteCount((prev) => prev - 1);
                setIsDownvoted(false);
                localStorage.removeItem(`isDownVote@${blog.id}`);
                setUpvoteCount((prev) => prev + 1);
                setIsUpvoted(true);
                localStorage.setItem(`isUpvote@${blog.id}`, 'true');

                sendMessage({
                    token: jwt,
                    type: 'upvote',
                    postId: blog.id,
                });

                sendMessage({
                    token: jwt,
                    type: 'cancelDownvote',
                    postId: blog.id,
                });
            }
        } catch (error) {
            console.error('Error sending upvote:', error);
            alert('Failed to send upvote. Please try again.');
        }
    };

    const handleDownvote = async () => {
        try {
            if (isDownvoted) {
                setDownvoteCount((prev) => prev - 1);
                setIsDownvoted(false);
                localStorage.removeItem(`isDownVote@${blog.id}`);
                sendMessage({
                    token: jwt,
                    type: 'cancelDownvote',
                    postId: blog.id,
                });
            } else if (!isUpvoted) {
                setDownvoteCount((prev) => prev + 1);
                setIsDownvoted(true);
                localStorage.setItem(`isDownVote@${blog.id}`, 'true');
                sendMessage({
                    token: jwt,
                    type: 'downvote',
                    postId: blog.id,
                });
            } else {
                setUpvoteCount((prev) => prev - 1);
                setIsUpvoted(false);
                localStorage.removeItem(`isUpvote@${blog.id}`);
                setDownvoteCount((prev) => prev + 1);
                setIsDownvoted(true);
                localStorage.setItem(`isDownVote@${blog.id}`, 'true');

                sendMessage({
                    token: jwt,
                    type: 'downvote',
                    postId: blog.id,
                });

                sendMessage({
                    token: jwt,
                    type: 'cancelUpvote',
                    postId: blog.id,
                });
            }
        } catch (error) {
            console.error('Error sending downvote:', error);
            alert('Failed to send downvote. Please try again.');
        }
    };

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
            <Text>{blog.body}</Text>
            <Divider/>
            <Space style={{width: '100%'}}>
                <Button
                    onClick={handleUpvote}
                    type={isUpvoted ? 'primary' : 'default'}
                >
                    <svg fill="#000000" className={"w-6 h-6"} viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                    </svg>
                    {upvoteCount}
                </Button>
                <Button
                    onClick={handleDownvote}
                    type={isDownvoted ? 'primary' : 'default'}
                >
                    <svg fill="#000000" className={"w-6 h-6"} viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z"/>
                    </svg>
                    {downvoteCount}
                </Button>
                <Button style={{justifySelf: 'end'}}>Comment</Button>
            </Space>
        </Card>
    );
};

export default BlogContent;
