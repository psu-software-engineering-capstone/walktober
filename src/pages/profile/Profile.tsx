/* eslint-disable @typescript-eslint/space-before-function-paren */
import { useEffect, useState } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './Profile.css';
import { auth, FirestoreDB } from '../../firebase';
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { useHistory } from 'react-router';

const Profile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [joinDate, setJoinDate] = useState(new Date());
  const [joinDateString, setJoinDateString] = useState('');
  const [name, SetName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [totalDistance, setTotalDistance] = useState(0);
  const [username, setUsername] = useState('');
  // let badges;

  async function GetRecords(): Promise<void> {
    if (auth.currentUser === null) {
      alert('You are not logged in!');
      useHistory().push("/login");
      return;
    }
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const dbSnap = await getDoc(dbRef);
    const userData = dbSnap.data();
    setProfilePic(userData.profile_pic);
    SetName(userData.name);
    setUsername('');
    setEmail(userData.email);
    setJoinDate(new Date(auth.currentUser.metadata.creationTime));
    setJoinDateString(joinDate.toLocaleDateString());
    setTotalDistance(userData.totalStep / 2000);
  }

  useEffect(() => {
    GetRecords();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="auto">
                <IonText>
                  <IonImg
                    className="profile_pic"
                    src={profilePic}
                    alt="Profile picture for the user signed in"
                  ></IonImg>
                  <IonButton>Change Profile Picture</IonButton>
                  <h2>{name}</h2>
                  <p>
                    {username}
                    <IonButton fill="clear" size="small">
                      Change Username
                    </IonButton>
                  </p>
                  <p>{email}</p>
                  <IonButton>Change Password</IonButton> <br></br>
                  <IonButton>Change Health App Preferences</IonButton>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  <p>Joined on {joinDateString}</p>
                  <p>{totalDistance} miles walked in total</p>
                  <IonLabel>Step Goal: </IonLabel>
                  <IonItem fill="outline">
                    <IonInput value="10,000" size={100}></IonInput>
                  </IonItem>
                  <h6>Badges:</h6>
                  {/* TODO: Put badges here */}
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
