import { IonButton, IonContent, IonHeader, IonSpinner } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './LeaderBoardChart.scss';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
//import { People } from '../../utils';
import { IndividualData, TeamData } from '../../pages/SampleData';
import placeholder from '../../assets/placeholder.png';

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
  /*Sorts the data of all users by the amount of steps taken. Labels formed from the names
   * of the user, and the bars are the number of steps the user took
   */

  const chartData = {
    labels: data.map((row) => row.name),
    datasets: [
      {
        label: 'Steps',
        data: data.map((col) =>
          col.totalStep ? col.totalStep : col.avg_steps
        ),
        image: data.map((col) => (col.profile_pic ? col.profile_pic : null))
      }
    ]
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
      const imgSize = chartOptions.layout.padding.left;

      data.datasets[0].image.forEach((imageLink: string, index: number) => {
        const profilePic = new Image();
        profilePic.src = placeholder;
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
        left: 30
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
  const boxAjust = (labelLength: number) => {
    const box = document.querySelector('.box');
    console.log('ran');
    if (box != null) {
      box.setAttribute('style', 'height: 500px');
      console.log('test');
      if (labelLength > 10) {
        const newHeight = 500 + (labelLength - 10) * 50;
        box.setAttribute('style', 'height: ' + newHeight.toString() + 'px');
        console.log('ran' + newHeight);
      }
    }
  };

  const teamsChart = () => {
    setLoading(true);
    setData(
      TeamData.sort((a: any, b: any) => (a.avg_steps > b.avg_steps ? -1 : 1))
    );
    boxAjust(TeamData.length);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const individualsChart = () => {
    setLoading(true);
    setData(
      IndividualData.sort((a: any, b: any) =>
        a.totalStep > b.totalStep ? -1 : 1
      )
    );
    boxAjust(IndividualData.length);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (data.length == 0) {
      individualsChart();
    }
  }, []);

  return (
    <IonContent>
      <IonHeader>LeaderBoard</IonHeader>

      <IonButton onClick={individualsChart} disabled={loading}>
        Individual
      </IonButton>
      <IonButton onClick={teamsChart} disabled={loading}>
        Teams
      </IonButton>
      <IonContent class="box">
        {loading ? (
          <IonSpinner />
        ) : (
          <Bar
            data={chartData}
            options={chartOptions}
            plugins={[imgItems]}
          ></Bar>
        )}
      </IonContent>
    </IonContent>
  );
};

export default LeaderBoardChart;
