import {
  IonCard,
  IonCardContent,
  IonButton,
  IonCardHeader,
  IonSpinner,
  IonCardTitle
} from '@ionic/react';
import React, { useContext, useEffect, useState, useRef } from 'react';
import './LeaderBoardChart.scss';
import { Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AdminContext from '../../store/admin-context';
import { Bar } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { auth, FirestoreDB } from '../../firebase';

ChartJS.register(...registerables);

interface Data {
  name: string;
  profile_pic?: string;
  totalStep?: number;
  avg_steps?: number;
  highlight: boolean;
}

const LeaderBoardChart: React.FC = () => {
  const [data, setData] = useState(Array<Data>);
  const [indData, setIndData] = useState(Array<Data>);
  const [teamData, setTeamData] = useState(Array<Data>);
  const [dataType, setDataType] = useState('');
  const adData = useContext(AdminContext);
  const contentRef = useRef<HTMLIonCardElement | null>(null);
  const chartHeightMultiplier = 60;
  
  //Formats the chart to use user/team names as the labels, and graphs the steps taken by each team/user.
  const chartData = {
    labels: data.map((row) => row.name.split(' ')),
    datasets: [
      {
        minBarLength: 5,
        label: 'Steps',
        data: data.map((col) =>
          col.totalStep ? col.totalStep : col.avg_steps
        ),
        backgroundColor: data.map((col) =>
          col.highlight ? 'rgba(226, 127, 38, 1)' : 'rgba(152, 161, 64, 1)'
        ),
        image: data.map((col) => (col.profile_pic ? col.profile_pic : null))
      }
    ]
  };

  //adds image of users or team to the chart next to the user's/team's name
  const imgItems = {
    id: 'imgItems',
    beforeDatasetsDraw(chart: any) {
      const {
        ctx,
        data,
        scales: { y }
      } = chart;

      ctx.save();
      const imgSize = chartOptions.layout.padding.left / 2;

      data.datasets[0].image.forEach((imageLink: string, index: number) => {
        const profilePic = new Image();
        const place = (index + 1).toString() + ordinalNumbers(index + 1);
        profilePic.src = imageLink;

        //sets the stylingfor the place of users, '1st, 2nd, 3rd ect.'
        ctx.font = 'bold 15px Helvetica';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = ChartJS.defaults.color;

        //draws the numbers for each place
        ctx.fillText(
          place,
          0,
          y.getPixelForValue(index) + imgSize / 2 / 2,
          imgSize - 5
        );

        //draws the image of the user's profile picture
        ctx.drawImage(
          profilePic,
          imgSize,
          y.getPixelForValue(index) - imgSize / 2,
          imgSize,
          imgSize
        );
      });
    }
  };

  //Changes the apearance of the chart
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
        left: 90,
        right: 10
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: ChartJS.defaults.color,
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
        position: 'left',
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
          },
          stepSize: 50000,
          max: chartData.datasets[0].data
        }
      }
    }
  };

  //ajusts the size of the element containing the chart in order to correctly size the chart.
  const boxAdjust = (labelLength: number) => {
    const box = document.querySelector('.box');
    if (box != null) {
      const newHeight = labelLength * chartHeightMultiplier;
      box.setAttribute('style', 'height: ' + newHeight.toString() + 'px');
    }
  };

  //gives leaderboard placement numbers a suffix
  const ordinalNumbers = (n: number) => {
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  };
  //gets the index to calculate the scoll distance needed to bring the user into view
  const scrollToUser = () => {
    const content = contentRef.current;
    let y = 0;
    data.every((member: any) => {
      if (!member.highlight) {
        y += 1;
        return true;
      } else {
        return false;
      }
    });
    if (content) {
      content.scrollTop = (y+2) * chartHeightMultiplier;
    }
  };

  async function setChartData() {
    const indData: Array<Data> = [];
    const teamData: Array<Data> = [];
    const querySnapshot = await getDocs(collection(FirestoreDB, 'users'));
    querySnapshot.forEach((doc: any) => {
      const person: Data = {
        name: doc.data().name as string,
        profile_pic: doc.data().profile_pic as string,
        totalStep: doc.data().totalStep as number,
        highlight:
          auth.currentUser.email == doc.data().email
            ? (true as boolean)
            : (false as boolean)
      };
      indData.push(person);
    });
    setIndData(
      indData.sort((a: any, b: any) => (a.totalStep > b.totalStep ? -1 : 1))
    );
    const teamquerySnapshot = await getDocs(collection(FirestoreDB, 'teams'));
    teamquerySnapshot.forEach((doc: any) => {
      const team: Data = {
        name: doc.data().name as string,
        profile_pic: doc.data().profile_pic as string,
        avg_steps: doc.data().avg_steps as number,
        highlight: false as boolean
      };
      const teamMembers = doc.data().members;
      teamMembers.forEach((member: string) => {
        if (auth.currentUser.email == member) team.highlight = true;
      });
      const today = new Date();
      const deadline = new Date(adData.teamDate);
      if (deadline < today) {
        const membersLength = doc.data().members.length;
        if (adData.minSize <= membersLength) {
          teamData.push(team);
        }
      } else {
        teamData.push(team);
      }
      setTeamData(
        teamData.sort((a: any, b: any) => (a.avg_steps > b.avg_steps ? -1 : 1))
      );
    });
  }

  //gets the data from the db for users or teams, sorts them based on highest to lowest steps, and sets the data
  const getChartData = () => {
    if (dataType == 'individual') {
      setData(indData);
      console.log(indData);
      boxAdjust(indData.length);
    }
    if (dataType == 'teams') {
      setData(teamData);
      boxAdjust(teamData.length);
    }
  };

  useEffect(() => {
    setChartData();
    setDataType('individual');
  },[]);
  //do not add data as a redux or you will end up with an infinite loop
  useEffect(() => {
    getChartData(); //go into the firestore and get all the users' names, pictures, and then totalStep
  }, [dataType, indData]);

  useEffect(() => {
    scrollToUser();
  }, [data]);

  return (
    <IonCard className="leaderboard-container" ref={contentRef}>
      <IonCardHeader className="title">
        <IonCardTitle>Leaderboard</IonCardTitle>
      </IonCardHeader>
      <div className="button-container">
        <IonButton
          onClick={() => {
            setDataType('individual');
          }}
        >
          Individual
        </IonButton>
        <IonButton
          onClick={() => {
            setDataType('teams');
          }}
        >
          Teams
        </IonButton>
      </div>
      <IonCardContent className="box">
          <Bar
            data={chartData}
            options={chartOptions}
            plugins={[imgItems, ChartDataLabels]}
          ></Bar>
      </IonCardContent>
    </IonCard>
  );
};

export default LeaderBoardChart;
