import { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from "react-router-dom"
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import { useDispatch, useSelector } from "react-redux";
import Dashboard from './components/Dashboard/dashboard';
import LoginFormModel from './components/LoginFormModal';
import NewPost from './components/posts/NewPost';
import NewTextModal from './components/posts/textposts/NewTextPostModal';
import NewPhotoModal from './components/posts/NewPhotoPostModal';
import UserShowPage from './components/users';
import UpdatePostModal from './components/posts/UpdatePostModal';
import { clearPosts } from './store/posts';
import './app.css'
function App() {
  const sessionUser = useSelector(state => state.session.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(clearPosts());
  // },[location])
  return (
    <>
      <div className='header-container'>
        <Navigation />
      </div>
      <div className='body'>

        <Switch>
          <Route path="/user/:userid">
            <UserShowPage />
          </Route>
          <Route path="/explore">
            <div className="dashboard">
              <Dashboard />
            </div>
          </Route>
          <Route>
            {/* <Redirect to='/explore'></Redirect> */}
            <div className="dashboard">
              <Dashboard />
            </div>
          </Route>
        </Switch>
        <Route exact path="/new/text">
            <NewTextModal />
          </Route>
          <Route path="/new/photo">
            <NewPhotoModal />
          </Route>
          <Route path="/new">
            <NewPost />
          </Route>
          <Route path="/edit/:postid">
            <UpdatePostModal />
          </Route>
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
