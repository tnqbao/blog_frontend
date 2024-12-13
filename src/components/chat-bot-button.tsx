import {useRouter} from "next/router";
import {Button, message, Typography} from "antd";
import {CommentOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import ChatPage from "@/components/contents/chat-bot";

const {Text} = Typography;
interface ShareButtonProps {
    blogId: number;
}

const ChatBotButton: React.FC<ShareButtonProps> = ({blogId}) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button style={{justifySelf: 'end'}} onClick={() => {
            setModalOpen(true)}} className={"text-md hover:backdrop-brightness-200 transition-transform duration-300 transform"}>
                <CommentOutlined/>
                <Text>Ask Chatbot?</Text>
            </Button>
            <ChatPage modalOpen={modalOpen} setModalOpen={setModalOpen} blogId={blogId}/>
        </>
    );
};

export default ChatBotButton;