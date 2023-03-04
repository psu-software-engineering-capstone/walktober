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
  increment
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { auth, FirestoreDB } from '../../firebase';
import { eyeOff, eye } from 'ionicons/icons';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import AdminContext from '../../store/admin-context';
import './teamHome.scss';
import { onSnapshot } from 'firebase/firestore';

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
  const [buttonValid, setValid] = useState(false);
  const adData = useContext(AdminContext);
  const ctx = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    // can we see the password?
    setPasswordShown(!passwordShown);
  };

  const joined = async () => {
    if (ctx.user === null) { // if the user is not logged in
      history.push('/login');
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

  const toJoin = () => {
    if (joinTeam === '') {
      alert('No team name has been entered as of yet');
      return;
    }
    for (let i = 0; i < allTeams.length; i++) {
      if (allTeams[i].name === joinTeam) {
        // check if it is one of the team's that is available
        if (allTeams[i].type === 'Private') {
          // okay we are gonna need a password
          if (teamPass === '') {
            alert(
              'A password needs to be entered as this team is private. Please enter the password and try again.'
            );
            return;
          } else if (allTeams[i].password === teamPass) {
            joined(); // we can join them
            return;
          } else {
            // incorrect password
            alert(
              'The password entered does not match the password for the team. Please try again'
            );
            return;
          }
        } else {
          // public team aka no password required
          joined();
          return;
        }
      }
    }
    alert('No team was found that matched what was entered');
    return;
  };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getData(); // get the data from the database
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  const DisplayTeams = (teams: teamData[]): any => {
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

  async function getData() {
    if (ctx.team !== '') {
      // if they are already on a team
      history.push('/app/team'); // redirect them to the team home page
      return;
    }
    const indData: Array<teamData> = []; //temp array for the teams data
    const groupNames: Array<selectFormat> = []; //need the group names to look thorugh
    const today = new Date(Date());
    const maxDate = new Date(adData.teamDate);
    console.log(today < maxDate, today, maxDate, adData.teamDate);
    if (maxDate < today) {
      setValid(true);
      console.log('true');
    } else {
      setValid(false);
      console.log('false');
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

  const moveToCreateTeam = () => {
    history.push('/app/teamcreation');
  };

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
