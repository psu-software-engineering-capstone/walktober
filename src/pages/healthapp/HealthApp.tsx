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
import { doc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import { updateDoc } from 'firebase/firestore';
import { Health } from '@awesome-cordova-plugins/health'; // removed , HealthQueryOptions
import NavBar from '../../components/NavBar';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const HealthApp: React.FC = () => {
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
        const stepsByDate = [];
        let totalStep = 0;
        for (let i = 0; i < data.length; i++) {
          const current = data[i];
          // it has to be toString() not toISOString() //
          const date = current.startDate.toString().slice(0, 10);
          const steps = current.quantity;
          totalStep += current.quantity;
          stepsByDate[i] = { date, steps };
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
    if (!isPlatform('android')) {
      alert('Google Fit is only available on android');
      return;
    }
    await Health.isAvailable()
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const GFrequestAuthorization = async () => {
    if (!isPlatform('android')) {
      alert('Google Fit is only available on android');
      return;
    }
    await Health.requestAuthorization(supportedTypes)
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const GFcheckAuthStatus = async () => {
    if (!isPlatform('android')) {
      alert('Google Fit is only available on android');
      return;
    }
    Health.isAuthorized(supportedTypes)
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const GFupdateSteps = async () => {
    if (!isPlatform('android')) {
      alert('Google Fit is only available on android');
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
        const stepsByDate = [];
        let totalStep = 0;
        for (let i = 0; i < data.length; i++) {
          const current = data[i];
          const date = current.startDate.toISOString().slice(0, 10);
          const steps = current.value;
          totalStep += current.value;
          stepsByDate[i] = { date, steps };
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
        <IonButton expand="block">Implementing...</IonButton>
        <h2>Samsung Health</h2>
        <IonButton expand="block">Implementing...</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HealthApp;
