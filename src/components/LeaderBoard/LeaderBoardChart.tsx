import { IonContent, IonHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './LeaderBoardChart.scss';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
//import { People } from '../../utils';
//import { IndividualData } from '../../pages/SampleData';
import { collection, getDocs } from 'firebase/firestore';
import { FirestoreDB } from '../../firebase';

ChartJS.register(...registerables);

interface Data {
  name: string;
  profile_pic: string;
  totalStep: number;
  // team_id: number;
  // name: string;
  // steps: number;
}

const LeaderBoardChart: React.FC = () => {
  const [data, setData] = useState(Array<Data>);

  const chartData = {
    /*Sorts the data of all users by the amount of steps taken. Labels formed from the names
     * of the user, and the bars are the number of steps the user took
     */
    labels: data
      .sort((a: any, b: any) => (a.totalStep > b.totalStep ? -1 : 1))
      .map((row) => row.name),
    datasets: [
      {
        label: 'Steps',
        data: data
          .sort((a: any, b: any) => (a.totalStep > b.totalStep ? -1 : 1))
          .map((col) => col.totalStep)
      }
    ]
  };
  const chartOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responive: true,
    scaleShowValues: true,
    layout: {},
    elements: {
      borderWidth: 2
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
          display: false,
          stepSize: 500
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
          align: 'center'
        }
      }
    }
  };
  const boxAjust = () => {
    const box = document.querySelector('.box');
    if (box != null) {
      box.setAttribute('style', 'height: 1000px');
      if (chartData.labels.length > 10) {
        const newHeight = 500 + (chartData.labels.length - 10) * 50;
        box.setAttribute('style', 'height: ' + newHeight.toString() + 'px');
      }
    }
  };

  async function getData() {
    const indData: Array<Data> = [];
    const querySnapshot = await getDocs(collection(FirestoreDB, 'users'));
    querySnapshot.forEach((doc: any) => {
      console.log(doc.id, ' => ', doc.data());
      const person: Data = {
        name: doc.data().name as string,
        profile_pic: doc.data().profile_pic as string,
        totalStep: doc.data().totalStep as number
      };
      indData.push(person);
    });
    setData(indData);
  }

  useEffect(() => {
    getData(); //go into the firestore and get all the users' names, pictures, and then totalStep
    boxAjust();
  }, []);

  return (
    <IonContent>
      <IonHeader>LeaderBoard</IonHeader>
      <IonContent class="box">
        <Bar data={chartData} options={chartOptions}></Bar>
      </IonContent>
    </IonContent>
  );
};

export default LeaderBoardChart;
