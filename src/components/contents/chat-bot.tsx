import React, { useEffect, useRef, useState } from "react";
import { RootState } from "@/utils/redux/store";
import { useSelector } from "react-redux";
import { Button, Form, Input, Modal } from "antd";

interface Message {
    role: string;
    username: string;
    content: string;
    blogId: number;
}

interface ChatPageProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    blogId: number;
}

const ChatPage: React.FC<ChatPageProps> = ({ modalOpen, setModalOpen, blogId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState("");
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const { user } = useSelector((state: RootState) => state.auth);
    const username = user?.username || "";

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080/ws");

        ws.current.onmessage = (event) => {
            const message: Message = JSON.parse(event.data);
            setMessages((prev) => [...prev, message]);
            console.log("WebSocket message:", message);
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.current.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = 0;
        }
    }, [messages]);

    const sendMessage = () => {
        if (username.trim() && content.trim() && ws.current?.readyState === WebSocket.OPEN) {
            const message: Message = { role: "user", username, content, blogId };
            ws.current.send(JSON.stringify(message));
            setContent("");
        }
    };

    const onFormFinish = (values: { link: string }) => {
        localStorage.setItem("ai_domain", values.link);
        setIsLinkModalOpen(false);
    };

    const ChatLinkModal = () => (
        <Modal
            title="Enter your credit card information"
            centered
            open={isLinkModalOpen}
            onCancel={() => setIsLinkModalOpen(false)}
            footer={null}
        >
            <Form onFinish={onFormFinish}>
                <Form.Item
                    name="link"
                    rules={[{ required: true, message: "Link is required" }]}
                >
                    <Input placeholder="Link" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );

    return (
        <>
            <ChatLinkModal />
            <Modal
                title={
                    <div className="flex w-full gap-10">
                        <button onDoubleClick={() => setIsLinkModalOpen(true)}>
                            Chat MindScape
                        </button>
                    </div>
                }
                centered
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <div
                    ref={chatContainerRef}
                    className="h-80 overflow-y-auto p-4 bg-gray-100"
                >
                    {messages
                        .slice()
                        .map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.username}:</strong> {msg.content}
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
                        disabled={!content.trim()}
                    >
                        Send
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ChatPage;
