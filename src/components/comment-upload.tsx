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

    const handleCancel = () => {
        console.log('Comment cancelled');
    };

    return (
        <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item name="comment">
                <Input.TextArea placeholder="Write your comment here..." rows={2} > </ Input.TextArea>
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default CommentUpload;