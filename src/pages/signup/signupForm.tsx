/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { useState } from 'react';
import './signup.css';
import logo from '../../assets/Walktober.png';
import { useHistory } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { FirestoreDB } from '../../firebase';

const SignupForm: React.FC = () => {
  // registration variables //
  const [newEmail, setNewEmail] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newAffiliation, setAffiliation] = useState('');
  const [newHeardAboutFrom, setHeardAboutFrom] = useState('');
  const [newHoursPhysical, setHoursPhysical] = useState('');
  const [newMinPhysical, setMinPhysical] = useState('');
  const [newRecCenterUse, setRecCenterUse] = useState('');
  const [newDistFromCamp, setDistFromCamp] = useState('');

  // for routing
  const history = useHistory();

  // pushes questions answered from the form to the database
  const createRegistrationQuestions = () => {
    void setDoc(doc(FirestoreDB, 'registrationQuestions', newEmail), {
      email: newEmail,
      name: newFirstName + ' ' + newLastName,
      affiliation: newAffiliation,
      heardAboutFrom: newHeardAboutFrom,
      hoursPhysical: newHoursPhysical,
      minsPhysical: newMinPhysical,
      recCenterUse: newRecCenterUse,
      distFromCamp: newDistFromCamp
    });
  };

  const affiliationPSUOptions = {
    header: 'Please select your affiliation to PSU'
  };
  const hearAboutWalktober = {
    header: 'Please select how you heard about Walktober'
  };
  const hoursPhysicallyActive = {
    header: 'Please select the approximate hours per week you are currently physically active'
  };
  const minutesPhysicallyActive = {
    header: 'Please select the approximate minutes per day you are currently physically active'
  };
  const recCenterUsage = {
    header: 'Please select the most accurate frequency for your PSU Rec Center usage'
  };

  const distFromCampus = {
    header: 'Please select the most accurate distance you live from the PSU campus'
  };

  const submitRegistration = () => {
    console.log('hello', newEmail, newFirstName, newLastName, newAffiliation, newDistFromCamp, newHeardAboutFrom, newHoursPhysical, newMinPhysical, newRecCenterUse);
    createRegistrationQuestions();
    history.push('/app');
  };

  return (
      <IonPage>
        <IonHeader></IonHeader>
        <IonContent fullscreen className="signupForm">
          <IonCard className="signup-card">
            <IonCardHeader>
              <img alt="Walktober logo" src={logo} />
              <IonCardTitle class="ion-text-center">Welcome to Walktober! Before we get started, please fill out our registration form!</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList class="ion-no-padding">
                <IonItem className="signup-card-field">
                  <IonLabel position="floating">
                    Email
                  </IonLabel>
                  <IonInput
                    type="email"
                    name="email"
                    onIonChange={(e) => setNewEmail(e.target.value as string)}
                  ></IonInput>
                </IonItem>

                <IonItem className="signup-card-field">
                  <IonLabel position="floating">
                    First Name
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="fname"
                    onIonChange={(e) => setNewFirstName(e.target.value as string)}
                  ></IonInput>
                </IonItem>

                <IonItem className="signup-card-field">
                  <IonLabel position="floating">
                    Last Name
                  </IonLabel>
                  <IonInput
                    type="text"
                    name="lname"
                    onIonChange={(e) => setNewLastName(e.target.value as string)}
                  ></IonInput>
                </IonItem>

                <IonItem className="signup-card-field">
                  <IonLabel position="floating">What is your affiliation to PSU?</IonLabel>
                    <IonSelect interfaceOptions={affiliationPSUOptions} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setAffiliation(e.target.value as string)}>
                      <IonSelectOption value="student">Student</IonSelectOption>
                      <IonSelectOption value="faculty">Faculty</IonSelectOption>
                      <IonSelectOption value="staff">Staff</IonSelectOption>
                      <IonSelectOption value="alumni">Alumni</IonSelectOption>
                      <IonSelectOption value="other">Other</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem className="signup-card-field">
                  <IonLabel position="floating">How did you hear about Walktober?</IonLabel>
                    <IonSelect interfaceOptions={hearAboutWalktober} interface="action-sheet" placeholder="Select One"onIonChange={(e) => setHeardAboutFrom(e.target.value as string)}>
                      <IonSelectOption value="print-materials">Print Materials</IonSelectOption>
                      <IonSelectOption value="word-of-mouth">Word of Mouth</IonSelectOption>
                      <IonSelectOption value="campus-rec-website">Campus Rec Website</IonSelectOption>
                      <IonSelectOption value="campus-rec-social">Campus Rec Social Media</IonSelectOption>
                      <IonSelectOption value="group-x">Group X Class Announcement</IonSelectOption>
                      <IonSelectOption value="emails">PSU Currently or Virtual Viking Emails</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem className="signup-card-field">
                  <IonLabel position="floating">How many hours per week are you active?</IonLabel>
                    <IonSelect interfaceOptions={hoursPhysicallyActive} interface="action-sheet" placeholder="Select One"onIonChange={(e) => setHoursPhysical(e.target.value as string)}>
                      <IonSelectOption value="0">0</IonSelectOption>
                      <IonSelectOption value="1">1</IonSelectOption>
                      <IonSelectOption value="2">2</IonSelectOption>
                      <IonSelectOption value="3">3</IonSelectOption>
                      <IonSelectOption value="4">4</IonSelectOption>
                      <IonSelectOption value="5">5</IonSelectOption>
                      <IonSelectOption value="6">6</IonSelectOption>
                      <IonSelectOption value="7">7+</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem className="signup-card-field">
                  <IonLabel position="floating">How many minutes of activity per day?</IonLabel>
                    <IonSelect interfaceOptions={minutesPhysicallyActive} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setMinPhysical(e.target.value as string)}>
                      <IonSelectOption value="0-15">0-15</IonSelectOption>
                      <IonSelectOption value="16-30">16-30</IonSelectOption>
                      <IonSelectOption value="31-45">31-45</IonSelectOption>
                      <IonSelectOption value="46-60">46-60</IonSelectOption>
                      <IonSelectOption value="60+">60+</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem className="signup-card-field">
                  <IonLabel position="floating">How far do you live from campus?</IonLabel>
                    <IonSelect interfaceOptions={distFromCampus} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setDistFromCamp(e.target.value as string)}>
                      <IonSelectOption value="on-campus">I live on campus</IonSelectOption>
                      <IonSelectOption value="0-5-miles">Within 5 miles of campus</IonSelectOption>
                      <IonSelectOption value="6-10-miles">6-10 miles from campus</IonSelectOption>
                      <IonSelectOption value="11-24-miles">11-24 miles from campus</IonSelectOption>
                      <IonSelectOption value="25+-miles">25+ miles from campus</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem className="signup-card-field">
                  <IonLabel position="floating">How often do you use the PSU Rec Center?</IonLabel>
                    <IonSelect interfaceOptions={recCenterUsage} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setRecCenterUse(e.target.value as string)}>
                      <IonSelectOption value="never">I have never used the Rec Center</IonSelectOption>
                      <IonSelectOption value="1-3">1-3 times total</IonSelectOption>
                      <IonSelectOption value="1-3-times-per-month">1-3 times per month</IonSelectOption>
                      <IonSelectOption value="1-3-times-per-week">1-3 times per week</IonSelectOption>
                      <IonSelectOption value="4+-times-per-week">4+ times per week</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <div>&nbsp;</div>

                <IonButton expand="block" onClick={submitRegistration}>Complete Registration</IonButton>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
    </IonPage>
  );
};

export default SignupForm;
