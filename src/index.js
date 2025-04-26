import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { PersistGate } from 'redux-persist/integration/react'
import i18n from './utils/i18n'; // Import the i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* // StrictMode is a tool for highlighting potential problems in an application. 
    // Like Fragment, StrictMode does not render any visible UI. 
    // It activates additional checks and warnings for its descendants. */}
    {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
