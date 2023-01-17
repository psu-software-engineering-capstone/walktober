import {
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";

import React from 'react';
import "./LeaderBoardList.scss";
const People = [
  {team_id: 1, name: "Michael", steps: 600},
  {team_id: 4, name: "Kevin", steps: 420},
  {team_id: 3, name: "Bailee", steps: 800}, 
  {team_id: 4, name: "Alissa", steps: 900},
];

const LeaderBoardList: React.FC = () => {
  return (
  <IonGrid>
      {Person(People)}
    </IonGrid>
  );
}

function Person(data: any){
  let sortSteps = data.sort((a: any, b: any) => (a.steps > b.steps) ? -1 : 1);
  console.log(JSON.stringify(sortSteps));
  return(
    
    data.map((value: any, index: number) => (
      <IonRow key={index}>
          <IonCol>{value.name}</IonCol>
          <IonCol>{value.steps}</IonCol>
      </IonRow>
      )
    )
  )
}

export default LeaderBoardList;
