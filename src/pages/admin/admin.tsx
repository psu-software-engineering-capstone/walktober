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
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import NavBar from '../../components/NavBar';
import { closeCircleSharp } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import { FirestoreDB } from '../../firebase';
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore';
import './admin.css';

const Admin: React.FC = () => {
  //used to open and close modals
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [isOpenAnnouncements, setIsOpenAnnouncements] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);

  // used to send new team sizes and team creation date to database
  const [newMaxTeamSize, setNewMaxTeamSize] = useState(10);
  const [newMinTeamSize, setNewMinTeamSize] = useState(10);
  const [newTeamCreationDate, setNewTeamCreationDate] = useState('');
  const [newRegistrationDeadline, setNewRegistrationDeadline] = useState('');

  //used for dates for teams
  //const [teamDeadline, setTeamDeadline] = useState('');
  //const [teamRegistrationDeadline, setTeamRegistrationDeadline] = useState('');

  interface UserLog {
    name: string;
    team: string;
    email: string;
    steps: number;
  }

  const [userReportCheck, setUserReportCheck] = useState(false);
  const [teamReportCheck, setTeamReportCheck] = useState(false);
  const [preSurveryReportCheck, setpreSurveryReportCheck] = useState(false);
  const [postSurveryReportCheck, setpostSurveryReportCheck] = useState(false);
  const [analysisReportCheck, setAnalysisReportCheck] = useState(false);
  const [devicesReportCheck, setDevicesReportCheck] = useState(false);

  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  
  const history = useHistory();
  const ctx = useContext(AuthContext);
  const isAdmin = ctx.admin;

  const loadUserLogs = async () => {
    // prevents the user from entering the admin page from the url if they are not an admin
    if (isAdmin === false) {
      history.push('/app');
      return;
    }    
    const dbRef = collection(FirestoreDB, 'users');
    const dbSnap = await getDocs(dbRef);
    const userLogsData: UserLog[] = [];
    dbSnap.forEach((doc: { data: () => any }) => {
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

  // in team setting module, when user presses save setting, sends the data to database.
  const sendNewTeamSetting = async () => {
    const dbRef = doc(FirestoreDB, 'admin', 'admin');
    await updateDoc(dbRef, {
      min_team_size: newMinTeamSize,
      max_team_size: newMaxTeamSize,
      team_creation_due: newTeamCreationDate,
    })
      .then(() => {
        alert('Team Settings Updated!');
      })
      .catch((error: any) => {
        alert(error);
      });
      setIsOpenTeam(false);
  };

  const sendNewUserSetting = async () => {
    const dbRef = doc(FirestoreDB, 'admin', 'admin');
    await updateDoc(dbRef, {
      registration_deadline: newRegistrationDeadline
    })
      .then(() => {
        alert('User Settings Updated!');
      })
      .catch((error: any) => {
        alert(error);
      });
      setIsOpenUser(false);
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
              <IonCol sizeMd="3" size="5" class="header-col admin-col">
                Name
              </IonCol>

              <IonCol sizeMd="3" size="5" class="header-col admin-col">
                Team
              </IonCol>

              <IonCol sizeMd="4" size="6" class="header-col admin-col">
                Email
              </IonCol>

              <IonCol sizeMd="3" size="8" class="header-col admin-col">
                Total Steps
              </IonCol>

              <IonCol sizeMd="3" size="8" class="header-col admin-col">
                Actions
              </IonCol>
            </IonRow>

            {userLogs.map(
              (item: { name: any; team: any; email: any; steps: any }) => (
                <IonRow key={Math.random()}>
                  <IonCol sizeMd="3" size="5" class="admin-col">
                    {item.name}
                  </IonCol>
                  <IonCol sizeMd="3" size="5" class="admin-col">
                    {item.team}
                  </IonCol>
                  <IonCol sizeMd="4" size="5" class="admin-col">
                    {item.email}
                  </IonCol>
                  <IonCol sizeMd="3" size="8" class="admin-col">
                    {item.steps}
                  </IonCol>
                  <IonCol sizeMd="3" size="8" class="admin-col">
                    <IonButton size="small">Edit Step Log</IonButton>
                  </IonCol>
                </IonRow>
              )
            )}
          </IonGrid>
        </>
      );
    } else {
      return (
        <>
          <IonGrid fixed={true}>
            <IonRow class="header-row">
              <IonCol sizeMd="3" size="5" class="header-col">
                Name
              </IonCol>

              <IonCol sizeMd="3" size="5" class="header-col">
                Team
              </IonCol>

              <IonCol sizeMd="4" size="6" class="header-col">
                Email
              </IonCol>

              <IonCol sizeMd="3" size="8" class="header-col">
                Total Steps
              </IonCol>

              <IonCol sizeMd="3" size="8" class="header-col">
                Actions
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      );
    }
  }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if(userReportCheck){
      console.log("Generating user report");
    }

    if(teamReportCheck){
      console.log("Generating team report");
    }

    if(preSurveryReportCheck){
      console.log("Generating intro survey report");
    }

    if(postSurveryReportCheck){
      console.log("Generating exit survey report");
    }

    if(analysisReportCheck){
      console.log("Generating survey alalysis report");
    }

    if(devicesReportCheck){
      console.log("Generating device usage report");
    }

    console.log("Reports have been generated");
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Admin</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen class="admin-content">
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
                <IonButton
                  onClick={() => setIsOpenUser(false)}
                  class="admin-close-modal"
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" class="modal-content">
          <IonItem>
              <IonLabel>Set Registration Deadline</IonLabel>
              <IonInput
                id="time"
                type="date"
                onInput={(event: any) => {
                  setNewRegistrationDeadline(
                    new Date(event.target.value).toISOString().slice(0, 10)
                  );
                }}
              ></IonInput>
            </IonItem>
            <IonButton class="modal-button" size="large" expand="block" onClick={sendNewUserSetting}>
              Save Settings
            </IonButton>
          </IonContent>
        </IonModal>

        <IonModal isOpen={isOpenTeam} backdropDismiss={false}>
          <IonHeader class="modal-header">
            <IonToolbar>
              <IonTitle class="modal-title">Team Settings</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => setIsOpenTeam(false)}
                  class="admin-close-modal"
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" class="modal-content">
            <IonItem>
              <IonLabel>Minimum Team Size</IonLabel>
              <IonInput type="number" name="minTeamSize"onIonChange={(e) => setNewMinTeamSize(e.target.value as number)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Maxiumum Team Size</IonLabel>
              <IonInput type="number" name="maxTeamSize"onIonChange={(e) => setNewMaxTeamSize(e.target.value as number)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Set Team Deadline</IonLabel>
              <IonInput
                id="time"
                type="date"
                onInput={(event: any) => {
                  setNewTeamCreationDate(
                    new Date(event.target.value).toISOString().slice(0, 10)
                  );
                }}
              ></IonInput>
            </IonItem>
            <IonButton class="modal-button" size="large" expand="block" onClick={sendNewTeamSetting}>
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
                <IonCol size="4" class="admin-col">
                  Time Scheduled
                </IonCol>
                <IonCol size="8" class="admin-col">
                  Announcement Contents
                </IonCol>
                <IonCol size="4" class="admin-col">
                  Delete
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" class="admin-col">
                  January 20, 2023 7:00PM
                </IonCol>
                <IonCol size="8" class="admin-col">
                  Challenge #1
                </IonCol>
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
                <IonButton
                  onClick={() => setIsOpenReport(false)}
                  class="admin-close-modal"
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonItem class="modal-content">
            <IonLabel>Select Reports to Generate</IonLabel>
          </IonItem>
          <IonContent className="ion-padding" class="modal-content">
            <form
            id="generateReports"
            onSubmit={(event: React.FormEvent) => {
              submitHandler(event);
            }}
            >
            <IonItem>
              <IonCheckbox checked={userReportCheck} onIonChange={e => setUserReportCheck(e.detail.checked)} slot="start"></IonCheckbox>
              <IonLabel>User Report</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox checked={teamReportCheck} onIonChange={e => setTeamReportCheck(e.detail.checked)}  slot="start"></IonCheckbox>
              <IonLabel>Team Report</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox checked={preSurveryReportCheck} onIonChange={e => setpreSurveryReportCheck(e.detail.checked)}  slot="start"></IonCheckbox>
              <IonLabel>Pre Survery Report</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox checked={postSurveryReportCheck} onIonChange={e => setpostSurveryReportCheck(e.detail.checked)}  slot="start"></IonCheckbox>
              <IonLabel>Post Survery Report</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox checked={analysisReportCheck} onIonChange={e => setAnalysisReportCheck(e.detail.checked)}  slot="start"></IonCheckbox>
              <IonLabel>Survey Analysis Report</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox checked={devicesReportCheck} onIonChange={e => setDevicesReportCheck(e.detail.checked)}  slot="start"></IonCheckbox>
              <IonLabel>Device Usage Report</IonLabel>
            </IonItem>
            <IonButton type="submit" class="modal-button" size="large" expand="block">
              Generate Reports
            </IonButton>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  ) as any;
};

export default Admin;
