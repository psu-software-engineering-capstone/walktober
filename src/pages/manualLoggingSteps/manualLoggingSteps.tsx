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
import './manualLoggingSteps.css';

const ManualSteps: React.FC = () => {
    let stepsToLog: number;
    let date: Date;
    // let pastRecordDates: Array: Date;
    let pastRecordDates: Array<Date>;
    let pastRecordSteps: Array<number>;
    let minDate: Date;
    let maxDate: Date;
    interface Record {
        time: Date;
        stepsWaled: number;
    }
    let pastRecords: Array<Record>;

    function writeToDatabase() {
        if (stepsToLog > 0) {
            console.log(stepsToLog);
            console.log(date);
        }
    }

    function storeSteps(ev: Event) {
        const steps = Number((ev.target as HTMLInputElement).value);
        if (steps <= 0) {
            stepsToLog = 0;
            return false;
        }
        stepsToLog = steps;
    }

    function storeNewDate(ev: Event) {
        const newDate = new Date((ev.target as HTMLInputElement).value);
        date = newDate;
        /*     
            if (date >= minDate && date <= maxDate){
                date = newDate;
            }
            else{
                callErrorMessage();
            }
            Would need a min date and maxDate to pull from othertwise this is pointless. But this is effective error checking
        */
    }

    function getRecords() {
        // datesFromDB = callToDB();
        // stepsFromDB = callToDB();
        /* for number of dates in datesFromDB{
            let newReccord: Record;
            newRecord.time = dates.at(index);
            newRecord.stepsWaled = stepds.at(index);
            pastRecords.append(newReccord);
        }
        */
    }

    function DisplayRecords() {

        getRecords();

        if (pastRecords) {
            return (
                <>
                    <IonGrid>
                        <IonRow>
                            <IonCol>Date:</IonCol>
                            <IonCol>Steps:</IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        {
                            pastRecords.map(item => (
                                <IonRow>
                                    <IonCol>{item.time.toLocaleDateString('en-US')}</IonCol>
                                    <IonCol>{item.stepsWaled}</IonCol>
                                </IonRow>
                            ))
                        }
                    </IonGrid>
                </>
            );
        }
        else {
            return (
                <>
                    <IonGrid>
                        <IonRow>
                            <IonCol>Date:</IonCol>
                            <IonCol>Steps:</IonCol>
                        </IonRow>
                    </IonGrid>
                </>
            )
        }

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
                            if (storeSteps(event) == false) {
                                /*Print an error msg*/

                            }
                        }
                    }></IonInput>
                    <IonRouterLink slot="helper" href="./stepsCalculator">Need help calculating steps?</IonRouterLink>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating"></IonLabel>
                    <IonInput type="date" onInput={
                        (event: any) => {
                            storeNewDate(event);
                        }
                    }></IonInput>
                </IonItem>
                <IonCol>
                    <IonButton onClick={writeToDatabase}>Submit</IonButton>
                </IonCol>
                <IonItem>{DisplayRecords()}</IonItem>

            </IonContent>
        </>
    );
}

export default ManualSteps;