import {
  IonContent,
  IonHeader,
  IonItem,
  IonGrid,
  IonCol,
  IonRow,
  IonRouterLink,
  IonList,
  IonPage,
  IonTitle
} from '@ionic/react';
import NavBar from '../../components/NavBar';
import { useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import './announcements.scss';

const Announcements: React.FC = () => {
  
  const history = useHistory();
  const ctx = useContext(AuthContext);
  const isAdmin = ctx.admin;

  const loadUser = async () => {
    // prevents the user from entering the admin page from the url if they are not an admin
    if (isAdmin === false) {
      history.push('/app');
      return;
    }    
    
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Announcements</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent className='page-background'>
        <IonHeader>How to Make Announcements In Discord Via Dyno</IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList>
                <IonTitle>Navigating To Auto Message Module</IonTitle>
                <IonItem>1. Go to the following link  <IonRouterLink href="https://dyno.gg/" target="_blank"> dyno.gg</IonRouterLink></IonItem>
                <IonItem>2. Login into Dyno with Discord account that has Admin priviges on your server</IonItem>
                <IonItem>3. Click the Manage Servers Button in the top right.</IonItem>
                <IonItem>4. Select the Server That you would like to make announcements in.</IonItem>
                <IonItem>5. Open the dropdown menu for modules on the left side of the page.</IonItem>
                <IonItem>6. Select the &quot;Auto Message&quot; module.</IonItem>
              </IonList>
            </IonCol>
            <IonCol>
              <IonList>
              <IonTitle>Creating Your Automated Announcement</IonTitle>
                <IonItem>1. Click the Create Automessage button.</IonItem>
                <IonItem>2. Name you Automated message.</IonItem>
                <IonItem>3. Choose the Announcements channel to post the message to.</IonItem>
                <IonItem>4. Choose to either post one time, or a repeating message.</IonItem>
                <IonItem>5. Choose the time and date that you would like the message to go out.</IonItem>
                <IonItem>6. Make a plain text announcement, or use the embed option to create a more custom message.</IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
    

  );
};
  export default Announcements;