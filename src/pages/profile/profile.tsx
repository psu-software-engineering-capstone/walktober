/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  RefresherEventDetail
} from '@ionic/react';
import { Route } from 'react-router-dom';
import { auth, FirestoreDB, storage } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import newPassword from './newPassword';
import AuthContext from '../../store/auth-context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import CalendarLeafs from '../../components/CalendarLeafs';
import './profile.css';

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

const Profile: React.FC<{ data: userData | null }> = ({ data }) => {
  const history = useHistory(); // for routing

  const ctx = useContext(AuthContext); // auth context

  // profile data
  const [email, setEmail] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [team, setTeam] = useState('');
  const [totalDistance, setTotalDistance] = useState(0);
  const [photo, setPhoto] = useState<any>(null);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  // set profile data
  useEffect(() => {
    if (ctx.user !== null || data !== null) {
      GetRecords();
    }
  }, [ctx.user, data]);

  // get profile data from props data
  async function GetRecords(): Promise<void> {
    if (ctx.user === null || data === null) {
      alert('You are not logged in!');
      history.push('/login');
      return;
    }
    setProfilePic(data.profile_pic);
    setName(data.name);
    setEmail(data.email);
    setTeam(data.team);
    setJoinDate(
      new Date(auth.currentUser.metadata.creationTime).toLocaleDateString()
    );
    setTotalDistance(data.totalStep / 2000);
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
      return (
        <>
          <IonItem>You have not joined a team yet</IonItem>
        </>
      );
    } else {
      return (
        <>
          <IonItem>Team: {team}</IonItem>
        </>
      );
    }
  }

  // sign out
  const signOut = async () => {
    try {
      await auth.signOut();
      history.push('/');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    GetRecords(); // Refresh data
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
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="auto">
                <IonItem>
                  <IonImg
                    className="profile_pic"
                    src={profilePic}
                    alt="Profile picture for the user signed in"
                  ></IonImg>
                </IonItem>
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
                {teamDisplay()}
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
              </IonCol>
              <IonCol>
                <IonItem>
                  <p>Joined on {joinDate}</p>
                </IonItem>
                <IonItem>
                  <p>{totalDistance} miles walked in total</p>
                </IonItem>
                <IonItem fill="outline">
                  <IonLabel position="floating">Step Goal</IonLabel>
                  <IonInput
                    id="steps"
                    type="number"
                    placeholder="10,000"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <h6>Badges:</h6>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeLg="6" sizeMd="8" sizeSm="12">
                <CalendarLeafs></CalendarLeafs>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        </IonContent>
        <IonFooter>
          <ul>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/leaf"
                title="leaf icons"
              >
                Leaf icons created by Freepik - Flaticon
              </a>
            </li>

            <li>
              <a
                href="https://www.flaticon.com/free-icons/leaf"
                title="leaf icons"
              >
                Leaf icons created by Pixel perfect - Flaticon
              </a>
            </li>

            <li>
              <a
                href="https://www.flaticon.com/free-icons/leaf"
                title="leaf icons"
              >
                Leaf icons created by Good Ware - Flaticon
              </a>
            </li>
          </ul>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Profile;
