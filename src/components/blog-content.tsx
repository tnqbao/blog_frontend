import {Button, Card, Divider, Space, Typography} from 'antd';
import React, {FC, useState} from 'react';
import {format} from 'date-fns';
import VoteButton from "@/components/vote-button";
import CommentUpload from "@/components/comment-upload";
import CommentList from "@/components/comment-list";
import {CommentType} from "@/utils/types";

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
    return format(new Date(isoDate), 'HH:mm dd/MM/yyyy');
}



const BlogContent: FC<BlogContentProps> = ({blog}) => {
    const [isCommentOpen, setCommentOpen] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [hideContent, setHideContent] = useState(true);
    return (
        <Card className={"flex flex-wrap mx-auto w-full"}>
            <Space className="flex items-start flex-col" >
                <div className="flex-grow flex items-center">
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {blog.user.fullname}
                    </Text>
                </div>
                <Text style={{fontSize: 13}} className={"text-gray-400"}>{formatDateWithDateFns(blog.createdAt)}</Text>
            </Space>
            <Divider/>
            <Title level={3}>{blog.title}</Title>
            {(<Text>
                {hideContent ? <div dangerouslySetInnerHTML={{__html: blog.body.slice(0, 300)}}/> :
                    <div dangerouslySetInnerHTML={{__html: blog.body}}/>}
            </Text>)}
            {
                blog.body.length > 400 && <button
                    className="focus:outline-none text-blue-600 drop-shadow-2xl"
                    onClick={() => setHideContent(!hideContent)}
                >
                    {hideContent ? "Show more" : "Show less"}
                </button>
            }
            <Divider/>
            <Space style={{width: '100%', flexWrap : "wrap"}}>
                <VoteButton blog={blog}/>
                <Button style={{justifySelf: 'end'}} onClick={() => {
                    setCommentOpen(!isCommentOpen)
                }}>
                    {isCommentOpen ? "Hide Comments" : "Show Comments"}
                </Button>
            </Space>
            {isCommentOpen ? (
                <>
                    <Divider/>
                    <CommentList blogId={blog.id} comments={comments} setComments={setComments}/>
                    <CommentUpload postId={blog.id}/>
                </>
            ) : null}
        </Card>
    );
};

export default BlogContent;
