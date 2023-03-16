/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable multiline-ternary */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardContent
} from '@ionic/react';
import NavBar from '../../components/NavBar';
import HomePage from '../homePage/homePage';
import './landing404.css';

const landing404: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>404</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding testing d-flex">
        <IonCard className="card">
          <IonCardHeader className="card-header">
            <p className="error-info">
              Whoa there! Looks like you were looking for a page that does not
              exist.
            </p>
          </IonCardHeader>
          <IonCardContent>
            <a onClick={HomePage} className="error-link" href="/app/home">
              {' '}
              Click Here to return home.
            </a>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default landing404;
