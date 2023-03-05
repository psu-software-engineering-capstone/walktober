import { useState, useContext, useEffect } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonLabel,
  IonPage,
  IonTitle,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
//import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import './results.scss';
import AuthContext from '../../store/auth-context';
import { FirestoreDB } from '../../firebase';
import LeaderBoardChart from '../../components/LeaderBoard/LeaderBoardChart';
import { collection, getDocs } from 'firebase/firestore';
import trophy from '../../assets/trophy.png';
import average from '../../assets/average.png';
import personalrecord from '../../assets/personalrecord.png';
import recorddate from '../../assets/recorddate.png';
import walking from '../../assets/walking.png';

/*
interface badgeOutline {
  name: string;
}
*/

interface StepLog {
  date: string;
  steps: number;
}

interface Data {
    name: string;
    totalStep?: number;
    daysLogged?: number;
    stepsByDate?: StepLog[];
}

const Results: React.FC = () => {
  //const history = useHistory();
  //const [badges, setBadges] = useState(Array<badgeOutline>);
  const [data, setData] = useState<Data>();
  const ctx = useContext(AuthContext);
  const user = ctx.user as any;

  async function getData() {
    const querySnapshot = await getDocs(collection(FirestoreDB, 'users'));
      querySnapshot.forEach((doc: any) => {
        if(doc.data().name === user.displayName) {
          setData(doc.data());
        }
      }
    );
  }

  useEffect(() => {
    getData();
  }, []);

  let maxSteps = 0;
  let maxStepsDate;

  data?.stepsByDate?.forEach((day) => {
    if (day.steps > maxSteps) {
      maxSteps = day.steps;
      maxStepsDate = day.date;
    }
  }
);

  console.log(data);

   return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Results</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding testing">
        <IonGrid>
          <IonRow>
            <IonCol className="results-col">
              <IonCard className="results-card">
                <IonCardHeader style={{ display: 'flex', justifyContent: 'center' }}>
                    <img alt="Walktober logo" src={trophy} />
                </IonCardHeader>
                <IonCardContent>
                  <IonCardTitle class="ion-text-center">
                      Congratulations <b>{(user.displayName as string).split(' ')[0]}</b>!
                  </IonCardTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol className="results-col">
              <IonCard className="results-card">
                <IonCardHeader>
                  <IonCardTitle class="ion-text-center">During the Month of October</IonCardTitle>
                  <IonCardSubtitle class="ion-text-center">
                    You walked accomplished some amazing things!
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                <IonList>
                    <IonItem>
                      <IonThumbnail slot="start">
                        <img alt="picture of person walking" src={walking} />
                        </IonThumbnail>
                        <IonLabel>You walked <b>{data?.totalStep}</b> steps in the month of October!</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonThumbnail slot="start">
                        <img alt="picture of compass" src={average} />
                        </IonThumbnail>
                        <IonLabel>
                          You walked average of <b>{data?.totalStep != null ? (Math.round(data?.totalStep as number / 31)) : '0' }</b> steps per day during Walktober!
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                    <IonThumbnail slot="start">
                        <img alt="picture of calendar" src={recorddate} />
                        </IonThumbnail>
                        <IonLabel>You logged steps on <b>{data?.stepsByDate?.length}</b> out of 31 days in October!</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonThumbnail slot="start">
                        <img alt="picture of medal" src={personalrecord} />
                        </IonThumbnail>
                        <IonLabel>Your personal record was on <b>{maxStepsDate}</b> where you walked <b>{maxSteps}</b> steps!</IonLabel>
                    </IonItem>
                </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>        

          <IonRow>
            <IonCol className="results-col">
              <LeaderBoardChart></LeaderBoardChart>
            </IonCol>
   
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Results;