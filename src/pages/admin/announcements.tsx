import {
  IonContent,
  IonHeader, 
  IonPage,
  IonTitle
} from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
import NavBar from '../../components/NavBar';
import { useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import './admin.css';

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
      <IonContent>
        <WidgetBot
          className="discord-widget"
          server="1068966007886069841"
          channel="1068966009106600110"
        />
      </IonContent>
    </IonPage>
    

  );
};
  export default Announcements;