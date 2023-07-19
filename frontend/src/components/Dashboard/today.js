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
    const observer = useRef();
    const lastPostElementRef = useCallback(node=>{
        if(loading) return 
        if(observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries =>{
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber=> prevPageNumber +1 )
            }
        })
        if (node) observer.current.observe(node)
    },[loading]);
    useEffect(()=>{
        dispatch(postActions.fetchPosts(pageNumber));
    },[dispatch])
    const posts = useSelector(state=>state.posts);

    //will trigger a dispatch for more data when
    // pagenumber changes
    useEffect(()=>{
        setLoading(true);
        setError(false);
        dispatch(postActions.fetchPosts(pageNumber))
            .then( () =>{
                setLoading(false);
            })

    },[pageNumber]);
    useEffect(()=>{
        console.log(pageNumber)
    },[pageNumber]);
    const postsToShow=Object.values(posts);
    
    
    // if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    return (
        <>
        {postsToShow.map ((post,index)=>{
            if (postsToShow.length === index +1) {
                return (
                    <div ref={lastPostElementRef} key={post.id} className='postMain'>
                    <ShowPost  post={post} profile={false}/>
                    </div>)
            } else {
                return( 
                    <div className='postMain' key={post.id}>
                        <ShowPost  post={post} profile={false}/>
                    </div>
                )
            }
        })}
        </>
    );




}

export default TodayDashboard;