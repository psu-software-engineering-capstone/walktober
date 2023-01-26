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

const Profile: React.FC = () => {
  const [email, setEmail] = useState('');
  // let email: string;
  const [joinDate, setJoinDate] = useState(new Date());
  const [joinDateString, SetJoinDateString] = useState('');
  const [name, SetName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [totalDistance, SetTotalDistance] = useState(0);
  const [username, SetUsername] = useState('');
  // let badges;

  function GetRecords(): void {
    // TODO: Get information from database
    setProfilePic(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kristen_Stewart_in_2022.JPG/1280px-Kristen_Stewart_in_2022.JPG'
    );
    SetName('Kristen Stewart');
    SetUsername('kStewart0409');
    setEmail('stewart@pdx.edu');
    setJoinDate(new Date('2015-03-25'));
    SetJoinDateString(joinDate.toLocaleDateString());
    SetTotalDistance(500);
  }

  useEffect(() => {
    GetRecords();
  }, [GetRecords]);

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
