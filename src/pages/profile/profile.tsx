/* eslint-disable @typescript-eslint/space-before-function-paren */
import { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  RefresherEventDetail,
  useIonLoading
} from '@ionic/react';
import { Route } from 'react-router-dom';
import { auth, FirestoreDB, storage } from '../../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import newPassword from './newPassword';
import AuthContext from '../../store/auth-context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import CalendarLeafs from '../../components/CalendarLeafs';
import AdminContext from '../../store/admin-context';
import './profile.css';

interface StepLog {
  date: string;
  steps: number;
  color: string;
}

const Profile: React.FC = () => {
  const history = useHistory(); // for routing

  const ctx = useContext(AuthContext); // auth context

  const adData = useContext(AdminContext); // admin context

  const [present] = useIonLoading(); // for loading screen

  // state variables //
  const [email, setEmail] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [team, setTeam] = useState('');
  const [totalDistance, setTotalDistance] = useState(0);
  const [photo, setPhoto] = useState<any>(null);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [stepLogs, setStepLogs] = useState<StepLog[]>([]);
  const [calanderLogs, setCalanderLogs] = useState<StepLog[]>([]);

  // update profile data when the page loads
  // update profile data when the profile data changes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(FirestoreDB, 'users', auth.currentUser.email as string),
      (doc: any) => {
        if (doc.exists()) {
          getData(doc.data());
        }
      }
    );
    return () => {
      console.log('unsubscribing from profile page');
      unsubscribe();
    };
  }, [ctx.user]);

  // step logs with colors from event start date to event end date
  // including the days with 0 steps
  useEffect(() => {
    const start = new Date(adData.startDate);
    for (let i = 0; i < 31; i++) {
      setCalanderLogs((prev) => [
        ...prev,
        {
          // starting from event start date to event end date
          date: new Date(start.getTime() + i * (1000 * 60 * 60 * 24))
            .toISOString()
            .slice(0, 10),
          steps: 0,
          color: 'null'
        }
      ]);
    }
    if (stepLogs.length !== 0) {
      stepLogs.forEach((log: StepLog) => {
        calanderLogs.forEach((calLog: StepLog) => {
          if (log.date === calLog.date) {
            calLog.steps = log.steps;
            calLog.color = log.color;
          }
        });
      });
    }
  }, [stepLogs]);

  // set the data
  async function getData(userData: any): Promise<void> {
    const holdStep = userData.stepsByDate;
    const stepLogsWithColors: StepLog[] = [];
    holdStep.forEach((log: { date: string; steps: number }) => {
      if (
        new Date(adData.startDate) <= new Date(log.date) &&
        new Date(log.date) <= new Date(adData.endDate)
      ) {
        let color = 'null';
        if (log.steps >= 10000) color = 'green';
        else if (log.steps >= 7500 && log.steps < 10000) color = 'yellow';
        else if (log.steps >= 5000 && log.steps < 7500) color = 'orange';
        stepLogsWithColors.push({
          date: log.date,
          steps: log.steps,
          color
        });
      }
    });
    setStepLogs(stepLogsWithColors);
    setProfilePic(userData.profile_pic);
    setName(userData.name);
    setEmail(userData.email);
    setTeam(userData.team);
    setJoinDate(
      new Date(auth.currentUser.metadata.creationTime).toLocaleDateString()
    );
    setTotalDistance(userData.totalStep / 2000);
    setIsGoogleUser(
      auth.currentUser.providerData[0]?.providerId === 'google.com'
    );
  }

  // handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  // handle image upload
  const handleSubmit = async () => {
    if (photo === null) {
      alert('Please select an image to upload');
      return;
    }
    const imageRef = ref(storage, auth.currentUser.email + '.png');
    await uploadBytes(imageRef, photo);
    const photoURL = await getDownloadURL(imageRef);
    updateProfile(auth.currentUser, { photoURL }).catch((error: any) => {
      alert(error);
    });
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    await updateDoc(dbRef, { profile_pic: photoURL })
      .then(() => {
        alert('profile picture updated!');
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  // change password
  const changePassword = () => {
    if (isGoogleUser) {
      return;
    }
    history.push('/app/profile/passwordChange');
  };

  // display team
  function teamDisplay() {
    if (team === '') {
      return 'You have not joined a team yet';
    } else {
      return `Team: ${team}`;
    }
  }

  // sign out
  const signOut = async () => {
    // delay 1 second to allow firebase to update auth state //
    present({
      message: 'Loading...',
      duration: 1000,
      spinner: 'circles'
    });
    setTimeout(async () => {
      await auth.signOut();
      history.push('/');
    }, 1000);
  };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  return (
    <>
      <IonPage>
        <IonRouterOutlet>
          <Route
            exact
            path="/app/profile/passwordChange"
            component={newPassword}
          />
        </IonRouterOutlet>
        <IonHeader>
          <NavBar>
            <IonTitle>Profile</IonTitle>
          </NavBar>
        </IonHeader>
        <IonContent className="walktober-background">
          <IonGrid>
            <IonRow>
              <IonCol
                sizeXs="12"
                sizeSm="12"
                sizeMd="auto"
                sizeLg="auto"
                sizeXl="auto"
              >
                <IonCard>
                  <IonImg
                    className="profile-pic"
                    src={profilePic}
                    alt="Profile picture for the user signed in"
                  ></IonImg>
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
                    <IonButton onClick={handleSubmit}>
                      Change Profile Picture
                    </IonButton>
                  </IonItem>
                  <IonItem>
                    <h2>{name}</h2>
                  </IonItem>
                  <IonItem>
                    <p>{email}</p>
                  </IonItem>
                  <IonItem>{teamDisplay()}</IonItem>
                  {!isGoogleUser && (
                    <IonItem>
                      <IonButton onClick={changePassword}>
                        Change Password
                      </IonButton>
                    </IonItem>
                  )}
                  <IonItem>
                    <IonButton onClick={signOut}>Sign Out</IonButton>
                  </IonItem>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard>
                  <IonItem>
                    <p>Joined on {joinDate}</p>
                  </IonItem>
                  <IonItem>
                    <p>
                      {totalDistance.toLocaleString()} miles walked in total
                    </p>
                  </IonItem>
                </IonCard>

                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="8"
                  sizeLg="8"
                  sizeXl="8"
                >
                  {' '}
                  <IonCard className="calendar">
                    <CalendarLeafs data={calanderLogs}></CalendarLeafs>
                  </IonCard>
                </IonCol>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        </IonContent>
        <IonFooter>
          <IonItem>
            <IonLabel className="attribution-list">
              Leaf icons created by{' '}
              <a
                href="https://www.flaticon.com/free-icons/leaf"
                title="leaf icons"
              >
                Freepik - Flaticon
              </a>{' '}
              &bull;{' '}
              <a
                href="https://www.flaticon.com/free-icons/leaf"
                title="leaf icons"
              >
                Pixel perfect - Flaticon
              </a>{' '}
              &bull;{' '}
              <a
                href="https://www.flaticon.com/free-icons/leaf"
                title="leaf icons"
              >
                Good Ware - Flaticon
              </a>
            </IonLabel>
          </IonItem>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Profile;
