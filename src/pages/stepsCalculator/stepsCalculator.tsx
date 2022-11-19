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
    var time: number;
    var stepsPerMile: number = 2250;
    var miles: number;

    function calculate(ev: Event) {
        miles = Number((ev.target as HTMLInputElement).value);
        if (miles <= 0) {
            return 0;
        }

        steps = miles * stepsPerMile;
    }

    function placeHolder() {
        // return steps.toString();
        const updateSteps = document.querySelector('#result');
        if (updateSteps != null)
            updateSteps.innerHTML = steps.toString();
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
                <IonCol>
                    <IonButton onClick={placeHolder}>Submit</IonButton>
                </IonCol>
                <IonItem id="result">{steps.toString()}</IonItem>

            </IonContent>
        </>
    );
}

export default StepsCalculator;