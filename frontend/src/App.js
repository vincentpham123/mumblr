import { useState, useEffect } from 'react'
import { Route, Switch, Redirect,useLocation } from "react-router-dom"
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import { useSelector } from "react-redux";
import Dashboard from './components/Dashboard/dashboard';
import TodayDashboard from './components/Dashboard/today';
import LoginFormModel from './components/LoginFormModal';
import NewPost from './components/posts/NewPost';
import NewTextModal from './components/posts/textposts/NewTextPostModal';
import NewPhotoModal from './components/posts/NewPhotoPostModal';
import UserShowPage from './components/users';
import UpdatePostModal from './components/posts/UpdatePostModal';
import './app.css'
function App() {
  const sessionUser = useSelector(state => state.session.user);
  const [loggedIn, setLoggedIn] = useState(false);
  let location = useLocation();
  let background = location.state && location.state.background
  return (
    <>
      <div className='header-container'>
        <Navigation />
      </div>
      <div className='body'>
          
        <Switch>
          <Route path='/explore'>
            <div className='dashboard'>
              <Dashboard />
            </div>
          </Route>
          <Route exact path='/'>
          <div className='dashboard'>
              <Dashboard />
            </div>
          </Route>
    
          <Route exact path='/new/text'>
            <NewTextModal />
          </Route>
          <Route path='/new/photo'>
            <NewPhotoModal />
          </Route>
          <Route path='/edit/:postid'>
            <UpdatePostModal />
          </Route>
          <Route path='/new'>
            <NewPost />
          </Route>
          <Route path='/:username'>
            <UserShowPage />
          </Route>  
        </Switch>
        
      </div>
      {/* <Switch location={background || location}>
      <Route path='/new/'>
            <NewPost />
      </Route>
          <Route path='/new'>
            <NewPost />
          </Route>
          <Route path='/new/text'>
            <NewTextModal />
          </Route>
          <Route path='/new/photo'>
            <NewPhotoModal />
          </Route>
          <Route path='/edit/:postid'>
            <UpdatePostModal />
          </Route>
      </Switch> */}
      {/* routes */}
      
      {/* <Route exact path='/new/text'>
        <NewTextModal />
      </Route>
      <Route exact path='/new/photo'>
        <NewPhotoModal />
      </Route>
      <Route path='/edit/:postid'>
        <UpdatePostModal />
      </Route>

      <Route exact path='/new'>
        <NewPost />
      </Route> */}
    </>
  );
}

export default App;
