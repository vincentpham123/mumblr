
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import { useState, useEffect } from "react";
import './styling/postheader.css';
import { useDispatch } from "react-redux";
import * as followActions from '../../store/follows';
const PostHeader =({author_id, username,dateCreated,timeCreated}) =>{
    const sessionUser = useSelector(state=> state.session.user);
    const [followed,setFollowed] = useState(0);
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            if (sessionUser) {
              const result = await fetch(`/api/checkfollowstatus/${author_id}`);
              if (result.ok) {
                const data = await result.json();
                setFollowed(data.result);
              }
            }
          };
          fetchData();
        }, [dispatch,followed]);
 
    const openOptions = ()=> {
        if(showOptions) return;
        setShowOptions(true);
    }

    const closeOptions= () =>{
        if (showOptions) setShowOptions(false);
    }
    const handleFollowButton = (event)=>{
        event.preventDefault();
        if (!sessionUser){
            setErrors(['Login to Follow!'])
        } else{
            if (followed===0){
                const follow={user_id: author_id, follower_id: sessionUser.id}
                const follow_id = dispatch(followActions.createFollow(follow));
                setFollowed(follow_id);
            } else {
                dispatch(followActions.removeFollow(followed));
                setFollowed(0);
            }
        }
    }
    
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
                                    <Link className='username-post' to={`/user/${author_id}`}>
                                        {username}
                                    </Link>
                                </span>
                            </div>
                        </div>
                        {!followed && <button onClick={(event)=>handleFollowButton(event)}className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>Follow</span></button>}
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
                                    {dateCreated}
                                    {timeCreated}
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