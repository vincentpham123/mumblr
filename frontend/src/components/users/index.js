
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import * as postActions from '../../store/posts';
// import * as userActions from '../../store/user';
import { Route , Switch,useParams } from "react-router-dom";
const UserShowPage =() =>{
    // const dispatch = useDispatch();
    // const params = useParams();
    // const username = params.username;
    // // need sessionUser to determine if it will be a 
    // //user or otheruser render
    // // each user will have a profile Pic, and backgroundImage
    // // need to fetch user from backend
    // useEffect(()=>{
    //     dispatch(userActions.fetchUser(username))
    //     dispatch(postActions.fetchPosts());
    // },[]);
    // const sessionUser = useSelector(state=>state.session.user);
    // const user = useSelector(state=> state.user);
    // const posts = useSelector(postActions.userPosts(user.id));

    // if sessionUser matches userId passed in 
    // background image
    // profile pic, username
    // profile settings
    //dashboard that will switch between posts, likes and following
    // each post will have the ability to edit, delete
    //ability to search posts


    //when not matched with sessionUser
    // has option to follow 
    // does not have option to edit or delete posts
    
    return (
        null
        // <>
        //     <div className='show-container'>
        //         <div className='show-body'>
        //             <div className='show-contents'>
        //                 <div className='profile-container'>
        //                     <header className='profile-container'>
        //                         <div className='bgimage-frame'>
        //                             <img className='bgimage' />
        //                         </div>
        //                         <div className='profile-bio-container'>
        //                             <div className='profilepic-frame'>
        //                                 <img />
        //                             </div>
        //                             <div className='bio-container'>
        //                                 <h1 className='blogName'></h1>
        //                                 <div className='bio-container'>
        //                                     <p  className='bio'></p>
        //                                 </div>
        //                                 <div className='header-buttons-contents'>
        //                                     {/* button for follow  */}
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </header>
        //                     {/* navigation for which posts to see
        //                     will be all,posts, likes, reblogs
        //                     will be filtered in descending creation
        //                     will switch between them with new routes */}
        //                     <div className='profilenavigation'></div>
        //                     <Switch>
        //                         <Route path=':username/all' >
        //                             {/* render all page */}
        //                         </Route>
        //                         <Route path=':username/posts' >
        //                             {/* render posts */}
        //                         </Route>
        //                         <Route path=':username/likes' >
        //                             {/* render likes */}
        //                         </Route>
        //                         <Route path=':username/reblogs' >
        //                             {/* render likes */}
        //                         </Route>
        //                     </Switch>
        //                 </div>
        //                 <div className='show-contents-right'>

        //                 </div>
        //             </div>


        //         </div>

        //     </div>
        // </>

    )
    
    //logic to show loaing if posts is still being grabbed;
}

export default UserShowPage;