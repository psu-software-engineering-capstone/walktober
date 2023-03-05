import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  RefresherEventDetail
} from '@ionic/react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { auth, FirestoreDB, storage } from '../../firebase';
import { useHistory } from 'react-router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import AdminContext from '../../store/admin-context';
import AuthContext from '../../store/auth-context';
import TeamLeaderBoardChart from '../../components/LeaderBoard/TeamLeaderboardChart';
import './teamHome.scss';

const TeamHome: React.FC = () => {
  interface memberData {
    name: string;
    email: string;
    profile_pic: string;
    totalStep: number;
  }

  const [leaderboardData, setLeaderboardData] = useState(Array<memberData>);
  const [teamMembers, setTeamMembers] = useState(Array<string>);
  const [teamName, setTeamName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [userReference, setUserRef] = useState('');
  const [teamReference, setTeamRef] = useState('');
  const [isLeader, setIsLeader] = useState(false);
  const [buttonValid, setValid] = useState(false);
  const [photo, setPhoto] = useState<any>(null);
  const [userTotalSteps, setUserTotalSteps] = useState(0);
  const [teamTotalSteps, setTeamTotalSteps] = useState(0);

  const history = useHistory(); // for routing

  const ctx = useContext(AuthContext); // auth context
  const adData = useContext(AdminContext); // admin context

  // display team members
  const DisplayTeam = (team: memberData[]): any => {
    if (team.length > 0) {
      return (
        <>
          <IonGrid fixed={true}>
            <IonRow class="top">
              <IonCol
                size="12"
                align-self-center="true"
                class="header-col admin-col"
              >
                Teammates
              </IonCol>
            </IonRow>
            <IonRow class="header-row">
              <IonCol size="6" class="header-col admin-col">
                Members Name
              </IonCol>
              <IonCol size="6" class="header-col admin-col">
                Members email
              </IonCol>
            </IonRow>
            {team.map((item: { name: string; email: string }) => (
              <IonRow key={Math.random()}>
                <IonCol size="6" class="admin-col">
                  {item.name}
                </IonCol>
                <IonCol size="6" class="admin-col">
                  {item.email}
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </>
      );
    }
  };

  // get the data from the database
  async function getData() {
    if (ctx.team === '') {
      history.push('/app/team/join'); // if the user is not in a team, redirect them to the team join page
      return;
    }
    const members: Array<memberData> = [];
    const emailList: Array<string> = [];
    const currentUserRef = doc(
      // reference the current user document
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    setUserRef(currentUserRef);
    const userSnap = await getDoc(currentUserRef); // grab the user document
    const userData = userSnap.data(); // get the user data
    const teamName = userData.team; // get the team name
    setUserTotalSteps(userData.totalStep);
    setTeamName(teamName);
    setIsLeader(userData.team_leader);
    const teamRef = doc(FirestoreDB, 'teams', teamName); // reference team document
    setTeamRef(teamRef);
    const teamSnapshot = await getDoc(teamRef); // grab the team document
    const teamData = teamSnapshot.data(); // get the team data
    setProfilePic(teamData.profile_pic);
    setTeamTotalSteps(teamData.totalStep);
    // get all the users in the team
    const usersRef = collection(FirestoreDB, 'users');
    const q = query(usersRef, where('team', '==', ctx.team));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      const member: memberData = {
        name: doc.data().name as string,
        email: doc.data().email as string,
        profile_pic: doc.data().profile_pic as string,
        totalStep: doc.data().totalStep as number
      };
      emailList.push(member.email);
      members.push(member);
    });
    setLeaderboardData(
      members.sort((a: any, b: any) => (a.totalStep > b.totalStep ? -1 : 1))
    ); // set the leaderboard data
    setTeamMembers(emailList); // set the team members
    const today = new Date();
    today.setDate(today.getDate() - 1);
    console.log(today, adData.teamDate, today.toISOString().slice(0, 10), adData);
    if (adData.teamDate < today.toISOString().slice(0, 10)) {
      setValid(true);
      console.log('true');
    } else {
      setValid(false);
      console.log('false');
    }
  }

  // handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  // handle image upload
  const handleSubmit = async () => {
    const imageRef = ref(storage, teamName + '.png');
    await uploadBytes(imageRef, photo);
    const photoURL = await getDownloadURL(imageRef);
    await updateDoc(teamReference, { profile_pic: photoURL })
      .then(() => {
        alert('Team profile picture updated!');
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  // display the change picture button if the user is the leader
  function changePicture() {
    if (isLeader === true) {
      return (
        <>
          <IonItem>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleImageChange}
            />
          </IonItem>
          <IonItem>
            <IonButton onClick={handleSubmit}>Change Team Picture</IonButton>
          </IonItem>
        </>
      );
    }
  }

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getData(); // Refresh data
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // leave team
  async function leaveTeam() {
    const newTotalStep = teamTotalSteps - userTotalSteps; //new total step for team
    const newAvg = newTotalStep / (teamMembers.length - 1); //new average step for team
    const newMembers: Array<string> = []; //array for members field
    // set new members array
    for (let i = 0; i < teamMembers.length; i++) {
      if (teamMembers[i] !== auth.currentUser.email) {
        newMembers.push(teamMembers[i]);
      }
    }
    // if the user is the leader
    if (isLeader === true) {
      // if the user is the only member of the team
      if (teamMembers.length === 1) {
        await deleteDoc(doc(FirestoreDB, 'teams', teamName)) // delete the team document
          .then(() => {
            console.log('Team deleted');
          })
          .catch((error: any) => {
            console.log(error);
          });
        await updateDoc(userReference, {
          // update the user document
          team_leader: false,
          team: ''
        });
        // if the user is not the only member of the team
      } else {
        const newLead = teamMembers[1]; // get the new team leader
        await updateDoc(teamReference, {
          // update the team document
          leader: newLead,
          totalStep: newTotalStep,
          avg_steps: newAvg,
          members: newMembers
        });
        await updateDoc(userReference, {
          // update the user document
          team_leader: false,
          team: ''
        });
        const otherUserRef = doc(FirestoreDB, 'users', newLead as string);
        await updateDoc(otherUserRef, { team_leader: true }); // update the new team leader document
      }
      // if the user is not the leader
    } else {
      await updateDoc(teamReference, {
        // update the team document
        totalStep: newTotalStep,
        avg_steps: newAvg,
        members: newMembers
      });
      await updateDoc(userReference, {
        // update the user document
        team_leader: false,
        team: ''
      });
    }
    history.push('/app/team/join'); // redirect to join team page
  }

  // update the data when the page loads
  // update the data when the team gets updated
  useEffect(() => {
    if (ctx.team !== '') {
      const unsubscribe = onSnapshot(
        doc(FirestoreDB, 'teams', ctx.team),
        (doc: any) => {
          if (doc.data() !== undefined) {
            console.log('Team home page updated');
            getData();
          }
        }
      );
      return unsubscribe;
    }
  }, [ctx.team]);

  // team deadline verification
  function verifyCount() {
    if (buttonValid) {
      if (teamMembers.length < adData.minSize) {
        return (
          <b>
            Your team will not be particpating in the Walktober challenge due to
            not having enough teammembers
          </b>
        );
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle> {teamName} </IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol
              className="boxSize"
              sizeSm="12"
              sizeLg="4"
              sizeMd="6"
              sizeXs="12"
            >
              <TeamLeaderBoardChart data={leaderboardData}></TeamLeaderBoardChart>
            </IonCol>
            <IonCol sizeLg="8">
              <IonItem>
                <IonImg
                  className="profile_pic"
                  src={profilePic}
                  alt="Profile picture for the team the user is a part of"
                >
                  {' '}
                </IonImg>
              </IonItem>
              <IonItem> {teamName} Profile Picture </IonItem>
              {changePicture()}
              <IonItem>
                <IonButton onClick={leaveTeam}> Leave team </IonButton>{' '}
              </IonItem>
              <IonItem>{verifyCount()}</IonItem>
              <IonItem>{DisplayTeam(leaderboardData)}</IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default TeamHome;
