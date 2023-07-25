import './loggedout.css';
import { useState,useEffect } from 'react';
import { NavLink, Switch,useHistory,useLocation} from 'react-router-dom';
const LoggedOut = () => {
    // headers will ne today, trending, spotlight
    const history = useHistory();
    const location = useLocation();
    const [currentTab,setCurrentTab]=useState('');

    useEffect(()=>{
        setCurrentTab(location.pathname);
    },[location])
    return (
        <>
          <div className='tabs'>
            <ul className='tab-selection'>
              <li className='tabs'>
                <NavLink className={(currentTab==='/explore/preview'||currentTab==='/') ? 'active':''} to='/explore/preview' activeClassName='active'>
                  Preview
                </NavLink>
              </li>
              <li className='tabs'>
                <NavLink className={currentTab==='explore/spotlight' ? 'active':''}  to='/explore/spotlight' activeClassName='active'>
                  Spotlight
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    };
    
    export default LoggedOut;