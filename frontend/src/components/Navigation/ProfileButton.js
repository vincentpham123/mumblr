import './profilebutton.css';
import { useState, useEffect } from 'react';
import { NavLink,Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import * as sessionActions from '../../store/session';
import LoginFormModel from '../LoginFormModal';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
const Profilebutton = () =>{
// work on dropdown menu that will bring down menu
const user = useSelector(state=>state.session.user);
const dispatch = useDispatch();
const [showMenu,setShowMenu] = useState(false);
let menu;
const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
}

useEffect(()=>{
    if (!showMenu) return;
    const closeMenu=()=>{
        setShowMenu(false);
    };
    document.addEventListener('click',closeMenu);
    return ()=> document.removeEventListener("click",closeMenu);
},[showMenu]);

const logout=(e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    <Redirect to='/' />
};

let sessionLinks;
if(user){
    sessionLinks=(
        
        <ul className='profile-dropdown'>
            <li className='dropdownlink'>
                <NavLink to={`/user/${user.id}/likes`} className='menu-link'>
                    <div className='icon'>
                        <i className="fa-solid fa-heart heart icons" ></i>
                    </div>
                    <div className='menu-text'>
                        <span>Likes</span>
                        <span>{user.postlikes}</span>
                    </div>
                </NavLink>
                <NavLink exact to={`/user/${user.id}/followers`} className='menu-link'>
                    <div className='icon'>
                        <i className="fa-solid fa-people-group heart icons"></i>
                    </div>
                    <div className='menu-text'>
                        <span>Followers</span>
                        <span>{user.followers}</span>
                    </div>
                </NavLink>
                <NavLink exact to={`/user/${user.id}/follows`} className='menu-link'>
                    <div className='icon'>
                        <i className="fa-solid fa-user-plus heart icons" ></i>
                    </div>
                    <div className='menu-text'>
                        <span>Following</span>
                        <span>{user.follows}</span>
                    </div>
                </NavLink>
            </li>
         </ul>
    );
} else {
    sessionLinks=(
        <>
            {/* will trigger a modal when it is ready */}

            <NavLink to='/signup'>Sign In</NavLink>
        </>
    );
};
    
    return (
        <>

        <div className='profile'>
            <button onClick={openMenu} style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                <i className="fa-solid fa-user" style={{color:'#696969'}}></i>
            </button>
        {showMenu && (
            <div className='profile-menu'>
                <div className='profile-title'>
                <Link to={`/user/${user.id}/`} className='account-link'>
                    <h3 id='account'>Account</h3>
                </Link>
                    <button className='logout' onClick={e=>logout(e)}>Sign Out</button>
                </div>
                
                {sessionLinks}
            </div>
        )}
        </div>
        </>
    );
}

export default Profilebutton;
