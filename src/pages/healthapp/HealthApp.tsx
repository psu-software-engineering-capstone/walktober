/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/react';
import './HealthApp.css';
import { HealthKit } from '@awesome-cordova-plugins/health-kit';
import { auth, FirestoreDB } from '../../firebase';
import { doc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import { updateDoc } from 'firebase/firestore';
import { Health, HealthQueryOptions } from '@awesome-cordova-plugins/health';

const HealthApp: React.FC = () => {
  const available = async () => {
    await HealthKit.available()
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const requestAuthorization = async () => {
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
    HealthKit.checkAuthStatus({
      type: 'HKQuantityTypeIdentifierHeight'
    })
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  // const readSteps = async () => {
  //   const date = new Date();
  //   const stepOptions = {
  //     startDate: new Date(date.getFullYear(), date.getMonth(), 1),
  //     endDate: new Date(),
  //     unit: 'count',
  //     sampleType: 'HKQuantityTypeIdentifierStepCount'
  //   };
  //   await HealthKit.querySampleType(stepOptions)
  //     .then((data: any) => {
  //       const totalStep = data.reduce(
  //         (a: any, b: { quantity: any }) => a + b.quantity,
  //         0
  //       );
  //       alert(JSON.stringify(totalStep));
  //     })
  //     .catch((error: any) => alert(JSON.stringify(error)));
  // };

  const updateSteps = async () => {
    const date = new Date();
    const stepOptions = {
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(),
      unit: 'count',
      sampleType: 'HKQuantityTypeIdentifierStepCount'
    };
    await HealthKit.querySampleType(stepOptions)
      .then(async (data: any) => {
        const stepsByDate = [];
        let totalStep = 0;
        for (let i = 0; i < data.length; i++) {
          const current = data[i];
          const date = current.startDate.toString().slice(0, 10);
          const steps = current.quantity;
          totalStep += current.quantity;
          stepsByDate[i] = { date, steps };
        }
        await updateCurrentUser(stepsByDate, totalStep);
        alert('Steps Updated!');
      })
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const updateCurrentUser = async (stepsByDate: any, totalStep: any) => {
    if (auth.currentUser == null) {
      alert('You are not looged in!');
      useHistory().push("/login");
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
//------------------------------------------------------------------------------------------------------------
// const supportedTypes = [
//   'TYPE_STEP_COUNT_DELTA'
// ];

const supportedTypes = [
  'steps', 'distance',   // Read and write permissions
  {
    read : ['steps'],       // Read only permission
    write : ['height', 'weight']  // Write only permission
  }
];

const GFavailable = async () => {
  await Health.isAvailable()
    .then((data: any) => alert(JSON.stringify(data)))
    .catch((error: any) => alert(JSON.stringify(error)));
};

const GFrequestAuthorization = async () => {
  await Health.requestAuthorization(supportedTypes)
    .then((data: any) => alert(JSON.stringify(data)))
    .catch((error: any) => alert(JSON.stringify(error)));
};

const GFcheckAuthStatus = async () => {
  Health.isAuthorized(supportedTypes)
    .then((data: any) => alert(JSON.stringify(data)))
    .catch((error: any) => alert(JSON.stringify(error)));
};

// const GFupdateCurrentUser = async (stepsByDate: any, totalStep: any) => {
//   if (auth.currentUser == null) {
//     alert('You are not logged in!');
//     useHistory().push("/login");
//     return;
//   }
//   const currentUserRef = doc(
//     FirestoreDB,
//     'users',
//     auth.currentUser.email as string
//   );
//   await updateDoc(currentUserRef, {
//     stepsByDate: stepsByDate,
//     totalStep: totalStep
//   });
// };

const GFupdateSteps = async () => {
  const date = new Date();
  const stepOptions : HealthQueryOptions = {
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
        const date = current.startDate.toString().slice(0, 10);
        const steps = current.value;
        totalStep += current.value;
        stepsByDate[i] = { date, steps };
      }
      await updateCurrentUser(stepsByDate, totalStep);
      alert('Steps Updated!');
    })
    .catch((error: any) => alert(JSON.stringify(error) + "query failed"));
};
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Health App Integration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Health App Integration</IonTitle>
          </IonToolbar>
        </IonHeader>
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
        <h2>Fitbit</h2>
        <h2>Garmin</h2>
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
        <h2>Misfit</h2>
        <h2>Omron</h2>
        <h2>Polar</h2>
        <h2>Samsung Health</h2>
        <h2>Withings (Nokia)</h2>
        <h2>Strava</h2>
      </IonContent>
    </IonPage>
  );
};

export default HealthApp;

