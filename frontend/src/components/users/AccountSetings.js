import { useDispatch, useSelector } from 'react-redux';
import './accountsettings.css';
import { useState } from "react";
import * as userActions from '../../store/user';
const AccountSettings = ({closeModal, user}) =>{
const [userName,setUserName] = useState(user.username);
const [profilepic,setProfilepic] = useState(user.profilepic);
const [background,setBackground] = useState(user.background);
const [bgPreview,setbgPreview] = useState(null);
const [profilePreview,setProfilePreview] = useState(null);
const sessionUser=useSelector(state=>state.session.user);
const [errors,setErrors] = useState([]);
const dispatch = useDispatch();
console.log(profilepic);
const handleBGInput = (event) =>{
    const file = event.currentTarget.files[0];
    if(file){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload= ()=> setbgPreview(fileReader.result);
        setBackground(file);
    } else {
        setbgPreview(null);
    }


}

const handleSave = (event)=>{
    event.preventDefault();
    const formData = new FormData();
    if (profilePreview){
    formData.append('user[profilepic]',profilepic);
    }
    if (bgPreview){
    formData.append('user[background]',background);
    }
    formData.append('user[username]',userName);
    formData.append('user[email]',sessionUser.email);
    setErrors([]);
    dispatch(userActions.updateUser(formData,sessionUser.id))
        .catch(async (res)=>{
            let data;
            try{
                data = await res.clone().json();
            } catch {
                data = await res.text();
            }

            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });

}
const handleUndo = (event) =>{
    event.preventDefault();
    setUserName(user.username);
    setProfilePreview(null);
    setbgPreview(null);
    setProfilepic(user.profilepic);
    setBackground(user.background);
}
// have buttons to revert changes, change evertginf back to the default, set photopreviews to null
// set username back to the prop

const handleProfileInput = (event)=>{
    const file = event.currentTarget.files[0];
    if(file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => setProfilePreview(fileReader.result);
        setProfilepic(file);
    } else setProfilePreview(null);
}



    return(
        
        <div className='user-settings-container'>
            <button className='closeuserupdate' onClick={()=>closeModal(false)} >
                <i className='fa-solid fa-xmark'></i>
            </button>
                <div className='show-body'>
                    <div className='show-contents'>
                        <div className='profile-container'>
                            <header className='profile-header'>
                                <div className='bgimage-frame'>
                                    <img className='bgimage' src={ bgPreview ? bgPreview : background}/>
                                    <button className='bgsettingbutton' onClick={()=>document.getElementById('photo-input').click()}>
                                        <i className="fa-solid fa-image fileicon" ></i>
                                            <span className='filetext'>Change background</span>
                                        <input  type='file' id='photo-input' onChange={event=>handleBGInput(event)}></input>
                                    </button>
                                </div>
                                <div className='profile-bio-container'>
                                    <div className='profilepic-container'>
                                        <div className='profilepic-body'>
                                            <div className='profilepic-contents'>
                                                <div className='profilepic-frame'>
                                                    <img className='userPic' src={profilePreview ? profilePreview : profilepic}/>
                                                </div>
                                                <button className='profilesettingbutton' onClick={()=>document.getElementById('profilephoto-input').click()}>
                                                    <i className="fa-solid fa-image fileicon profileicon" ></i>
                                                        <span className='filetext '></span>
                                                    <input  type='file' id='profilephoto-input' onChange={event=>handleProfileInput(event)} ></input>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bio-container'>
                                        <input className='blognamesetting' onChange={event=>setUserName(event.target.value)} value={userName}></input>
                                        <div className='bio-container'>
                                            
                                        </div>
                                    </div>
                                </div>
                                </header>
                        </div>
                </div>
                </div>
                <div className='user-update-buttons'>
                    <button className='save-user-updates' onClick={event=> handleSave(event)}>
                        <span className='userupdatetext'>Save Updates</span>
                    </button>
                    <button className='revert-user-updates' onClick={event=>handleUndo(event)}>
                        <span className='userupdatetext'>Undo Updates</span>
                    </button>

                </div>
                </div>
               
                    
    )
}

export default AccountSettings;