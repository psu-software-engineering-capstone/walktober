/* eslint-disable react/prop-types */
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
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import ProgressChart from '../../components/ProgressChart';
import AuthContext from '../../store/auth-context';
import LeaderBoardChart from '../../components/LeaderBoard/LeaderBoardChart';
import './homePage.css';

interface badgeOutline {
  name: string;
}

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

const HomePage: React.FC<{ data: userData | null }> = ({ data }) => {
  const [steps, setSteps] = useState(0);
  const [badges, setBadges] = useState(Array<badgeOutline>);
  const [pastSevenDaysSteps, setPastSevenDaysSteps] = useState(Array<StepLog>);

  const history = useHistory(); // used to redirect to other pages

  const ctx = useContext(AuthContext); // auth context

  // set past seven days of steps
  useEffect(() => {
    if (ctx.user && data) {
      getPastSevenDaysSteps();
    }
  }, [ctx.user, data]);

  // get past seven days of steps from firestore
  const getPastSevenDaysSteps = async () => {
    if (ctx.user === null || data === null) {
      alert('You are not logged in!');
      history.push('/login');
      return;
    }
    // set steps by date from props data
    const stepsByDate = data.stepsByDate;
  
    // Create an array of the last seven dates (including today)
    const pastSevenDaysDates = [];
    for (let i = 1; i < 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      pastSevenDaysDates.push(date.toISOString().slice(0, 10));
    }
  
    // Populate pastSevenDays with step count or 0 for each date
    const pastSevenDays = pastSevenDaysDates.map(date => {
      const stepLog = stepsByDate.find((stepLog: StepLog) => stepLog.date === date);
      if (stepLog) {
        return stepLog;
      } else {
        return { date: date, steps: 0 };
      }
    });
  
    setPastSevenDaysSteps(pastSevenDays.reverse());
  };

  // const stepUpdateHandler = (event: any): void => {
  //   const newValue = document.querySelector('#stepsUpdate') as HTMLInputElement;
  //   const newSteps = Number(newValue.value);
  //   if (newSteps > 0) {
  //     setSteps(newSteps);
  //   }
  // };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getPastSevenDaysSteps(); // Refresh data
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
        <IonGrid>
          <IonRow>
            <IonCol
              sizeXs="12"
              sizeSm="6"
              sizeMd="6"
              sizeLg="4"
              className="leaderBoard"
            >
              <LeaderBoardChart></LeaderBoardChart>
            </IonCol>
            <IonCol
              sizeXs="12"
              sizeSm="6"
              sizeMd="6"
              sizeLg="4"
              className="todaysSteps"
            >
              <IonLabel className="">
                Todays Steps:{' '}
                <div className="localStepsUpdater">{steps.toString()}</div>
              </IonLabel>
              {/* <IonItem
                className="localStepsUpdater"
                id="stepsUpdate"
                placeholder={steps.toString()}
                onInput={(event: any) => {
                  stepUpdateHandler(event);
                }}
              >
                sad
              </IonItem> */}
              <br />
              click
              <a onClick={moveToManualSteps}> here </a>
              to see previous logs
            </IonCol>
            <IonCol
              sizeXs="12"
              sizeSm="6"
              sizeMd="6"
              sizeLg="4"
              className="personalProgress"
            >
              {pastSevenDaysSteps.length > 1 ? (
                <ProgressChart data={pastSevenDaysSteps} />
              ) : (
                ' '
              )}
            </IonCol>
            <IonCol
              size="3"
              sizeXs="12"
              sizeSm="6"
              sizeMd="6"
              sizeLg="8"
              offsetLg="4"
              className="box-test"
            >
              <WidgetBot
                className="discord-widget"
                server="1068966007886069841"
                channel="1068966009106600110"
              />
            </IonCol>
          </IonRow>

          <IonCol sizeMd="12">
            <IonLabel>
              Badges Acquired:
              <div>
                {badges.map((badge) => (
                  <IonIcon name={badge.name} key={Math.random()}></IonIcon>
                ))}
              </div>
            </IonLabel>
          </IonCol>
        </IonGrid>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
