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
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  isPlatform
} from '@ionic/react';
import './manualLoggingSteps.css';
import { auth, FirestoreDB } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import NavBar from '../../components/NavBar';
import { Health } from '@awesome-cordova-plugins/health';

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
  const supportedTypes = [
    'steps',
    'distance', // Read and write permissions
    {
      read: ['steps'], // Read only permission
      write: ['height', 'weight'] // Write only permission
    }
  ];
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

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(async () => {
      // Any calls to load data go here
      GFrequestAuthorization();
      event.detail.complete();
    }, 2000);
  }
  const GFrequestAuthorization = async () => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      alert('Google Fit is only available on android and ios.');
      return;
    }
    await Health.requestAuthorization(supportedTypes)
      .then(GFupdateSteps)
      .catch((error: any) => alert(JSON.stringify(error)));

    return;
  };
  const GFupdateSteps = async () => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      alert('Google Fit is only available on android and ios.');
      return;
    }
    const date = new Date();
    const stepOptions: object = {
      // note I change it from HealthQueryOptions to object as HealthQueryOptions is not valid typing
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(),
      dataType: 'steps',
      filtered: true
    };
    await Health.query(stepOptions)
      .then(async (data: any) => {
        const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
        const dbSnap = await getDoc(dbRef);
        const dbStepsByDate: StepLog[] = dbSnap.data().stepsByDate;
        if (dbStepsByDate.length > 0) {
          dbStepsByDate.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        }
        let dayCount = 0;
        let prevIndex = 0;
        const healthAppData: StepLog[] = [];
        for (let i = 0; i < data.length; i++) {
          const current = data[i];
          const steps = current.value;
          const date = current.startDate.toISOString().slice(0, 10);
          const prevDate = data[prevIndex].startDate.toISOString().slice(0, 10);
          if (date === prevDate && i != 0){
            healthAppData[dayCount - 1].steps += steps;
          }
          else {
            healthAppData[dayCount] = { date, steps };
            dayCount++;
          }
          prevIndex = i;
        }
        const stepsByDate = [];
        let totalStep = 0;
        let dbIndex = 0;
        let healthAppIndex = 0;
        let flag = -1;
        let i = 0;
        if (dbStepsByDate.length === 0) {
          flag = 1;
        } else if (healthAppData.length === 0) {
          flag = 0;
        }
        while(flag === -1) {
          const healthAppDateString = healthAppData[healthAppIndex].date;
          const healthAppSteps = healthAppData[healthAppIndex].steps;
          const dbDateString = dbStepsByDate[dbIndex].date;
          const dbSteps = dbStepsByDate[dbIndex].steps;
          const healthAppDate = new Date(healthAppDateString);
          const dbDate = new Date(dbDateString);
          if (healthAppDate < dbDate){
            const date = healthAppDateString;
            const steps = healthAppSteps;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            healthAppIndex++;
          } else if (healthAppDate > dbDate) {
            const date = dbDateString;
            const steps = dbSteps;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            dbIndex++;
          } else {
            const steps = dbSteps > healthAppSteps ? dbSteps : healthAppSteps;
            const date = dbDateString;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            healthAppIndex++;
            dbIndex++;
          }
          i++;
          if (healthAppIndex >= healthAppData.length) {
            flag = 0;
          } else if (dbIndex >= dbStepsByDate.length) {
            flag = 1;
          }
        }
        if (flag === 0) {
          for(; dbIndex < dbStepsByDate.length; dbIndex++) {
            const date = dbStepsByDate[dbIndex].date;
            const steps = dbStepsByDate[dbIndex].steps;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            i++;
          }
        } else if (flag === 1) {
          for(; healthAppIndex < healthAppData.length; healthAppIndex++) {
            const date = healthAppData[healthAppIndex].date;
            const steps = healthAppData[healthAppIndex].steps;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            i++;
          }
        }
        await updateCurrentUser(stepsByDate, totalStep);
        alert('Steps Updated!');
      })
      .catch((error: any) => alert(JSON.stringify(error) + 'query failed'));
  };
  const updateCurrentUser = async (stepsByDate: any, totalStep: any) => {
    if (ctx.user === null) {
      alert('You are not looged in!');
      history.push('/login');
      return;
    }
    const currentUserRef = doc(
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    await updateDoc(currentUserRef, {
      stepsByDate: stepsByDate,
      totalStep: totalStep
    });
  };

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

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent>
            </IonRefresherContent>
        </IonRefresher>

      </IonContent>
    </IonPage>
  );
};

export default ManualSteps;
