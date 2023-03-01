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
} from '@ionic/react';
import './adminSteps.css';
import { FirestoreDB } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import NavBar from '../../components/NavBar';
import { useHistory } from 'react-router-dom';

const AdminSteps: React.FC<{ email: string }> = () => {
  interface StepLog {
    date: string;
    steps: number;
  }

  const history = useHistory();
  const [email, setEmail] = useState((history.location.state as any)?.email);

  // const email = 'capstonewinter2023@gmail.com';
  // const name = 'Nora and Yelena';

  const [logsName, setLogsName] = useState('');
  const [manualDate, setManualDate] = useState('');
  const [manualSteps, setManualSteps] = useState(0);
  const [stepLogs, setStepLogs] = useState<StepLog[]>([]);
  const [totalStep, setTotalStep] = useState(0);
  const [updateTotalStep, setUpdateTotalStep] = useState(false);
  const [updateDB, setUpdateDB] = useState(false);

  console.log(email);
  useEffect(() => {
    getRecordsFromDB();
  }, []);

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

  useEffect(() => {
    if (updateDB === true) {
      sendNewLog();
    }
    setUpdateDB(false);
  }, [updateDB]);

  const getRecordsFromDB = async () => {
    let stepsByDate = [];
    const dbRef = doc(FirestoreDB, 'users', email as string);
    const dbSnap = await getDoc(dbRef);
    stepsByDate = dbSnap.data().stepsByDate;
    const name = dbSnap.data().name;
    setLogsName(name);
    setStepLogs(stepsByDate);
  };

  const sendNewLog = async () => {
    const dbRef = doc(FirestoreDB, 'users', email as string);
    await updateDoc(dbRef, {
      stepsByDate: stepLogs,
      totalStep: totalStep
    })
      .then(() => {
        console.log(stepLogs, totalStep);
        alert('Steps Updated!');
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  function DisplayRecords(): any {
    if (stepLogs.length > 0) {
      stepLogs.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return (
        <>
          <IonGrid>
            <IonRow>
              <IonCol>Date:</IonCol>
              <IonCol>Steps:</IonCol>
            </IonRow>

            {stepLogs.map((item) => (
              <IonRow key={item.date}>
                <IonCol>{item.date}</IonCol>
                <IonCol>{item.steps}</IonCol>
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

  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getRecordsFromDB();
    event.detail.complete(); // Notify the refresher that loading is complete
  }

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
            return { ...log, steps: log.steps + manualSteps };
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

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Steps log</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form
          id="stepLog"
          onSubmit={(event: React.FormEvent) => {
            submitHandler(event);
          }}
        >
          <div className="steps-name">Viewing Steps Log for: {logsName}</div>
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
          <IonItem>
            <IonLabel position="floating"></IonLabel>
            <IonInput
              id="time"
              type="date"
              onInput={(event: any) => {
                setManualDate(
                  new Date(event.target.value).toISOString().slice(0, 10)
                );
              }}
            ></IonInput>
          </IonItem>
          <IonCol>
            <IonButton type="submit">Submit</IonButton>
          </IonCol>
        </form>
        <IonItem>{DisplayRecords()}</IonItem>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default AdminSteps;
