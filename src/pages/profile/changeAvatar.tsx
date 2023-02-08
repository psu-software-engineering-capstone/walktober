import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle
} from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import NavBar from '../../components/NavBar';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth } from '../../firebase';
import '../Tab1.css';
//import { file } from '@babel/types';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';

const changeAvatar: React.FC = () => {
  console.log("changeAvatar");
  console.log(auth.currentUser.userData.name, "attempting");
  const storage = getStorage();
  const setFileName = auth.currentUser.name;
  const fileName = setFileName.replace(/\s/g, '');
  const imageRef = ref(storage, 'images/' + fileName + '.jpg');
  const imageString = imageRef.fullPath;
  const [currentFile, setCurrentFile] = useState();

  const selectFile = (event:any) => {
    const { files } = event.target.files[0];
    setCurrentFile(files);
  };

  async function upload() {
    if (!currentFile) {
      alert('No file has been uploaded');
    } else {
      uploadBytes(imageRef, currentFile).then(() => {
        console.log('Uploaded a blob or file!');
        updateProfile(auth.currentUser, imageString);
      });

      updateProfile(auth.currentUser, {
        profile_picture: imageRef
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error: any) => {
          // An error occurred
          // ...
          console.log(error);
        });
    }
  }

  //onChange={ev=> this.onFileChange(ev)}
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
        <IonItem>
          <IonLabel> Image </IonLabel>
          <input type="file" onChange={selectFile} />
          <IonButton onClick={upload}> Submit </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default changeAvatar;
