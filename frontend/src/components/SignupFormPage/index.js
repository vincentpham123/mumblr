
import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom'

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errors,setErrors] = useState([]);
    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors([]);
        if(password===confirmPassword){
        return dispatch(sessionActions.signup({email,username,password}))
            .catch(async (res) => {
                let data;
                try {
                    data=await res.clone().json();
                }
                catch {
                    data = await res.text();
                }

                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form id='login-form' onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <input type='text' placeholder='Email' 
            value={email} onChange={event=>setEmail(event.target.value)} required
            /> <input type='text' placeholder='username' 
            value={username} onChange={event=>setUsername(event.target.value)} required
            /> <input type='password' placeholder="password" 
            value={password} onChange={event=>setPassword(event.target.value)} required
            /> <input type='password' placeholder="confirm password" 
            value={confirmPassword} onChange={event=>setConfirmPassword(event.target.value)} required
            /> 
            <button type="submit">Sign Up</button>
        
        </form>
    )

}
export default SignupFormPage;