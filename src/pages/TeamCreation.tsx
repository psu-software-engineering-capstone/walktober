/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './TeamCreation.css';
import { useState } from 'react';
import { auth, FirestoreDB } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const TeamCreation: React.FC = () => {
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamMember1, setNewTeamMember1] = useState('');
  const [newTeamMember2, setNewTeamMember2] = useState('');
  const [newTeamMember3, setNewTeamMember3] = useState('');
  const [newTeamMember4, setNewTeamMember4] = useState('');
  const [newTeamMember5, setNewTeamMember5] = useState('');

  const createTeam = () => {
    if (auth.currentUser == null) {
      alert('You are not signed-in!');
      return;
    }
    setDoc(doc(FirestoreDB, 'teams', newTeamName), {
      name: newTeamName,
      avg_steps: 0,
      leader: auth.currentUser?.email,
      members: [
        newTeamMember1,
        newTeamMember2,
        newTeamMember3,
        newTeamMember4,
        newTeamMember5
      ]
    })
      .then(() => {
        console.log('Document written successfully');
        alert('You team has been created!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const createNewTeam = () => {
    createTeam();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Team Creation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Team Creation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel position="floating">Team Name</IonLabel>
          <IonInput
            type='text'
            name='team name'
            onIonChange={(e) => setNewTeamName(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 1</IonLabel>
          <IonInput
            type='email'
            name='team member 1'
            onIonChange={(e) => setNewTeamMember1(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 2</IonLabel>
          <IonInput
            type='email'
            name='team member 2'
            onIonChange={(e) => setNewTeamMember2(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 3</IonLabel>
          <IonInput
            type='email'
            name='team member 3'
            onIonChange={(e) => setNewTeamMember3(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 4</IonLabel>
          <IonInput
            type='email'
            name='team member 4'
            onIonChange={(e) => setNewTeamMember4(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 5</IonLabel>
          <IonInput
            type='email'
            name='team member 5'
            onIonChange={(e) => setNewTeamMember5(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonButton onClick={createNewTeam}>
            Create Team
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default TeamCreation;
