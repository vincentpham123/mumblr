
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState,useRef } from "react"
import * as postActions from '../../store/posts';
import * as userActions from '../../store/user';
import * as followActions from '../../store/follows';
import { Route , Switch,useParams, NavLink,Link,useHistory } from "react-router-dom";
import { Modal } from "../Context/Modal";
import PostsDashboard from "./posts";
import './index.css';
import LikesDashboard from "./likes";
import UserDashboard from "./UserDashBoard";
import UserFollowDashboard from "./UserFollowDashoard";
import { Redirect,useLocation } from "react-router-dom/cjs/react-router-dom.min";
import AccountSettings from "./AccountSetings";
const UserShowPage = () =>{
    const dispatch = useDispatch();
    const {userid} = useParams();
    const [pageType,setPageType] =useState('false');
    const [tabSelection,setTabSelection] = useState('');
    const history = useHistory();
    const location = useLocation();
    const [errors,setErrors]=useState([]);
    const [accountSettings,setAccountSettings] = useState(false);
    const idRef = useRef()

    useEffect(()=>{
        setTabSelection(location.pathname);
    },[location])
    // need sessionUser to determine if it will be a 
    //user or otheruser render
    // each user will have a profile Pic, and backgroundImage
    // need to fetch user from backend
    const user= useSelector(state=>state.users[userid]);
    // const user = users[userid];
    useEffect(() => {
       
        dispatch(userActions.fetchUser(userid));
        idRef.current=userid
      }, [userid]);
    const sessionUser = useSelector(state=>state.session.user);
    const followed = useSelector(followActions.userFollowed(sessionUser,userid));
    console.log(tabSelection);
    const handleFollowButton = (event)=>{
    event.preventDefault();
    if(!sessionUser){
        setErrors([]);
        setErrors(['Login to Follow!']);
        setTimeout(()=>{
            setErrors([])
        },3000)
    } else{
        const follow={user_id: user.id, follower_id: sessionUser.id}
        dispatch(followActions.createFollow(follow));
    }
}
const handleUnfollowButton = (event) =>{
    event.preventDefault();
    dispatch(followActions.removeFollow(followed[0].id));
}
    // this logic will be handled by the userdashboard
    // useEffect(()=>{
    //     dispatch(userActions.fetchUser(userid))
    // },[]);

    // useEffect(()=>{
    //     history.push(`/user/${userid}/posts`)
    // },[]);
    
    const userPosts = useSelector(state=>state.posts);
    if (!user) {
    return(
        <div className='post-load-container'>
            <div className='post-load-body'>
                <i style={{color:'white'}}className="fa-solid fa-spinner fa-spin"></i>
            </div>
        </div>
    )
    }
  

    // if sessionUser matches userId passed in 
    // background image
    // profile pic, username
    // profile settings
    // dashboard that will switch between posts, likes and following
    // each post will have the ability to edit, delete
    // ability to search posts


    // when not matched with sessionUser
    // has option to follow 
    // does not have option to edit or delete posts
    
    return (
        
        <>
            <div className='show-container'>
                <div className='show-body'>
                    <div className='show-contents'>
                        <div className='profile-container'>
                            <header className='profile-header'>
                                <div className='bgimage-frame'>
                                    <img className='bgimage' src={user.background}/>
                                </div>
                                <div className='profile-bio-container'>
                                    <div className='profilepic-container'>
                                        <div className='profilepic-body'>
                                            <div className='profilepic-contents'>
                                                <div className='profilepic-frame'>
                                                    <img className='userPic' src={user.profilepic}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bio-container'>
                                        <h1 className='blogname'>{user.username}</h1>
                                        <div className='bio-container'>
                                            
                                        </div>
                                        <div className='header-buttons-contents'>
                                        {/* make this button follow if sessionuser != user */}
                                        { sessionUser && user.username === sessionUser.username &&
                                            <button className='profileSettings' onClick = {()=>setAccountSettings(true)}>
                                                <span>
                                                    <i className='fa-solid fa-gear'></i>
                                                    Account Settings
                                                </span>
                                            </button>
                                        }
                                            { sessionUser && user.username !== sessionUser.username && followed.length===0 &&
                                            <button className='profileSettings' onClick={event=>handleFollowButton(event)}>
                                                <span>
                                                    Follow
                                                </span>
                                            </button>
                                            }
                                            { sessionUser && user.username !== sessionUser.username && followed.length>0 &&
                                            <button className='profileSettings'  onClick={event=>handleUnfollowButton(event)}>
                                                <span>
                                                    Unfollow
                                                </span>
                                            </button>
                                            }
                                            { !sessionUser && 
                                            <button className='profileSettings' onClick={event=>handleFollowButton(event)}>
                                                <span>
                                                    Follow
                                                </span>
                                            </button>
                                            }
                                            {errors.length>0 &&
                                                <div className='userprofilefollowerror'>
                                                    <span>{errors[0]}</span>
                                                </div>
                                            }
                                            {/* { !sessionUser && 
                                            <button className='profileSettings' onClick={event=>handleUnfollowButton(event)}>
                                                <span>
                                                    Unfollow
                                                </span>
                                            </button>
                                            } */}
                                            
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {/* navigation for which posts to see
                            will be all,posts, likes, reblogs
                            will be filtered in descending creation
                            will switch between them with new routes */}
                            <div className='profilenavigation'>
                                
                                <div className='profilelinks'>
                                    <NavLink className={tabSelection===`/user/${user.id}/` ? 'active' : ''} 
                                    to={`/user/${userid}/posts`}>Posts</NavLink>
                                    <NavLink 
                                    to={`/user/${userid}/likes`}>Likes</NavLink>
                                    <NavLink 
                                    to={`/user/${userid}/followers`}>Followers</NavLink>
                                    <NavLink 
                                    to={`/user/${userid}/follows`}>Follows</NavLink>
                                </div>
                            </div>
                            <div className='profile-meat'>
                            <Switch>
                                <Route path='/user/:userid/posts' >
                                    <UserDashboard type={'userposts'}/>
                                </Route>
                                <Route path='/user/:userid/likes' >
                                    <UserDashboard  type={'likes'}/>
                                </Route>
                                <Route path='/user/:userid/follows'>
                                    <UserFollowDashboard type={'follows'} />
                                </Route>
                                <Route path='/user/:userid/followers'>
                                    <UserFollowDashboard type={'followers'} />
                                </Route>
                                <Route exact path='/user/:userid/'>
                                    {console.log('userhome')}
                                    <UserDashboard type={'userposts'} />
                                </Route>
                                <Redirect to='/user/:userid' />
                            </Switch>
                            </div>
                        </div>
                        <div className='show-contents-right'>

                        </div>
                    </div>


                </div>

            </div>
            { accountSettings && <Modal onClose={()=>setAccountSettings(false)}>
                
                    <AccountSettings closeModal={setAccountSettings} user={user}/>
            </Modal>}
        </>

    )
    
    //logic to show loading if posts is still being grabbed;
}

export default UserShowPage;