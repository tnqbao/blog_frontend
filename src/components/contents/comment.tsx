import { CommentType } from "@/utils/types";
import { Divider, Space, Typography } from "antd";
import React from "react";
import { format } from "date-fns";
import CommentMenu from "@/components/contents/comment-menu";

const { Text } = Typography;

function formatDateWithDateFns(isoDate: string): string {
    return format(new Date(isoDate), 'HH:mm dd/MM/yyyy');
}

const Comment: React.FC<{ comment: CommentType, userId: number }> = ({ comment, userId }) => {
    const { body, createdAt, user, id } = comment;
    return (
        <div>
            <div className={"bg-white h-auto flex flex-col "}>
                <div className={"flex flex-col gap-1"}>
                    <Space className="flex justify-between">
                        <Space className="flex items-center justify-between ">
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }} className={"flex"}>
                                {user.fullname}
                            </Text>
                            <Text style={{ fontSize: 13 }} className={"text-gray-400 flex"}>{formatDateWithDateFns(createdAt)}</Text>
                        </Space>
                        <CommentMenu autherId={user.id} userId={userId} commentId={id} />
                    </Space>

                    <Text style={{ fontSize: 14 }}>
                        {body}
                    </Text>
                    <Divider />

                </div>
            </div>
        </div>
    );
}

export default Comment;
