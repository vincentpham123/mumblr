import ShowPost from "../posts/showPost";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postActions from "../../store/posts";
const PostsDashboard = ({posts}) =>{
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    if (!posts) return null;
    
    // if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    return (
        <>
        {posts.map ((post)=>{
        return <ShowPost post={post} profile={true}/>})
        }
        </>
    );
}
export default PostsDashboard;