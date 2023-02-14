import { IonContent, IonHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './LeaderBoardChart.scss';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
//import { People } from '../../utils';
import { IndividualData } from '../../pages/SampleData';
import placeholder from '../../assets/placeholder.png';

ChartJS.register(...registerables);

interface Data{
  name: string;
  profile_pic: string;
  totalStep: number;
  // team_id: number;
  // name: string;
  // steps: number;
}

const LeaderBoardChart: React.FC = () => {
  const [data, setData] = useState(Array<Data>);

  const chartData = ({
    /*Sorts the data of all users by the amount of steps taken. Labels formed from the names
     * of the user, and the bars are the number of steps the user took
     */
    labels: data.map((row) => row.name),
    datasets: [
      {
        label: 'Steps',
        data: data.map((col) => col.totalStep),
        image: data.map((col) => col.profile_pic)
      }
    ]
  });

  const imgItems = {
    id: 'imgItems',
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx, data, scales: {x,y} } = chart;

      ctx.save();
      const imgSize = chartOptions.layout.padding.left;
      
      data.datasets[0].image.forEach((imageLink: string, index: number) => {
        const profilePic = new Image();
        profilePic.src = placeholder;
        ctx.drawImage(profilePic, 0, y.getPixelForValue(index) - (imgSize / 2), imgSize, imgSize);
      });
      
      
      }
  };
  const chartOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responive: true,
    scaleShowValues: true,
    elements: {
      borderWidth: 1
    },
    layout:{
      padding: {
        left: 30,
      },
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
  useEffect(() => {
    setData(IndividualData.sort((a: any, b: any) => (a.totalStep > b.totalStep ? -1 : 1)));
    boxAjust();
  }, []);

  return (
    <IonContent>
      <IonHeader>LeaderBoard</IonHeader>
      <IonContent class="box">
        <Bar data={chartData} options={chartOptions} plugins={[imgItems]}></Bar>
      </IonContent>
    </IonContent>
  );
};

export default LeaderBoardChart;
