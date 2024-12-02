import {CommentType} from "@/utils/types";
import {Divider, Space, Typography} from "antd";
import React from "react";
import {format} from "date-fns";
const { Text} = Typography;

function formatDateWithDateFns(isoDate: string): string {
    return format(new Date(isoDate), 'HH:mm dd/MM/yyyy');
}
const Comment : React.FC<CommentType> = ({ body, createdAt, user}) => {
    return (
        <div>
            <div className={"bg-white h-auto flex flex-col "}>
                <div className={"flex flex-col gap-1"}>
                    <Space className="flex justify-between">
                        <div className="flex-grow flex items-center">
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                {user.fullname}
                            </Text>
                        </div>
                        <Text style={{fontSize: 13}} className={"text-gray-400"}>{formatDateWithDateFns(createdAt)}</Text>
                    </Space>

                    <Text style={{fontSize: 14}}>
                        {body}
                    </Text>
                    <Divider/>

                </div>
            </div>
        </div>
    );
}

export default Comment;