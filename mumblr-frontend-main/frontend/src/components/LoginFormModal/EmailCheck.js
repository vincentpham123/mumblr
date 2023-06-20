import { useState,useEffect } from "react"
import './emailcheck.css'
const EmailCheck = ({setEmail,onEmailClick}) =>{
        const [initialEmail,setInitialEmail] = useState('');
        const [emailError,setEmailError] = useState('');
        const [buttonColor,setButtonColor] = useState('');
        const [fontColor,setFontColor] = useState('')
        useEffect(()=>{
        if (initialEmail.length) {
            setButtonColor('white');
        setFontColor('black')} else {
            setButtonColor('');
            setFontColor('');
        } 
        }
        ,[initialEmail]);
        const validateEmail = (email) => {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return emailRegex.test(email);
        }

        const handleEmailSubmit = (event) =>{
            event.preventDefault();
            setEmailError('');
            if (!validateEmail(initialEmail)){
                setEmailError("That's not a valid email address. Please try again.");
                return;
            }
            onEmailClick(initialEmail);
            setEmail(initialEmail);
    
        }
        // const handleEmailClick = (event) =>{
        //     setEmailError([]);

        //     if(!validateEmail(event.target.value)){
        //         emailError.push("That's not a valid email address. Please try again.");
                
        //     }
        // }
        return (
            <>
            <div className='email-box'>
                <div className='email-title'>mumblr</div>
                <form className = 'email-form' onSubmit={handleEmailSubmit}>
                <div className='email-instructions'><p>Enter your email to login or register:</p></div>
                <input className= 'email-text' type='text' placeholder='Email' 
                    value={initialEmail} onChange={event=>setInitialEmail(event.target.value)} required
                    />
                
                {<div>{emailError}</div>}
                    <button style={{ backgroundColor:`${buttonColor}`,color:`${fontColor}`}} className='email-button' type='submit' >
                    Next<i className="fa-solid fa-arrow-right" style={{border: 'none', color: `${fontColor}` }}></i> 
                    </button>
                </form>
            </div>
            </>
        )
}
export default EmailCheck;
{/* <span>Next <i className="fa-solid fa-arrow-right" style={{color:'#000000'}}></i> </span> */}