
import './index.css'
import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom'
import csrfFetch from '../../store/csrf';
import EmailCheck from './EmailCheck';
import PasswordLogin from './passwordLogin';
import PasswordSignUp from './passwordSignUp';
const LoginForm = ({setshowModal})=>{
    const dispatch = useDispatch();
    // grab user info from current logged in user
    // most likely be blank
    // make closeModal
    const sessionUser = useSelector(state=> state.session.user);
    const [email,setEmail] = useState('')
    const [errors,setErrors] = useState([]);
    const [emailCheck,setEmailCheck] = useState(false);
    const [emailExists,setEmailExists] = useState(null);
    if (sessionUser) return <Redirect to="/" />;
    const checkEmail = async (email) => {
        const response = await csrfFetch('/api/check-email',{
            method:"POST",
            body: JSON.stringify(email)
        });
        const exists = await response.json();
        return exists;
    }
    // need to move fetch into on email click

    const onEmailClick =async (email)=>{
        let response = await checkEmail(email);
        setEmailExists(response);
        setEmailCheck(true);
        
    };


    <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
    </ul>

    return (
        // <ul>
        //   {errors.map(error => <li key={error}>{error}</li>)}
        // </ul>
        <>
        <div className='loginModal'>
        {!emailCheck && <EmailCheck setEmail={setEmail} onEmailClick={onEmailClick} />}
        {emailCheck===true && emailExists && <PasswordLogin email={email} setshowModal={setshowModal}/>}
        {emailCheck===true && !emailExists && <PasswordSignUp email={email} setshowModal={setshowModal}/>}
        </div>
        </>
    );
}

export default LoginForm;