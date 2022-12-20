import React from "react";
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
    IonToolbar,
    IonGrid,
    IonRow,
    IonToggle
} from '@ionic/react';

const Metric = (props: any) => {
    const imperial = (<>
        <IonCol size="auto">
            <IonItem>
                <IonLabel position="floating">Optional: Height ft</IonLabel>
                <IonInput type="number" onInput={
                    (event: any) => {
                        props.HeightFt(event);
                    }
                }></IonInput>
            </IonItem>
        </IonCol>
        <IonCol size="auto">
            <IonItem>
                <IonLabel position="floating">Optional: Height In</IonLabel>
                <IonInput type="number" onInput={
                    (event: any) => {
                        props.HeightIn(event);
                    }
                }></IonInput>
            </IonItem>
        </IonCol>
    </>);
    const metricVal = (<>
        <IonCol size="auto">
            <IonItem>
                <IonLabel position="floating">Optional: Height cm</IonLabel>
                <IonInput type="number" onInput={
                    (event: any) => {
                        props.HeightIn(event);
                    }
                }></IonInput>
            </IonItem>
        </IonCol>
    </>);
    return (
        props.metric ? metricVal : imperial
    );
}

export default Metric;