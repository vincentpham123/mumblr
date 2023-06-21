
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import { useState, useEffect } from "react";
import './postheader.css';

const PostHeader =({username,dateCreated,timeCreated}) =>{
    const sessionUser = useSelector(state=> state.session.user);
    const [followed,setFollowed] = useState(false);

    const [showOptions, setShowOptions] = useState(false);

    const openOptions = ()=> {
        if(showOptions) return;
        setShowOptions(true);
    }

    const closeOptions= () =>{
        if (showOptions) setShowOptions(false);
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
                                    <Link className='username-post' to={`/${username}`}>
                                        {username}
                                    </Link>
                                </span>
                            </div>
                        </div>
                        {!followed && <button className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>Follow</span></button>}
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
                                <li className='option-links'>
                                    Copy Link
                                    {/* button that will copy 
                                    link of post page to user
                                    will need to pass url as prop */}
                                </li>
                                <li className='option-links' onClick={closeOptions}>
                                    Close 
                                    {/* set showMenu to false */}
                                </li>


                            </ul>
                        </div>
                    )}
                    </div>
                </div>
            </header>
        </div>
        </>
    )
}

export default PostHeader;