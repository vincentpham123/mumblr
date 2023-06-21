import {useState, useEffect} from 'react'
import { Route, Switch } from "react-router-dom"
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import { useSelector } from "react-redux";
import Dashboard from './components/Dashboard/dashboard';
import TodayDashboard from './components/Dashboard/today';
import './app.css'
function App() {
  const sessionUser = useSelector(state=> state.session.user);
  const [loggedIn,setLoggedIn] = useState(false);
  
  return (
    <> 
   
      <Navigation />
      <div className='body'>
        <div className='dashboard'> 
          <Dashboard />
        </div>
        <Switch>
        <Route path='/explore/today'>
            <TodayDashboard />
        </Route>
        <Route path='/explore/trending'>
            {/* render trending */}
        </Route>
        <Route path='/explore/spotlight'>
            {/* render spotlight */}
        </Route>
        </Switch>
    
      </div>
      {/* routes */}
      <Route path='/signup'>
        <SignupFormPage />
      </Route>
      <Route path='/'>
      </Route>
      <Route path='/explore'>
        {/* dashboard component will be here with its own navigation tabs */}
      </Route>
    </>
  );
}

export default App;
