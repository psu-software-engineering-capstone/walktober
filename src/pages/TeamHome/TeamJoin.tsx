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
  getDocs,
  collection,
  doc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { auth, FirestoreDB } from '../../firebase';
import { eyeOff, eye } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './TeamHome.scss';

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

  const history = useHistory();
  const [joinTeam, setJoin] = useState(''); //variable to get the team that the user chooses from the drop down menu
  const [teamPass, setPass] = useState(''); //variable to collect team password
  const [passwordShown, setPasswordShown] = useState(false); //enable visability to see password
  const [teamNames, setNames] = useState(Array<selectFormat>); //array of only team names for the drop down menu
  const [allTeams, setTeams] = useState(Array<teamData>); //array of teams from database

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const joined = async () => {
    if (auth.currentUser == null) {
      return;
    }
    const currentUserRef = doc(
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    await updateDoc(currentUserRef, {
      team: joinTeam
    });
    const teamRef = doc(FirestoreDB, 'teams', joinTeam);
    await updateDoc(teamRef, {
      members: arrayUnion(auth.currentUser.email)
    });
    history.push('/app/team');
  };

  const toJoin = () => {
    if(joinTeam===""){
        alert("No team name has been entered as of yet");
        return;
    }
    console.log(joinTeam, teamPass);
    for (let i = 0; i < allTeams.length + 1; i++) {
      if (allTeams[i].name === joinTeam) {
        if (allTeams[i].type === 'Private') {
          if (allTeams[i].password === teamPass) {
            console.log(allTeams[i]);
            joined();
            return;
          } else {
            alert(
              'The password entered does not match the password for the team. Please try again'
            );
            return;
          }
        } else {
          console.log(allTeams[i]);
          console.log('Joined with public team');
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
          <IonGrid fixed={true}>
            <IonRow align-items-stretch="true" class="top">
              <IonCol align-self-center="true" class="header-col admin-col">
                Available Teams
              </IonCol>
            </IonRow>
            <IonRow class="header-row">
              <IonCol sizeMd="4" size="5" class="header-col admin-col">
                Team Name
              </IonCol>
              <IonCol sizeMd="4" size="5" class="header-col admin-col">
                Team Leader
              </IonCol>
              <IonCol sizeMd="4" size="6" class="header-col admin-col">
                Team Size
              </IonCol>
              <IonCol sizeMd="4" size="8" class="header-col admin-col">
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
                  <IonCol sizeMd="4" size="5" class="admin-col">
                    {item.name}
                  </IonCol>
                  <IonCol sizeMd="4" size="5" class="admin-col">
                    {item.leader}
                  </IonCol>
                  <IonCol sizeMd="4" size="5" class="admin-col">
                    {item.size}
                  </IonCol>
                  <IonCol sizeMd="4" size="8" class="admin-col">
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
            There are no teams that can be joined currently. Please go to your
            profile and make a team
          </IonItem>
        </>
      );
    }
  };

  async function getData() {
    const indData: Array<teamData> = [];
    const groupNames: Array<selectFormat> = [];
    const querySnapshot = await getDocs(collection(FirestoreDB, 'teams'));
    querySnapshot.forEach((doc: any) => {
      console.log(doc.id, ' => ', doc.data());
      if (doc.data().members.length <= 9) {
        const allNames: selectFormat = {
          text: doc.data().name,
          value: doc.data().name
        };
        groupNames.push(allNames);
        if (doc.data().status === '1') {
          const tem: teamData = {
            name: doc.data().name as string,
            leader: doc.data().leader as string,
            size: doc.data().members.length as number,
            type: 'Private',
            password: doc.data().password
          };
          indData.push(tem);
          console.log(tem);
        } else {
          const tem: teamData = {
            name: doc.data().name as string,
            leader: doc.data().leader as string,
            size: doc.data().members.length as number,
            type: 'Public',
            password: doc.data().password
          };
          indData.push(tem);
          console.log(tem);
        }
      } else {
        console.log(doc.data().name, ' not added to the list'); //too many members in team to join
      }
    });
    setNames(groupNames);
    console.log(groupNames);
    setTeams(indData);
    console.log(teamNames);
  }

  useEffect(() => {
    getData();
  }, []);

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
          <IonButton onClick={toJoin}> Join </IonButton>{' '}
        </IonCol>
      </IonRow>
      <IonItem>{DisplayTeams(allTeams)}</IonItem>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default TeamJoin;
