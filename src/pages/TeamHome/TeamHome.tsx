import {
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle
} from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
import { useState } from 'react';
import LeaderBoardChart from '../../components/LeaderBoard/LeaderBoardChart';
import NavBar from '../../components/NavBar';
import './TeamHome.scss';

const TeamHome: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [steps, setSteps] = useState(0);
  return (
    <IonPage>
      <NavBar>
        <IonTitle>My Team</IonTitle>
      </NavBar>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol
              size="3"
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="3"
              offset="3"
            >
              <IonLabel className="">
                Todays Steps:{' '}
                <div className="localStepsUpdater">{steps.toString()}</div>
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="3">
              Location for team chart: <LeaderBoardChart></LeaderBoardChart>
            </IonCol>
            <IonCol size="7" className="box-size">
              {/*
               * TODO: change channel based on current team
               *
               * To find channel ID:
               * 1. Discord user settings (next to mute/deafen buttons) > Advanced
               *      > enable "Developer Mode"
               * 2. Right-click on channel name in server
               * 3. Click "Copy ID"
               */}
              <WidgetBot
                className="discord-widget"
                server="1068966007886069841"
                channel="1068966009106600110"
              />
            </IonCol>
            <IonCol size="2">
              Location for members status
              {}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TeamHome;
