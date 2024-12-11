import {Button, Card, Divider, Space, Typography} from 'antd';
import React, {FC, useState} from 'react';
import {format} from 'date-fns';

import {BlogType, CommentType} from "@/utils/types";
import {CommentOutlined} from "@ant-design/icons";

import VoteButton from "@/components/vote-button";
import CommentUpload from "@/components/contents/comment-upload";
import CommentList from "@/components/contents/comment-list";
import Share from "@/components/share-button";
import BlogMenu from "@/components/contents/blog-menu";
import {useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {useRouter} from "next/router";


const {Title, Text} = Typography;


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
    const router = useRouter();
    const {user} = useSelector((state: RootState) => state.auth);
    const userId = user.id;
    const cardTitle =
        (<Space className="flex items-baseline md:items-start md:flex-col">
            <div className="flex-grow flex items-center">
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {blog.user.fullname}
                </Text>
            </div>
            <Text style={{fontSize: 13}} className={"text-gray-400 hover:cursor-pointer"} onClick={() => { router.push(`../blog/${blog.id}`)}}>{formatDateWithDateFns(blog.createdAt)}</Text>
        </Space>);


    return (
        <Card title={cardTitle}
              extra={<BlogMenu autherId={blog.user.id} userId={userId} blogId={blog.id}></BlogMenu>}
              className={"flex flex-col py-4 h-auto"}>

            <Title level={3}>{blog.title}</Title>
            {(<Text onDoubleClick={() => setHideContent(!hideContent)}>
                {hideContent ? <div dangerouslySetInnerHTML={{__html: blog.body.slice(0, 400)}}/> :
                    <div dangerouslySetInnerHTML={{__html: blog.body}}/>}
            </Text>)}
            {
                blog.body.length > 400 && <Button
                    className="focus:outline-none text-blue-600 drop-shadow-2xl"
                    onClick={() => setHideContent(!hideContent)}
                    type={"text"}
                >
                    {hideContent ? "Show more" : "Show less"}
                </Button>
            }
            <Divider/>
            <Space style={{width: '100%', flexWrap: "wrap"}}>
                <VoteButton blog={blog}/>
                <Button style={{justifySelf: 'end'}} onClick={() => {
                    setCommentOpen(!isCommentOpen)
                }}>
                    <CommentOutlined/>
                    <Text>Comments</Text>
                </Button>

                <Share blogId={blog.id}/>
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
