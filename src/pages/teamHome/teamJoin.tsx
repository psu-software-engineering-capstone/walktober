/* eslint-disable react/prop-types */
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  RefresherEventDetail
} from '@ionic/react';
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  increment
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { auth, FirestoreDB } from '../../firebase';
import { eyeOff, eye } from 'ionicons/icons';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import './teamHome.scss';

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

interface teamData {
  name: string;
  avg_steps: number;
  leader: string;
  members: string[];
  status: string;
  password: string;
  profile_pic: string;
  totalStep: number;
  channel_id: string;
}

interface tempData {
  name: string;
  leader: string;
  size: number;
  type: string;
  password: string;
}

interface selectFormat {
  text: string;
  value: string;
}

const TeamJoin: React.FC<{ TeamJoinTeamList: Array<teamData> | null; TeamJoinUser: userData | null; }> = ({ TeamJoinTeamList, TeamJoinUser }) => {
  const [joinTeam, setJoin] = useState(''); // team to join
  const [teamPass, setPass] = useState(''); // team password
  const [passwordShown, setPasswordShown] = useState(false); // password visability
  const [allTeams, setTeams] = useState(Array<tempData>); // team list

  const history = useHistory(); // for routing

  const ctx = useContext(AuthContext); // auth context

  // toggle password visability
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // join the team
  const joined = async () => {
    if (ctx.user === null || TeamJoinUser === null) {
      // if the user is not logged in
      alert('You are not logged-in!');
      history.push('/login');
      return;
    }
    const currentUserRef = doc(
      // user reference
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    const teamRef = doc(FirestoreDB, 'teams', joinTeam); // team reference
    const teamSnap = await getDoc(teamRef); // team snapshot
    const teamData = teamSnap.data(); // team data
    if (teamData.members.length >= 1) {
      // if there are already members in the team
      await updateDoc(currentUserRef, {
        team: joinTeam
      }); // update the user's document
      await updateDoc(teamRef, {
        members: arrayUnion(TeamJoinUser.email),
        totalStep: increment(TeamJoinUser.totalStep),
        avg_steps:
          (teamData.totalStep + TeamJoinUser.totalStep) /
          (teamData.members.length + 1)
      }); // update the teams members, their total steps, and the new average steps
    } else {
      // if there are no members in the team
      await updateDoc(currentUserRef, {
        team: joinTeam,
        team_leader: true
      }); // update the user's document and set them as the team leader
      await updateDoc(teamRef, {
        members: arrayUnion(TeamJoinUser.email),
        totalStep: increment(TeamJoinUser.totalStep),
        avg_steps:
          (teamData.totalStep + TeamJoinUser.totalStep) /
          (teamData.members.length + 1),
        leader: TeamJoinUser.email
      }); // update the teams members, their total steps, and the new average steps
    }
    history.push('/app/team'); // move to the team page
  };

  // team join precheck
  const toJoin = () => {
    if (ctx.team !== '') {
      // if the user is already in a team
      alert('You are already in a team!');
      history.push('/app/team');
      return;
    }
    if (joinTeam === '') {
      alert('No team name has been entered as of yet');
      return;
    }
    for (let i = 0; i < allTeams.length; i++) {
      if (allTeams[i].name === joinTeam) {
        // if the team is found
        if (allTeams[i].type === 'Private') {
          // if the team is private
          if (teamPass === '') {
            // if no password is entered
            alert(
              'A password needs to be entered as this team is private. Please enter the password and try again.'
            );
            return;
          } else if (allTeams[i].password === teamPass) {
            // if the password is correct
            joined(); // join the team
            return;
          } else {
            alert(
              'The password entered does not match the password for the team. Please try again'
            ); // password is wrong
            return;
          }
        } else {
          joined(); // public team
          return;
        }
      }
    }
    alert('No team was found that matched what was entered'); // team not found
    return;
  };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getData(); // get the data from the database
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // display the teams
  const DisplayTeams = (teams: tempData[]): any => {
    if (teams.length > 0) {
      return (
        <>
          <IonGrid>
            <IonRow align-items-stretch="true" class="top">
              <IonCol align-self-center="true" class="header-col admin-col">
                Available Teams
              </IonCol>
            </IonRow>
            <IonRow class="header-row">
              <IonCol sizeMd="4" size="4" class="header-col admin-col">
                Team Name
              </IonCol>
              <IonCol sizeMd="4" size="4" class="header-col admin-col">
                Team Leader
              </IonCol>
              <IonCol sizeMd="4" size="4" class="header-col admin-col">
                Team Size
              </IonCol>
              <IonCol sizeMd="4" size="4" class="header-col admin-col">
                Team Privacy
              </IonCol>
            </IonRow>
            {teams.map(
              (item: {
                name: string;
                leader: string;
                size: number;
                type: string;
              }) => (
                <IonRow key={Math.random()}>
                  <IonCol sizeMd="4" size="4" class="admin-col">
                    {item.name}
                  </IonCol>
                  <IonCol sizeMd="4" size="4" class="admin-col">
                    {item.leader}
                  </IonCol>
                  <IonCol sizeMd="4" size="4" class="admin-col">
                    {item.size}
                  </IonCol>
                  <IonCol sizeMd="4" size="4" class="admin-col">
                    {item.type}
                  </IonCol>
                </IonRow>
              )
            )}
          </IonGrid>
        </>
      );
    } else {
      return (
        <>
          <IonItem>
            {' '}
            There are no teams that can be joined currently. Please make a team
          </IonItem>
        </>
      );
    }
  };

  // get data from props
  async function getData() {
    if (ctx.user === null || TeamJoinUser === null) {
      // check if the user is logged in
      alert('You are not logged in');
      history.push('/app/login');
      return;
    }
    if (ctx.team !== '') {
      return; // if the user is already in a team then don't get the data
    }
    const indData: Array<tempData> = []; // temp array for the team list
    const teamNames: Array<selectFormat> = []; // temp array for the team names
    const adminRef = doc(FirestoreDB, 'admin', 'admin'); // admin reference
    const adminSnapshot = await getDoc(adminRef); // admin snapshot
    const adminData = adminSnapshot.data(); // admin data
    TeamJoinTeamList?.forEach((data: teamData) => {
      if (data.members.length <= adminData.max_team_size) {
        // check if the team is full
        const allNames: selectFormat = {
          // for selection dropdown method
          text: data.name,
          value: data.name
        };
        teamNames.push(allNames);
        if (data.status === '1') {
          // private team
          const temp: tempData = {
            name: data.name as string,
            leader: data.leader as string,
            size: data.members.length as number,
            type: 'Private',
            password: data.password
          };
          indData.push(temp); // push the data to the array
        } else {
          // public team
          const temp: tempData = {
            name: data.name as string,
            leader: data.leader as string,
            size: data.members.length as number,
            type: 'Public',
            password: data.password
          };
          indData.push(temp); // push the data to the array
        }
      } else {
        console.log(data.name, ' is full'); // if the team is full
      }
    });
    indData.sort((a: any, b: any) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    setTeams(indData); // set the teams
  }

  // get data from props
  useEffect(() => {
    if (TeamJoinUser !== null) {
      getData();
    }
  }, [TeamJoinUser, TeamJoinTeamList]);

  // move to the create team page
  const moveToCreateTeam = () => {
    if (ctx.team !== '') {
      alert('You are already in a team');
      history.push('/app/team');
      return;
    }
    history.push('/app/teamcreation');
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle> Team Join </IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Team</IonLabel>
              <IonInput
                onIonChange={(e) => setJoin(e.target.value as string)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Team Password</IonLabel>
              <IonInput
                type={passwordShown ? 'text' : 'password'}
                name="password"
                onIonChange={(e) => setPass(e.target.value as string)}
              ></IonInput>
              <IonIcon
                icon={passwordShown ? eyeOff : eye}
                slot="end"
                onClick={togglePasswordVisibility}
              ></IonIcon>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonButton onClick={toJoin}> Join </IonButton>
              <IonButton onClick={moveToCreateTeam}> Create a Team </IonButton>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonItem>{DisplayTeams(allTeams)}</IonItem>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default TeamJoin;
