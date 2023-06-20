import { useState, useEffect} from "react"
import * as sessionActions from '../../store/session';
import csrfFetch from "../../store/csrf";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './passwordSignup.css';

const PasswordSignUp = ({email},{setshowModal}) =>{
    

    const dispatch = useDispatch();
    const [username,setUserName] = useState();
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errors,setErrors] = useState([]);
    const [buttonColor,setButtonColor] = useState('');
    const [fontColor,setFontColor] = useState('');
    
    useEffect(()=>{
        if (confirmPassword.length && password.length && username.length){
            setButtonColor('white');
            setFontColor('black');
        } else {
            setButtonColor('');
            setFontColor('');
        }
    },[password,confirmPassword,username]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password===confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({email,username, password}))
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }

                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);

                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    
    }
    
    return (
        <>
             <div className='passwordsignup-box'>
                <div className='password-title'>mumblr</div>
                <form className = 'password-form' onSubmit={handleSubmit}>
                    <div className='password-instructions'><p>Welcome to your corner of the internet. Glad you're here</p></div>
                    <input className= 'username-text' placeholder='Username' 
                    value={username} onChange={event=>setUserName(event.target.value)} required
                    />
                    <input className= 'password-text' type='password' placeholder='Password' 
                    value={password} onChange={event=>setPassword(event.target.value)} required
                    />
                    <input className= 'password-text' type='password' placeholder='Repeat password' 
                    value={confirmPassword} onChange={event=>setConfirmPassword(event.target.value)} required
                    />
                    
                    <button style={{ backgroundColor:`${buttonColor}`,color:`${fontColor}`}} className='password-button' type='submit' >
                    Sign Up<i className="fa-solid fa-arrow-right icon" style={{border: 'none', color: `${fontColor}` }}></i> 
                    </button>
                </form>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </div>
        </>
    )

}

export default PasswordSignUp;