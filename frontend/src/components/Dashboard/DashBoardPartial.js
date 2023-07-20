import ShowPost from "../posts/showPost";
import { useEffect,useState,useRef,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useParams} from "react-router-dom";
import * as postActions from "../../store/posts";
const DashboardPartial = ({type}) =>{
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const [postsMap,setPostsMap] = useState([]);
    const [pageNumber,setPageNumber]=useState(1);
    const [loading,setLoading] = useState(true);
    const [hasMore,setHasMore] = useState(false);
    const [error,setError] = useState(false);
    const [morePosts,setMorePosts]=useState(true);
    const observer = useRef();
    const lastPostElementRef = useCallback(node=>{
        if(loading) return ;
        if(observer.current) observer.current.disconnect();
        if(!morePosts) return;
        
        observer.current = new IntersectionObserver(entries =>{
            if (entries[0].isIntersecting && morePosts) {
                setPageNumber(prevPageNumber=> prevPageNumber +1 )
            }
        })
        if (node) observer.current.observe(node);
    },[loading,morePosts]);
    useEffect(()=>{
        setPostsMap([]);
        dispatch(postActions.clearPosts())
        dispatch(postActions.fetchPosts(pageNumber,type))
            .then(res=>{
                setMorePosts(res.postsleft.postsLeft);
            })
    },[type])
   
    const posts = useSelector(state=>state.posts);

    //will trigger a dispatch for more data when
    // pagenumber changes
    useEffect(()=>{
        setLoading(true);
        setError(false);
        // dispatch(postActions.clearPosts());
        dispatch(postActions.fetchPosts(pageNumber,type))
            .then( (res) =>{
                setLoading(false);
                setMorePosts(res.postsleft.postsLeft);
            })
    },[pageNumber]);
    useEffect(()=>{
        setPostsMap(state=>{
            const existingPostIds = state.map((post)=>post.id);
            const newPosts = Object.values(posts).filter(
                (post)=> !existingPostIds.includes(post.id)
            )
            const newState=[];
            [...state,...newPosts].forEach((post)=>{
                newState.push(post);
            })
            return newState;
        })
    },[posts])


    const postsToShow=Object.values(posts);
    
    // if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    if (!posts){
        console.log('loading')
    }
    return (
        <>
        {!posts && <div><h1>Loading</h1></div> }
        {postsMap.map ((post,index)=>{
            if (postsMap.length === index +1 ) {
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
        {loading && 
            <div className='post-load-container'>
                <div className='post-load-body'>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </div>
            </div>}
        </>
    );




}

export default DashboardPartial;