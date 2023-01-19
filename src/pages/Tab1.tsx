import { IonContent, IonPage, IonTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import NavBar from '../components/NavBar';
import ProgressChart from '../components/ProgressChart';
const data = [
  {
    day: 'monday',
    steps: 20
  },
  {
    day: 'tuesday',
    steps: 30
  },
  {
    day: 'wednesday',
    steps: 10
  },
  {
    day: 'thursday',
    steps: 50
  },
  {
    day: 'friday',
    steps: 24
  },
  {
    day: 'saturday',
    steps: 100
  },
  {
    day: 'sunday',
    steps: 21
  }
];

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
        <ProgressChart data={data} />
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
