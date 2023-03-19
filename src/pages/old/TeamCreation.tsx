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
import './TeamCreation.css';
import { useState } from 'react';
import { auth, FirestoreDB } from '../../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';

const TeamCreation: React.FC = () => {
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamMember1, setNewTeamMember1] = useState('');
  const [newTeamMember2, setNewTeamMember2] = useState('');
  const [newTeamMember3, setNewTeamMember3] = useState('');
  const [newTeamMember4, setNewTeamMember4] = useState('');
  const [newTeamMember5, setNewTeamMember5] = useState('');

  const members = [
    newTeamMember1,
    newTeamMember2,
    newTeamMember3,
    newTeamMember4,
    newTeamMember5
  ];

  const createTeam = async () => {
    if (auth.currentUser == null) {
      alert('You are not signed-in!');
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
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (member !== '') {
        const dbRef = doc(FirestoreDB, 'users', member);
        const dbSnap = await getDoc(dbRef);
        if (!dbSnap.exists()) {
          alert(`${member} does not exist in the database!`);
          return;
        }
      }
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
      .then(async () => {
        console.log('Team created');
        alert('Your team has been created');
        await updateCurrentUser();
        await updateTeamMembers();
        await setAvgSteps();
      })
      .catch((error: unknown) => {
        console.error(error);
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

  const updateTeamMembers = async () => {
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (member !== '') {
        const dbRef = doc(FirestoreDB, 'users', member);
        await updateDoc(dbRef, {
          team: newTeamName
        });
      }
    }
  };

  const setAvgSteps = async () => {
    let sum = 0;
    let count = 0;
    let average = 0;
    const q = query(
      collection(FirestoreDB, 'users'),
      where('team', '==', newTeamName)
    );
    const querySnap = await getDocs(q);
    querySnap.forEach((doc: { data: () => any }) => {
      const data = doc.data();
      if (data.totalStep) {
        sum += data.totalStep as number;
        count++;
      }
    });
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser?.email as string);
    const dbSnap = await getDoc(dbRef);
    if (dbSnap.exists()) {
      const data = dbSnap.data();
      sum += data.totalStep as number;
      count++;
    }
    if (sum === 0) {
      average = 0;
    } else {
      average = sum / count;
    }
    const teamRef = doc(FirestoreDB, 'teams', newTeamName);
    await updateDoc(teamRef, {
      avg_steps: average
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
          <IonLabel position="floating">Team Member 1</IonLabel>
          <IonInput
            type="email"
            name="team member 1"
            onIonChange={(e) => setNewTeamMember1(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 2</IonLabel>
          <IonInput
            type="email"
            name="team member 2"
            onIonChange={(e) => setNewTeamMember2(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 3</IonLabel>
          <IonInput
            type="email"
            name="team member 3"
            onIonChange={(e) => setNewTeamMember3(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 4</IonLabel>
          <IonInput
            type="email"
            name="team member 4"
            onIonChange={(e) => setNewTeamMember4(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Team Member 5</IonLabel>
          <IonInput
            type="email"
            name="team member 5"
            onIonChange={(e) => setNewTeamMember5(e.target.value as string)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonButton onClick={createTeam}>Create Team</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default TeamCreation;
