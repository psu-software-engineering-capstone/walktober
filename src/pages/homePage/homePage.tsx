/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable multiline-ternary */
import { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
  IonCardHeader,
  IonCardContent,
  IonCardTitle
} from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import ProgressChart from '../../components/ProgressChart';
import AuthContext from '../../store/auth-context';
import AdminContext from '../../store/admin-context';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, FirestoreDB } from '../../firebase';
import LeaderBoardChart from '../../components/LeaderBoard/LeaderBoardChart';
import PostEventSurvey from '../postEventSurvey/postEventSurvey';
import './homePage.css';

interface StepLog {
  date: string;
  steps: number;
}

const HomePage: React.FC = () => {
  const [steps, setSteps] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const history = useHistory();
  const [pastSevenDaysSteps, setPastSevenDaysSteps] = useState(Array<StepLog>);
  const [showPostSurvey, setShowPostSurvey] = useState(false);
  const [stepGoal, setStepGoal] = useState(0);

  const ctx = useContext(AuthContext); // auth context
  const adminInfo = useContext(AdminContext);

  // update profile data when the page loads
  // update profile data when the profile data changes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(FirestoreDB, 'users', auth.currentUser.email as string),
      (doc: any) => {
        if (doc.exists()) {
          getPastSevenDaysSteps(doc.data());
        }
      }
    );
    return () => {
      console.log('unsubscribing from home page');
      unsubscribe();
    };
  }, [ctx.user]);

  useEffect(() => {
    const now = Date.now();
    const today = new Date(now);
    const end = new Date(adminInfo.endDate);
    setShowPostSurvey(today > end);
  }, []);

  // get past seven days of steps from firestore
  const getPastSevenDaysSteps = async (userData: any) => {
    const stepsByDate = userData.stepsByDate;
    setTotalSteps(userData.totalStep);
    //Add today's step count
    if (stepsByDate.length > 0) {
      const now = Date.now();
      const today = new Date(now).toISOString().slice(0, 10);
      if (stepsByDate[0].date === today) {
        setSteps(stepsByDate[0].steps);
      }
      else if (stepsByDate[stepsByDate.length - 1].date === today) {
        setSteps(stepsByDate[stepsByDate.length - 1].steps);
      }
      else{
        setSteps(0);
      }
    }

    // Create an array of the last seven dates (including today)
    const pastSevenDaysDates = [];
    for (let i = 1; i < 8; i++) {
      const now = Date.now();
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      pastSevenDaysDates.push(date.toISOString().slice(0, 10));
    }
    // Populate pastSevenDays with step count or 0 for each date
    const pastSevenDays = pastSevenDaysDates.map((date) => {
      const stepLog = stepsByDate.find(
        (stepLog: StepLog) => stepLog.date === date
      );
      if (stepLog) {
        return stepLog;
      } else {
        return { date: date, steps: 0 };
      }
    });
    setPastSevenDaysSteps(pastSevenDays.reverse());
    setStepGoal(stepGoal);
  };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // move to manual steps page
  const moveToManualSteps = () => {
    history.push('/app/manualsteps');
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Home Page</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding testing">
        {showPostSurvey ? <PostEventSurvey/> : ''}
        <IonGrid>
          <IonRow>
            <IonCol
              sizeXs='12'
              sizeSm='12'
              sizeMd='6'
              sizeLg='6'
              sizeXl='6'>
              <IonRow>
                <IonCol className='restrict-height'>
                  <LeaderBoardChart></LeaderBoardChart>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                </IonCol>
              </IonRow>
            </IonCol>
            <IonCol
              sizeXs='12'
              sizeSm='12'
              sizeMd='6'
              sizeLg='6'
              sizeXl='6'>
              <IonRow>
                <IonCol
                  sizeXs='12'
                  sizeSm='12'
                  sizeMd='12'
                  sizeLg='6'
                  sizeXl='6'>
                  <IonCard className='team-card'>
                    <IonCardHeader>
                      <IonCardTitle>
                        <p className="step-title">Today&apos;s Steps:</p>
                        <div className='step-counter'>
                          {steps.toLocaleString()}
                        </div>
                      </IonCardTitle>
                      <IonCardTitle>
                        <p className="step-title">Total Steps:</p>
                        <div className='step-counter'>
                          {totalSteps.toLocaleString()}
                        </div>
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>Click <a onClick={moveToManualSteps} className="link-color">here </a>
                      to add or edit steps.</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol
                  sizeXs='12'
                  sizeSm='12'
                  sizeMd='12'
                  sizeLg='6'
                  sizeXl='6'>
                  <IonCard className='team-card'>
                    <IonCardHeader>
                      <IonCardTitle>
                        Progress:
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {pastSevenDaysSteps.length > 1 ? (
                        <ProgressChart data={pastSevenDaysSteps} todayStep={steps} stepGoal={stepGoal} />
                      ) : (
                        ' '
                      )}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard className='team-card discord-card'>
                    <IonCardContent>
                      <WidgetBot
                        className="discord-widget"
                        server="1068966007886069841"
                        channel="1068966009106600110"
                      />
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
