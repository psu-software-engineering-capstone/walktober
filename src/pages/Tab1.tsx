import { IonContent, IonPage, IonTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import NavBar from '../components/NavBar';
import ProgressChart from '../components/ProgressChart';
const data = [
  {
    day: 'M',
    steps: 20
  },
  {
    day: 'Tu',
    steps: 30
  },
  {
    day: 'W',
    steps: 10
  },
  {
    day: 'Th',
    steps: 50
  },
  {
    day: 'F',
    steps: 24
  },
  {
    day: 'Sa',
    steps: 100
  },
  {
    day: 'Su',
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
