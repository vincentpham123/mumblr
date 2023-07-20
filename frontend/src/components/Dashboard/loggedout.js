import './loggedout.css';
import { useState,useEffect } from 'react';
import { NavLink, Switch,useHistory,useLocation} from 'react-router-dom';
const LoggedOut = ({setCurrentTab}) => {
    // const [currentTab,setCurrentTab] = useState('preview');
    // headers will ne today, trending, spotlight
    const history = useHistory();
    // useEffect(()=>{
    //     history.push('/explore/preview')
    // },[])
    return (
        <>
          <div className='tabs'>
            <ul className='tab-selection'>
              <li className='tabs'>
                <NavLink to='/explore/preview' activeClassName='active'>
                  Preview
                </NavLink>
              </li>
              <li className='tabs'>
                <NavLink to='/explore/spotlight' activeClassName='active'>
                  Spotlight
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    };
    
    export default LoggedOut;