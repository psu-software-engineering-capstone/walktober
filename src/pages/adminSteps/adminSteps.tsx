// File created by NathanMoes, aim is to create a manual steps recording page for admin to use in editing the steps of users.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonTitle,
  IonGrid,
  IonRow,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonCardContent,
  IonCard
} from '@ionic/react';
import './adminSteps.css';
import { FirestoreDB } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import NavBar from '../../components/NavBar';
import { useHistory, useParams } from 'react-router-dom';

interface AdminStepsParams {
  email: string;
}

const AdminSteps: React.FC<{ email: string }> = () => {
  interface StepLog {
    date: string;
    steps: number;
  }

  // state variables //
  const [logsName, setLogsName] = useState('');
  const [logsTeam, setLogsTeam] = useState('');
  const [currentTotalSteps, setCurrentTotalSteps] = useState(0);
  const [manualDate, setManualDate] = useState('');
  const [manualSteps, setManualSteps] = useState(0);
  const [stepLogs, setStepLogs] = useState<StepLog[]>([]);
  const [totalStep, setTotalStep] = useState(0);
  const [updateTotalStep, setUpdateTotalStep] = useState(false);
  const [updateDB, setUpdateDB] = useState(false);
  const { email: emailParam } = useParams<AdminStepsParams>();

  const history = useHistory(); // for routing

  // get data from db
  useEffect(() => {
    getData();
  }, [emailParam]);

  // calculate new total steps
  useEffect(() => {
    if (updateTotalStep === true) {
      let sum = 0;
      for (let i = 0; i < stepLogs.length; i++) {
        sum += stepLogs[i].steps;
      }
      setTotalStep(sum);
      setUpdateDB(true);
    }
    setUpdateTotalStep(false);
  }, [updateTotalStep]);

  // call update db function
  useEffect(() => {
    if (updateDB === true) {
      sendNewLog();
    }
    setUpdateDB(false);
  }, [updateDB]);

  // get data from db
  const getData = async () => {
    const dbRef = doc(FirestoreDB, 'users', emailParam);
    const dbSnap = await getDoc(dbRef);
    const stepsByDate = dbSnap.data().stepsByDate;
    const name = dbSnap.data().name;
    const team = dbSnap.data().team;
    const currentTotal = dbSnap.data().totalStep;
    setLogsName(name);
    setLogsTeam(team);
    setStepLogs(stepsByDate);
    setCurrentTotalSteps(currentTotal);
  };

  // update db with new steps
  const sendNewLog = async () => {
    const dbRef = doc(FirestoreDB, 'users', emailParam);
    await updateDoc(dbRef, {
      stepsByDate: stepLogs,
      totalStep: totalStep
    })
      .then(() => {
        updateTeam(currentTotalSteps, totalStep); // update team total steps and average steps
        alert('Steps Updated');
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  // update team total steps and average steps
  const updateTeam = async (currentTotalSteps: any, totalStep: any) => {
    if (logsTeam === '') {
      return; // user is not in a team
    }
    const dbRef = doc(FirestoreDB, 'teams', logsTeam);
    getDoc(dbRef).then((doc: any) => {
      if (doc.exists()) {
        const teamData = doc.data();
        const teamTotalSteps = teamData.totalStep;
        const newTotalSteps = teamTotalSteps - currentTotalSteps + totalStep;
        const newAvgSteps = newTotalSteps / teamData.members.length;
        updateDoc(dbRef, {
          totalStep: newTotalSteps,
          avg_steps: newAvgSteps
        })
          .then(() => {
            console.log('Team total steps and average steps updated');
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    });
  };
  // This function is for the displaying of the date in the step log. Previously, toDateString would provide the wrong date due to difference in time zone coversions
  function returnDate(item: string): string {
    const originalDate = new Date(item);
    originalDate.setDate(originalDate.getDate() + 1);
    return originalDate.toDateString();
  }

  // display records
  function DisplayRecords(): any {
    if (stepLogs.length > 0) {
      stepLogs.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return (
        <>
          <IonGrid>
            <IonRow>
              <IonCol className="log-col-l">Date:</IonCol>
              <IonCol className="log-col">Steps:</IonCol>
              <IonCol></IonCol>
            </IonRow>

            {stepLogs.map((item) => (
              <IonRow key={Math.random()}>
                <IonCol className="log-col-l">{returnDate(item.date)}</IonCol>
                <IonCol className="log-col">
                  {item.steps.toLocaleString()}
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </>
      );
    } else {
      return (
        <>
          <IonGrid>
            <IonRow>
              <IonCol>Date:</IonCol>
              <IonCol>Steps:</IonCol>
            </IonRow>
          </IonGrid>
        </>
      );
    }
  }

  // handle refresh
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getData();
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // handle manual entry
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!manualSteps || !manualDate) {
      alert('Please enter a valid number of steps and date');
      return;
    }
    setStepLogs((prev) => {
      const existingIndex = prev.findIndex((log) => log.date === manualDate);
      if (existingIndex !== -1) {
        const newLogs = prev.map((log, index) => {
          if (index === existingIndex) {
            // return { ...log, steps: log.steps + manualSteps };
            return { ...log, steps: manualSteps };
          }
          return log;
        });
        return newLogs;
      }
      return [...prev, { date: manualDate, steps: manualSteps }];
    });
    (event.target as HTMLFormElement).reset();
    setManualSteps(0);
    setManualDate('');
    setUpdateTotalStep(true);
  };

  // go to admin page
  const goToAdmin = () => {
    history.push('/app/admin');
  };
  //
  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Steps log</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent className="ion-padding body">
        <IonCard className="card-body">
          <IonCardContent className="card-body">
            {' '}
            <form
              id="stepLog"
              onSubmit={(event: React.FormEvent) => {
                submitHandler(event);
              }}
            >
              <div className="steps-name">
                Viewing Steps Log for: {logsName}
              </div>
              <IonItem>
                <IonLabel position="floating">Number of steps</IonLabel>
                <IonInput
                  min="1"
                  id="steps"
                  type="number"
                  onInput={(event: any) => {
                    setManualSteps(Number(event.target.value));
                  }}
                ></IonInput>
              </IonItem>
              <a>
                <IonRouterLink slot="helper" routerLink="/app/stepscalc">
                  Need help calculating steps?
                </IonRouterLink>
              </a>
              <IonItem className="calendar-input">
                <IonLabel position="floating"></IonLabel>
                <IonInput
                  id="time"
                  type="date"
                  // min={getMinDate()}
                  // max={getMaxDate()}
                  onInput={(event: any) => {
                    setManualDate(
                      new Date(event.target.value).toISOString().slice(0, 10)
                    );
                  }}
                ></IonInput>
              </IonItem>
              <IonCol>
                <IonButton type="submit">Submit</IonButton>
                <IonButton onClick={goToAdmin}>Back to Admin Page</IonButton>
              </IonCol>
            </form>
            <IonItem>{DisplayRecords()}</IonItem>
          </IonCardContent>
        </IonCard>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default AdminSteps;
