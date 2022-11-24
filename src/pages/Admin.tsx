import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar} from '@ionic/react';
import { closeCircleSharp } from 'ionicons/icons';
import './Admin.css';

const Admin: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size="large">Admin</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList lines="none">
            <IonListHeader>
              <IonLabel>User Settings</IonLabel>
            </IonListHeader>
            <IonRadioGroup value={"User Sertings"}>
              <IonItem>
                <IonLabel>User Settings 1</IonLabel>
                <IonRadio slot="start" value = "user_settings_1"></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel>User Settings 2</IonLabel>
                <IonRadio slot="start" value = "user_settings_2"></IonRadio>
              </IonItem>
            </IonRadioGroup>
            <IonRow>

                <IonItem>
                  <IonLabel>Maxiumum Team Size</IonLabel>
                  <IonInput type="number"></IonInput>
                </IonItem>

                <IonButton size="small">Announcments</IonButton>

                <IonButton size="small">Generate Report</IonButton>
            </IonRow>
          </IonList>
          <IonGrid>
            <IonRow class="header-row">
              <IonCol size="1">Name</IonCol>

              <IonCol size="2">Team</IonCol>

              <IonCol size="2">Email</IonCol>

              <IonCol size="2">Total Steps</IonCol>

              <IonCol size="3">Actions</IonCol>
            </IonRow>

            <IonRow>
              {/*The below line should serve as a template for populating data into the table, to be implmented
              {data.map((column, index) => (<IonCol key={index}>{column}</IonCol>))}*/}
              <IonCol size="1">Test Name</IonCol>

              <IonCol size="2">Kraban</IonCol>

              <IonCol size="2">fakemail@gmail.com</IonCol>

              <IonCol size="2">9001</IonCol>

              <IonCol size="3">
                <IonItem>
                  <IonButton>
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>

                  <IonButton>Edit Step Log</IonButton>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="1">Test Name2</IonCol>

              <IonCol size="2">Stars</IonCol>

              <IonCol size="2">fakemail@aol.com</IonCol>

              <IonCol size="2">1135813</IonCol>

              <IonCol size="3">
                <IonItem>
                <IonButton>
                  <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                  Remove
                </IonButton>

                <IonButton>Edit Step Log</IonButton>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="1">Test Name3</IonCol>

              <IonCol size="2">Blank</IonCol>

              <IonCol size="2">mail@mail.com</IonCol>

              <IonCol size="2">1235711</IonCol>

              <IonCol size="3">
                <IonItem>
                <IonButton>
                  <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                  Remove
                </IonButton>

                <IonButton>Edit Step Log</IonButton>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="1">Test Name4</IonCol>

              <IonCol size="2"></IonCol>

              <IonCol size="2">fakemail@yahoo.com</IonCol>

              <IonCol size="2">987654321</IonCol>

              <IonCol size="3">
                <IonItem>
                <IonButton>
                  <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                  Remove
                </IonButton>

                <IonButton>Edit Step Log</IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Admin;

/*Useful links
https://www.youtube.com/watch?v=5xQlIYHgesg
https://ionicacademy.com/responsive-data-ionic-grid/
*/