import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./HealthApp.css";
import { HealthKit } from "@awesome-cordova-plugins/health-kit";
import { IonButton } from "@ionic/react";

const HealthApp: React.FC = () => {
  const available = async () => {
    await HealthKit.available()
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const requestAuthorization = async () => {
    var supportedTypes = [
      "HKQuantityTypeIdentifierHeight",
      "HKQuantityTypeIdentifierStepCount",
      "HKQuantityTypeIdentifierDistanceWalkingRunning",
      "HKCategoryTypeIdentifierSleepAnalysis",
      "HKQuantityTypeIdentifierDietaryEnergyConsumed",
      "HKQuantityTypeIdentifierDietaryFatTotal",
    ];
    await HealthKit.requestAuthorization({
      readTypes: supportedTypes,
      writeTypes: supportedTypes,
    })
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const checkAuthStatus = async () => {
    HealthKit.checkAuthStatus({
      type: "HKQuantityTypeIdentifierHeight",
    })
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  const readSteps = async () => {
    var stepOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      unit: "count",
      sampleType: "HKQuantityTypeIdentifierStepCount"
    }
    await HealthKit.querySampleType(stepOptions)
      .then((data: any) => alert(JSON.stringify(data)))
      .catch((error: any) => alert(JSON.stringify(error)));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Health App Integration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Health App Integration</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonTitle>Apple Health</IonTitle>
        <IonButton expand="block" onClick={available}>
          Health Available?
        </IonButton>
        <IonButton expand="block" onClick={requestAuthorization}>
          Request Auth
        </IonButton>
        <IonButton expand="block" onClick={checkAuthStatus}>
          Check Auth Status
        </IonButton>
        <IonButton expand="block" onClick={readSteps}>
          Read Step Count
        </IonButton>
        <IonTitle>Fitbit</IonTitle>
        <IonTitle>Garmin</IonTitle>
        <IonTitle>Google Fit</IonTitle>
        <IonTitle>Misfit</IonTitle>
        <IonTitle>Omron</IonTitle>
        <IonTitle>Polar</IonTitle>
        <IonTitle>Samsung Health</IonTitle>
        <IonTitle>Withings (Nokia)</IonTitle>
        <IonTitle>Strava</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default HealthApp;
