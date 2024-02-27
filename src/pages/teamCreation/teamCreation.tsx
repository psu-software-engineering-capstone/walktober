/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import {
  IonRadioGroup,
  IonRadio,
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
  IonIcon
} from '@ionic/react';
import { useContext, useState } from 'react';
import { auth, FirestoreDB } from '../../firebase';
import AdminContext from '../../store/admin-context';
import {
  collection,
  doc,
  limit,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import './teamCreation.css';
import create from '../../assets/create-team.png';
import { eyeOff } from 'ionicons/icons';
import { eye } from 'ionicons/icons';

const TeamCreation: React.FC = () => {
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamPassword, setNewTeamPassword] = useState('');
  const [confirmNewTeamPassword, setConfirmNewTeamPassword] = useState('');
  const [newTeamStatus, setNewTeamStatus] = useState(0);
  const [showTeamPassword, setShowTeamPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleTeamChange = (e: any) => {
    setNewTeamStatus(e.detail.value);
    setShowTeamPassword(e.detail.value == 1 ? true : false);
  };

  // toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const history = useHistory(); // for routing

  const adData = useContext(AdminContext); // admin context

  // create a new team
  const createTeam = async () => {
    const userRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    if (newTeamName === '') {
      alert('You must enter a team name');
      return;
    } else {
      const dbRef = doc(FirestoreDB, 'teams', newTeamName);
      const dbSnap = await getDoc(dbRef);
      if (dbSnap.exists()) {
        alert(`${newTeamName} already exists`);
        return;
      }
    }

    if (newTeamStatus == 0 && newTeamPassword !== '') {
      setNewTeamPassword('');
    }

    if (newTeamStatus == 1 && newTeamPassword === '') {
      alert('You must create a password for a private team');
      return;
    }

    if (newTeamStatus == 1 && newTeamPassword != confirmNewTeamPassword) {
      alert('Team passwords must match');
      return;
    }
    const now = Date.now();
    const currentDate: Date = new Date(now);
    const teamCreationDeadline: Date = new Date(adData.teamDate);
    if (currentDate > teamCreationDeadline) {
      alert(`The team creation deadline is: ${teamCreationDeadline}`);
      return;
    }
    let channelId = ''; //temp array
    const chanQuery = query(
      collection(FirestoreDB, 'channelIDs'),
      where('team', '==', ''),
      limit(1)
    ); //find empty channel id document
    const chanIdSnap = await getDocs(chanQuery); //get results of query
    chanIdSnap.forEach(async (doc: any) => {
      channelId = doc.id; //reassign the string to the channel id (which is the document id)
    });
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
      channel_id: channelId // TODO: create discord channel
    })
      .then(async () => {
        await updateDoc(doc(FirestoreDB, 'channelIDs', channelId), {
          team: newTeamName
        }); //set channel id document to this new open team
        alert('Your team has been created');
        await updateCurrentUser();
        history.push('/app/team');
      })
      .catch((error: unknown) => {
        console.error(error);
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
        <IonCard className="create-team-card">
          <IonCardHeader style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              alt="Art depicting 5 team members jumping in the air"
              src={create}
            />
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

              <IonList class="ion-no-padding">
                <IonLabel class="ion-no-padding">Type of Team</IonLabel>
                <IonRadioGroup
                  value={newTeamStatus}
                  onIonChange={handleTeamChange}
                >
                  <IonItem>
                    <IonLabel>Public (Any participant may join team)</IonLabel>
                    <IonRadio slot="start" value="0"></IonRadio>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Private</IonLabel>
                    <IonRadio slot="start" value="1"></IonRadio>
                  </IonItem>
                </IonRadioGroup>
              </IonList>

              {showTeamPassword && (
                <>
                  <IonItem>
                    <IonLabel position="floating">Team Password</IonLabel>
                    <IonInput
                      type={passwordShown ? 'text' : 'password'}
                      name="Team Password"
                      onIonChange={(e) =>
                        setNewTeamPassword(e.target.value as string)
                      }
                    ></IonInput>
                    <IonButton
                      fill="clear"
                      color="medium"
                      slot="end"
                      onClick={togglePasswordVisibility}
                      className="password-show"
                    >
                      <IonIcon
                        slot="icon-only"
                        icon={passwordShown ? eyeOff : eye}
                      ></IonIcon>
                    </IonButton>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating">
                      Confirm Team Password
                    </IonLabel>
                    <IonInput
                      type={passwordShown ? 'text' : 'password'}
                      name="Confirm Team Password"
                      onIonChange={(e) =>
                        setConfirmNewTeamPassword(e.target.value as string)
                      }
                    ></IonInput>
                    <IonButton
                      fill="clear"
                      color="medium"
                      slot="end"
                      onClick={togglePasswordVisibility}
                      className="password-show"
                    >
                      <IonIcon
                        slot="icon-only"
                        icon={passwordShown ? eyeOff : eye}
                      ></IonIcon>
                    </IonButton>
                  </IonItem>
                </>
              )}
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
