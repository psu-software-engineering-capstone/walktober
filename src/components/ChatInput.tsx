import { addCircleOutline, paperPlaneOutline } from 'ionicons/icons';
import {
  IonIcon,
  IonButton,
  IonInput
} from '@ionic/react';
import './ChatInput.scss';

const ChatInput: React.FC = () => {
  return (
    <div className="chat-input">
      <form>
        <IonButton slot="icon-only" color="dark" fill="clear" size="small">
          <IonIcon icon={addCircleOutline}></IonIcon>
        </IonButton>
        <IonInput
          type="text"
          placeholder="Type your message here..."
          enterkeyhint="enter"
          name="chat-input-message"
          autofocus
          required
        ></IonInput>
        <IonButton slot="icon-only" color="dark" fill="clear">
          <IonIcon icon={paperPlaneOutline}></IonIcon>
        </IonButton>
      </form>
    </div>
  );
};

export default ChatInput;
