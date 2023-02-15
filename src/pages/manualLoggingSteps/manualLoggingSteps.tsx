/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react';
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
  IonPage
} from '@ionic/react';
import './manualLoggingSteps.css';
import { auth, FirestoreDB } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import NavBar from '../../components/NavBar';

const ManualSteps: React.FC = () => {
  interface StepLog {
    date: string;
    steps: number;
  }

  const history = useHistory();

  const ctx = useContext(AuthContext);

  const [manualDate, setManualDate] = useState('');
  const [manualSteps, setManualSteps] = useState(0);
  const [stepLogs, setStepLogs] = useState<StepLog[]>([]);
  const [totalStep, setTotalStep] = useState(0);
  const [updateTotalStep, setUpdateTotalStep] = useState(false);
  const [updateDB, setUpdateDB] = useState(false);

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
    if (ctx.user === null) {
      alert('You are not logged in!');
      history.push('/login');
      return;
    }
    let stepsByDate = [];
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const dbSnap = await getDoc(dbRef);
    stepsByDate = dbSnap.data().stepsByDate;
    setStepLogs(stepsByDate);
  };

  const sendNewLog = async () => {
    if (auth.currentUser === null) {
      alert('You are not logged in!');
      return;
    }
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
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
              <IonRow key={Math.random()}>
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
            <IonRouterLink
              slot="helper"
              href="/app/stepscalc"
              onClick={() => {
                history.push('/app/stepscalc');
              }}
            >
              Need help calculating steps?
            </IonRouterLink>
          </IonItem>
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
      </IonContent>
    </IonPage>
  );
};

export default ManualSteps;
