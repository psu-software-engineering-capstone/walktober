import { IonCard, IonCardContent, IonCardHeader, IonContent } from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./BarGraph.scss";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { People } from "../../utils";

ChartJS.register(...registerables);

const BarGraph: React.FC = () => {
  /**
   *
   */
  const [chartData, setChartData] = useState({
    labels: People.sort((a: any, b: any) => (a.steps > b.steps ? -1 : 1)).map(
      (row) => row.name
    ),
    datasets: [
      {
        label: "Steps",
        data: People.sort((a: any, b: any) => (a.steps > b.steps ? -1 : 1)).map(
          (row) => row.steps
        ),
      },
    ],
  });

  return (
    <IonCard>
      <IonCardHeader>LeaderBoard</IonCardHeader>
      <Bar data={chartData} options={{ indexAxis: "y" }}></Bar>
    </IonCard>
  );
};

export default BarGraph;
