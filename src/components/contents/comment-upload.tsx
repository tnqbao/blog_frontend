import React from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import {userApiInstance} from "@/utils/axios.config";
import {useRouter} from "next/router";

const CommentUpload: React.FC<{ postId: number }> = ({ postId }) => {
    const handleFinish = async (values: { comment: string }) => {
        try {
            const response = await userApiInstance.post("/comment", {
                body: values.comment,
                attachment : "",
                postID: postId,
            });
            message.success('Comment submitted successfully!');
            console.log('Comment submitted:', response);
        } catch (error) {
            message.success('Comment submitted successfully!');
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item name="comment">
                <Input.TextArea placeholder="Write your comment here..." rows={2} > </ Input.TextArea>
            </Form.Item>

            <Form.Item>
                <Space className={"justify-end w-full"}>
                    <Button type="primary" htmlType="submit" className={"hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105  "}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default CommentUpload;