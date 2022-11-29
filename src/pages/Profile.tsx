import { 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonImg, 
    IonItem, 
    IonText, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonButton, 
    IonPage,
    IonLabel,
    IonInput
} from '@ionic/react';
import './Profile.css';

const Profile: React.FC = () => {
    let profilePic: string;
    let name: string;
    let username: string;
    let email: string;
    let joinDate: Date;
    let joinDateString: string;
    let totalDistance: number; // Currently in miles
    // let badges;

    function GetRecords (){
        // TODO: Get information from database 
        profilePic = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kristen_Stewart_in_2022.JPG/1280px-Kristen_Stewart_in_2022.JPG";
        name = "Kristen Stewart";
        username = "kStewart0409"
        email = "stewart@pdx.edu";
        joinDate = new Date("2015-03-25");
        joinDateString = joinDate.toLocaleDateString();
        totalDistance = 500;
    }
    
    function DisplayRecords(){
      GetRecords()
      return (
        <IonGrid>
          <IonRow>
            <IonCol size="auto">
              <IonText>
                <IonImg className = "ProfilePic" src={profilePic} alt="Our lord and savior Kristen Stewart"></IonImg>
                <h2>{name}</h2>
                <p>{username}</p>
                <p>{email}</p>
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
          <IonRow>
            <IonButton>Change Password</IonButton>
          </IonRow>
          <IonRow>
            <IonButton>Change Profile Picture</IonButton>
          </IonRow>
          <IonRow>
            <IonButton>Change Username</IonButton>
          </IonRow>
          <IonRow>
            <IonButton>Change Health App Preferences</IonButton>
          </IonRow>
        </IonGrid>
      )
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>{DisplayRecords()}</IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Profile;