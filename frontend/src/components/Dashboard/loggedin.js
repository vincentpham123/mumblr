import './loggedin.css';
import { useState,useEffect } from 'react';
import { NavLink, Switch,useHistory,useLocation} from 'react-router-dom';
const LoggedIn = () => {
    const [currentTab,setCurrentTab] = useState('')
    // headers will ne today, trending, spotlight
    const history = useHistory();
    const location = useLocation();

    useEffect(()=>{
        setCurrentTab(location.pathname);
    },[location])
    return (
        <>
        <div className='tabs'>
            <ul className='tab-selection'>
                <li className='tabs'>
                    <NavLink className={(currentTab=='/explore/foryou'||currentTab=='/') ? 'active':''}  to='/explore/foryou'>
                        For You
                    </NavLink>
                </li>
                <li className='tabs'>
                    <NavLink className={currentTab=='/explore/trending' ? 'active':''}  to='/explore/trending'>
                        Trending
                    </NavLink>
                </li>
            </ul>
        </div>

        </>
    )
}

export default LoggedIn;