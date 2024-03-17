import React from 'react';
import ReactDOM from 'react-dom/client';
import rootReducer from './lib/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

const store = configureStore({
  reducer: rootReducer,
});
console.log(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
