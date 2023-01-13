import { useContext, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import AuthContext from '../store/auth-context';

const Tab1: React.FC = () => {
  const ctx = useContext(AuthContext);
  const [loggedIn, setIsLoggedIn] = useState(ctx.isLoggedIn);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loggedIn ? <h1>logged in</h1> : <h1>Not Logged in</h1>}
        <IonButton
          onClick={(event: any) => {
            ctx.isLoggedIn = !ctx.isLoggedIn;
            setIsLoggedIn(ctx.isLoggedIn);
          }}
        ></IonButton>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
