import { IonButton, IonContent, IonPage, IonTitle } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import NavBar from '../../components/NavBar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth } from '../../firebase';
import '../Tab1.css';

const changeAvatar: React.FC = () => {
  const storage = getStorage();
  const fileName = auth.currentUser.Name.replace(/\s/g, '');
  const imageRef = ref(storage, 'images/' + fileName + '.jpg');
  const imageString = imageRef.fullPath;

  /*uploadBytes(imageRef, file).then(() => {
    console.log('Uploaded a blob or file!');
    updateProfile(auth.currentUser, imageString);
  });

  updateProfile(auth.currentUser, {
  profile_picture: imageRef;
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});

  <IonButton onClick={uploadBytes(imageRef, file)}> Submit </IonButton>*/

  return (
    <IonPage>
      <NavBar>
        <IonTitle>Change Profile Picture</IonTitle>
      </NavBar>
      <IonContent fullscreen>
        <NavBar collapse="condense">
          <IonTitle size="large">Change Profile Picture</IonTitle>
        </NavBar>
        <ExploreContainer name="Change Profile Picture" />
        <img alt="User's image" src={imageString}></img>
        <IonButton> File Upload</IonButton>
        
      </IonContent>
    </IonPage>
  );
};

export default changeAvatar;
