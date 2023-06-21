
import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import * as sessionActions from '../../store/session';
import { Redirect, NavLink } from 'react-router-dom'
import Profilebutton from './ProfileButton';
import PostButton from './PostButton';
import LoginFormModel from '../LoginFormModal';

const Navigation = ()=>{
    const sessionUser = useSelector(state=> state.session.user);
    let sessionLinks;
    if (sessionUser){
        sessionLinks=(
            <>
            <li>
            <Profilebutton user={sessionUser} />
            </li>
            <li>
            <PostButton />
            </li>
            </>
        )
    } else {
        sessionLinks = (
            <li>
            <LoginFormModel />
            </li>
        )
    };
    return (
        <>
        <header className='navBar-header'>
        <div className = 'navBody'>
            <ul className='navButtons'>
                    {sessionLinks}
            </ul>
        </div>
        </header>
        </>
    )
}
export default Navigation;