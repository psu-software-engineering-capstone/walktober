import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonTitle
} from '@ionic/react';
import { getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { auth, FirestoreDB, storage } from '../../firebase';
import { Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import './teamHome.scss';
import { updateDoc } from 'firebase/firestore';

ChartJS.register(...registerables);

const TeamHome: React.FC = () => {
  interface memberData {
    name: string;
    email: string;
    profile_pic: string;
    totalStep: number;
  }

  const [data, setMemDat] = useState(Array<memberData>);
  const [groupName, setGroup] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [teamReference, setTeamRef] = useState('');
  const [leadStat, setLeader] = useState(false);
  const [photo, setPhoto] = useState<any>(null);
  const history = useHistory();

  const chartData = {
    /*Sorts the data of all users by the amount of steps taken. Labels formed from the names
     * of the user, and the bars are the number of steps the user took
     */
    labels: data.map((row) => row.name),
    datasets: [
      {
        label: 'Steps',
        data: data
          .map((col) => col.totalStep),
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
    const groupData: Array<memberData> = [];
    const currentUserRef = doc(
      //make a reference to the user document
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    const userSnap = await getDoc(currentUserRef); //get user document
    const userData = userSnap.data(); //get all the data of the user
    const teamName = userData.team; //get the team name
    if (teamName === '') {
      history.push('/app/team/join');
    }
    setGroup(teamName);
    setLeader(userData.team_leader);
    const teamRef = doc(FirestoreDB, 'teams', teamName); //reference team document
    setTeamRef(teamRef);
    const teamSnapshot = await getDoc(teamRef); //grab all the team document
    const teamData = teamSnapshot.data(); //get team data
    setProfilePic(teamData.profile_pic);
    const teammates: Array<string> = teamData.members; //get the teammembers
    for (let i = 0; i < teammates.length; i++) {
      const memberRef = doc(FirestoreDB, 'users', teammates[i]); //reference member
      const memSnapshot = await getDoc(memberRef); //get their doc
      const personalData = memSnapshot.data(); //get data
      const tempMember: memberData = {
        name: personalData.name,
        email: personalData.email,
        profile_pic: personalData.profile_pic,
        totalStep: personalData.totalStep
      };
      groupData.push(tempMember); //send to array
    }
    console.log(groupData);
    setMemDat(groupData.sort((a: any, b: any) => (a.totalStep > b.totalStep ? -1 : 1))); //set variable to the contents of the array
    boxAjust(groupData.length);
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
        history.go(0); //refresh page
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  function changePicture() {
    if(leadStat === true){
      return(
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle> {groupName} </IonTitle>
        </NavBar>
      </IonHeader>
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
              <Bar data={chartData} options={chartOptions} plugins={[imgItems, ChartDataLabels]}></Bar>
            </IonContent>
          </IonContent>
        </IonCol>
        <IonCol sizeLg="8">
          <IonItem>
            <IonImg
              className="profile_pic"
              src={profilePic}
              alt="Profile picture for the team the user is a part of"
            > </IonImg> 
          </IonItem>
          <IonItem> {groupName} Profile Picture </IonItem>
          <IonItem> {changePicture()} </IonItem>

          <IonItem>{DisplayTeams(data)}</IonItem>
        </IonCol>
      </IonRow>
    </IonPage>
  );
};

export default TeamHome;
