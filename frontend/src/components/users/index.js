
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import * as postActions from '../../store/posts';
import * as userActions from '../../store/user';
import { Route , Switch,useParams, NavLink,Link,useHistory } from "react-router-dom";
import PostsDashboard from "./posts";
import './index.css';
import LikesDashboard from "./likes";
import UserDashboard from "./UserDashBoard";
const UserShowPage =() =>{
    const dispatch = useDispatch();
    const {userid} = useParams();
    const [pageType,setPageType] =useState('false');
    const [tabSelection,setTabSelection] = useState('posts');
    const history = useHistory();



    // need sessionUser to determine if it will be a 
    //user or otheruser render
    // each user will have a profile Pic, and backgroundImage
    // need to fetch user from backend
    const user= useSelector(state=>state.users[userid]);
    // const user = users[userid];
    const sessionUser = useSelector(state=>state.session.user);
    // this logic will be handled by the userdashboard
    useEffect(()=>{
        dispatch(userActions.fetchUser(userid))
            .then(res=>{
                console.log(res)
            })
    },[userid]);

    useEffect(()=>{
        history.push(`/user/${userid}/posts`)
    },[]);
    
    const userPosts = useSelector(state=>state.posts);
    // if (!user) return (null);
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
                                            <button className='profileSettings'>
                                                <span>
                                                    <i className='fa-solid fa-gear'></i>
                                                    Account Settings
                                                </span>
                                            </button>
                                        }
                                            { sessionUser && user.username !== sessionUser.username &&
                                            <button className='profileSettings'>
                                                <span>
                                                    Follow
                                                </span>
                                            </button>
                                            }
                                            { !sessionUser &&
                                            <button className='profileSettings'>
                                                <span>
                                                    Follow
                                                </span>
                                            </button>
                                            }
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
                                    <NavLink className='profilelink' to={`/user/${userid}/posts`}>Posts</NavLink>
                                    <NavLink className='profilelink' to={`/user/${userid}/likes`}>Likes</NavLink>
                                </div>
                            </div>
                            <div className='profile-meat'>
                            <Switch>
                                <Route exact path='/user/:userid/posts' >
                                    <UserDashboard type={'userposts'}/>
                                </Route>
                                <Route exact path='/user/:userid/likes' >
                                    <UserDashboard  type={'likes'}/>
                                </Route>
                                <Route path='/user/:userid/follows'>

                                </Route>
                                <Route path='/user/:userid/followers'>

                                </Route>
                            </Switch>
                            </div>
                        </div>
                        <div className='show-contents-right'>

                        </div>
                    </div>


                </div>

            </div>
        </>

    )
    
    //logic to show loading if posts is still being grabbed;
}

export default UserShowPage;