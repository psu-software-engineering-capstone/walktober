import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
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
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default TeamJoin;
