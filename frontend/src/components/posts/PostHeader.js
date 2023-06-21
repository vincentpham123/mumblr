
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import { useState } from "react";
import './postheader.css';

const PostHeader =({username,dateCreated,timeCreated}) =>{
    const sessionUser = useSelector(state=> state.session.user);
    const [followed,setFollowed] = useState(false);

    const [showOptions, setShowOptions] = useState(false);

    const openMenu = ()=> {
        if(showOptions) return;
        setShowOptions(true);
    }

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
                        {!followed && <button className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>follow</span></button>}
                    </div>
                    {/* make div for extra things like post creation date */}
                    <div className='options-box'>
                        <span className='options-container'>
                            <span className='options-content'>
                                <button className='options-button' onClick={openMenu}>
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
                            <ul className='optionsContent'>
                                <li className='option-links'>
                                    Copy Link
                                    {/* button that will copy 
                                    link of post page to user
                                    will need to pass url as prop */}
                                </li>
                                <li className='option-links'>
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