import {Button, message, Popconfirm, Popover} from "antd";
import React, {useState} from "react";
import {DeleteOutlined, MoreOutlined, WarningOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

const CommentMenu: React.FC<{ autherId: number, userId: number, commentId: number }> = ({
                                                                                            autherId,
                                                                                            userId,
                                                                                            commentId
                                                                                        }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handlerConfirm = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/comment/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({commentId: commentId})
            });
            if (res.ok) {
                message.success("Blog deleted successfully");
                router.reload();
            } else {
                console.error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        } finally {
            setLoading(false);
        }
    }

    const handlerCancel = () => {
        console.log('Ko xoa nua');
    }

    const content = (
        <div className={"flex flex-col w-full gap-2"}>
            {autherId === userId ? (
                <>
                    <Popconfirm
                        title="Delete the comment"
                        description="Are you sure to delete this comment?"
                        onConfirm={handlerConfirm}
                        onCancel={handlerCancel}
                        okText="Sure"
                        cancelText="No"
                    >
                        <Button danger loading={loading}>Delete <DeleteOutlined /></Button>
                    </Popconfirm>
                    {/*<Button onClick={() => router.push(`/blog/edit/${commentId}`)}>Edit</Button>*/}
                </>
            ) : (<Button className={"text-md"} onClick={() => message.success("Reported!")}> Report <WarningOutlined /></Button>
            )}
        </div>
    );

    return (
        <>
            <Popover content={content} placement="bottomLeft" overlayStyle={{minWidth: '160px'}}>
                <Button><MoreOutlined/></Button>
            </Popover>
        </>
    );
};

export default CommentMenu;
