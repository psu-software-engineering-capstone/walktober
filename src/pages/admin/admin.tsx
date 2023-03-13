import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform
} from '@ionic/react';
import NavBar from '../../components/NavBar';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import AdminContext from '../../store/admin-context';
import { useHistory } from 'react-router-dom';
import { FirestoreDB } from '../../firebase';
import { doc, collection, getDocs, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import './admin.css';
import {
  TeamData,
  Devices
} from '../sampleData';

const Admin: React.FC = () => {
  //used to open and close modals
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [isOpenCreateTeam, setOpenCreateTeam] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);

  //Data gathered from the Admin document
  const adData = useContext(AdminContext);

  // used to send new team sizes and team creation date to database (set to data that was previously in the database)
  const [newMaxTeamSize, setNewMaxTeamSize] = useState(adData.maxSize);
  const [newMinTeamSize, setNewMinTeamSize] = useState(adData.minSize);
  const [newTeamCreationDate, setNewTeamCreationDate] = useState(adData.teamDate);
  const [newRegistrationDeadline, setNewRegistrationDeadline] = useState(adData.regDate);
  const [newStartDate, setNewStart] = useState(adData.startDate);
  const [newEndDate, setNewEnd] = useState(adData.endDate);

  // used for Open Team Module

  const [newOpenTeam, setOpenTeam] = useState('');

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
  const [preSurveyReportCheck, setpreSurveyReportCheck] = useState(false);
  const [postSurveyReportCheck, setpostSurveyReportCheck] = useState(false);
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
      team_creation_due: newTeamCreationDate
    })
      .then(() => {
        alert('Team Settings Updated!');
        console.log(newMaxTeamSize, newMinTeamSize, newTeamCreationDate);
      })
      .catch((error: any) => {
        alert(error);
      });
    setIsOpenTeam(false);
  };

  const sendNewUserSetting = async () => {
    const dbRef = doc(FirestoreDB, 'admin', 'admin');
    await updateDoc(dbRef, {
      registration_deadline: newRegistrationDeadline, 
      event_start_date: newStartDate, 
      event_end_date: newEndDate
    })
      .then(() => {
        alert('User Settings Updated!');
        console.log(newRegistrationDeadline, newStartDate, newEndDate);
      })
      .catch((error: any) => {
        alert(error);
      });
    setIsOpenUser(false);
  };

  const sendNewOpenTeam = async () => {
    const dbRef = doc(FirestoreDB, 'teams', newOpenTeam);
    const dbSnap = await getDoc(dbRef);
    if (dbSnap.exists()) {
      alert(`${newOpenTeam} already exists!`);
    }
    else {
      setDoc(doc(FirestoreDB, 'teams', newOpenTeam), {
        name: newOpenTeam,
        avg_steps: 0,
        leader: '',
        members: [],
        status: 0,
        password: '',
        profile_pic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
        totalStep: 0,
        channel_id: '' // TODO: create discord channel
      })
        .then(() => {
          alert('Open Team Created!');
        })
        .catch((error: any) => {
          alert(error);
        });
      setOpenCreateTeam(false);
    }
  };

  useEffect(() => {
    loadUserLogs();
  }, []);

  //creates the grid, if the sample data has users in the individual data collection, it pulls the relevant information
  //and adds it into rows
  function DisplayUsers(userLogs: UserLog[]): any {
    if (userLogs.length > 0) {
      return (
        <>
          <IonGrid fixed={true}>
            <IonRow class="header-row">
              <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "5"} class="header-col admin-col">
                Name
              </IonCol>

              <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "5"} class="header-col admin-col">
                Team
              </IonCol>

              <IonCol sizeMd="4" size={isPlatform('ios') || isPlatform('android') ? "3" : "6"} class="header-col admin-col">
                Email
              </IonCol>

              <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "8"} class="header-col admin-col">
                Total Steps
              </IonCol>

              <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "4" : "8"} class="header-col admin-col">
                Actions
              </IonCol>
            </IonRow>

            {userLogs.map(
              (item: { name: any; team: any; email: any; steps: any }) => (
                <IonRow key={Math.random()}>
                  <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "5"} class="admin-col">
                    {item.name}
                  </IonCol>
                  <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "5"} class="admin-col">
                    {item.team}
                  </IonCol>
                  <IonCol sizeMd="4" size={isPlatform('ios') || isPlatform('android') ? "3" : "5"} class="admin-col">
                    {item.email}
                  </IonCol>
                  <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "8"} class="admin-col">
                    {item.steps}
                  </IonCol>
                  <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "4" : "8"} class="admin-col">
                    <IonButton size="small">{isPlatform('ios') || isPlatform('android') ? "Edit Log" : "Edit Step Log"}</IonButton>
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
              <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "5"} class="header-col">
                Name
              </IonCol>

              <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "5"} class="header-col">
                Team
              </IonCol>

              <IonCol sizeMd="4" size={isPlatform('ios') || isPlatform('android') ? "3" : "6"} class="header-col">
                Email
              </IonCol>

              <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "3" : "8"} class="header-col">
                Total Steps
              </IonCol>

              <IonCol sizeMd="3" size={isPlatform('ios') || isPlatform('android') ? "4" : "8"} class="header-col">
                Actions
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      );
    }
  }

  function DisplayTeams(): any {
    if (TeamData.length > 0) {
      return (
        <>
          <IonGrid fixed={true}>
            <IonRow class="header-row">
              <IonCol sizeMd="6" size={isPlatform('ios') || isPlatform('android') ? "6" : "6"} class="header-col admin-col">
                Team Name
              </IonCol>

              <IonCol sizeMd="5" size={isPlatform('ios') || isPlatform('android') ? "5" : "5"} class="header-col admin-col">
                Number of Members
              </IonCol>

              <IonCol sizeMd="5" size={isPlatform('ios') || isPlatform('android') ? "5" : "5"} class="header-col admin-col">
                Total Steps
              </IonCol>
            </IonRow>

            {TeamData.map((item) => (
              <IonRow key={Math.random()}>
                <IonCol sizeMd="6" size={isPlatform('ios') || isPlatform('android') ? "6" : "6"} class="admin-col">{item.name}</IonCol>
                <IonCol sizeMd="5" size={isPlatform('ios') || isPlatform('android') ? "5" : "5"} class="admin-col">insert number of members here</IonCol>
                <IonCol sizeMd="5" size={isPlatform('ios') || isPlatform('android') ? "5" : "5"} class="admin-col">{item.avg_steps}</IonCol>
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
              <IonCol sizeMd="6" size={isPlatform('ios') || isPlatform('android') ? "6" : "6"} class="header-col admin-col">
                Team Name
              </IonCol>

              <IonCol sizeMd="5" size={isPlatform('ios') || isPlatform('android') ? "5" : "5"} class="header-col admin-col">
                Number of Members
              </IonCol>

              <IonCol sizeMd="5" size={isPlatform('ios') || isPlatform('android') ? "5" : "5"} class="header-col admin-col">
                Total Steps
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      );
    }
  }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (userReportCheck) {
      console.log('Generating user report');

      let str = '"Name","Email","Team","TotalSteps"\n';

      const querySnapshot = await getDocs(collection(FirestoreDB, "users"));
      querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        let line = '';
        line += '"' + doc.data().name + '",';
        line += '"' + doc.data().email + '",';
        line += '"' + doc.data().team + '",';
        line += doc.data().totalStep;
        str += line + '\r\n';
      });

      console.log(str);

      const blob = new Blob([str], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        link.setAttribute('href', url);
        link.setAttribute('download', 'usersReport.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    if (teamReportCheck) {
      console.log('Generating team report');

      let str = '"Team Name","Average Steps","Number of Team Members","TotalSteps"\n'; 

      const querySnapshot = await getDocs(collection(FirestoreDB, "teams"));
      querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        let line = '';
        line += '"' + doc.data().name + '",';
        line += doc.data().avg_steps + ',';
        line += doc.data().members.length + ',';
        line += doc.data().totalStep;
        str += line + '\r\n';
      });

      console.log(str);

      const blob = new Blob([str], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        link.setAttribute('href', url);
        link.setAttribute('download', 'teamsReport.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    if (preSurveyReportCheck) {
      console.log('Generating pre survey report');

      let str = '"Name","Affiliation","Email","Distance From Campus","Heard From","Hours of Physical Activity","Minutes of Physical Activity","Rec Center Usage"\n';

      const querySnapshot = await getDocs(collection(FirestoreDB, "registrationQuestions"));
      querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        let line = '';
        line += '"' + doc.data().name + '",';
        line += '"' + doc.data().affiliation + '",';
        line += '"' + doc.data().email + '",';
        line += '"' + doc.data().distFromCamp + '",';
        line += '"' + doc.data().heardAboutFrom + '",';
        line += '"' + doc.data().hoursPhysical + '",';
        line += '"' + doc.data().minsPhysical + '",';
        line += doc.data().recCenterUse;
        str += line + '\r\n';
      });

      console.log(str);

      const blob = new Blob([str], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        link.setAttribute('href', url);
        link.setAttribute('download', 'preSurveyReport.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    if (postSurveyReportCheck) {
      console.log('Generating post survey report');

      let str = 
      '"Device Used","Walktober Feedback","Future Ideas","Hours Active Per Week","Minutes Active Per Day","Why Not Participate Again","Participation Opinion","Events Participated In","Rec Center Usage","Well-being"\n';

      const querySnapshot = await getDocs(collection(FirestoreDB, "exitQuestions"));
      querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        let line = '';
        line += '"' + doc.data().device + '",';
        line += '"' + doc.data().feedback + '",';
        line += '"' + doc.data().futureIdeas + '",';
        line += '"' + doc.data().hoursPerWeek + '",';
        line += '"' + doc.data().minutesPerDay + '",';
        line += '"' + doc.data().wouldNotParticipateAgain + '",';
        line += '"' + doc.data().wouldParticipateAgain + '",';
        line += '"' + doc.data().prevParticipatedEvents + '",';
        line += '"' + doc.data().recUsage + '",';
        line += doc.data().wellBeing;
        str += line + '\r\n';
      });
      console.log(str);

      const blob = new Blob([str], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        link.setAttribute('href', url);
        link.setAttribute('download', 'postSurveyReport.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    if (devicesReportCheck) {
      console.log('Generating device usage report');

      let str = '';
      str += '"IPhone",' + Devices.iPhone + '\r\n';
      str += '"Android",' + Devices.android + '\r\n';
      str += '"Apple Health",' + Devices.apple_health + '\r\n';
      str += '"FitBit",' + Devices.fitbit + '\r\n';
      str += '"Google Health",' + Devices.google_health + '\r\n';
      console.log(str);

      const blob = new Blob([str], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        link.setAttribute('href', url);
        link.setAttribute('download', 'devicesReport.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    console.log('Reports have been generated');
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
                size={isPlatform('ios') || isPlatform('android') ? 'default' : 'large'}
                expand="block"
              >
                User Settings
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setIsOpenTeam(true)}
                class="admin-button"
                size={isPlatform('ios') || isPlatform('android') ? 'default' : 'large'}
                expand="block"
              >
                Team Settings
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setOpenCreateTeam(true)}
                class="admin-button"
                size={isPlatform('ios') || isPlatform('android') ? 'default' : 'large'}
                expand="block"
              >
                Create Open Team
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setIsOpenReport(true)}
                class="admin-button"
                size={isPlatform('ios') || isPlatform('android') ? 'default' : 'large'}
                expand="block"
              >
                Generate Report
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                class="admin-button"
                size={isPlatform('ios') || isPlatform('android') ? 'default' : 'large'}
                expand="block"
              >
                Announcements
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonItem class="grid-title">Users</IonItem>
        <IonItem>{DisplayUsers(userLogs)}</IonItem>
        <IonItem class="grid-title">Teams</IonItem>
        <IonItem>{DisplayTeams()}</IonItem>

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
            <IonItem>
              <IonLabel>Retroactive Editting Limit</IonLabel>
              <IonInput type="number"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Walktober Event Start Date</IonLabel>
              <IonInput
                id="time"
                type="date"
                onInput={(event:any) => {
                  setNewStart(
                    new Date(event.target.value).toISOString().slice(0, 10)
                  );
                }}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Walktober Event End Date</IonLabel>
              <IonInput
                id="time"
                type="date"
                onInput={(event:any) => {
                  setNewEnd(
                    new Date(event.target.value).toISOString().slice(0, 10)
                  );
                }}
              ></IonInput>
            </IonItem>
            <IonButton
              class="modal-button"
              size="large"
              expand="block"
              onClick={sendNewUserSetting}
            >
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
              <IonInput
                type="number"
                name="minTeamSize"
                onIonChange={(e) => setNewMinTeamSize(e.target.value as number)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Maxiumum Team Size</IonLabel>
              <IonInput
                type="number"
                name="maxTeamSize"
                onIonChange={(e) => setNewMaxTeamSize(e.target.value as number)}
              ></IonInput>
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
            <IonButton
              class="modal-button"
              size="large"
              expand="block"
              onClick={sendNewTeamSetting}
            >
              Save Settings
            </IonButton>

            <IonModal keepContentsMounted={true} backdropDismiss={false}>
              <IonDatetime id="datetime"></IonDatetime>
            </IonModal>
          </IonContent>
        </IonModal>

        <IonModal isOpen={isOpenCreateTeam} backdropDismiss={false}>
          <IonHeader class="modal-header">
            <IonToolbar>
              <IonTitle class="modal-title">Create Open Team</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => setOpenCreateTeam(false)}
                  class="admin-close-modal"
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" class="modal-content">
            <IonItem>
              <IonLabel position="floating">Enter New Open Team Name:</IonLabel>
              <IonInput
                placeholder="Type here"
                onIonChange={(e) => setOpenTeam(e.target.value as string)}
              ></IonInput>
            </IonItem>
            <IonButton class="modal-button" size="large" expand="block" onClick={sendNewOpenTeam}>
              Create Team
            </IonButton>
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
                <IonCheckbox
                  checked={userReportCheck}
                  onIonChange={(e) => setUserReportCheck(e.detail.checked)}
                  slot="start"
                ></IonCheckbox>
                <IonLabel>User Report</IonLabel>
              </IonItem>
              <IonItem>
                <IonCheckbox
                  checked={teamReportCheck}
                  onIonChange={(e) => setTeamReportCheck(e.detail.checked)}
                  slot="start"
                ></IonCheckbox>
                <IonLabel>Team Report</IonLabel>
              </IonItem>
              <IonItem>
                <IonCheckbox
                  checked={preSurveyReportCheck}
                  onIonChange={(e) =>
                    setpreSurveyReportCheck(e.detail.checked)
                  }
                  slot="start"
                ></IonCheckbox>
                <IonLabel>Pre Survey Report</IonLabel>
              </IonItem>
              <IonItem>
                <IonCheckbox
                  checked={postSurveyReportCheck}
                  onIonChange={(e) =>
                    setpostSurveyReportCheck(e.detail.checked)
                  }
                  slot="start"
                ></IonCheckbox>
                <IonLabel>Post Survey Report</IonLabel>
              </IonItem>
              <IonItem>
                <IonCheckbox
                  checked={devicesReportCheck}
                  onIonChange={(e) => setDevicesReportCheck(e.detail.checked)}
                  slot="start"
                ></IonCheckbox>
                <IonLabel>Device Usage Report</IonLabel>
              </IonItem>
              <IonButton
                type="submit"
                class="modal-button"
                size="large"
                expand="block"
              >
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
