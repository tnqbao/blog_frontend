import {Button, message, Popconfirm, Popover} from "antd";
import ChatBotButton from "@/components/chat-bot-button";
import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import {useRouter} from "next/router";
import PredictEmotionButton from "@/components/contents/predict-emotion-button";

const BlogMenu: React.FC<{ autherId: number, userId: number, blogId: number, blogContent : string }> = ({ autherId, userId, blogId, blogContent }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handlerConfirm = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/blog/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ blogId })
            });
            if (res.ok) {
                message.success("Blog deleted successfully");
                const path = router.asPath;
                if (path === `/blog/${blogId}`) {
                    router.push('../');
                }
                router.reload();
            } else {
                console.error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        } finally {
            setLoading(false);
        }
    }

    const handlerCancel = () => {
        console.log('Ko xoa nua');
    }

    const content = (
        <div className={"flex flex-col w-full gap-2 text-start"}>
            <ChatBotButton blogId={blogId} />
            <PredictEmotionButton  content={blogContent} />
            {autherId === userId && (
                <>
                    <Popconfirm
                        title="Delete the blog"
                        description="Are you sure to delete this Blog?"
                        onConfirm={handlerConfirm}
                        onCancel={handlerCancel}
                        okText="Sure"
                        cancelText="No"
                    >
                        <Button danger loading={loading}>Delete</Button>
                    </Popconfirm>
                    <Button onClick={() => router.push(`/blog/edit/${blogId}`)}>Edit</Button>
                </>
            )}
        </div>
    );

    return (
        <>
            <Popover content={content} placement="bottomLeft" overlayStyle={{ minWidth: '160px' }}>
                <Button><MoreOutlined /></Button>
            </Popover>
        </>
    );
};

export default BlogMenu;
