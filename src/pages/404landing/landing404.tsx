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
import { Link } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';
import { auth, FirestoreDB } from '../../firebase';
import { doc } from 'firebase/firestore';

interface StepLog {
  date: string;
  steps: number;
}
interface userData {
  email: string;
  name: string;
  badges: string[];
  device: string;
  totalStep: number;
  profile_pic: string;
  team: string;
  team_leader: boolean;
  stepsByDate: StepLog[];
  admin: boolean;
}

const landing404: React.FC = () => {
  const [userData, setUserData] = useState<userData | null>(null);

  const ctx = useContext(AuthContext); // auth context

  // get user data from firestore
  useEffect(() => {
    if (ctx.user) {
      const unsubscribe = onSnapshot(
        doc(FirestoreDB, 'users', auth.currentUser.email as string),
        (doc: any) => {
          if (doc.exists()) {
            setUserData(doc.data());
          }
        }
      );
      return unsubscribe;
    }
  }, [ctx.user]);

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
            {ctx.user ? (
                <Link to={{ pathname: '/app/home', state: { data: userData } }} className="error-info">
                  Click Here to return.
                </Link>) : (
                <Link to={{ pathname: '/login'}} className="error-info">
                  Click Here to return.
                </Link>
              )
            }
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default landing404;
