import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle
} from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import NavBar from '../../components/NavBar';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth, FirestoreDB } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import './Profile.css';

const changeAvatar: React.FC = () => {
  const storage = getStorage();
  const [fName, setfName] = useState("");
  let daName = "";
  const imageRef = ref(storage, 'images/' + fName + '.jpg');
  const imageString = imageRef.fullPath;
  const [currentFile, setCurrentFile] = useState();
  
  const selectFile = (event: any) => {
    const { files } = event.target.files[0];
    setCurrentFile(files);
  };

  async function getName(): Promise<void> {
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const dbSnap = await getDoc(dbRef);
    const userData = dbSnap.data();
    daName = userData.name;
    daName = daName.replace(/\s/g, '');
    setfName(daName);
    console.log(fName, "was the fName," , typeof fName,  setfName, daName, typeof daName, 'Attempted');
  }

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

  useEffect(() => {
    getName();
  }, []);

  //onChange={ev=> this.onFileChange(ev)}
  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Change Profile Picture</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer name="Change Profile Picture" />
        <IonItem>
        <img alt="User's image" src={'../../assets/Walktober'}></img>
        </IonItem>
        <IonItem>
        <IonButton> File Upload</IonButton>
        </IonItem>
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
