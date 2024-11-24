import { useEffect, useState } from "react";

export function useWebSocket() {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_API}/ws`);

        socket.onopen = () => {
            console.log("WebSocket connected");
            setWs(socket);
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error: ", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const sendMessage = (message: object) => {
        if (ws) {
            ws.send(JSON.stringify(message));
        }
    };

    return { messages, sendMessage };
}
