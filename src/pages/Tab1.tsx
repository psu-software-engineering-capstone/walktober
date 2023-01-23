import { IonContent, IonPage, IonTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import NavBar from '../components/NavBar';
import Badge from '../components/Badge';
import Diamond, { Attribute } from '../components/Badges/Diamond';

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
        <Diamond />
        <Attribute></Attribute>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
