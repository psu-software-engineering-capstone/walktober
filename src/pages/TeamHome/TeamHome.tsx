import { IonContent, IonPage, IonTitle } from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
import NavBar from '../../components/NavBar';
import './TeamHome.scss';

const TeamHome: React.FC = () => {
  return (
    <IonPage>
      <NavBar>
        <IonTitle>My Team</IonTitle>
      </NavBar>
      <IonContent fullscreen>
        <NavBar collapse="condense">
          <IonTitle size="large">My Team</IonTitle>
        </NavBar>
        <WidgetBot className="discord-widget"
          server="1068966007886069841"
          channel="1068966009106600110"
        />
      </IonContent>
    </IonPage>
  );
};

export default TeamHome;
