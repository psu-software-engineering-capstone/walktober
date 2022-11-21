import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonImg,
    IonCardTitle,
    IonCardSubtitle,
} from "@ionic/react";
import "./ChatMessage.scss";

interface ChatMessageProps {
    sent?: boolean,    // if message was sent from this device
    src?: string,      // profile photo src url
    text: string,      // text of the message
    username?: string, // username of sender
    datetime: string,  // date and time message was sent
};

const ChatMessage: React.FC<ChatMessageProps> = ({ sent, src="", text, username="", datetime }) => {
    return (
        <div className="chat-message-container">
            {src &&
                <IonImg src={src} />
            }
            <IonCard className={sent ? "chat-message chat-message-sent" : "chat-message"} color={sent ? "primary" : "light"}>
                <IonCardHeader>
                    {username &&
                        <IonCardTitle>{username}</IonCardTitle>
                    }
                    <IonCardSubtitle>{datetime}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>{text}</IonCardContent>
            </IonCard>
        </div>
    );
};

export default ChatMessage;
