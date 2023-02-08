import { IonContent, IonHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './BarGraph.scss';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { People } from '../../utils';

ChartJS.register(...registerables);

const BarGraph: React.FC = () => {
  const [chartData, setChartData] = useState({
    /*Sorts the data of all users by the amount of steps taken. Labels formed from the names
     * of the user, and the bars are the number of steps the user took
     */
    labels: People.sort((a: any, b: any) => (a.steps > b.steps ? -1 : 1)).map(
      (row) => row.name
    ),
    datasets: [
      {
        label: 'Steps',
        data: People.sort((a: any, b: any) => (a.steps > b.steps ? -1 : 1)).map(
          (row) => row.steps
        )
      }
    ]
  });

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
      if (chartData.labels.length > 7) {
        const newHeight = 500 + (chartData.labels.length - 7) * 20;
        box.setAttribute('style', 'height: ' + newHeight.toString() + 'px');
      }
    }
  };
  useEffect(() => {
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

export default BarGraph;
