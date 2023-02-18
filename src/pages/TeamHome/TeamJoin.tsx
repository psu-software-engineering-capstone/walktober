import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonPage,
  IonRow,
  IonTitle
} from '@ionic/react';
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { FirestoreDB } from '../../firebase';
import './TeamHome.scss';

const TeamJoin: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allTeams, setTeams] = useState(Array<teamData>);

  interface teamData {
    name: string;
    leader: string;
    size: number;
    type: string;
  }

  function toJoin(newTeam: teamData): any {
    console.log(newTeam);
  }

  function DisplayTeams(teams: teamData[]): any {
    if (teams.length > 0) {
      return (
        <>
          <IonGrid fixed={true}>
            <IonRow class="header-row">
              <IonCol sizeMd="3" size="5" class="header-col admin-col">
                Team Name
              </IonCol>
              <IonCol sizeMd="3" size="5" class="header-col admin-col">
                Team Leader
              </IonCol>
              <IonCol sizeMd="4" size="6" class="header-col admin-col">
                Team Size
              </IonCol>
              <IonCol sizeMd="3" size="8" class="header-col admin-col">
                Team Privacy
              </IonCol>
              <IonCol sizeMd="3" size="8" class="header-col admin-col">
                Join
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
                  <IonCol sizeMd="3" size="5" class="admin-col">
                    {item.name}
                  </IonCol>
                  <IonCol sizeMd="3" size="5" class="admin-col">
                    {item.leader}
                  </IonCol>
                  <IonCol sizeMd="4" size="5" class="admin-col">
                    {item.size}
                  </IonCol>
                  <IonCol sizeMd="3" size="8" class="admin-col">
                    {item.type}
                  </IonCol>
                  <IonCol sizeMd="3" size="8" class="admin-col">
                    <IonButton size="small" onClick={toJoin(item)}>
                      Join
                    </IonButton>
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
  }

  async function getData() {
    const indData: Array<teamData> = [];
    const querySnapshot = await getDocs(collection(FirestoreDB, 'teams'));
    querySnapshot.forEach((doc: any) => {
      console.log(doc.id, ' => ', doc.data());
      if (doc.data().members.length <= 9) {
        const tem: teamData = {
          name: doc.data().name as string,
          leader: doc.data().leader as string,
          size: doc.data().members.length as number,
          type: doc.data().status as string
        };
        indData.push(tem);
        console.log(tem);
      } else {
        console.log(doc.data().name, ' not added to the list');
      }
    });
    setTeams(indData);
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
      <IonItem> You have entered the forbidden page</IonItem>
      <IonItem>{DisplayTeams(allTeams)}</IonItem>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default TeamJoin;
