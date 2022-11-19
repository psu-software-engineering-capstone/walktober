import React, { useState } from 'react';
import {
    IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonRouterLink,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
} from '@ionic/react';
//import ExploreContainer from '../../components/ExploreContainer';
import './stepsCalculator.css';

const StepsCalculator: React.FC = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
    var steps: number = 0;
    var heightIn: number = 0; // height inches param
    var heightFt: number = 0; // height feet param
    var strideConverter: number = 0.413; // conversion factor for height in inches to average stride in inches
    var heightCm: number = 0.0; // for our metric friends
    var time: number;
    var stepsPerMile: number = 2250;
    var miles: number;
    var metric: boolean = false;

    function calculate(ev: Event) {
        miles = Number((ev.target as HTMLInputElement).value);
        if (miles <= 0) {
            return 0;
        }

        steps = miles * stepsPerMile;
    }

    function getHeightFt(ev: Event) {
        heightFt = Number((ev.target as HTMLInputElement).value);
        if (heightFt <= 0) {
            return 0;
        }
    }

    function getHeightIn(ev: Event) {
        heightIn = Number((ev.target as HTMLInputElement).value);
        if (heightIn <= 0) {
            return 0;
        }
    }

    function getHeightcm(ev: Event) {
        heightCm = Number((ev.target as HTMLInputElement).value);
        if (heightCm <= 0) {
            return 0;
        }
    }

    function placeHolder() {
        // return steps.toString();
        const updateSteps = document.querySelector('#result');
        if (updateSteps != null) {
            if (metric == false && heightFt > 0 && heightIn > 0) {
                // imperial calculations
                // height in IN * convert = inches per stride
                // IN per stride / 12 = feet per stride
                // 5280 / feet per stride = steps per mile
                steps = miles * (5280 / ((((heightFt * 12) + heightIn) * strideConverter) / 12));
            }
            else if (metric == true) {
                // metric calculations
            }
            updateSteps.innerHTML = Math.round(steps).toString();
        }
        // updateSteps.innerHTML = steps.toString();
        return;
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Steps Calculator
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="floating">Number of miles walked</IonLabel>
                    <IonInput type="number" onInput={
                        (event: any) => {
                            calculate(event);
                        }
                    }></IonInput>
                    <IonRouterLink slot="helper" href="./manualLoggingSteps">Return to steps logging</IonRouterLink>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Optional: Height ft</IonLabel>
                                <IonInput type="number" onInput={
                                    (event: any) => {
                                        getHeightFt(event);
                                    }
                                }></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Optional: Height In</IonLabel>
                                <IonInput type="number" onInput={
                                    (event: any) => {
                                        getHeightIn(event);
                                    }
                                }></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonCol>
                    <IonButton onClick={placeHolder}>Submit</IonButton>
                </IonCol>
                <IonItem id="result">{steps.toString()}</IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol size="auto"><IonItem>20 min/mi = Slow walk</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>15 min/mi = Brisk walk</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>12 min/mi = Jog</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>9 min/mi = Run</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>7 min/mi = Fast run</IonItem></IonCol>
                        <IonCol size="auto"><IonItem>5 min/mi = Very fast run</IonItem></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    );
}

export default StepsCalculator;