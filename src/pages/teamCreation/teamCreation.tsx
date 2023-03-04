/* eslint-disable react/prop-types */
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
import { useState } from 'react';
import { auth, FirestoreDB } from '../../firebase';
import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import './teamCreation.css';

interface Timestamp {
  seconds: number;
  nanoseconds: number;

  compareTo(other: Timestamp): number;
}

Timestamp.prototype.compareTo = function (other: Timestamp): number {
  if (this.seconds === other.seconds) {
    return this.nanoseconds - other.nanoseconds;
  } else {
    return this.seconds - other.seconds;
  }
};

interface StepLog {
  date: string;
  steps: number;
}
interface userData {
  email: string;
  name: string;
  badges: string[];
  device: string;
  totalStep: number;
  profile_pic: string;
  team: string;
  team_leader: boolean;
  stepsByDate: StepLog[];
  admin: boolean;
}

const TeamCreation: React.FC<{ TeamCreationData: userData | null }> = ({ TeamCreationData }) => {
  // team creation data
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamStatus, setNewTeamStatus] = useState(0);
  const [newTeamPassword, setNewTeamPassword] = useState('');

  const history = useHistory(); // for routing

  const createTeam = async () => {
    if (auth.currentUser == null || TeamCreationData == null) {
      alert('You are not logged-in!');
      return;
    }
    if (TeamCreationData.team !== '') {
      alert('You are already in a team!');
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
    if (newTeamStatus == 0 && newTeamPassword !== '') {
      alert('You cannot create a password for a public team!');
      return;
    }
    if (newTeamStatus == 1 && newTeamPassword === '') {
      alert('You must create a password for a private team!');
      return;
    }
    const currentDate: Timestamp = Timestamp.now();
    const adminRef = doc(FirestoreDB, 'admin', 'admin');
    const adminSnap = await getDoc(adminRef);
    const teamCreationDueDate: Timestamp = adminSnap.data().team_creation_due;
    if (currentDate.compareTo(teamCreationDueDate) > 0) {
      alert(
        `The team creation deadline is: ${teamCreationDueDate}. You cannot create a team now.`
      );
      return;
    }
    setDoc(doc(FirestoreDB, 'teams', newTeamName), {
      name: newTeamName,
      avg_steps: TeamCreationData.totalStep,
      leader: TeamCreationData.email,
      members: [TeamCreationData.email],
      status: newTeamStatus,
      password: newTeamPassword,
      profile_pic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
      totalStep: TeamCreationData.totalStep,
      channel_id: '' // TODO: create discord channel
    })
      .then(async () => {
        console.log('Document written successfully');
        alert('Your team has been created!');
        await updateCurrentUser();
        history.push('/app/team');
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
        <NavBar>
          <IonTitle>Team Creation</IonTitle>
        </NavBar>
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
          <IonLabel position="floating">
            Team status. 0 is public, 1 is private
          </IonLabel>
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

export default TeamCreation;
