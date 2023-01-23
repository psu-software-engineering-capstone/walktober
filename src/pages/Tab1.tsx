import { IonContent, IonPage, IonTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import NavBar from '../components/NavBar';
import Badge from '../components/Badge';
import Diamond, { Attribute } from '../components/Badges/Diamond';
import GoalComplete from '../components/Badges/CompleteGoal';
import TeamPlayer from '../components/Badges/TeamPlayer';
import MarathonBadge from '../components/Badges/Marathon';
import ConnectFitnessTracker from '../components/Badges/ConnectFitnessTracker';
import FirstSteps from '../components/Badges/FirstSteps';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <NavBar>
        <IonTitle>Tab 1</IonTitle>
      </NavBar>
      <IonContent fullscreen>
        <NavBar collapse="condense">
          <IonTitle size="large">Tab 1</IonTitle>
        </NavBar>
        <Badge></Badge>
        <FirstSteps />
        <TeamPlayer />
        <ConnectFitnessTracker />
        <GoalComplete />
        <MarathonBadge />
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
