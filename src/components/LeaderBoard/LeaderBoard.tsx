import { IonButton, IonCard, IonCardContent, IonCardHeader, IonHeader } from "@ionic/react";
import React from "react";
import "./LeaderBoard.scss";
import LeaderBoardList from "./LearderBoardList";

const LeaderBoard: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>Leaderboard</IonCardHeader>
            <IonCardContent>
                <LeaderBoardList></LeaderBoardList>
            </IonCardContent>
        </IonCard>
    );
};

export default LeaderBoard;