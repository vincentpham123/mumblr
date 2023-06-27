import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './reset.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import ModalProvider from './components/Context/Modal';
import * as postActions from './store/posts';
// import * as userActions from './store/user';

const store = configureStore();
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.postActions = postActions;
  // window.userActions = userActions;
}

const Root = () => {
  return (
    <Provider store ={store}>
        <BrowserRouter>
            <ModalProvider>
              <App />
          </ModalProvider>
        </BrowserRouter>
    </Provider>
  )
}
const renderApplication = () =>{
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
    );
  }

if (sessionStorage.getItem("X-CSRF-Token")===null ||
    sessionStorage.getItem("currentUser")===null ){
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
  } else{
  renderApplication();
}

