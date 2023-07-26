import ShowPost from "../posts/showPost";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postActions from "../../store/posts";
import * as userActions from '../../store/user'
const SpotLightDashboard = () =>{
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const posts = useSelector(state=>state.posts);
    // can write a fetch that sorts by likes.count descending. limit 10
    // select random ones
   
    useEffect(()=>{
        dispatch(postActions.clearPosts())

        dispatch(userActions.fetchUser(1,'spotlight'));
        return ()=>{
            dispatch(postActions.clearPosts())
        }
    },[]);
    const postsToShow=Object.values(posts);
    const trendingPosts=[];
    // if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    return (
        <>
        {postsToShow.map ((post)=>{
        return (
            <div className='postMain' key={post.id}>
                <ShowPost post={post} profile={false}/>
            </div>
        )
        })
        }
        </>
    );




}

export default SpotLightDashboard;