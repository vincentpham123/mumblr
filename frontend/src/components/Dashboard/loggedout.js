import './loggedout.css';
import { useState } from 'react';
import { NavLink, Switch} from 'react-router-dom';
const LoggedOut = () => {
    const [currentTab,setCurrentTab] = useState('')
    // headers will ne today, trending, spotlight
    return (
        <>
        <div className='tabs'>
            <ul className='tab-selection'>
                <li className='tabs'>
                    <NavLink to='/explore/today'  >
                        Today
                    </NavLink>
                </li>
                <li className='tabs'>
                    <NavLink to='/explore/trending'>
                        Trending
                    </NavLink>
                </li>
                <li className='tabs'>
                    <NavLink to='/explore/spotlight'>
                        Spotlight
                    </NavLink>
                </li>
                <li>More with arrow</li>
            </ul>
        </div>

        </>
    )
}

export default LoggedOut;