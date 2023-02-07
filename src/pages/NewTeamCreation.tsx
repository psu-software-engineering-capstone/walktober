/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import './NewTeamCreation.css';
import { useState } from 'react';
import { auth, FirestoreDB } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  arrayUnion,
  Timestamp
} from 'firebase/firestore';

interface Timestamp {
  seconds: number;
  nanoseconds: number;

  compareTo(other: Timestamp): number;
}

Timestamp.prototype.compareTo = function(other: Timestamp): number {
  if (this.seconds === other.seconds) {
    return this.nanoseconds - other.nanoseconds;
  } else {
    return this.seconds - other.seconds;
  }
};

const NewTeamCreation: React.FC = () => {
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamStatus, setNewTeamStatus] = useState(0);
  const [newTeamPassword, setNewTeamPassword] = useState('');

  const createTeam = async () => {
    if (auth.currentUser == null) {
      alert('You are not signed-in!');
      return;
    }
    const userRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    if(userData.team !== '') {
      alert('You are already in a team! You cannot create a team.');
      return;
    }
    if (newTeamName === '') {
      alert('Team name cannot be an empty string!');
      return;
    } else {
      const dbRef = doc(FirestoreDB, 'teams', newTeamName);
      const dbSnap = await getDoc(dbRef);
      if (dbSnap.exists()) {
        alert(`${newTeamName} already exists!`);
        return;
      }
    }
    if(newTeamStatus == 0 && newTeamPassword !== ''){
      alert('You cannot create a password for a public team!');
      return;
    }
    if(newTeamStatus == 1 && newTeamPassword === ''){
      alert('You must create a password for a private team!');
      return;
    }
    const currentDate: Timestamp = Timestamp.now();
    const adminRef = doc(FirestoreDB, 'users', 'admin');
    const adminSnap = await getDoc(adminRef);
    const teamCreationDueDate: Timestamp = adminSnap.data().team_creation_due;
    if(currentDate.compareTo(teamCreationDueDate) > 0){
      alert(`The team creation deadline is: ${teamCreationDueDate}. You cannot create a team now.`);
      return;
    }
    setDoc(doc(FirestoreDB, 'teams', newTeamName), {
      name: newTeamName,
      avg_steps: userData.num_steps,
      leader: auth.currentUser?.email,
      members: [
        userData.email
      ],
      status: newTeamStatus,
      password: newTeamPassword,
      team_size: 1
    })
      .then(async () => {
        console.log('Document written successfully');
        alert('Your team has been created!');
        await updateCurrentUser();
      })
      .catch((error: unknown) => {
        console.error('Error writing document: ', error);
      });
  };

  const updateCurrentUser = async () => {
    if (auth.currentUser == null) {
      return;
    }
    const currentUserRef = doc(
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    await updateDoc(currentUserRef, {
      team: newTeamName,
      team_leader: true
    });
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
            type="text"
            name="team name"
            onIonChange={(e) => setNewTeamName(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team status. 0 is public, 1 is private</IonLabel>
          <IonInput
            type="number"
            name="Team status. 0 is public, 1 is private"
            onIonChange={(e) => setNewTeamStatus(e.target.value as number)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Password</IonLabel>
          <IonInput
            type="password"
            name="Team Password"
            onIonChange={(e) => setNewTeamPassword(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonButton onClick={createTeam}>Create Team</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default NewTeamCreation;
