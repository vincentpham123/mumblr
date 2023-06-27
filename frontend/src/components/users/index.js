
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import * as postActions from '../../store/posts';
const UserShowPage =({userId}) =>{
    const dispatch = useDispatch();
    // need sessionUser to determine if it will be a 
    //user or otheruser render
    // each user will have a profile Pic, and backgroundImage
    // need to fetch user from backend
    useEffect(()=>{
        dispatch(postActions.fetchPosts());
    },[]);
    const sessionUser = useSelector(state=>state.session.user)
    const posts = useSelector(postActions.userPosts(userId));

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
        <>
            
        </>

    )
    
    //logic to show loaing if posts is still being grabbed;
}