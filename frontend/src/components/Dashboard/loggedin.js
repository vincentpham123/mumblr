import './loggedin.css';
import { useState,useEffect } from 'react';
import { NavLink, Switch,useHistory} from 'react-router-dom';
const LoggedIn = () => {
    const [currentTab,setCurrentTab] = useState('')
    // headers will ne today, trending, spotlight
    const history = useHistory();
    // useEffect(()=>{
    //     history.push('/explore/foryou')
    // },[])

    return (
        <>
        <div className='tabs'>
            <ul className='tab-selection'>
                <li className='tabs'>
                    <NavLink className={currentTab==='foryou' ? 'active':''} onClick={()=>setCurrentTab('foryou')} to='/explore/foryou'>
                        For You
                    </NavLink>
                </li>
                <li className='tabs'>
                    <NavLink className={currentTab==='trending' ? 'active':''} onClick={()=>setCurrentTab('trending')} to='/explore/trending'>
                        Trending
                    </NavLink>
                </li>
            </ul>
        </div>

        </>
    )
}

export default LoggedIn;