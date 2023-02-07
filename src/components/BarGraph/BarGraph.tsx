import { IonCard, IonCardHeader, IonContent } from '@ionic/react';
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
      element:{
        pointStyle: 'circle'
      },
      layout: {
      },
      scales: {
        x: {
          title:{
            display: true,
          },
          grid:{
            offset: false, 
            display: false
          },
          ticks: {
          autoSkip: false,
          }
          },
        y: {
          title:{
            display: false,
          },
          offset: true,
          grid:{
            display: false
          },
          ticks: {
            autoSkip: false,
          }
        }
      }
  };
  const boxAjust = () => {
    const box = document.querySelector('.box');
    if(box != null){
      box.setAttribute('style', 'height: 1000px');
      if(chartData.labels.length > 7) {
        const newHeight = 500 + ((chartData.labels.length - 7)* 20);
        box.setAttribute('style', 'height: '+ newHeight.toString()+'px');
      }
    }
  };
  useEffect(() => {
    boxAjust();
  },[]);
  

  return (
    <IonContent class='box'>
      <Bar data={chartData}  options={chartOptions}></Bar>
    </IonContent>
  );
  
};

export default BarGraph;
