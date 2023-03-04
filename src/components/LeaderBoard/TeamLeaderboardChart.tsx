import { IonContent, IonHeader, IonTitle } from '@ionic/react';
import React, { useEffect } from 'react';
import './LeaderBoardChart.scss';
import { Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

interface Data {
  name: string;
  email: string;
  profile_pic?: string;
  totalStep?: number;
}

const TeamLeaderBoardChart: React.FC<{ data: Array<Data> }> = ({ data }) => {
  //Formats the chart to use user/team names as the labels, and graphs the steps taken by each team/user.
  const chartData = {
    labels: data.map((row) => row.name),
    datasets: [
      {
        minBarLength: 5,
        label: 'Steps',
        data: data.map((col) => col.totalStep),
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
      }
    }
  };

  //gives leaderboard placement numbers a suffix
  const ordinalNumbers = (n: number) => {
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  };

  //ajusts the size of the element containing the chart in order to correctly size the chart.
  const boxAdjust = (labelLength: number) => {
    const box = document.querySelector('.box-team-leaderboard');
    if (box != null) {
      const newHeight = labelLength * 60;
      box.setAttribute('style', 'height: ' + newHeight.toString() + 'px');
    }
  };

  useEffect(() => {
    boxAdjust(data.length);
  }, [data]);

  return (
    <IonContent>
      <div className="leaderboard-container">
        <IonHeader className="title">
          <IonTitle>Leaderboard</IonTitle>
        </IonHeader>
        <IonContent className="box-team-leaderboard">
          <Bar
            data={chartData}
            options={chartOptions}
            plugins={[imgItems, ChartDataLabels]}
          ></Bar>
        </IonContent>
      </div>
    </IonContent>
  );
};

export default TeamLeaderBoardChart;
