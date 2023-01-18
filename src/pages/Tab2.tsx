import { IonContent, IonPage, IonTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import NavBar from '../components/NavBar';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <NavBar>
        <IonTitle>Tab 2</IonTitle>
      </NavBar>
      <IonContent fullscreen>
        <NavBar collapse="condense">
          <IonTitle size="large">Tab 2</IonTitle>
        </NavBar>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
