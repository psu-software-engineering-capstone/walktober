import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonSpinner, IonTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './LeaderBoardChart.scss';
import { Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { TeamData } from '../../pages/sampleData';

import { collection, getDocs } from 'firebase/firestore';
import { FirestoreDB } from '../../firebase';

ChartJS.register(...registerables);

interface Data {
  name: string;
  profile_pic?: string;
  totalStep?: number;
  avg_steps?: number;
}

const LeaderBoardChart: React.FC = () => {
  const [data, setData] = useState(Array<Data>);
  const [loading, setLoading] = useState(false);
  let dataType = 'individual';

  //Formats the chart to use user/team names as the labels, and graphs the steps taken by each team/user.
  const chartData = {
    labels: data.map((row) => row.name),
    datasets: [
      {
        minBarLength: 5,
        label: 'Steps',
        data: data.map((col) =>
          col.totalStep ? col.totalStep : col.avg_steps
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
      const imgSize = chartOptions.layout.padding.left - chartOptions.layout.padding.right;

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

  //ajusts the size of the element containing the chart in order to correctly size the chart.
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

  //gets the data from the db for users or teams, sorts them based on highest to lowest steps, and sets the data
  async function getData(dataType: string) {
    setLoading(true);
    const indData: Array<Data> = [];
    if (dataType == 'individual') {
      const querySnapshot = await getDocs(collection(FirestoreDB, 'users'));
      querySnapshot.forEach((doc: any) => {
        //console.log(doc.id, ' => ', doc.data());
        const person: Data = {
          name: doc.data().name as string,
          profile_pic: doc.data().profile_pic as string,
          totalStep: doc.data().totalStep as number
        };
        indData.push(person);
      });
      setData(
        indData.sort((a: any, b: any) => (a.totalStep > b.totalStep ? -1 : 1))
      );
      boxAjust(indData.length);
    }
    if (dataType == 'teams') {
      /*
      needs firebase calls here for teams instead of the sample data
      const querySnapshot = await getDocs(collection(FirestoreDB, 'users'));
      querySnapshot.forEach((doc: any) => {
        //console.log(doc.id, ' => ', doc.data());
        const person: Data = {
          name: doc.data().name as string,
          profile_pic: doc.data().profile_pic as string,
          totalStep: doc.data().totalStep as number
        };
        indData.push(person);
      */
      setData(
        TeamData.sort((a: any, b: any) => (a.avg_steps > b.avg_steps ? -1 : 1))
      );
      boxAjust(TeamData.length);
    }
    //need to find way to not hardcode time
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }

  useEffect(() => {
    getData(dataType); //go into the firestore and get all the users' names, pictures, and then totalStep
  }, []);

  return (
    <IonCard>
      <IonCardContent>
      <div className='leaderboard-container'>
        <IonHeader className='title'>
          <IonTitle>Leaderboard</IonTitle></IonHeader>
        <div className='button-container'>
          <IonButton
            onClick={() => {
              dataType = 'individual';
              getData(dataType);
            }}
            disabled={loading}
          >
            Individual
          </IonButton>
          <IonButton
            onClick={() => {
              dataType = 'teams';
              getData(dataType);
            }}
            disabled={loading}
          >
            Teams
          </IonButton>
        </div>
        <IonContent className='box'>
          {loading ? (
            <IonSpinner className='spinner'/>
          ) : (
            <Bar
              data={chartData}
              options={chartOptions}
              plugins={[imgItems, ChartDataLabels]}
            ></Bar>
          )}
        </IonContent>
      </div>
    </IonCardContent>
    </IonCard>
  );
};

export default LeaderBoardChart;
