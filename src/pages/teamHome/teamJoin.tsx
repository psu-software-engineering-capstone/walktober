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
  IonRow,
  IonTitle
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
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { auth, FirestoreDB } from '../../firebase';
import { eyeOff, eye } from 'ionicons/icons';
import { useHistory } from 'react-router';
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

  const history = useHistory(); //used to move to different pages
  const [joinTeam, setJoin] = useState(''); //variable to get the team that the user chooses from the drop down menu
  const [teamPass, setPass] = useState(''); //variable to collect team password
  const [passwordShown, setPasswordShown] = useState(false); //enable visability to see password
  const [teamNames, setNames] = useState(Array<selectFormat>); //array of only team names for the drop down menu
  const [allTeams, setTeams] = useState(Array<teamData>); //array of teams from database

  const togglePasswordVisibility = () => {
    //can we see the password?
    setPasswordShown(!passwordShown);
  };

  const joined = async () => {
    if (auth.currentUser == null) {
      //is there a user logged on? Should be yes but might as well check
      return;
    }
    const currentUserRef = doc(
      //make a reference to the user document
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    await updateDoc(currentUserRef, {
      team: joinTeam
    }); //add the team to the user's documet
    const userSnap = await getDoc(currentUserRef); //get user document
    const userData = userSnap.data(); //get all the data of the user
    const teamRef = doc(FirestoreDB, 'teams', joinTeam); //make a reference to the team document
    const teamSnap = await getDoc(teamRef); //get team document
    const teamData = teamSnap.data(); // get team data
    console.log(teamData.members.lenth);
    if (teamData.members.legnth >= 1) {
      await updateDoc(teamRef, {
        members: arrayUnion(auth.currentUser.email),
        totalStep: increment(userData.totalStep),
        avg_steps:
          (teamData.totalStep + userData.totalStep) /
          (teamData.members.length + 1)
      }); //update the teams members, their total steps, and the new average steps
      await updateDoc(currentUserRef, {
        team: joinTeam
      });
    } else {
      await updateDoc(teamRef, {
        members: arrayUnion(auth.currentUser.email),
        totalStep: increment(userData.totalStep),
        avg_steps:
          (teamData.totalStep + userData.totalStep) /
          (teamData.members.length + 1),
        leader: userData.email
      }); //update the teams members, their total steps, and the new average steps
      await updateDoc(currentUserRef, {
        team: joinTeam,
        team_leader: true
      });
    }
    console.log(teamNames); // just need it in here for the moment
    history.push('/app/team');
  };

  const toJoin = () => {
    //
    if (joinTeam === '') {
      alert('No team name has been entered as of yet');
      return;
    }
    for (let i = 0; i < allTeams.length + 1; i++) {
      if (allTeams[i].name === joinTeam) {
        //check if it is one of the team's that is available
        if (allTeams[i].type === 'Private') {
          //okay we are gonna need a password
          if (teamPass === '') {
            alert(
              'A password needs to be entered as this team is private. Please enter the password and try again.'
            );
          } else if (allTeams[i].password === teamPass) {
            joined(); //we can join them
            return;
          } else {
            //incorrect password
            alert(
              'The password entered does not match the password for the team. Please try again'
            );
            return;
          }
        } else {
          //public team aka no password required
          joined();
          return;
        }
      }
    }
    alert('No team was found that matched what was entered');
  };

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
    const indData: Array<teamData> = []; //temp array for the teams data
    const groupNames: Array<selectFormat> = []; //need the group names to look thorugh
    const adminRef = doc(FirestoreDB, 'admin', 'admin'); //ref the admin doc
    const adminSnapshot = await getDoc(adminRef); //get the admin docu
    const adminData = adminSnapshot.data(); //get data
    const querySnapshot = await getDocs(collection(FirestoreDB, 'teams')); //grab all the team documents
    querySnapshot.forEach((doc: any) => {
      console.log(doc.id, ' => ', doc.data()); //get the data from the doc
      if (doc.data().members.length <= adminData.max_team_size) {
        //this is deteremined by the admins
        const allNames: selectFormat = {
          //this was to create an array if we used the selection drop down method
          text: doc.data().name,
          value: doc.data().name
        };
        groupNames.push(allNames); //push it to the overall array
        if (doc.data().status === '1') {
          //private team
          const tem: teamData = {
            name: doc.data().name as string,
            leader: doc.data().leader as string,
            size: doc.data().members.length as number,
            type: 'Private',
            password: doc.data().password
          };
          indData.push(tem); //push the data to the array
        } else {
          //public team
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
        console.log(doc.data().name, ' not added to the list'); //too many members in team to join
      }
    });
    setNames(groupNames);
    indData.sort((a: any, b: any) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    console.log(indData);
    setTeams(indData);
  }

  useEffect(() => {
    getData();
  }, []);

  const moveToCreateTeam = () => {
    history.push('/app/teamcreation');
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle> Team Join </IonTitle>
        </NavBar>
      </IonHeader>
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
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default TeamJoin;
