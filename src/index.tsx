/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/auth-context';
import { AdminContextProvider } from './store/admin-context';

const container = document.getElementById('message'); // originally this was 'root' which threw error element does not exist
const root = createRoot(container!);
root.render(
  <AuthContextProvider>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </AuthContextProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// createRoot(document.getElementById('root')!).render(
//   <AuthContextProvider>
//   <AdminContextProvider>
//     <App />
//   </AdminContextProvider>
// </AuthContextProvider>
// );