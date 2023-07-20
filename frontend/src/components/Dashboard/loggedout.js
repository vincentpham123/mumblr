import './loggedout.css';
import { useState } from 'react';
import { NavLink, Switch} from 'react-router-dom';
const LoggedOut = ({setCurrentTab}) => {
    // const [currentTab,setCurrentTab] = useState('preview');
    // headers will ne today, trending, spotlight
    return (
        <>
        <div className='tabs'>
            <ul className='tab-selection'>
                <li className='tabs'>
                    <NavLink onClick={()=>setCurrentTab('preview')} to='/explore/preview'>
                        Preview
                    </NavLink>
                </li>
                <li className='tabs'>
                    <NavLink onClick={()=>setCurrentTab('spotlight')} to='/explore/spotlight'>
                        Spotlight
                    </NavLink>
                </li>
            </ul>
        </div>

        </>
    )
}

export default LoggedOut;