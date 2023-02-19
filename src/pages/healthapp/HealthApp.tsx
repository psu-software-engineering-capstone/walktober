/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButton,
  isPlatform
} from '@ionic/react';
import './HealthApp.css';
import { HealthKit } from '@awesome-cordova-plugins/health-kit';
import { auth, FirestoreDB } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import { updateDoc } from 'firebase/firestore';
import { Health } from '@awesome-cordova-plugins/health'; // removed , HealthQueryOptions
import NavBar from '../../components/NavBar';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const HealthApp: React.FC = () => {
  interface StepLog {
    date: string;
    steps: number;
  }

  const ctx = useContext(AuthContext);

  const history = useHistory();

  const available = async () => {
    if (!isPlatform('ios')) {
      alert('Apple Health is only available on iOS');
      return;
    }
    await HealthKit.available()
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const requestAuthorization = async () => {
    if (!isPlatform('ios')) {
      alert('Apple Health is only available on iOS');
      return;
    }
    const supportedTypes = [
      'HKQuantityTypeIdentifierHeight',
      'HKQuantityTypeIdentifierStepCount',
      'HKQuantityTypeIdentifierDistanceWalkingRunning',
      'HKCategoryTypeIdentifierSleepAnalysis',
      'HKQuantityTypeIdentifierDietaryEnergyConsumed',
      'HKQuantityTypeIdentifierDietaryFatTotal'
    ];
    await HealthKit.requestAuthorization({
      readTypes: supportedTypes,
      writeTypes: supportedTypes
    })
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const checkAuthStatus = async () => {
    if (!isPlatform('ios')) {
      alert('Apple Health is only available on iOS');
      return;
    }
    HealthKit.checkAuthStatus({
      type: 'HKQuantityTypeIdentifierHeight'
    })
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const updateSteps = async () => {
    if (!isPlatform('ios')) {
      alert('Apple Health is only available on iOS');
      return;
    }
    const date = new Date();
    const stepOptions = {
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(),
      unit: 'count',
      sampleType: 'HKQuantityTypeIdentifierStepCount'
    };
    await HealthKit.querySampleType(stepOptions)
      .then(async (data: any) => {
        console.log(data);
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
          const steps = current.quantity;
          const date = current.startDate.toString().slice(0, 10);
          const prevDate = data[prevIndex].startDate.toString().slice(0, 10);
          if (date === prevDate && i != 0) {
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
      .catch((error: any) => alert(error));
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

  const supportedTypes = [
    'steps',
    'distance', // Read and write permissions
    {
      read: ['steps'], // Read only permission
      write: ['height', 'weight'] // Write only permission
    }
  ];

  const GFavailable = async () => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      alert('Google Fit is only available on android and ios.');
      return;
    }
    await Health.isAvailable()
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const GFrequestAuthorization = async () => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      alert('Google Fit is only available on android and ios.');
      return;
    }
    await Health.requestAuthorization(supportedTypes)
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const GFcheckAuthStatus = async () => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      alert('Google Fit is only available on android and ios.');
      return;
    }
    Health.isAuthorized(supportedTypes)
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
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

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Health App Integration</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <h2>Apple Health</h2>
        <IonButton expand="block" onClick={available}>
          Health Available?
        </IonButton>
        <IonButton expand="block" onClick={requestAuthorization}>
          Request Auth
        </IonButton>
        <IonButton expand="block" onClick={checkAuthStatus}>
          Check Auth Status
        </IonButton>
        <IonButton expand="block" onClick={updateSteps}>
          Update Step Count
        </IonButton>
        <h2>Google Fit</h2>
        <IonButton expand="block" onClick={GFavailable}>
          Health Available?
        </IonButton>
        <IonButton expand="block" onClick={GFrequestAuthorization}>
          Request Auth
        </IonButton>
        <IonButton expand="block" onClick={GFcheckAuthStatus}>
          Check Auth Statu
        </IonButton>
        <IonButton expand="block" onClick={GFupdateSteps}>
          Update Step Count
        </IonButton>
        <h2>Fitbit</h2>
        <IonButton expand="block">Implementing..</IonButton>
        <h2>Samsung Health</h2>
        <IonButton expand="block">Implementing...</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HealthApp;
