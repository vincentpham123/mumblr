
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import { useState, useEffect } from "react";
import './styling/postheader.css';
import { useDispatch } from "react-redux";
import * as followActions from '../../store/follows';
import { userFollowed } from "../../store/follows";
const PostHeader =({post,profile}) =>{
    const sessionUser = useSelector(state=> state.session.user);
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);
    const [errors, setErrors] = useState([]);
    const [dateObj,setDateObj]=useState(new Date(post.dateCreated+' '+post.timeCreated));
    const [sameUser,setSameUser]=useState(false);
    useEffect(()=>{
        if(sessionUser && sessionUser.id===post.author.id){
            setSameUser(true);
        }
    },[sessionUser])
    const openOptions = ()=> {
        if(showOptions) return;
        setShowOptions(true);
    }
    const followed = useSelector(userFollowed(sessionUser,post.author.id));
    const closeOptions= () =>{
        if (showOptions) setShowOptions(false);
    }
    const convertTime = (hour)=>{
        let result = hour;
        
        if (hour>12){
            result -=12;
        }
        if (result<10){
            return '0'+result;
        } else{
            return result;
        }
    }
    const getAMPM = (hour)=>{
        let ap = hour >= 12 ? 'PM' : 'AM';
        return ap;
    }
    // const handleFollowButton = (event)=>{
    //     event.preventDefault();
    //     if (!sessionUser){
    //         setErrors(['Login to Follow!'])
    //     } else{
    //         if (followed===0){
    //             const follow={user_id: post.author.id, follower_id: sessionUser.id}
    //             const follow_id = dispatch(followActions.createFollow(follow));
    //         } else {
    //             dispatch(followActions.removeFollow(post.author.id));
    //         }
    //     }
    // }
    const handleFollowButton = (event)=>{
        event.preventDefault();
        if(!sessionUser){
            setErrors(['Login to Follow!'])
            setTimeout(()=>{
                setErrors([])
            },5000)
        } else{
            const follow={user_id: post.author.id, follower_id: sessionUser.id}
            dispatch(followActions.createFollow(follow));
        }
    }
    const handleUnfollowButton = (event) =>{
        event.preventDefault();
        dispatch(followActions.removeFollow(followed[0].id));
    }

    //clear follow error
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setErrors([])
    //     },5000)
    // },[errors])
    
    useEffect(()=>{
        if (!showOptions) return;
        document.addEventListener('click',closeOptions);
        return ()=> document.removeEventListener('click',closeOptions);
    },[showOptions]);

    //need formula that will change the formate of dateCreated and timecreated

    //button for follow
    //onclick, dispatch new follow for user if not followed, 
    //have useEffect that will render once and check if the sessionuser 
    // is following the user, if not, display follow button
    return(
        <>
        <div className='headerHover'>
            <header className='postHeader'>
                <div className='headercontent'>
                    <div className='username-follow'>
                        <div className='username-box'>
                            <div className='username-content'>
                                <span className='username-link-box'>
                                    <Link className='username-post' to={`/user/${post.author.id}`}>
                                        {post.author.username}
                                    </Link>
                                </span>
                            </div>
                        </div>
                        {followed.length===0 && !sameUser && <button onClick={(event)=>handleFollowButton(event)} className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>Follow</span></button>}
                        {followed.length>0 && !sameUser && <button onClick={(event)=>handleUnfollowButton(event)} className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>Unfollow</span></button>}
                    </div>
                    {/* make div for extra things like post creation date */}
                    <div className='options-box'>
                        <span className='options-container'>
                            <span className='options-content'>
                                <button className='options-button' onClick={openOptions}>
                                    <span className='button-content'>
                                        <i className='fa-solid fa-ellipsis fa-xl buttonicon' ></i>
                                    </span>
                                </button>
                            </span>
                        </span>
                    
                        {showOptions && (
                            
                            <div className='optionsMenu'>
                                <div className='time-date'>
                                    {`${dateObj.toLocaleString('en-US',{year:'numeric',month:'long',day:'numeric'})}   
                                    ${convertTime(dateObj.getHours())}:${dateObj.getMinutes()} ${getAMPM(dateObj.getHours())}`}
                                </div>
                                <ul className='optionscontent'>
                                    
                                    <li className='option-links' onClick={closeOptions}>
                                        Close 
                                        {/* set showMenu to false */}
                                    </li>


                                </ul>
                            </div>
                        )}
                    </div>
                    { errors.length>0 &&
                    <div className='follow-errors'>
                            <span>
                                {errors[0]}
                            </span>
                    </div>
                    }
                </div>
            </header>
        </div>
        </>
    )
}

export default PostHeader;