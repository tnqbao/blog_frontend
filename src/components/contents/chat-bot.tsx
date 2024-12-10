import React, { useEffect, useRef, useState } from "react";
import { RootState } from "@/utils/redux/store";
import { useSelector } from "react-redux";
import { Modal } from "antd";

interface Message {
    role : string;
    username: string;
    content: string;
}

interface ChatPageProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ modalOpen, setModalOpen }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState("");
    const ws = useRef<WebSocket | null>(null);
    const { user } = useSelector((state: RootState) => state.auth);
    const username = user.username;

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080/ws");

        ws.current.onmessage = (event) => {
            const message: Message = JSON.parse(event.data);
            setMessages((prev) => [...prev, message]);
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    const sendMessage = () => {
        if (username.trim() && content.trim() && ws.current?.readyState === WebSocket.OPEN) {
            const message: Message = {  role : "user",username, content };
            ws.current.send(JSON.stringify(message));
            setContent("");
        }
    };

    return (
        <>
            <Modal
                title="Chat MindMap"
                centered
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <div className="h-80 overflow-y-auto p-4 bg-gray-100">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-bold text-blue-600">{msg.username ? msg.username : "Mindmap"}: </span>
                            <span>{msg.content}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center p-2 border-t">
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="border p-2 rounded flex-1 mr-2"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ChatPage;
