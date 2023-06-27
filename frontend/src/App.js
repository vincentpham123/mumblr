import {useState, useEffect} from 'react'
import { Route, Switch } from "react-router-dom"
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
import './app.css'
function App() {
  const sessionUser = useSelector(state=> state.session.user);
  const [loggedIn,setLoggedIn] = useState(false);
  
  
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
          <Route path='/:username'>
            {/* <UserShowPage /> */}
          </Route>
          <Route >
          <div className='dashboard'> 
            <Dashboard />
          </div>
          </Route>
        </Switch>
        
    
      </div>
      {/* routes */}
      
      <Route path='/'>
      </Route>
      <Route path='/explore'>
        {/* dashboard component will be here with its own navigation tabs */}
      </Route>
      <Route path='/new'>
        <NewPost />
      </Route>
       <Route exact path='/new/text'>
        <NewTextModal />
      </Route>
      <Route path='/new/photo'>
        <NewPhotoModal />
      </Route> 
      <Route path='/:username'>
        {/* will render the usershowpage */}
      </Route>
    </>
  );
}

export default App;
