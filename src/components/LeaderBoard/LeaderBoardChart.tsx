import {
  IonButton,
  IonContent,
  IonHeader,
  IonSpinner,
  IonTitle
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './LeaderBoardChart.scss';
import { Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
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
      const imgSize = (chartOptions.layout.padding.left / 2);

      data.datasets[0].image.forEach((imageLink: string, index: number) => {
        const profilePic = new Image();
        const place = (index + 1).toString() + ordinalNumbers(index +1);
        profilePic.src = imageLink;

        //sets the stylingfor the place of users, '1st, 2nd, 3rd ect.'
        ctx.font = 'bold 15px Helvetica';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = ChartJS.defaults.color;

        //draws the numbers for each place
        ctx.fillText(
          place,
          0,
          y.getPixelForValue(index) + (imgSize / 2)/2,
          imgSize -5
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
      },
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
      },
    }
  };

  //ajusts the size of the element containing the chart in order to correctly size the chart.
  const boxAjust = (labelLength: number) => {
    const box = document.querySelector('.box');
    if (box != null) {
        const newHeight = labelLength * 60;
        box.setAttribute('style', 'height: ' + newHeight.toString() + 'px');
      }
  };

  //gives leaderboard placement numbers a suffix
  const ordinalNumbers = (n: number) => {
    return n > 0 ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]: "";
  };

  //gets the data from the db for users or teams, sorts them based on highest to lowest steps, and sets the data
  async function getData(dataType: string) {
    setLoading(true);
    const indData: Array<Data> = [];
    if (dataType == 'individual') {
      const querySnapshot = await getDocs(collection(FirestoreDB, 'users'));
      querySnapshot.forEach((doc: any) => {
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
    }
    if (dataType == 'teams') {
      const querySnapshot = await getDocs(collection(FirestoreDB, 'teams'));
      querySnapshot.forEach((doc: any) => {
        const person: Data = {
          name: doc.data().name as string,
          profile_pic: doc.data().profile_pic as string,
          avg_steps: doc.data().avg_steps as number
        };
        indData.push(person);
      });
      setData(
        indData.sort((a: any, b: any) => (a.avg_steps > b.avg_steps ? -1 : 1))
      );
    }
    boxAjust(indData.length);
    //need to find way to not hardcode time
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }

  useEffect(() => {
    getData(dataType); //go into the firestore and get all the users' names, pictures, and then totalStep
  }, []);

  return (
    <IonContent>
      <div className="leaderboard-container">
        <IonHeader className="title">
          <IonTitle>Leaderboard</IonTitle>
        </IonHeader>
        <div className="button-container">
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
        <IonContent className="box">
          {loading ? (
            <IonSpinner className="spinner" />
          ) : (
            <Bar
              data={chartData}
              options={chartOptions}
              plugins={[imgItems, ChartDataLabels]}
            ></Bar>
          )}
        </IonContent>
      </div>
    </IonContent>
  );
};

export default LeaderBoardChart;
