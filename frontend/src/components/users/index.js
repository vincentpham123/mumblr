
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import * as postActions from '../../store/posts';
import * as userActions from '../../store/user';
import { Route , Switch,useParams, Link } from "react-router-dom";
import PostsDashboard from "./posts";
import './index.css';
const UserShowPage =() =>{
    const dispatch = useDispatch();
    const params = useParams();
    const username = params.username;
    // need sessionUser to determine if it will be a 
    //user or otheruser render
    // each user will have a profile Pic, and backgroundImage
    // need to fetch user from backend
    useEffect(()=>{
        // dispatch(userActions.fetchUser(username))
        dispatch(postActions.fetchPosts());
        dispatch(userActions.fetchUsers());
    },[]);

    const sessionUser = useSelector(state=>state.session.user);
    const user = useSelector(userActions.getUser(username))[0];
    
    const userPosts = useSelector(postActions.userPosts(username));
    if (!user) return (null);
    console.log(user.bgpic);
    // console.log(post);
    // if (!post) return(null);
  

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
                                    <img className='bgimage' />
                                </div>
                                <div className='profile-bio-container'>
                                    <div className='profilepic-frame'>
                                        <img />
                                    </div>
                                    <div className='bio-container'>
                                        <h1 className='blogName'></h1>
                                        <div className='bio-container'>
                                            <p  className='bio'></p>
                                        </div>
                                        <div className='header-buttons-contents'>
                                            {/* button for follow  */}
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {/* navigation for which posts to see
                            will be all,posts, likes, reblogs
                            will be filtered in descending creation
                            will switch between them with new routes */}
                            <div className='profilenavigation'>
                                <div className='search'>P</div>
                                <div className='profilelinks'>
                                    <Link to={`/${username}/posts`}>Posts</Link>
                                    <p className='userlinktabs'> Likes</p>
                                    <p className='userlinktabs'>Reblogs</p>
                                </div>
                            </div>
                            <Switch>
                                <Route path='/:username/posts' >
                                    <PostsDashboard posts={userPosts} />
                                </Route>
                                <Route path='/:username/likes' >
                                    {/* render likes */}
                                </Route>
                                <Route path='/:username/reblogs' >
                                    {/* render likes */}
                                </Route>
                            </Switch>
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