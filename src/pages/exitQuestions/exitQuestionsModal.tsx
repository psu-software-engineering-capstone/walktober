import React, { useRef } from 'react';
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonInput,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCard,
} from '@ionic/react';
import './exitQuestionsModal.scss';
import smallLogo from '../../assets/Walktober.png';
import { useHistory } from 'react-router-dom';
import { doc, setDoc } from '@firebase/firestore';
import { auth, FirestoreDB } from '../../firebase';
import { useState } from 'react';

function ExitSurveyModal() {


  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [minutesPerDay, setMinutesPerDay] = useState('');
  const [recUse, setRecUse] = useState('');
  const [wellBeingOpinion, setWellBeingOpinion] = useState('');
  const [wouldParticipateOpinion, setWouldParticipateOpinion] = useState('');
  const [whyNotParticipate, setWhyNotParticipate] = useState('');
  const [participatedEvents, setParticipatedEvents] = useState('');
  const [walktoberIdeas, setWalktoberIdeas] = useState('');
  const [walktoberFeedback, setWalktoberFeedback] = useState('');

  const createExitQuestions = () => {
    void setDoc(doc(FirestoreDB, 'exitQuestions', auth.currentUser.email as string), {
      hours: hoursPerWeek,
      minutes: minutesPerDay,
      recUsage: recUse,
      wellBeing: wellBeingOpinion,
      participate: wouldParticipateOpinion,
      notParticipate: whyNotParticipate,
      participations: participatedEvents,
      futureIdeas: walktoberIdeas,
      feedback: walktoberFeedback
    });
  };

  const modal = useRef<HTMLIonModalElement>(null);

  // for routing
  const history = useHistory();

  const hoursPhysicallyActive = {
    header: 'Please select the approximate hours per week you are currently physically active'
  };
  const minutesPhysicallyActive = {
    header: 'Please select the approximate minutes per day you are currently physically active'
  };
  const recCenterUsage = {
    header: 'Please select the most accurate frequency for your PSU Rec Center usage'
  };
  const wellBeing = {
    header: 'Please select the response that most accurately depicts your thoughts to the statement: Walktober helped improve my health and well-being'
  };
  const participateAgain = {
    header: 'Please select the response that most accurately depicts your thoughts to the statement: I would participate in Walktober again!'
  };

  const submitExitForm = async() => {
    createExitQuestions();
    alert("Submitted");
    history.push('/app');
  };

  const cancelExitForm = async() => {
    history.push('/app');
  };

  return (
      <IonPage>
        <IonHeader></IonHeader>
        <IonContent fullscreen className="signupForm">
          <IonCard className="signup-card">
            <IonCardHeader>
              <img className="exit-logo-modal" alt="Walktober logo" src={smallLogo} />
              <IonCardTitle class="ion-text-center">Please fill out our exit survey!</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList class="modal-field">
                  <IonItem className="modal-field">
                    <IonLabel position="floating">How many hours per week are you active?</IonLabel>
                      <IonSelect interfaceOptions={hoursPhysicallyActive} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setHoursPerWeek(e.target.value as string)}>
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

                  <IonItem className="modal-field">
                    <IonLabel position="floating">How many minutes of activity per day?</IonLabel>
                      <IonSelect interfaceOptions={minutesPhysicallyActive} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setMinutesPerDay(e.target.value as string)}>
                        <IonSelectOption value="0-15">0-15</IonSelectOption>
                        <IonSelectOption value="16-30">16-30</IonSelectOption>
                        <IonSelectOption value="31-45">31-45</IonSelectOption>
                        <IonSelectOption value="46-60">46-60</IonSelectOption>
                        <IonSelectOption value="60+">60+</IonSelectOption>
                      </IonSelect>
                  </IonItem>

                  <IonItem className="modal-field">
                    <IonLabel position="floating">How often do you use the PSU Rec Center?</IonLabel>
                      <IonSelect interfaceOptions={recCenterUsage} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setRecUse(e.target.value as string)}>
                        <IonSelectOption value="never">I have never used the Rec Center</IonSelectOption>
                        <IonSelectOption value="1-3">1-3 times total</IonSelectOption>
                        <IonSelectOption value="1-3-times-per-month">1-3 times per month</IonSelectOption>
                        <IonSelectOption value="1-3-times-per-week">1-3 times per week</IonSelectOption>
                        <IonSelectOption value="4+-times-per-week">4+ times per week</IonSelectOption>
                      </IonSelect>
                  </IonItem>

                  <IonItem className="modal-field">
                    <IonLabel position="floating">Participation in Walktober helped me improve my health and well-being.</IonLabel>
                      <IonSelect interfaceOptions={wellBeing} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setWellBeingOpinion(e.target.value as string)}>
                        <IonSelectOption value="1">Strongly Disagree</IonSelectOption>
                        <IonSelectOption value="2">Disagree</IonSelectOption>
                        <IonSelectOption value="3">Neither Agree Nor Disagree</IonSelectOption>
                        <IonSelectOption value="4">Agree</IonSelectOption>
                        <IonSelectOption value="5">Strongly Agree</IonSelectOption>
                      </IonSelect>
                  </IonItem>

                  <IonItem className="modal-field">
                    <IonLabel position="floating">I would participate in Walktober again.</IonLabel>
                      <IonSelect interfaceOptions={participateAgain} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setWouldParticipateOpinion(e.target.value as string)}>
                        <IonSelectOption value="1">Strongly Disagree</IonSelectOption>
                        <IonSelectOption value="2">Disagree</IonSelectOption>
                        <IonSelectOption value="3">Neither Agree Nor Disagree</IonSelectOption>
                        <IonSelectOption value="4">Agree</IonSelectOption>
                        <IonSelectOption value="5">Strongly Agree</IonSelectOption>
                      </IonSelect>
                  </IonItem>

                  <IonItem className="modal-field">
                      <IonLabel position="floating">If you would not participate in Walktober again, why not?</IonLabel>
                      <IonInput
                        type="text"
                        name="notParticipate"
                        onIonChange={(e) => setWhyNotParticipate(e.target.value as string)}
                      ></IonInput>
                  </IonItem>

                  <IonItem className="modal-field">
                      <IonLabel position="floating">Please list any walking events you participated in during Walktober.</IonLabel>
                      <IonInput
                        type="text"
                        name="participatedEvents"
                        onIonChange={(e) => setParticipatedEvents(e.target.value as string)}
                      ></IonInput>
                  </IonItem>

                  <IonItem className="modal-field">
                      <IonLabel position="floating">Please list any ideas for walking activities for future Walktober events.</IonLabel>
                      <IonInput 
                        type="text"
                        name="futureEvents"
                        placeholder="In-person guided walks or remote walking activities you'd be interested in?"
                        onIonChange={(e) => setWalktoberIdeas(e.target.value as string)}
                      ></IonInput>
                  </IonItem>

                  <IonItem className="modal-field">
                      <IonLabel position="floating">Please provite us with any other feedback on your Walktober experience.</IonLabel>
                      <IonInput 
                        type="text"
                        name="futureEvents"
                        onIonChange={(e) => setWalktoberFeedback(e.target.value as string)}
                      ></IonInput>
                  </IonItem>
                  <div>&nbsp;</div>
                <IonButton className="modal-submit" expand="block" onClick={submitExitForm}>Submit</IonButton>
                <IonButton className="modal-submit" expand="block" onClick={cancelExitForm}>Cancel</IonButton>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
    </IonPage>
  );
}

export default ExitSurveyModal;

/*  return (
    <IonPage>
      <IonButton id="open-modal">
        Open
      </IonButton>
      <IonModal id="survey-modal" ref={modal} trigger="open-modal">
          <img className="exit-logo-modal" alt="Walktober logo" src={smallLogo} />
        <IonContent>
            <IonTitle class="ion-text-center">Please fill out our exit survey!</IonTitle>
            <div>&nbsp;</div>
          <IonList class="ion-no-padding">
              <IonItem className="modal-field">
                <IonLabel position="floating">How many hours per week are you active?</IonLabel>
                  <IonSelect interfaceOptions={hoursPhysicallyActive} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setHoursPerWeek(e.target.value as string)}>
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

              <IonItem className="modal-field">
                <IonLabel position="floating">How many minutes of activity per day?</IonLabel>
                  <IonSelect interfaceOptions={minutesPhysicallyActive} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setMinutesPerDay(e.target.value as string)}>
                    <IonSelectOption value="0-15">0-15</IonSelectOption>
                    <IonSelectOption value="16-30">16-30</IonSelectOption>
                    <IonSelectOption value="31-45">31-45</IonSelectOption>
                    <IonSelectOption value="46-60">46-60</IonSelectOption>
                    <IonSelectOption value="60+">60+</IonSelectOption>
                  </IonSelect>
              </IonItem>

              <IonItem className="modal-field">
                <IonLabel position="floating">How often do you use the PSU Rec Center?</IonLabel>
                  <IonSelect interfaceOptions={recCenterUsage} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setRecUse(e.target.value as string)}>
                    <IonSelectOption value="never">I have never used the Rec Center</IonSelectOption>
                    <IonSelectOption value="1-3">1-3 times total</IonSelectOption>
                    <IonSelectOption value="1-3-times-per-month">1-3 times per month</IonSelectOption>
                    <IonSelectOption value="1-3-times-per-week">1-3 times per week</IonSelectOption>
                    <IonSelectOption value="4+-times-per-week">4+ times per week</IonSelectOption>
                  </IonSelect>
              </IonItem>

              <IonItem className="modal-field">
                <IonLabel position="floating">Participation in Walktober helped me improve my health and well-being.</IonLabel>
                  <IonSelect interfaceOptions={wellBeing} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setWellBeingOpinion(e.target.value as string)}>
                    <IonSelectOption value="1">Strongly Disagree</IonSelectOption>
                    <IonSelectOption value="2">Disagree</IonSelectOption>
                    <IonSelectOption value="3">Neither Agree Nor Disagree</IonSelectOption>
                    <IonSelectOption value="4">Agree</IonSelectOption>
                    <IonSelectOption value="5">Strongly Agree</IonSelectOption>
                  </IonSelect>
              </IonItem>

              <IonItem className="modal-field">
                <IonLabel position="floating">I would participate in Walktober again.</IonLabel>
                  <IonSelect interfaceOptions={participateAgain} interface="action-sheet" placeholder="Select One" onIonChange={(e) => setWouldParticipateOpinion(e.target.value as string)}>
                    <IonSelectOption value="1">Strongly Disagree</IonSelectOption>
                    <IonSelectOption value="2">Disagree</IonSelectOption>
                    <IonSelectOption value="3">Neither Agree Nor Disagree</IonSelectOption>
                    <IonSelectOption value="4">Agree</IonSelectOption>
                    <IonSelectOption value="5">Strongly Agree</IonSelectOption>
                  </IonSelect>
              </IonItem>

              <IonItem className="modal-field">
                  <IonLabel position="floating">If you would not participate in Walktober again, why not?</IonLabel>
                  <IonInput
                    type="text"
                    name="notParticipate"
                    onIonChange={(e) => setWhyNotParticipate(e.target.value as string)}
                  ></IonInput>
              </IonItem>

              <IonItem className="modal-field">
                  <IonLabel position="floating">Please list any walking events you participated in during Walktober.</IonLabel>
                  <IonInput
                    type="text"
                    name="participatedEvents"
                    onIonChange={(e) => setParticipatedEvents(e.target.value as string)}
                  ></IonInput>
              </IonItem>

              <IonItem className="modal-field">
                  <IonLabel position="floating">Please list any ideas for walking activities for future Walktober events.</IonLabel>
                  <IonInput 
                    type="text"
                    name="futureEvents"
                    placeholder="In-person guided walks or remote walking activities you'd be interested in?"
                    onIonChange={(e) => setWalktoberIdeas(e.target.value as string)}
                  ></IonInput>
              </IonItem>

              <IonItem className="modal-field">
                  <IonLabel position="floating">Please provite us with any other feedback on your Walktober experience.</IonLabel>
                  <IonInput 
                    type="text"
                    name="futureEvents"
                    onIonChange={(e) => setWalktoberFeedback(e.target.value as string)}
                  ></IonInput>
              </IonItem>

              <div>&nbsp;</div>

              <IonButton className="modal-submit" expand="block" onClick={submitExitForm}>Complete Exit Form</IonButton>
            </IonList>
        </IonContent>
      </IonModal>
    </IonPage>
  );
  */