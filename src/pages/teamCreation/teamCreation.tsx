/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useContext, useState } from 'react';
import { auth, FirestoreDB } from '../../firebase';
import AdminContext from '../../store/admin-context';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import './teamCreation.css';
import create from '../../assets/create-team.png';

const TeamCreation: React.FC = () => {
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamStatus, setNewTeamStatus] = useState(0);
  const [newTeamPassword, setNewTeamPassword] = useState('');

  const history = useHistory(); // for routing

  const adData = useContext(AdminContext); // admin context

  // create a new team
  const createTeam = async () => {
    const userRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
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
    const currentDate: Date = new Date();
    const teamCreationDeadline: Date = new Date(adData.teamDate);
    if (currentDate > teamCreationDeadline) {
      alert(
        `The team creation deadline is: ${teamCreationDeadline}. You cannot create a team now.`
      );
      return;
    }
    setDoc(doc(FirestoreDB, 'teams', newTeamName), {
      name: newTeamName,
      avg_steps: userData.totalStep,
      leader: userData.email,
      members: [userData.email],
      status: newTeamStatus,
      password: newTeamPassword,
      profile_pic:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
      totalStep: userData.totalStep,
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

  // update the current user's data
  const updateCurrentUser = async () => {
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
      <IonContent fullscreen className="team-create">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Team Creation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className="create-team-card">
          <IonCardHeader style={{ display: 'flex', justifyContent: 'center' }}>
            <img alt="Art depicting 5 team members jumping in the air" src={create} />
          </IonCardHeader>
          <IonCardTitle class="ion-text-center">Create a New Team</IonCardTitle>
          <IonCardContent>
            <IonList class="ion-no-padding">
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
                  onIonChange={(e) =>
                    setNewTeamStatus(e.target.value as number)
                  }
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Team Password</IonLabel>
                <IonInput
                  type="password"
                  name="Team Password"
                  onIonChange={(e) =>
                    setNewTeamPassword(e.target.value as string)
                  }
                ></IonInput>
              </IonItem>
            </IonList>
            <br></br>
            <IonButton expand="block" onClick={createTeam} color="primary">
              Create Team
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TeamCreation;
