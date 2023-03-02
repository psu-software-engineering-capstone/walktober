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
  isPlatform,
  useIonToast
} from '@ionic/react';
import { auth, FirestoreDB } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import NavBar from '../../components/NavBar';
import { Health } from '@awesome-cordova-plugins/health';
import { HealthKit } from '@awesome-cordova-plugins/health-kit';
import './manualLoggingSteps.css';
import { onSnapshot } from 'firebase/firestore';

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
  const [present] = useIonToast();
  const supportedTypes = [
    'steps',
    'distance', // Read and write permissions
    {
      read: ['steps'], // Read only permission
      write: ['height', 'weight'] // Write only permission
    }
  ];

  // update the data when the page loads
  // update the data when the data is updated
  useEffect(() => {
    if (ctx.user !== null) {
      const unsubscribe = onSnapshot(doc(FirestoreDB, 'users', auth.currentUser.email as string), (doc: any) => {
          if (doc.exists()) {
            console.log('Current data: ', doc.data().stepsByDate);
            getRecordsFromDB(); // get records from database
          }
        }
      );
      return unsubscribe;
    }
  }, [ctx.user]);

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
      sendNewLog(); // update database
    }
    setUpdateDB(false);
  }, [updateDB]);

  // get records from database
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

  // send new log to database (manual logging)
  const sendNewLog = async () => {
    if (auth.currentUser === null) {
      alert('You are not logged in!');
      return;
    }
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    // get current total steps
    const dbSnap = await getDoc(dbRef);
    const currentTotalSteps = dbSnap.data().totalStep;
    // update total steps
    await updateDoc(dbRef, {
      stepsByDate: stepLogs,
      totalStep: totalStep
    })
      .then(() => {
        alert('Steps Updated!');
      })
      .catch((error: any) => {
        alert(error);
      });
    // update team total steps and team average steps
    await updateTeam(currentTotalSteps, totalStep);
  };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getRecordsFromDB();
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // load data from google fit/apple health
  const syncApp = async () => {
    if (isPlatform('android')) {
      await Health.isAvailable()
        .then((data: any) => {
          if (!data) {
            alert('Please install Google Fit!');
            Health.promptInstallFit()
              .then((data: any) => presentToast(JSON.stringify(data)))
              .catch((error: any) => alert(JSON.stringify(error)));
          } else {
            Health.requestAuthorization(supportedTypes)
              .then((data: any) => {
                if (data) {
                  presentToast('Updating Steps...');
                  updateSteps();
                } else alert('Request for Authentication Failed.');
              })
              .catch((error: any) => alert(JSON.stringify(error)));
          }
          return;
        })
        .catch((error: any) => alert(JSON.stringify(error)));
    } else if (isPlatform('ios')) {
      await HealthKit.available()
        .then(async (data: any) => {
          const hkAvail = data;
          HealthKit.checkAuthStatus({
            type: 'HKQuantityTypeIdentifierHeight'
          })
            .then((data: any) => {
              const authStatus = data;
              if (!hkAvail) alert('Apple Health Undetected!');
              else if (authStatus == 'authorized') {
                presentToast('Updating Steps...');
                updateSteps();
              }
              // alert('Please Enable Permissions for Apple Health (need to deal with first time asking permisssions IOS Specific)');
              else requestAuthorization();
            })
            .catch((error: any) => alert(JSON.stringify(error)));
          return;
        })
        .catch((error: any) => alert(JSON.stringify(error)));
    } else alert('Error: Unsupported Platform');
    return;
  };

  // request authorization for google fit/apple health
  const requestAuthorization = async () => {
    if (isPlatform('android')) {
      await Health.requestAuthorization(supportedTypes)
        .then((data: any) => {
          if (data) updateSteps();
          else alert('Error GFit: Authorization Failed');
        })
        .catch((error: any) => alert(JSON.stringify(error)));
      return;
    }
    // quirk with IOS: if authorization was denied once, it won't/can't ask again
    // so, need to just check if authorized, unlike android where you can request again.
    else if (isPlatform('ios')) {
      HealthKit.checkAuthStatus({
        type: 'HKQuantityTypeIdentifierHeight'
      })
        .then((data: any) => {
          if (data == 'authorized') updateSteps();
          else alert('Error AHealth: Please Enable Apple Health Permissions');
        })
        .catch((error: any) => alert(JSON.stringify(error)));
      return;
    } else alert('Error: Unknown Platform');
    return;
  };

  // update steps from google fit/apple health
  const updateSteps = async () => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      alert('Error: Unknown Platform');
      return;
    }
    if (isPlatform('android')) {
      const date = new Date();
      const stepOptions: object = {
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(),
        dataType: 'steps',
        filtered: true
      };
      await Health.query(stepOptions)
        .then(async (data: any) => {
          const dbRef = doc(
            FirestoreDB,
            'users',
            auth.currentUser.email as string
          );
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
            const prevDate = data[prevIndex].startDate
              .toISOString()
              .slice(0, 10);
            if (date === prevDate && i != 0) {
              healthAppData[dayCount - 1].steps += steps;
            } else {
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
          while (flag === -1) {
            const healthAppDateString = healthAppData[healthAppIndex].date;
            const healthAppSteps = healthAppData[healthAppIndex].steps;
            const dbDateString = dbStepsByDate[dbIndex].date;
            const dbSteps = dbStepsByDate[dbIndex].steps;
            const healthAppDate = new Date(healthAppDateString);
            const dbDate = new Date(dbDateString);
            if (healthAppDate < dbDate) {
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
            for (; dbIndex < dbStepsByDate.length; dbIndex++) {
              const date = dbStepsByDate[dbIndex].date;
              const steps = dbStepsByDate[dbIndex].steps;
              totalStep += steps;
              stepsByDate[i] = { date, steps };
              i++;
            }
          } else if (flag === 1) {
            for (; healthAppIndex < healthAppData.length; healthAppIndex++) {
              const date = healthAppData[healthAppIndex].date;
              const steps = healthAppData[healthAppIndex].steps;
              totalStep += steps;
              stepsByDate[i] = { date, steps };
              i++;
            }
          }
          await updateCurrentUser(stepsByDate, totalStep);
          presentToast('Steps Updated!');
        })
        .catch((error: any) => alert(error));
    } else if (isPlatform('ios')) {
      const date = new Date();
      const stepOptions = {
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(),
        unit: 'count',
        sampleType: 'HKQuantityTypeIdentifierStepCount',
        ascending: true
      };
      await HealthKit.querySampleType(stepOptions)
        .then(async (data: any) => {
          const dbRef = doc(
            FirestoreDB,
            'users',
            auth.currentUser.email as string
          );
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
            const steps = current.quantity;
            const date = current.startDate.toString().slice(0, 10);
            const prevDate = data[prevIndex].startDate.toString().slice(0, 10);
            if (date === prevDate && i != 0) {
              healthAppData[dayCount - 1].steps += steps;
            } else {
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
          while (flag === -1) {
            const healthAppDateString = healthAppData[healthAppIndex].date;
            const healthAppSteps = healthAppData[healthAppIndex].steps;
            const dbDateString = dbStepsByDate[dbIndex].date;
            const dbSteps = dbStepsByDate[dbIndex].steps;
            const healthAppDate = new Date(healthAppDateString);
            const dbDate = new Date(dbDateString);
            if (healthAppDate < dbDate) {
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
            for (; dbIndex < dbStepsByDate.length; dbIndex++) {
              const date = dbStepsByDate[dbIndex].date;
              const steps = dbStepsByDate[dbIndex].steps;
              totalStep += steps;
              stepsByDate[i] = { date, steps };
              i++;
            }
          } else if (flag === 1) {
            for (; healthAppIndex < healthAppData.length; healthAppIndex++) {
              const date = healthAppData[healthAppIndex].date;
              const steps = healthAppData[healthAppIndex].steps;
              totalStep += steps;
              stepsByDate[i] = { date, steps };
              i++;
            }
          }
          await updateCurrentUser(stepsByDate, totalStep);
          presentToast('Steps Updated!');
        })
        .catch((error: any) => alert(error));
    }
  };

  // update current user's total steps and steps by date
  const updateCurrentUser = async (stepsByDate: any, totalStep: any) => {
    if (ctx.user === null) {
      alert('You are not logged in!');
      history.push('/login');
      return;
    }
    const currentUserRef = doc(
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    // get current total steps
    const dbSnap = await getDoc(currentUserRef);
    const currentTotalSteps = dbSnap.data().totalStep;
    // update total steps
    await updateDoc(currentUserRef, {
      stepsByDate: stepsByDate,
      totalStep: totalStep
    })
      .then(() => {
        console.log('Steps updated!');
      })
      .catch((error: any) => {
        console.error('Error updating document: ', error);
      });
    // update team total steps and average steps
    await updateTeam(currentTotalSteps, totalStep);
  };

  // update team total steps and average steps
  const updateTeam = async (currentTotalSteps: any, totalStep: any) => {
    if (ctx.user === null) {
      alert('You are not logged in!');
      history.push('/login');
      return;
    }
    if (ctx.team === '') {
      return; // user is not in a team
    }
    const dbRef = doc(FirestoreDB, 'teams', ctx.team);
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
            console.log('Team total steps and average steps updated!');
          })
          .catch((error: any) => {
            console.log('Error updating document: ', error);
          });
      }      
    });
  };

  // present toast message
  const presentToast = (message: any) => {
    present({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
  };

  // update steps logs when user manually enters steps
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

  // display steps logs
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
            <IonButton onClick={syncApp}>Sync Health App</IonButton>
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

export default ManualSteps;
