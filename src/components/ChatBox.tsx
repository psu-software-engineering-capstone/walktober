import React from "react";
import "./ChatBox.scss";
import ChatInput from "./ChatInput";

interface ChatBoxProps {
    children: React.ReactNode
};

const ChatBox: React.FC<ChatBoxProps> = ({ children }) => {
    return (
        <div className="chat-box-container">
            <div className="chat-box-messages">
                {children}
            </div>
            <ChatInput />
        </div>
    );
};

export default ChatBox;
