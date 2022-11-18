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
import './stepsCalc.css';

const stepsCalc: React.FC = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
    var steps: number;
    var time: number;

    function calculate() {
        return;
    }


    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Steps log
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="floating">Number of steps</IonLabel>
                    <IonInput type="number" onInput={
                        (event: any) => {

                        }
                    }></IonInput>
                    <IonRouterLink slot="helper" href="#">Need help calculating steps?</IonRouterLink>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating"></IonLabel>
                    <IonInput type="date" onInput={
                        (event: any) => {

                        }
                    }></IonInput>
                </IonItem>
                <IonCol>
                    <IonButton onClick={calculate}>Submit</IonButton>
                </IonCol>
                <IonItem>{ }</IonItem>

            </IonContent>
        </>
    );
}

export default stepsCalc;