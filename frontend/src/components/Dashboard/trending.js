import ShowPost from "../posts/showPost";
import { useEffect,useState,useRef,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useParams} from "react-router-dom";
import * as postActions from "../../store/posts";
const Trending = () =>{
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const params = useParams();
    // pagenumber to pass to backend to pass the next batch of data
    // 
    const [postsMap,setPostsMap] = useState([]);
    const [pageNumber,setPageNumber]=useState(1);
    const [hasMore,setHasMore] = useState(false);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [morePosts,setMorePosts]=useState(true);
    const observer = useRef();
    const lastPostElementRef = useCallback(node=>{
        if(loading) return ;
        if(observer.current) observer.current.disconnect();
        if(!morePosts) return;
        
        observer.current = new IntersectionObserver(entries =>{
            console.log(morePosts);
            if (entries[0].isIntersecting && morePosts) {
                setPageNumber(prevPageNumber=> prevPageNumber +1 )
            }
        })
        if (node) observer.current.observe(node);
    },[loading,morePosts]);
    useEffect(()=>{
        dispatch(postActions.clearPosts());
        dispatch(postActions.fetchPosts(pageNumber,'trending'))
            .then(res=>{
                setMorePosts(res.postsleft.postsLeft);
            })
    },[])
    const posts = useSelector(state=>state.posts);

    //will trigger a dispatch for more data when
    // pagenumber changes
    useEffect(()=>{
        setLoading(true);
        setError(false);
        // dispatch(postActions.clearPosts());
        dispatch(postActions.fetchPosts(pageNumber,'trending'))
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
        return ()=>{
            setPostsMap([]);
        }
    },[posts])
    const postsToShow=Object.values(posts);
    
    // if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    return (
        <>
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
        </>
    );




}

export default Trending;