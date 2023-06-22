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
                    <NavLink to='/explore/your_stuff'>
                        For you
                    </NavLink>
                </li>
                <li className='tabs'>
                    <NavLink to='/explore/following'>
                        Following
                    </NavLink>
                </li>
                {/* will be a carosel??? */}
            </ul>
        </div>

        </>
    )
}

export default LoggedIn;