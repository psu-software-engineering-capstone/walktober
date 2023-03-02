import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  RefresherEventDetail
} from '@ionic/react';
import { getDoc, doc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { auth, FirestoreDB, storage } from '../../firebase';
import { Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import './teamHome.scss';
import { updateDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import AuthContext from '../../store/auth-context';

ChartJS.register(...registerables);

const TeamHome: React.FC = () => {
  interface memberData {
    name: string;
    email: string;
    profile_pic: string;
    totalStep: number;
  }

  const [data, setMemDat] = useState(Array<memberData>);
  const [teammates, setMates] = useState(Array<string>);
  const [groupName, setGroup] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [userReference, setUserRef] = useState('');
  const [teamReference, setTeamRef] = useState('');
  const [leadStat, setLeader] = useState(false);
  const [photo, setPhoto] = useState<any>(null);
  const [userTotStep, setUserTotStep] = useState(0);
  const [teamSteps, setTeamSteps] = useState(0);
  const history = useHistory();

  const ctx = useContext(AuthContext);

  const chartData = {
    /*Sorts the data of all users by the amount of steps taken. Labels formed from the names
     * of the user, and the bars are the number of steps the user took
     */
    labels: data.map((row) => row.name),
    datasets: [
      {
        label: 'Steps',
        data: data.map((col) => col.totalStep),
        image: data.map((col) => (col.profile_pic ? col.profile_pic : null))
      }
    ]
  };

  const chartOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responive: true,
    scaleShowValues: true,
    elements: {
      borderWidth: 1
    },
    layout: {
      padding: {
        left: 50,
        right: 10
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: 'grey',
        labels: {
          title: {
            font: {
              weight: 'bold'
            }
          }
        },
        anchor: 'end',
        align: 0,
        formatter: function (value: number) {
          if (value != null) {
            if (value < 10000) return value;
            if (value >= 455000) return 465 + 'k';
            return Math.round(value / 1000) + 'k';
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: false
        },
        offset: false,
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          autoSkip: false,
          display: false
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: false
        },
        offset: true,
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          autoSkip: false,
          align: 'center',
          font: {
            size: 15
          }
        }
      }
    }
  };

  const imgItems = {
    id: 'imgItems',
    beforeDatasetsDraw(chart: any) {
      const {
        ctx,
        data,
        scales: { y }
      } = chart;

      ctx.save();
      const imgSize =
        chartOptions.layout.padding.left - chartOptions.layout.padding.right;

      data.datasets[0].image.forEach((imageLink: string, index: number) => {
        const profilePic = new Image();
        profilePic.src = imageLink;
        ctx.drawImage(
          profilePic,
          0,
          y.getPixelForValue(index) - imgSize / 2,
          imgSize,
          imgSize
        );
      });
    }
  };

  const boxAjust = (labelLength: number) => {
    const box = document.querySelector('.box');
    if (box != null) {
      box.setAttribute('style', 'height: 500px');
      if (labelLength > 10) {
        const newHeight = 600 + (labelLength - 10) * 50;
        box.setAttribute('style', 'height: ' + newHeight.toString() + 'px');
      }
    }
  };

  const DisplayTeams = (teams: memberData[]): any => {
    if (teams.length > 0) {
      return (
        <>
          <IonGrid fixed={true}>
            <IonRow class="top">
              <IonCol
                sizeSm="12"
                sizeLg="8"
                sizeMd="6"
                sizeXs="12"
                align-self-center="true"
                class="header-col admin-col"
              >
                Teammates
              </IonCol>
            </IonRow>
            <IonRow class="header-row">
              <IonCol sizeMd="4" size="5" class="header-col admin-col">
                Members Name
              </IonCol>
              <IonCol sizeMd="4" size="5" class="header-col admin-col">
                Members email
              </IonCol>
            </IonRow>
            {teams.map((item: { name: string; email: string }) => (
              <IonRow key={Math.random()}>
                <IonCol sizeMd="4" size="5" class="admin-col">
                  {item.name}
                </IonCol>
                <IonCol sizeMd="4" size="5" class="admin-col">
                  {item.email}
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </>
      );
    }
  };

  async function getData() {
    if (ctx.team === '') {
      history.push('/app/team/join'); // if the user is not in a team, redirect them to the team join page
      return;
    }
    const groupData: Array<memberData> = [];
    const mates: Array<string> = [];
    const currentUserRef = doc( // reference the current user document
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    setUserRef(currentUserRef);
    const userSnap = await getDoc(currentUserRef); // grab the user document
    const userData = userSnap.data(); // get the user data
    const teamName = userData.team; // get the team name
    setUserTotStep(userData.totalStep);
    setGroup(teamName);
    setLeader(userData.team_leader);
    const teamRef = doc(FirestoreDB, 'teams', teamName); // reference team document
    setTeamRef(teamRef);
    const teamSnapshot = await getDoc(teamRef); // grab the team document
    const teamData = teamSnapshot.data(); // get the team data
    setProfilePic(teamData.profile_pic);
    setTeamSteps(teamData.totalStep);
    const teammates: Array<string> = teamData.members; // get the teammembers
    for (let i = 0; i < teammates.length; i++) {
      const memberRef = doc(FirestoreDB, 'users', teammates[i]); // reference the member
      const memSnapshot = await getDoc(memberRef); // get their doc
      const personalData = memSnapshot.data(); // get their data
      const tempMember: memberData = { // create a temp member object
        name: personalData.name,
        email: personalData.email,
        profile_pic: personalData.profile_pic,
        totalStep: personalData.totalStep
      };
      mates.push(tempMember.email); // add to mates array
      groupData.push(tempMember); // add to group data array
    }
    setMemDat(groupData.sort((a: any, b: any) => (a.totalStep > b.totalStep ? -1 : 1))); // sort the array
    boxAjust(groupData.length); // adjust the box size
    setMates(mates); // set the mates array
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const imageRef = ref(storage, groupName + '.png');
    await uploadBytes(imageRef, photo);
    const photoURL = await getDownloadURL(imageRef);
    await updateDoc(teamReference, { profile_pic: photoURL })
      .then(() => {
        alert('Team profile picture updated!');
        setProfilePic(photoURL); // Refresh data
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  function changePicture() {
    if (leadStat === true) {
      return (
        <>
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
            <IonButton onClick={handleSubmit}>Change Team Picture</IonButton>
          </IonItem>
        </>
      );
    }
  }

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getData(); // Refresh data
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // leave team
  async function leaveTeam() {
    const newTotalStep = teamSteps - userTotStep; //new total step for team
    const newAvg = newTotalStep / (teammates.length - 1); //new average step for team
    const newMembers: Array<string> = []; //array for members field
    // set new members array
    for (let i = 0; i < teammates.length; i++) {
      if (teammates[i] !== auth.currentUser.email) {
        newMembers.push(teammates[i]);
      }
    }
    // if the user is the leader
    if (leadStat === true) {
      // if the user is the only member of the team
      if (teammates.length === 1) {
        await deleteDoc(doc(FirestoreDB, 'teams', groupName)) // delete the team document
          .then(() => {
            console.log('Team deleted');
          })
          .catch((error: any) => {
            console.log(error);
          });
        await updateDoc(userReference, { // update the user document
          team_leader: false,
          team: ''
        });
        // if the user is not the only member of the team
      } else {
        const newLead = teammates[1]; // get the new team leader
        await updateDoc(teamReference, { // update the team document
          leader: newLead,
          totalStep: newTotalStep,
          avg_steps: newAvg,
          members: newMembers
        });
        await updateDoc(userReference, { // update the user document
          team_leader: false,
          team: ''
        });
        const otherUserRef = doc(
          FirestoreDB,
          'users',
          newLead as string
        );
        await updateDoc(otherUserRef, { team_leader: true }); // update the new team leader document
      }
      // if the user is not the leader
    } else {
      await updateDoc(teamReference, { // update the team document
        totalStep: newTotalStep,
        avg_steps: newAvg,
        members: newMembers
      });
      await updateDoc(userReference, { // update the user document
        team_leader: false,
        team: ''
      });
    }
    history.push('/app/team/join'); // redirect to join team page
  }

  // update the data when the page loads
  // update the data when the team gets updated
  useEffect(() => {
    if (ctx.team !== '') {
      const unsubscribe = onSnapshot(doc(FirestoreDB, 'teams', ctx.team), (doc: any) => {
        if (doc.data() !== undefined) {
          console.log('Team data: ', doc.data());
          getData();
        }
      });
      return unsubscribe;
    }
  }, [ctx.team]);

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle> {groupName} </IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol
            className="boxSize"
            sizeSm="12"
            sizeLg="4"
            sizeMd="6"
            sizeXs="12"
          >
            <IonContent>
              <IonHeader> Team Leaderboard </IonHeader>
              <IonContent class="box">
                <Bar
                  data={chartData}
                  options={chartOptions}
                  plugins={[imgItems, ChartDataLabels]}
                ></Bar>
              </IonContent>
            </IonContent>
          </IonCol>
          <IonCol sizeLg="8">
            <IonItem>
              <IonImg
                className="profile_pic"
                src={profilePic}
                alt="Profile picture for the team the user is a part of"
              >
                {' '}
              </IonImg>
            </IonItem>
            <IonItem> {groupName} Profile Picture </IonItem>
            <IonItem> {changePicture()} </IonItem>
            <IonItem>
              <IonButton onClick={leaveTeam}> Leave team </IonButton>{' '}
            </IonItem>
            <IonItem>{DisplayTeams(data)}</IonItem>
          </IonCol>
        </IonRow>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default TeamHome;
