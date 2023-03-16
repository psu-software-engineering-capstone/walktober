import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
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
import choose from '../../assets/announcementWalkthrough/serverselect.png';
import manageserver from '../../assets/announcementWalkthrough/manageservers.png';
import modules from '../../assets/announcementWalkthrough/moduleselect.png';
import automsgpg from '../../assets/announcementWalkthrough/automessagepage.png';
import automsgdd from '../../assets/announcementWalkthrough/automessagedropdown.png';
import createmsg from '../../assets/announcementWalkthrough/createmessage.png';
import msgname from '../../assets/announcementWalkthrough/msgname.png';
import channelselect from '../../assets/announcementWalkthrough/channelselect.png';
import repeatingmsg from '../../assets/announcementWalkthrough/repeatingmsg.png';
import selectdate from '../../assets/announcementWalkthrough/selectdate.png';
import msgoption from '../../assets/announcementWalkthrough/msgoption.png';
import plainmsg from '../../assets/announcementWalkthrough/plainmsg.png';
import embededoption from '../../assets/announcementWalkthrough/embededoptions.png';

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
      <IonContent className="page-background">
        <IonTitle className="page-title">
          How to Make Announcements In Discord Via Dyno
        </IonTitle>
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Navigating To Auto Message Module</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      1. Go to the following link
                      <IonRouterLink
                        className="link"
                        href="https://dyno.gg/"
                        target="_blank"
                      >
                        {' '}
                        dyno.gg
                      </IonRouterLink>
                      .
                    </IonItem>
                    <IonItem>
                      2. Login into Dyno with Discord account that has Admin
                      priviges on your server.
                    </IonItem>
                    <IonItem>
                      3. Click the <b> Manage Servers </b> Button in the top
                      right.
                    </IonItem>
                    <IonImg
                      src={manageserver}
                      alt="Showing manage server button next to user profile image on dyno site."
                    ></IonImg>
                    <IonItem>
                      4. Select the Server That you would like to make
                      announcements in.
                    </IonItem>
                    <IonImg
                      src={choose}
                      alt="Server list in dyno with walktober server in view."
                    ></IonImg>
                    <IonItem>
                      5. Click on Modules on the left side of the page, or open
                      the dropdown menu next to it.
                    </IonItem>
                    <IonImg src={modules} alt=""></IonImg>
                    <IonItem>
                      6. If you are on the modules page, click the settings
                      button under Auto Message module .
                    </IonItem>
                    <IonImg src={automsgpg} alt=""></IonImg>
                    <IonItem>
                      7. Select the &quot;Auto Message&quot; module .
                    </IonItem>
                    <IonImg src={automsgdd} alt=""></IonImg>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    Creating Your Automated Announcement
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      1. Click the Create Automessage button to start.
                    </IonItem>
                    <IonImg src={createmsg} alt=""></IonImg>
                    <IonItem>
                      2. Name you Automated message, as it will be saved to dyno
                      with this name.
                    </IonItem>
                    <IonImg src={msgname} alt=""></IonImg>
                    <IonItem>
                      3. Choose the Announcements channel for the message to be
                      posted to on discord.
                    </IonItem>
                    <IonImg src={channelselect} alt=""></IonImg>
                    <IonItem>
                      4. Choose to either make the announcement one time, or a
                      repeating. If you choose repeating option it will ask for
                      a number of hours between each posting.
                    </IonItem>
                    <IonImg src={repeatingmsg} alt=""></IonImg>
                    <IonItem>
                      5. Choose the time and date that you would like the
                      message to go out.
                    </IonItem>
                    <IonImg src={selectdate} alt=""></IonImg>
                    <IonItem>
                      6. Make a plain text message, or use the embed message option
                      to create a more custom message. See 6a and 6b for a more
                      detailed explanation.
                    </IonItem>
                    <IonImg src={msgoption} alt=""></IonImg>
                    <IonItem>
                      6a. Choosing plain message lets you make a simple plain
                      text announcement.
                    </IonItem>
                    <IonImg src={plainmsg} alt=""></IonImg>
                    <IonItem>
                      6b. Choosing embeded message gives you more freedom for
                      customizing your message. It allows you to change things
                      like the title, add a link to the title, add a description, add images and
                      thumbnails, etc.
                    </IonItem>
                    <IonImg src={embededoption} alt=""></IonImg>
                    <IonItem>
                      7. Lastly, hit the save button to add the new announcement
                      to your server!
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Announcements;
