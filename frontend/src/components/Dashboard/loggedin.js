import './loggedin.css';
import { useState } from 'react';
import { NavLink, Switch} from 'react-router-dom';
const LoggedIn = () => {
    const [currentTab,setCurrentTab] = useState('')
    // headers will ne today, trending, spotlight
    return (
        <>
        <div className='tabs'>
            <ul className='tab-selection'>
                <li className='tabs'>
                    <NavLink to='/explore/foryou'>
                        For You
                    </NavLink>
                </li>
                <li className='tabs'>
                    <NavLink to='/explore/Trending'>
                        Trending
                    </NavLink>
                </li>
            </ul>
        </div>

        </>
    )
}

export default LoggedIn;