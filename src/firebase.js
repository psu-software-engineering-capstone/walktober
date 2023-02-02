/* eslint-disable no-undef */

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth, indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { isPlatform } from '@ionic/core';

const firebaseConfig = {
  apiKey: 'AIzaSyCoKmeyLCWdjWgu5gXLFJjyLi1JsveYanQ',
  authDomain: 'psuwalktober.firebaseapp.com',
  databaseURL: 'https://psuwalktober-default-rtdb.firebaseio.com/',
  projectId: 'psuwalktober',
  storageBucket: 'psuwalktober.appspot.com',
  messagingSenderId: '949612719811',
  appId: '1:949612719811:web:1c3329349a6538e6197c76',
  measurementId: 'G-Q4NLD3BN06'
};

function provideAuth () {
  if (isPlatform('capacitor')) {
    return initializeAuth(app, {
      persistence: indexedDBLocalPersistence
    });
  } else {
    return getAuth(app);
  }
}

const app = initializeApp(firebaseConfig);
export const RealtimeDB = getDatabase(app);
export const FirestoreDB = getFirestore(app);
export const auth = provideAuth();
