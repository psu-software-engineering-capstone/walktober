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
  getDocs,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  increment,
  onSnapshot
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { auth, FirestoreDB } from '../../firebase';
import { eyeOff, eye } from 'ionicons/icons';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import AdminContext from '../../store/admin-context';
import './teamHome.scss';

const TeamJoin: React.FC = () => {
  interface teamData {
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

  const history = useHistory(); // used to move to different pages
  const [joinTeam, setJoin] = useState(''); // variable to get the team that the user chooses from the drop down menu
  const [teamPass, setPass] = useState(''); // variable to collect team password
  const [passwordShown, setPasswordShown] = useState(false); // enable visability to see password
  const [allTeams, setTeams] = useState(Array<teamData>); // array of teams from database
  const [buttonValid, setValid] = useState(false); // to check if the button should be enabled or not
  
  const adData = useContext(AdminContext); // admin context
  const ctx = useContext(AuthContext); // auth context

  // toggle password visability
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // join the team
  const joined = async () => {
    if (ctx.user === null) { // if the user is not logged in
      alert('You need to be logged in to join a team');
      history.push('/login');
      return;
    }
    if (ctx.team !== '') { // if the user is already in a team
      alert('You are already in a team');
      history.push('/app/team');
      return;
    }
    const currentUserRef = doc( // make a reference to the user's document
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    const userSnap = await getDoc(currentUserRef); // get user document
    const userData = userSnap.data(); // get all the data of the user
    const teamRef = doc(FirestoreDB, 'teams', joinTeam); // make a reference to the team document
    const teamSnap = await getDoc(teamRef); // get team document
    const teamData = teamSnap.data(); // get team data
    if (teamData.members.length >= 1) {
      await updateDoc(currentUserRef, {
        team: joinTeam
      }); // update the user's document
      await updateDoc(teamRef, {
        members: arrayUnion(auth.currentUser.email),
        totalStep: increment(userData.totalStep),
        avg_steps:
          (teamData.totalStep + userData.totalStep) /
          (teamData.members.length + 1)
      }); // update the teams members, their total steps, and the new average steps
    } else {
      await updateDoc(currentUserRef, {
        team: joinTeam,
        team_leader: true
      }); // update the user's document and set them as the team leader
      await updateDoc(teamRef, {
        members: arrayUnion(auth.currentUser.email),
        totalStep: increment(userData.totalStep),
        avg_steps:
          (teamData.totalStep + userData.totalStep) /
          (teamData.members.length + 1),
        leader: userData.email
      }); // update the teams members, their total steps, and the new average steps
    }
    history.push('/app/team'); // move to the team page
  };

  // join the team
  const toJoin = () => {
    if (ctx.user === null) {
      alert('You are not logged in');
      history.push('/login'); // if the user is not logged in, move them to the login page
      return;
    }
    if (ctx.team !== '') {
      alert('You are already in a team');
      history.push('/app/team'); // if the user is already in a team, move them to the team page
      return;
    }
    if (joinTeam === '') {
      alert('No team name has been entered as of yet');
      return; // team name cannot be empty
    }
    for (let i = 0; i < allTeams.length; i++) {
      if (allTeams[i].name === joinTeam) {
        // check if the team name entered matches a team in the database
        if (allTeams[i].type === 'Private') {
          // check if the team is private
          if (teamPass === '') {
            // private team but no password entered
            alert(
              'A password needs to be entered as this team is private. Please enter the password and try again.'
            );
            return;
          } else if (allTeams[i].password === teamPass) {
            joined(); // password is correct
            return;
          } else {
            // incorrect password
            alert(
              'The password entered does not match the password for the team. Please try again'
            );
            return;
          }
        } else {
          // public team
          joined();
          return;
        }
      }
    }
    alert('No team was found that matched what was entered'); // no team was found
    return;
  };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getData(); // get the data from the database
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // display the teams
  const DisplayTeams = (teams: teamData[]): any => {
    if (teams.length > 0) { // if there are teams
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
    } else { // if there are no teams
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

  // get the data from the database
  async function getData() {
    if (ctx.user === null) {
      alert('You are not logged in');
      history.push('/login'); // if the user is not logged in, move them to the login page
      return;
    }
    if (ctx.team !== '') {
      alert('You are already in a team');
      history.push('/app/team'); // if the user is already in a team, move them to the team page
      return;
    }
    const indData: Array<teamData> = []; // temp array for the teams data
    const groupNames: Array<selectFormat> = []; // need the group names to look thorugh
    const today = new Date();
    const deadline = new Date(adData.teamDate);
    if (deadline < today) {
      setValid(true);
    } else {
      setValid(false);
    }
    const querySnapshot = await getDocs(collection(FirestoreDB, 'teams')); //grab all the team documents
    querySnapshot.forEach((doc: any) => {
      console.log(adData.maxSize, doc.data().members.length);
      if (doc.data().members.length < adData.maxSize) {
        // this is deteremined by the admins
        const allNames: selectFormat = {
          // this was to create an array if we used the selection drop down method
          text: doc.data().name,
          value: doc.data().name
        };
        groupNames.push(allNames); // push it to the overall array
        if (doc.data().status === '1') {
          // private team
          const tem: teamData = {
            name: doc.data().name as string,
            leader: doc.data().leader as string,
            size: doc.data().members.length as number,
            type: 'Private',
            password: doc.data().password
          };
          indData.push(tem); // push the data to the array
        } else {
          // public team
          const tem: teamData = {
            name: doc.data().name as string,
            leader: doc.data().leader as string,
            size: doc.data().members.length as number,
            type: 'Public',
            password: doc.data().password
          };
          indData.push(tem);
        }
      } else {
        console.log(doc.data().name, ' is full'); // if the team is full
      }
    });
    indData.sort((a: any, b: any) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    setTeams(indData);
  }

  // update the data when the page loads
  // update the data when the teams are added, removed, or modified
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FirestoreDB, 'teams'), (snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === 'added') {
          console.log('New Team: ', change.doc.data());
        }
        if (change.type === 'modified') {
          console.log('Modified Team: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed Team: ', change.doc.data());
        }
        getData();
      });
    });
    return unsubscribe;
  }, []);

  // move to the team creation page
  const moveToCreateTeam = () => {
    if (ctx.user === null) {
      alert('You are not logged in');
      history.push('/login'); // if the user is not logged in, move them to the login page
      return;
    }
    if (ctx.team !== '') {
      alert('You are already in a team');
      history.push('/app/team'); // if the user is already in a team, move them to the team page
      return;
    }
    history.push('/app/teamcreation');
  };

  // check team deadline
  function displayPage() {
    if (buttonValid === false) {
      return (<>{DisplayTeams(allTeams)}</>);
    } else {
      return <h1>The deadline to join or create a team was {adData.teamDate}.</h1>;
    }
  }

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
              <IonButton disabled={buttonValid} onClick={toJoin}>
                {' '}
                Join{' '}
              </IonButton>
              <IonButton disabled={buttonValid} onClick={moveToCreateTeam}>
                {' '}
                Create a Team{' '}
              </IonButton>
            </IonItem>
          </IonCol>
        </IonRow>
        <>{displayPage()}</>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default TeamJoin;
