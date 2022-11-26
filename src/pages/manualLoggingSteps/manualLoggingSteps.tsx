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
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
    let stepsToLog: number;
    let date: Date;
    let pastRecordDates: Array<Date>;
    let pastRecordSteps: Array<number>;
    let minimumDateStart: Date;  // the minimum date in the callendar for an entry
    let maximumDateEnd: Date;  // the maximum date for the entry
    interface Record {
        time: Date;
        stepsWaled: number;
    }
    let pastRecords: Array<Record>;

    function writeToDatabase() {
        /**
     @todo: right your todo comment here
     We should make this actualy write data to the database
     Make sure it has consistent typing

  **/
        if (stepsToLog > 0) {
            console.log(stepsToLog);
            console.log(date);
        }
    }

    function storeSteps(ev: Event) {
        const steps: number = Number((ev.target as HTMLInputElement).value);
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
            Could implement error checking to ensure date is not beyonde today, and give time limit to how far in past
        */
    }

    function getRecords() {
        // datesFromDB = callToDB();
        // stepsFromDB = callToDB();
        /* for number of dates in datesFromDB{
            let  newReccord: Record;
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
                                    <IonCol>{item.time.toDateString()}</IonCol>
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