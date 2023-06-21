import ShowPost from "../posts/showPost";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";
const TodayDashboard = () =>{
    const dispatch = useDispatch();
    const randomPost = Math.floor(Math.random()*50)+1;
    const [test,setTest] = useState('')
    const post = useSelector(state=>state.posts[2])
    console.log(post);
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    useEffect(()=>{
        dispatch(postActions.fetchPost(2));
    },[]);
    return (
        <ShowPost post={post} />
    );




}

export default TodayDashboard;