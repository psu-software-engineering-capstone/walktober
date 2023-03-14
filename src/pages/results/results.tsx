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
import NavBar from '../../components/NavBar';
import './results.scss';
import AdminContext from '../../store/admin-context';
import { auth, FirestoreDB } from '../../firebase';
import LeaderBoardChart from '../../components/LeaderBoard/LeaderBoardChart';
import { doc, getDoc } from 'firebase/firestore';
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
  maxSteps: number;
  maxStepDate: string;
  stepsByDate?: StepLog[];
}

const Results: React.FC = () => {
  const [data, setData] = useState<Data>();
  const adData = useContext(AdminContext);

  async function getData() {
    const currentUserRef = doc(
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    ); // get user reference
    const userSnap = await getDoc(currentUserRef); //get doc
    const userData = userSnap.data(); //get  data
    const daData: Data = {
      name: userData.name,
      totalStep: userData.totalStep,
      daysLogged: userData.stepsByDate.length,
      maxSteps: 0,
      maxStepDate: '',
      stepsByDate: userData.stepsByDate
    };
    //Get the max steps and date of it, also grab the total steps
    let tempSteps = 0;
    let tempDate = '';
    let tempTotal = 0;
    let tempLogged = 0;
    daData.stepsByDate?.forEach((day) => {
      if (day.date >= adData.startDate && day.date <= adData.endDate) {
        if (day.steps > tempSteps) {
          tempSteps = day.steps; //new  Max step
          tempDate = day.date; // new max date
        }
        tempTotal += day.steps; //add the total steps
        tempLogged += 1; //increase counter for days active
        //NOTE: The above 2 variables shouldn't be needed if we implement a method to only enter data within the event dates
        //Then we could leave it as it is originally done in line 68 & 69
      }
    });
    daData.maxSteps = tempSteps; // rewrite the max step count
    daData.maxStepDate = tempDate; //rewrite the max step date
    daData.totalStep = tempTotal; //rewrite the total to be within event parameters
    daData.daysLogged = tempLogged; //rewrite the days active to be within event parameters
    setData(daData); //reassign the Data
  }

  useEffect(() => {
    getData();
  }, [adData]);

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
                <IonCardHeader
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <img alt="Walktober logo" src={trophy} />
                </IonCardHeader>
                <IonCardContent>
                  <IonCardTitle class="ion-text-center">
                    Congratulations <b>{data?.name}</b>!
                  </IonCardTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol className="results-col">
              <IonCard className="results-card">
                <IonCardHeader>
                  <IonCardTitle class="ion-text-center">
                    During the Month of October
                  </IonCardTitle>
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
                      <IonLabel>
                        You walked <b>{data?.totalStep}</b> steps in the month
                        of October!
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonThumbnail slot="start">
                        <img alt="picture of compass" src={average} />
                      </IonThumbnail>
                      <IonLabel>
                        You walked average of{' '}
                        <b>
                          {data?.totalStep != null
                            ? Math.round((data?.totalStep as number) / 31)
                            : '0'}
                        </b>{' '}
                        steps per day during Walktober!
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonThumbnail slot="start">
                        <img alt="picture of calendar" src={recorddate} />
                      </IonThumbnail>
                      <IonLabel>
                        You logged steps on <b>{data?.daysLogged}</b> out of 31
                        days in October!
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonThumbnail slot="start">
                        <img alt="picture of medal" src={personalrecord} />
                      </IonThumbnail>
                      <IonLabel>
                        Your personal record was on <b>{data?.maxStepDate}</b>{' '}
                        where you walked <b>{data?.maxSteps}</b> steps!
                      </IonLabel>
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
