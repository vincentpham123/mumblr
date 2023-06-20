import {useState, useEffect} from 'react'
import { Route } from "react-router-dom"
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import { useSelector } from "react-redux";
function App() {
  const sessionUser = useSelector(state=> state.session.user);
  const [loggedIn,setLoggedIn] = useState(false);
  
  return (
    <> 
      <Navigation />
      <Route path='/signup'>
        <SignupFormPage />
      </Route>
      <Route path='/'>

      </Route>
    </>
  );
}

export default App;
