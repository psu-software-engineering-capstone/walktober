/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable multiline-ternary */
import { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent
  // useIonToast
} from '@ionic/react';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import './landing404.css';
import AuthContext from '../../store/auth-context';
import HomePage from '../homePage/homePage';

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
            <a onClick={HomePage} className="error-info" href="/app/home">
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
