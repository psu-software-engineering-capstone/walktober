// note to self, use the useEffect hook to pull in data from the server forthe steps logged etc. 
// useEffect will conditinaly run a passed in function, so it will not run with every state change. 
// maybe use isloading useState and render if the user has steps recorded or not with &&&

import React, { useState, useEffect, useCallback } from 'react';
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

    const getRecordsFromDB = useCallback(async () => {
        // datesFromDB = callToDB();
        // stepsFromDB = callToDB();
        /* for number of dates in datesFromDB{
            let newReccord: Record;
            newRecord.time = dates.at(index);
            newRecord.stepsWaled = stepds.at(index);
            pastRecords.append(newReccord);
        }
        */
        try {
            const response = await fetch('https://some_firebase_address');
            if (!response.ok) {
                throw new Error('couldnt get data');
            }

            const data = await response.json();

            const transformedData = data.results.map((item: any) => {
                return {
                    logDate: item.logedDate,
                    steps: item.logedSteps
                }
            })
        }
        catch (error: any) {
            console.log(error);
            return;
        }
        // here we would add the data to databasse etc
    }, []);
    // use effect called to load in the data for the logs
    useEffect(
        () => { getRecordsFromDB }
        , []);
    let stepsToLog: number;
    let date: Date;
    const [stepLogs, setStepLogs] = useState([]); // state update so that we load in new step logs when steps are added.
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



    function DisplayRecords() {

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