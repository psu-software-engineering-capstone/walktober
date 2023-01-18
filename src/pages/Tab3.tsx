import { IonContent, IonPage, IonTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import NavBar from '../components/NavBar';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <NavBar>
        <IonTitle>Tab 3</IonTitle>
      </NavBar>
      <IonContent fullscreen>
        <NavBar collapse="condense">
          <IonTitle size="large">Tab 3</IonTitle>
        </NavBar>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
