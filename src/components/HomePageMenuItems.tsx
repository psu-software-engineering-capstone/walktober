/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement } from 'react';
import { IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';

const HomePageMenuItems: React.FC<{}> = (): ReactElement => {
  const history = useHistory();
  return (
    <IonContent>
      <IonButton
        onClick={() => {
          history.push("/app/team");
        }}
      >
        Team Home
      </IonButton>
      <hr />
      <IonButton
        onClick={() => {
          history.push("app/chat/team");
        }}
      >
        Team Chat
      </IonButton>
      <hr />
      <IonButton
        onClick={() => {
          history.push("/app/home");
        }}
      >
        Filler
      </IonButton>
    </IonContent>
  );
};

export default HomePageMenuItems;
