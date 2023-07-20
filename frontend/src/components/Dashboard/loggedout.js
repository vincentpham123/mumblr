import './loggedout.css';
import { useState } from 'react';
import { NavLink, Switch} from 'react-router-dom';
const LoggedOut = () => {
    const [currentTab,setCurrentTab] = useState('preview');
    // headers will ne today, trending, spotlight
    return (
        <>
        <div className='tabs'>
            <ul className='tab-selection'>
                <li className='tabs'>
                    <NavLink to='/explore/preview'>
                        Preview
                    </NavLink>
                </li>
                <li className='tabs'>
                    <NavLink to='/explore/spotlight'>
                        Spotlight
                    </NavLink>
                </li>
            </ul>
        </div>

        </>
    )
}

export default LoggedOut;