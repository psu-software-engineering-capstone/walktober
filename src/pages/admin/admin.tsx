import React from 'react';
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
import AdminContext from '../../store/admin-context';
import { FirestoreDB } from '../../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import './admin.css';
import { useHistory } from 'react-router';
import { getCountFromServer } from 'firebase/firestore';

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
  const [newTeamCreationDate, setNewTeamCreationDate] = useState(
    adData.teamDate
  );
  const [newRegistrationDeadline, setNewRegistrationDeadline] = useState(
    adData.regDate
  );
  const [newStartDate, setNewStart] = useState(adData.startDate);
  const [newEndDate, setNewEnd] = useState(adData.endDate);
  const [newEditingLimit, setNewEditingLimit] = useState(adData.priorLogDays);

  // used for Open Team Module
  const [newOpenTeam, setOpenTeam] = useState('');

  const history = useHistory(); // for routing

  //user to log information on users
  interface UserLog {
    name: string;
    team: string;
    email: string;
    steps: number;
  }

  //used to log information on teams
  interface TeamLog {
    name: string;
    status: string;
    size: number;
    avg_step: number;
    totalStep: number;
  }

  //these are used to check which reports an admin wants to create
  const [userReportCheck, setUserReportCheck] = useState(false);
  const [teamReportCheck, setTeamReportCheck] = useState(false);
  const [preSurveyReportCheck, setpreSurveyReportCheck] = useState(false);
  const [postSurveyReportCheck, setpostSurveyReportCheck] = useState(false);
  const [devicesReportCheck, setDevicesReportCheck] = useState(false);

  //used to for reatrieving data for tables on admin page
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [teamLogs, setTeamLogs] = useState<TeamLog[]>([]);

  //loads in the information on the users from the database
  const loadUserLogs = async () => {
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

  //loads in information on teams from the database
  const loadTeamLogs = async () => {
    const dbRef = collection(FirestoreDB, 'teams'); // create reference to access the whole team collection
    const dbSnap = await getDocs(dbRef); // get all the docs
    const teamLogsData: TeamLog[] = []; // emtpy array to gather the required information from the team docs
    dbSnap.forEach((doc: { data: () => any }) => {
      const data = doc.data(); //get data
      if (data) {
        const teamLogData: TeamLog = {
          name: data.name,
          status: data.status,
          size: data.members.length,
          avg_step: data.avg_steps,
          totalStep: data.totalStep
        }; // get the necessary info
        teamLogsData.push(teamLogData); // add it to the array
      }
    });
    setTeamLogs(teamLogsData); // reassign the data to a more global variable
  };

  // in team setting module, when user presses save setting, sends the data to database.
  const sendNewTeamSetting = async () => {
    const dbRef = doc(FirestoreDB, 'admin', 'admin');
    await updateDoc(dbRef, {
      min_team_size: Number(newMinTeamSize),
      max_team_size: Number(newMaxTeamSize),
      team_creation_due: newTeamCreationDate.slice(0, 10) + 'T23:59'
    })
      .then(() => {
        alert('Team Settings Updated');
      })
      .catch((error: any) => {
        alert(error);
      });
    setIsOpenTeam(false);
  };

  const sendNewUserSetting = async () => {
    const dbRef = doc(FirestoreDB, 'admin', 'admin');
    await updateDoc(dbRef, {
      registration_deadline: newRegistrationDeadline.slice(0, 10) + 'T23:59',
      event_start_date: newStartDate.slice(0, 10) + 'T00:00',
      event_end_date: newEndDate.slice(0, 10) + 'T23:59',
      prior_log_days: Number(newEditingLimit)
    })
      .then(() => {
        alert('User Settings Updated');
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
      alert(`${newOpenTeam} already exists`);
    } else {
      let channelId = ''; //temp array
      const chanQuery = query(
        collection(FirestoreDB, 'channelIDs'),
        where('team', '==', ''),
        limit(1)
      ); //find empty channel id document
      const chanIdSnap = await getDocs(chanQuery); //get results of query
      chanIdSnap.forEach(async (doc: any) => {
        channelId = doc.id; //reassign the string to the channel id (which is the document id)
      });
      setDoc(doc(FirestoreDB, 'teams', newOpenTeam), {
        name: newOpenTeam,
        avg_steps: 0,
        leader: '',
        members: [],
        status: '0',
        password: '',
        profile_pic:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
        totalStep: 0,
        channel_id: channelId // TODO: create discord channel
      })
        .then(() => {
          updateDoc(doc(FirestoreDB, 'channelIDs', channelId), {
            team: newOpenTeam
          }); //set channel id document to this new open team
          alert('Open Team Created');
        })
        .catch((error: any) => {
          alert(error);
        });
      setOpenCreateTeam(false);
    }
  };

  const goToAdminSteps = (email: string) => {
    history.push(`/app/adminSteps/${email}`);
  };

  const goToAnnouncement = () => {
    history.push(`/app/admin/announcements`);
  };

  useEffect(() => {
    loadUserLogs();
    loadTeamLogs();
  }, []);

  //creates a grid for information on users, pulls from the information that was pulled from the database, for each user it creates a new row
  //in the table that will display the information relevant to that user
  function DisplayUsers(userLogs: UserLog[]): any {
    if (userLogs.length > 0) {
      return (
        <>
          <IonGrid fixed={true} class="info-grid">
            <IonRow class="admin-row">
              <IonCol class="grid-title">Users</IonCol>
            </IonRow>
            <IonRow class="header-row admin-row">
              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                class="header-col admin-col"
              >
                Name
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                class="header-col admin-col"
              >
                Team
              </IonCol>

              <IonCol
                sizeMd="4"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '6'}
                class="header-col admin-col"
              >
                Email
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '8'}
                class="header-col admin-col"
              >
                Total Steps
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '4' : '8'}
                class="header-col admin-col"
              >
                Actions
              </IonCol>
            </IonRow>

            {userLogs.map(
              (item: { name: any; team: any; email: any; steps: any }) => (
                <IonRow key={item.email} class="admin-row">
                  <IonCol
                    sizeMd="3"
                    size={
                      isPlatform('ios') || isPlatform('android') ? '3' : '5'
                    }
                    class="admin-col"
                  >
                    {item.name}
                  </IonCol>
                  <IonCol
                    sizeMd="3"
                    size={
                      isPlatform('ios') || isPlatform('android') ? '3' : '5'
                    }
                    class="admin-col"
                  >
                    {item.team}
                  </IonCol>
                  <IonCol
                    sizeMd="4"
                    size={
                      isPlatform('ios') || isPlatform('android') ? '3' : '6'
                    }
                    class="admin-col"
                  >
                    {item.email}
                  </IonCol>
                  <IonCol
                    sizeMd="3"
                    size={
                      isPlatform('ios') || isPlatform('android') ? '3' : '8'
                    }
                    class="admin-col right-align-num"
                  >
                    {item.steps.toLocaleString()}
                  </IonCol>
                  <IonCol
                    sizeMd="3"
                    size={
                      isPlatform('ios') || isPlatform('android') ? '4' : '8'
                    }
                    class="admin-col"
                  >
                    <IonButton
                      size="small"
                      onClick={() => goToAdminSteps(item.email)}
                    >
                      {isPlatform('ios') || isPlatform('android')
                        ? 'Edit Log'
                        : 'Edit Step Log'}
                    </IonButton>
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
          <IonGrid fixed={true} class="info-grid">
            <IonRow class="admin-row">
              <IonCol class="grid-title">Users</IonCol>
            </IonRow>
            <IonRow class="header-row">
              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                class="header-col"
              >
                Name
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                class="header-col"
              >
                Team
              </IonCol>

              <IonCol
                sizeMd="4"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '6'}
                class="header-col"
              >
                Email
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '8'}
                class="header-col"
              >
                Total Steps
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '4' : '8'}
                class="header-col"
              >
                Actions
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      );
    }
  }

  //creates a grid for information on teams, pulls from the information that was pulled from the database, for each team it creates a new row
  //in the table that will display the information relevant to that team
  function DisplayTeams(): any {
    if (teamLogs.length > 0) {
      return (
        <>
          <IonGrid fixed={true} class="info-grid">
            <IonRow class="admin-row">
              <IonCol class="grid-title">Teams</IonCol>
            </IonRow>
            <IonRow class="header-row admin-row">
              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                class="header-col admin-col"
              >
                Team Name
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                class="header-col admin-col"
              >
                Privacy
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '6'}
                class="header-col admin-col"
              >
                Number of Members
              </IonCol>

              <IonCol
                sizeMd="4"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '8'}
                class="header-col admin-col"
              >
                Average Total Steps
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '4' : '8'}
                class="header-col admin-col"
              >
                Total Steps
              </IonCol>
            </IonRow>

            {teamLogs.map((item) => (
              <IonRow key={Math.random()} class="admin-row">
                <IonCol
                  sizeMd="3"
                  size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                  class="admin-col"
                >
                  {item.name}
                </IonCol>

                <IonCol
                  sizeMd="3"
                  size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                  class="admin-col"
                >
                  {item.status === '1' ? 'Private' : 'Public'}
                </IonCol>

                <IonCol
                  sizeMd="3"
                  size={isPlatform('ios') || isPlatform('android') ? '3' : '6'}
                  class="admin-col right-align-num"
                >
                  {item.size}
                </IonCol>
                <IonCol
                  sizeMd="4"
                  size={isPlatform('ios') || isPlatform('android') ? '3' : '8'}
                  class="admin-col right-align-num"
                >
                  {item.avg_step.toLocaleString()}
                </IonCol>
                <IonCol
                  sizeMd="3"
                  size={isPlatform('ios') || isPlatform('android') ? '4' : '8'}
                  class="admin-col right-align-num"
                >
                  {item.totalStep.toLocaleString()}
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </>
      );
    } else {
      return (
        <>
          <IonGrid fixed={true} class="info-grid">
            <IonRow class="admin-row">
              <IonCol class="grid-title">Teams</IonCol>
            </IonRow>
            <IonRow class="header-row admin-row">
              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                class="header-col admin-col"
              >
                Team Name
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '5'}
                class="header-col admin-col"
              >
                Privacy
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '6'}
                class="header-col admin-col"
              >
                Number of Members
              </IonCol>

              <IonCol
                sizeMd="4"
                size={isPlatform('ios') || isPlatform('android') ? '3' : '8'}
                class="header-col admin-col"
              >
                Average Total Steps
              </IonCol>

              <IonCol
                sizeMd="3"
                size={isPlatform('ios') || isPlatform('android') ? '4' : '8'}
                class="header-col admin-col"
              >
                Total Steps
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      );
    }
  }

  //when the generate reports button is pressed, this generates csv files based on what reports the user has checked
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    //report for information on users
    if (userReportCheck) {
      console.log('Generating user report');

      let str = '"Name","Email","Team","TotalSteps"\n';

      const querySnapshot = await getDocs(collection(FirestoreDB, 'users'));
      querySnapshot.forEach((doc: { id: any; data: () => any }) => {
        let line = '';
        line += '"' + doc.data().name + '",';
        line += '"' + doc.data().email + '",';
        line += '"' + doc.data().team + '",';
        line += doc.data().totalStep;
        str += line + '\r\n';
      });

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

    //report for information on teams
    if (teamReportCheck) {
      console.log('Generating team report');

      let str =
        '"Team Name","Average Steps","Number of Team Members","TotalSteps"\n';

      const querySnapshot = await getDocs(collection(FirestoreDB, 'teams'));
      querySnapshot.forEach((doc: { id: any; data: () => any }) => {
        let line = '';
        line += '"' + doc.data().name + '",';
        line += doc.data().avg_steps + ',';
        line += doc.data().members.length + ',';
        line += doc.data().totalStep;
        str += line + '\r\n';
      });

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

    //report for pre-survey
    if (preSurveyReportCheck) {
      console.log('Generating pre survey report');

      let str =
        '"Name","Affiliation","Email","Distance From Campus","Heard From","Hours of Physical Activity","Minutes of Physical Activity","Rec Center Usage","Device Usage"\n';

      const querySnapshot = await getDocs(
        collection(FirestoreDB, 'registrationQuestions')
      );
      querySnapshot.forEach((doc: { id: any; data: () => any }) => {
        let line = '';
        line += '"' + doc.data().name + '",';
        line += '"' + doc.data().affiliation + '",';
        line += '"' + doc.data().email + '",';
        line += '"' + doc.data().distFromCamp + '",';
        line += '"' + doc.data().heardAboutFrom + '",';
        line += '"' + doc.data().hoursPhysical + '",';
        line += '"' + doc.data().minsPhysical + '",';
        line += '"' + doc.data().recCenterUse + '",';
        line += doc.data().device;
        str += line + '\r\n';
      });

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

    //report for post-survery
    if (postSurveyReportCheck) {
      console.log('Generating post survey report');

      let str =
        '"Walktober Feedback","Future Ideas","Hours Active Per Week","Minutes Active Per Day","Why Not Participate Again","Participation Opinion","Events Participated In","Rec Center Usage","Well-being"\n';

      const querySnapshot = await getDocs(
        collection(FirestoreDB, 'exitQuestions')
      );
      querySnapshot.forEach((doc: { id: any; data: () => any }) => {
        let line = '';
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

    //report for device usage
    if (devicesReportCheck) {
      console.log('Generating device usage report');

      // Hardcoded count, should probably give exit survey device question a variable to use
      const apple = query(
        collection(FirestoreDB, 'registrationQuestions'),
        where('device', '==', 'Apple Health')
      );
      const appleSnapshot = await getCountFromServer(apple);
      const aHealthCount = appleSnapshot.data().count;

      const google = query(
        collection(FirestoreDB, 'registrationQuestions'),
        where('device', '==', 'Google Fit')
      );
      const androidSnapshot = await getCountFromServer(google);
      const gFitCount = androidSnapshot.data().count;

      const samsung = query(
        collection(FirestoreDB, 'registrationQuestions'),
        where('device', '==', 'Samsung Health')
      );
      const samsungSnapshot = await getCountFromServer(samsung);
      const samsungCount = samsungSnapshot.data().count;

      const fitbit = query(
        collection(FirestoreDB, 'registrationQuestions'),
        where('device', '==', 'Fitbit')
      );
      const fitbitSnapshot = await getCountFromServer(fitbit);
      const fitbitCount = fitbitSnapshot.data().count;

      const garmin = query(
        collection(FirestoreDB, 'registrationQuestions'),
        where('device', '==', 'Garmin')
      );
      const garminSnapshot = await getCountFromServer(garmin);
      const garminCount = garminSnapshot.data().count;

      const other = query(
        collection(FirestoreDB, 'registrationQuestions'),
        where('device', '==', 'Other')
      );
      const otherSnapshot = await getCountFromServer(other);
      const otherCount = otherSnapshot.data().count;

      const none = query(
        collection(FirestoreDB, 'registrationQuestions'),
        where('device', '==', 'None')
      );
      const noneSnapshot = await getCountFromServer(none);
      const nCount = noneSnapshot.data().count;

      let str = '';
      str += '"Apple Health",' + aHealthCount + '\r\n';
      str += '"Google Fit",' + gFitCount + '\r\n';
      str += '"Samsung Health",' + samsungCount + '\r\n';
      str += '"Fitbit",' + fitbitCount + '\r\n';
      str += '"Garmin",' + garminCount + '\r\n';
      str += '"Other",' + otherCount + '\r\n';
      str += '"None",' + nCount + '\r\n';

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
  function reportDisplay() {
    if (isPlatform('desktop')) {
      return (
        <>
          <IonCol class="invis-grid-col">
            <IonButton
              onClick={() => setIsOpenReport(true)}
              class="admin-button"
              size={
                isPlatform('ios') || isPlatform('android') ? 'default' : 'large'
              }
              expand="block"
            >
              Generate Report
            </IonButton>
          </IonCol>
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
      <IonContent fullscreen class="admin-content">
        <IonGrid class="invis-grid">
          <IonRow></IonRow>
          <IonRow>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setIsOpenUser(true)}
                class="admin-button"
                size={
                  isPlatform('ios') || isPlatform('android')
                    ? 'default'
                    : 'large'
                }
                expand="block"
              >
                Event Settings
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setIsOpenTeam(true)}
                class="admin-button"
                size={
                  isPlatform('ios') || isPlatform('android')
                    ? 'default'
                    : 'large'
                }
                expand="block"
              >
                Team Settings
              </IonButton>
            </IonCol>
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => setOpenCreateTeam(true)}
                class="admin-button"
                size={
                  isPlatform('ios') || isPlatform('android')
                    ? 'default'
                    : 'large'
                }
                expand="block"
              >
                Create Open Team
              </IonButton>
            </IonCol>
            {reportDisplay()}
            <IonCol class="invis-grid-col">
              <IonButton
                onClick={() => goToAnnouncement()}
                class="admin-button"
                size={
                  isPlatform('ios') || isPlatform('android')
                    ? 'default'
                    : 'large'
                }
                expand="block"
              >
                Announcements
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonItem lines="none" class="transparent-item">
          {DisplayUsers(userLogs)}
        </IonItem>
        <IonItem lines="none" class="transparent-item"></IonItem>
        <IonItem lines="none" class="transparent-item">
          {DisplayTeams()}
        </IonItem>

        <IonModal isOpen={isOpenUser} backdropDismiss={false}>
          <IonHeader class="modal-header">
            <IonToolbar>
              <IonTitle class="modal-title">Event Settings: </IonTitle>
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
              <IonLabel>Set Registration Deadline: </IonLabel>
              <IonInput
                id="time"
                type="date"
                onInput={(event: any) => {
                  setNewRegistrationDeadline(
                    new Date(event.target.value).toISOString().slice(0, 10)
                  );
                }}
                value={adData.regDate.slice(0, 10)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Step Backlog Period: </IonLabel>
              <IonInput
                type="number"
                name="editDaysLimit"
                onIonChange={(e) =>
                  setNewEditingLimit(e.target.value as number)
                }
                placeholder={adData.priorLogDays.toString()}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event Start Date: </IonLabel>
              <IonInput
                id="time"
                type="date"
                onInput={(event: any) => {
                  setNewStart(
                    new Date(event.target.value).toISOString().slice(0, 10)
                  );
                }}
                value={adData.startDate.slice(0, 10)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event End Date: </IonLabel>
              <IonInput
                id="time"
                type="date"
                onInput={(event: any) => {
                  setNewEnd(
                    new Date(event.target.value).toISOString().slice(0, 10)
                  );
                }}
                value={adData.endDate.slice(0, 10)}
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
              <IonLabel>Minimum Team Size: </IonLabel>
              <IonInput
                type="number"
                name="minTeamSize"
                onIonChange={(e) => setNewMinTeamSize(e.target.value as number)}
                placeholder={adData.minSize.toString()}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Maxiumum Team Size: </IonLabel>
              <IonInput
                type="number"
                name="maxTeamSize"
                onIonChange={(e) => setNewMaxTeamSize(e.target.value as number)}
                placeholder={adData.maxSize.toString()}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Set Team Deadline: </IonLabel>
              <IonInput
                id="time"
                type="date"
                onInput={(event: any) => {
                  setNewTeamCreationDate(
                    new Date(event.target.value).toISOString().slice(0, 10)
                  );
                }}
                value={adData.teamDate.slice(0, 10)}
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
            <IonButton
              class="modal-button"
              size="large"
              expand="block"
              onClick={sendNewOpenTeam}
            >
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
            <IonLabel class="light-bg">Select Reports to Generate</IonLabel>
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
                  onIonChange={(e) => setpreSurveyReportCheck(e.detail.checked)}
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
