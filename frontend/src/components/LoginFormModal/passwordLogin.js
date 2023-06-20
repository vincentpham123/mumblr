import { useState, useEffect} from "react"
import './index.css'
import * as sessionActions from '../../store/session';
import csrfFetch from "../../store/csrf";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import './passwordLogin.css';
const PasswordLogin = ({email},{setshowModal}) =>{
    const dispatch = useDispatch();
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState([]);
    const [buttonColor,setButtonColor] = useState('');
    const [fontColor,setFontColor] = useState('');
    useEffect(()=>{
        if (password.length){
            setButtonColor('white');
            setFontColor('black');
        } else {
            setButtonColor('');
            setFontColor('');
        }
    },[password]);
    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors([]);
        return dispatch(sessionActions.login({email, password}))
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
    return (
        <>
             <div className='passwordlogin-box'>
                <div className='password-title'>mumblr</div>
                <form className = 'password-form' onSubmit={handleSubmit}>
                <div className='password-instructions'><p>Welcome back to your corner of the internet.</p></div>
                <input className= 'password-text' type='password' placeholder='Password' 
                    value={password} onChange={event=>setPassword(event.target.value)} required
                    />
                
                    <button style={{ backgroundColor:`${buttonColor}`,color:`${fontColor}`}} className='password-button' type='submit' >
                    Log in<i className="fa-solid fa-arrow-right icon" style={{border: 'none', color: `${fontColor}` }}></i> 
                    </button>
                </form>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </div>
        </>
    )

}

export default PasswordLogin;