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
import { useEffect, useState } from 'react';
import './admin.css';
import { FirestoreDB } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Admin: React.FC = () => {
  //used to open and close modals
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [isOpenAnnouncements, setIsOpenAnnouncements] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);

  interface UserLog {
    name: string;
    team: string;
    email: string;
    steps: number;
  }

  const [userLogs, setUserLogs] = useState<UserLog[]>([]);

  const loadUserLogs = async () => {
    const dbRef = collection(FirestoreDB, 'users');
    const dbSnap = await getDocs(dbRef);
    const userLogsData: UserLog[] = [];
    dbSnap.forEach((doc: { data: () => any; }) => {
      const data = doc.data();
      if (data) {
        const userLogData: UserLog = {
          name: data.name,
          team: data.team,
          email: data.email,
          steps: data.totalStep
        };
        userLogsData.push(userLogData);
      }
    });
    setUserLogs(userLogsData);
  };

  useEffect(() => {
    loadUserLogs();
  }, []);

  useEffect(() => {
    console.log(userLogs);
  }, [userLogs]);

  //creates the grid, if the sample data has users in the individual data collection, it pulls the relevant information
  //and adds it into rows
  function DisplayUsers(userLogs: UserLog[]): any {
    if (userLogs.length > 0) {
      return (
        <>
          <IonGrid fixed={true}>
            <IonRow class="header-row">
              <IonCol sizeMd='3' size="5" class="header-col admin-col">
                Name
              </IonCol>

              <IonCol sizeMd='3' size="5" class="header-col admin-col">
                Team
              </IonCol>

              <IonCol sizeMd='4' size="6" class="header-col admin-col">
                Email
              </IonCol>

              <IonCol sizeMd='3' size="8" class="header-col admin-col">
                Total Steps
              </IonCol>

              <IonCol sizeMd='3' size="8" class="header-col admin-col">
                Actions
              </IonCol>
            </IonRow>

            {userLogs.map((item: { name: any; team: any; email: any; steps: any; }) => (
              <IonRow key={Math.random()}>
                <IonCol sizeMd='3' size="5" class='admin-col'>{item.name}</IonCol>
                <IonCol sizeMd='3' size="5" class='admin-col'>{item.team}</IonCol>
                <IonCol sizeMd='4' size="5" class='admin-col'>{item.email}</IonCol>
                <IonCol sizeMd='3' size="8" class='admin-col'>{item.steps}</IonCol>
                <IonCol sizeMd='3' size="8" class='admin-col'>
                  <IonButton size="small">
                    <IonIcon slot="start" icon={closeCircleSharp}></IonIcon>Remove
                  </IonButton>
                <IonButton size="small">Edit Step Log</IonButton></IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </>
      );
    } else {
      return (
        <>
          <IonGrid fixed={true}>
            <IonRow class="header-row">
              <IonCol sizeMd='3' size="5" class="header-col">
                Name
              </IonCol>

              <IonCol sizeMd='3' size="5" class="header-col">
                Team
              </IonCol>

              <IonCol sizeMd='4' size="6" class="header-col">
                Email
              </IonCol>

              <IonCol sizeMd='3' size="8" class="header-col">
                Total Steps
              </IonCol>

              <IonCol sizeMd='3' size="8" class="header-col">
                Actions
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      );
    }
  }


  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Admin</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen class='admin-content'>
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

        <IonItem class="grid-title">Users</IonItem>
        <IonItem>{DisplayUsers(userLogs)}</IonItem>

        <IonModal isOpen={isOpenUser} backdropDismiss={false}>
          <IonHeader class="modal-header">
            <IonToolbar>
              <IonTitle class="modal-title">User Settings</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpenUser(false)} class="admin-close-modal">
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" class="modal-content">
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
          <IonHeader class="modal-header">
            <IonToolbar>
              <IonTitle class="modal-title">Team Settings</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpenTeam(false)} class="admin-close-modal">
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" class="modal-content">
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
          <IonHeader class="modal-header">
            <IonToolbar>
              <IonTitle class="modal-title">Announcements</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => setIsOpenAnnouncements(false)}
                  class="admin-close-modal"
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" class="modal-content">
            <IonItem>
              <IonTextarea
                placeholder="Type announcement message here"
                autoGrow={true}
              ></IonTextarea>
            </IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="5" class="invis-announcements">
                  <IonButton>Post Announcement</IonButton>
                </IonCol>
                <IonCol size="7" class="invis-announcements">
                  <IonButton>Schedule Announcement</IonButton>
                  <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid>
              <IonRow class="header-row">
                <IonCol size="4" class="admin-col">Time Scheduled</IonCol>
                <IonCol size="8" class="admin-col">Announcement Contents</IonCol>
                <IonCol size="4" class="admin-col">Delete</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" class="admin-col">January 20, 2023 7:00PM</IonCol>
                <IonCol size="8" class="admin-col">Challenge #1</IonCol>
                <IonCol size="4" class="admin-col">
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
          <IonHeader class="modal-header">
            <IonToolbar>
              <IonTitle class="modal-title">Generate Report</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpenReport(false)} class="admin-close-modal">
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonItem class="modal-content">
            <IonLabel>Select Reports to Generate</IonLabel>
          </IonItem>
          <IonContent className="ion-padding" class="modal-content">
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
