import ShowPost from "../posts/showPost";
import { useEffect,useState,useRef,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postActions from "../../store/posts";
const TodayDashboard = () =>{
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    // pagenumber to pass to backend to pass the next batch of data
    // 
    const [pageNumber,setPageNumber]=useState(1);
    const [loading,setLoading] = useState(true);
    const [hasMore,setHasMore] = useState(false);
    const [error,setError] = useState(false);
    // const [posts,setPosts] = useState({});
    const observer = useRef();
    // const lastPostElementRef = useCallback(node=>{
    //     if(loading) return 
    //     if(observer.current) observer.current.disconnect();
        
    //     observer.current = new IntersectionObserver(entries =>{
    //         if (entries[0].isIntersecting && hasMore) {
    //             setPageNumber(prevPageNumber=> prevPageNumber +1 )
    //         }
    //     })
    //     if (node) observer.current.bserve(node)
    // },[loading,hasMore]);
    useEffect(()=>{
        dispatch(postActions.fetchPosts(1))
    },[])
    const posts = useSelector(state=>state.posts);

    //will trigger a dispatch for more data when
    // pagenumber changes
    // useEffect(()=>{
    //     setLoading(true);
    //     setError(false);
    //     dispatch(postActions.fetchPosts())
    //         .then(res => {
    //             setPosts(
    //                 state=>{
    //                     return [...state,...res];
    //                 }
    //             )
    //         })

    // },[]);
    const postsToShow=Object.values(posts);
    // const trendingPosts=postsToShow.sort(()=>.5-Math.random());
    // let selected = trendingPosts.slice(0,10);
    
    // if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    return (
        <>
        {postsToShow.map ((post)=>{
        return <ShowPost post={post} profile={false}/>})
        }
        </>
    );




}

export default TodayDashboard;