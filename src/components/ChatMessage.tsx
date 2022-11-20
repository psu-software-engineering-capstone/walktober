import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonImg,
    IonCardTitle,
} from "@ionic/react";
import "./ChatMessage.scss";

interface ChatMessageProps {
    sent?: boolean,
    src?: string,
    text: string,
    username?: string
};

const ChatMessage: React.FC<ChatMessageProps> = ({ sent, src="", text, username="" }) => {
    return (
        <div className="chat-message-container">
            {src &&
                <IonImg src={src} />
            }
            <IonCard className={sent ? "chat-message chat-message-sent" : "chat-message"} color={sent ? "primary" : "light"}>
                {username &&
                    <IonCardHeader>
                        <IonCardTitle>{username}</IonCardTitle>
                    </IonCardHeader>
                }
                <IonCardContent>{text}</IonCardContent>
            </IonCard>
        </div>
    );
};

export default ChatMessage;
