import ShowPost from "../posts/showPost";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postActions from "../../store/posts";
const TrendingDashboard = () =>{
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const randomPost = Math.floor(Math.random()*50)+1;
    const posts = useSelector(state=>state.posts);
    // can write a fetch that sorts by likes.count descending. limit 10
    // select random ones
   
    useEffect(()=>{
        dispatch(postActions.fetchPosts());
    },[]);
    const postsToShow=Object.values(posts);
    const trendingPosts=[];
    console.log(postsToShow);
    // if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    return (
        <>
        {postsToShow.map ((post)=>{
            console.log(post);
        return <ShowPost post={post} profile={false}/>})
        }
        </>
    );




}

export default TrendingDashboard;