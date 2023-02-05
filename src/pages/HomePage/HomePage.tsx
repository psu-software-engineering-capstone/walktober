/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable multiline-ternary */
import { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton
} from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
import { useHistory } from 'react-router';
import PersonalProgress from '../../components/PersonalProgress';
import NavBar from '../../components/NavBar';
import './HomePage.css';
import AuthContext from '../../store/auth-context';
import { getDoc } from 'firebase/firestore';
import { auth, FirestoreDB } from '../../firebase';
import { doc } from 'firebase/firestore';
import Example from '../exitQuestions/exitQuestionsModal';

interface badgeOutline {
  name: string;
}

interface StepLog {
  date: string;
  steps: number;
}

const HomePage: React.FC = (): any => {
  const [steps, setSteps] = useState(0);
  const [badges, setBadges] = useState(Array<badgeOutline>);
  const [pastSevenDaysSteps, setPastSevenDaysSteps] = useState(Array<StepLog>);
  const history = useHistory();

  const ctx = useContext(AuthContext);

  useEffect(() => {
    getPastSevenDaysSteps();
  }, []);

  const getPastSevenDaysSteps = async () => {
    if (ctx.user === null) {
      alert('You are not logged in!');
      history.push('/login');
      return;
    }
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const dbSnap = await getDoc(dbRef);
    const userData = dbSnap.data();
    const stepsByDate = userData.stepsByDate;
    const today = new Date();
    const pastSevenDays = [];
    for (let i = 0; i < stepsByDate.length; i++) {
      const date = new Date(stepsByDate[i].date);
      const diff = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      if (diff < 8 && diff >= 0) {
        pastSevenDays.push(stepsByDate[i]);
      }
    }
    setPastSevenDaysSteps(pastSevenDays);
  };

  const stepUpdateHandler = (event: any): void => {
    const newValue = document.querySelector('#stepsUpdate') as HTMLInputElement;
    const newSteps = Number(newValue.value);
    if (newSteps > 0) {
      setSteps(newSteps);
    }
  };

  const moveToManualSteps = () => {
    history.push('/app/manualsteps');
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Home</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="auto">
                <IonItem>
                  <IonLabel>
                    Todays Steps:
                    <IonInput
                      id="stepsUpdate"
                      type="number"
                      placeholder={steps.toString()}
                      onInput={(event: any) => {
                        stepUpdateHandler(event);
                      }}
                      min="1"
                      step="1"
                    ></IonInput>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              click
              <IonButton onClick={moveToManualSteps}>here</IonButton>
              to see previous logs
            </IonRow>
          </IonGrid>
        </IonItem>
        <IonItem>
          <IonLabel>
            Badges Acquired:
            <div>
              {badges.map((badge) => (
                <IonIcon name={badge.name} key={Math.random()}></IonIcon>
              ))}
            </div>
          </IonLabel>
        </IonItem>

        {/* below is only for development testing purposes */}
        <IonGrid>
          <IonRow>
            <IonCol className="boxSize">Location for leaderboards</IonCol>
            <IonCol className="boxSize">
              <WidgetBot
                className="discord-widget"
                server="1068966007886069841"
                channel="1068966009106600110"
              />
            </IonCol>
            <IonCol>
              <IonRow>
                <IonCol className="boxSize">Location for anouncments</IonCol>
                  <Example/>
              </IonRow>
              <IonRow>
                <IonCol className="boxSize">
                  Location for personal Progress: <PersonalProgress />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
