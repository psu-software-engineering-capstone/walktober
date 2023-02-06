import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import NavBar from '../../components/NavBar';
import { closeCircleSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import './admin.css';

const Admin: React.FC = () => {
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [isOpenAnnouncements, setIsOpenAnnouncements] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);

  return (
    <IonPage>
      <NavBar>
        <IonTitle>Home Page</IonTitle>
      </NavBar>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Admin</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid class="invis-grid">
          <IonRow></IonRow>
          <IonRow>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setIsOpenUser(true)}
                class="admin-button"
                size="large"
                expand="block"
              >
                User Settings
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setIsOpenTeam(true)}
                class="admin-button"
                size="large"
                expand="block"
              >
                Team Settings
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setIsOpenAnnouncements(true)}
                class="admin-button"
                size="large"
                expand="block"
              >
                Announcements
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setIsOpenReport(true)}
                class="admin-button"
                size="large"
                expand="block"
              >
                Generate Report
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonItem>Users</IonItem>
        <IonGrid fixed={true}>
          <IonRow class="header-row">
            <IonCol size="3" class="header-col">
              Name
            </IonCol>

            <IonCol size="3" class="header-col">
              Team
            </IonCol>

            <IonCol size="4" class="header-col">
              Email
            </IonCol>

            <IonCol size="3" class="header-col">
              Total Steps
            </IonCol>

            <IonCol size="3" class="header-col">
              Actions
            </IonCol>
          </IonRow>

          <IonRow>
            {/*The below line should serve as a template for populating data into the table, to be implmented
              {data.map((column, index) => (<IonCol key={index}>{column}</IonCol>))}*/}
            <IonCol size="3">Test Name</IonCol>

            <IonCol size="3">Kraban</IonCol>

            <IonCol size="4">fakemail@gmail.com</IonCol>

            <IonCol size="3">9001</IonCol>

            <IonCol size="3">
              <IonButton size="small">
                <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>Remove
              </IonButton>
              <IonButton size="small">Edit Step Log</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="3">Test Name2</IonCol>

            <IonCol size="3">Stars</IonCol>

            <IonCol size="4">fakemail@aol.com</IonCol>

            <IonCol size="3">1135813</IonCol>

            <IonCol size="3">
              <IonButton size="small">
                <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>Remove
              </IonButton>
              <IonButton size="small">Edit Step Log</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="3">Test Name3</IonCol>

            <IonCol size="3">Blank</IonCol>

            <IonCol size="4">mail@mail.com</IonCol>

            <IonCol size="3">1235711</IonCol>

            <IonCol size="3">
              <IonButton size="small">
                <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>Remove
              </IonButton>
              <IonButton size="small">Edit Step Log</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="3">Test Name4</IonCol>

            <IonCol size="3"></IonCol>

            <IonCol size="4">fakemail@yahoo.com</IonCol>

            <IonCol size="3">987654321</IonCol>

            <IonCol size="3">
              <IonButton size="small">
                <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>Remove
              </IonButton>
              <IonButton size="small">Edit Step Log</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonModal isOpen={isOpenUser} backdropDismiss={false}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>User Settings</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpenUser(false)} color="light">
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonRadioGroup value={'User Sertings'}>
              <IonItem>
                <IonLabel>User Settings 1</IonLabel>
                <IonRadio slot="start" value="user_settings_1"></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel>User Settings 2</IonLabel>
                <IonRadio slot="start" value="user_settings_2"></IonRadio>
              </IonItem>
            </IonRadioGroup>
            <IonButton class="modal-button" size="large" expand="block">
              Save Settings
            </IonButton>
          </IonContent>
        </IonModal>

        <IonModal isOpen={isOpenTeam} backdropDismiss={false}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Team Settings</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpenTeam(false)} color="light">
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel>Minimum Team Size</IonLabel>
              <IonInput type="number"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Maxiumum Team Size</IonLabel>
              <IonInput type="number"></IonInput>
            </IonItem>
            <IonItem>
              <IonButton>Set Team Deadline</IonButton>
              <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            </IonItem>
            <IonItem>
              <IonButton>Set Registration Deadline</IonButton>
              <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            </IonItem>
            <IonButton class="modal-button" size="large" expand="block">
              Save Settings
            </IonButton>

            <IonModal keepContentsMounted={true} backdropDismiss={false}>
              <IonDatetime id="datetime"></IonDatetime>
            </IonModal>
          </IonContent>
        </IonModal>

        <IonModal isOpen={isOpenAnnouncements} backdropDismiss={false}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Announcements</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => setIsOpenAnnouncements(false)}
                  color="light"
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonTextarea
                placeholder="Type announcement message here"
                autoGrow={true}
              ></IonTextarea>
            </IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="7" class="invis-grid-col">
                  <IonButton>Post Announcement</IonButton>
                </IonCol>
                <IonCol size="9" class="invis-grid-col">
                  <IonButton>Schedule Announcement</IonButton>
                  <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid>
              <IonRow class="header-row">
                <IonCol size="4">Time Scheduled</IonCol>
                <IonCol size="8">Announcement Contents</IonCol>
                <IonCol size="4">Delete</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">January 20, 2023 7:00PM</IonCol>
                <IonCol size="8">Challenge #1</IonCol>
                <IonCol size="4">
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">January 28, 2023 3:30PM</IonCol>
                <IonCol size="8">Challenge #2</IonCol>
                <IonCol size="4">
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">February 2, 2023 9:15AM</IonCol>
                <IonCol size="8">Challenge #3</IonCol>
                <IonCol size="4">
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="4">February 2, 2023 9:15AM</IonCol>
                <IonCol size="8">Challenge #3</IonCol>
                <IonCol size="4">
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">February 2, 2023 9:15AM</IonCol>
                <IonCol size="8">Challenge #3</IonCol>
                <IonCol size="4">
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">February 2, 2023 9:15AM</IonCol>
                <IonCol size="8">Challenge #3</IonCol>
                <IonCol size="4">
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">February 2, 2023 9:15AM</IonCol>
                <IonCol size="8">Challenge #3</IonCol>
                <IonCol size="4">
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">February 2, 2023 9:15AM</IonCol>
                <IonCol size="8">Challenge #3</IonCol>
                <IonCol size="">
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>
                    Remove
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonModal keepContentsMounted={true} backdropDismiss={false}>
              <IonDatetime id="datetime"></IonDatetime>
            </IonModal>
          </IonContent>
        </IonModal>

        <IonModal isOpen={isOpenReport}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Generate Report</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpenReport(false)} color="light">
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonItem>
            <IonLabel>Select Reports to Generate</IonLabel>
          </IonItem>
          <IonContent className="ion-padding">
            <IonItem>
              <IonCheckbox slot="start"></IonCheckbox>
              <IonLabel>Report Type 1</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox slot="start"></IonCheckbox>
              <IonLabel>Report Type 2</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox slot="start"></IonCheckbox>
              <IonLabel>Report Type 3</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox slot="start"></IonCheckbox>
              <IonLabel>Report Type 4</IonLabel>
            </IonItem>
            <IonButton class="modal-button" size="large" expand="block">
              Generate Reports
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Admin;

/*Useful links
https://www.youtube.com/watch?v=5xQlIYHgesg
https://ionicacademy.com/responsive-data-ionic-grid/
*/
