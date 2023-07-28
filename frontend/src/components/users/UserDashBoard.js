import ShowPost from "../posts/showPost";
import { useEffect,useState,useRef,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useParams,Link} from "react-router-dom";
import * as postActions from "../../store/posts";
//instead of using fetchPosts, will use User posts with Params

const UserDashboard = ( {type}) =>{
    const {userid} = useParams();
    //params will contain id
    
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const [postsMap,setPostsMap] = useState([]);
    const [pageNumber,setPageNumber]=useState(1);
    const [loading,setLoading] = useState(true);
    const [initialLoad,setInitialLoad]=useState(true)
    const [hasMore,setHasMore] = useState(false);
    const [error,setError] = useState([]);
    const [morePosts,setMorePosts]=useState(true);
    const [noPosts,setNoPosts] = useState(false);
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
        setPageNumber(1);
        dispatch(postActions.clearPosts());
        setLoading(true);
        setError(false);
        setHasMore(true);
        setMorePosts(true);
        setNoPosts(false);
        setInitialLoad(false);
        setTimeout(()=>{
        dispatch(postActions.fetchPosts(pageNumber,type,userid))
            .then(res=>{
                setPostsMap([]);
                setMorePosts(res.postsleft.postsLeft);
                if(!res.posts){
                    setNoPosts(true);
                    setLoading(false);
                } else setNoPosts(false);

            })
        },500)
    },[type,userid])
    useEffect(()=>{
        if (postsMap.length===0){
            setInitialLoad(true);
        } else setInitialLoad(false);
    },[postsMap])
    const posts = useSelector(state=>state.posts);
    //will trigger a dispatch for more data when
    // pagenumber changes
    useEffect(()=>{
        setError(false);
        setLoading(true);
        if (pageNumber!==1){
        dispatch(postActions.fetchPosts(pageNumber,type,userid))
            .then((res) =>{
                setMorePosts(res.postsleft.postsLeft);
                setLoading(false);
            })
        } else{
            setLoading(false);
        }
    },[pageNumber]);
    useEffect(()=>{
      
        setPostsMap(state=>{
            const stateCopy=[...state];
            Object.values(posts).forEach ((post)=>{
                //update info for each post 
                const postIndex = stateCopy.findIndex((origPost)=>origPost.id===post.id)
                if (postIndex!==-1){
                    stateCopy[postIndex]={...post};
                }
            })
            const existingPostIds = state.map((post)=>post.id);
            const newPosts = Object.values(posts).filter(
                (post)=> !existingPostIds.includes(post.id)
            )
            const newState=[];
            [...stateCopy,...newPosts].forEach((post)=>{
                newState.push(post);
            })
            newState.forEach((post,index)=>{
                const storeIndex=Object.values(posts).findIndex((storePost)=>storePost.id===post.id)
                if (storeIndex===-1){
                    newState.splice(index,1);
                }
            })
            newState.sort((post1, post2) => {
                const timestamp1 = new Date(post1.dateCreated + ' ' + post1.timeCreated).getTime();
                const timestamp2 = new Date(post2.dateCreated + ' ' + post2.timeCreated).getTime();
              
                return timestamp1 < timestamp2 ? 1 : timestamp1 > timestamp2 ? -1 : 0;
              });
            newState.sort((post1,post2)=>{
                return (post1.dateCreated<post2.dateCreated && post1.timeCreated<post2.timeCreated) ? 1 : (post1.dateCreated>post2.dateCreated && post1.timeCreated>post2.timeCreated) ? -1 : 0;
            })
            // setLoading(false);
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
        {type==='likes' && noPosts && 
            <div className='noposts-message'>
                <h2>Empty :(</h2>
                <h2>Go out and like some posts! :)</h2>
                <i className="fa-solid fa-otter fa-bounce"></i>
            </div>
        }
        {type==='userposts' && noPosts && 
            <div className='nouserposts-message'>
                <h2>Empty :(</h2>
                <h2>A Blog Post will fix that!</h2>
                <div className='empty-post-button'>
                    <Link to='/new' className='empty-post-link'>
                        <i className="fa-sharp fa-solid fa-pencil animation-pencil" ></i>
                    </Link>
                </div>
            </div>
        }

        {!initialLoad&&postsMap.map ((post,index)=>{
            if (postsMap.length === index +1 ) {
                return (
                    <div ref={lastPostElementRef} key={post.id} className='postMain'>
                    <ShowPost key={index} post={post} profile={true}/>
                    </div>)
            } else {
                return( 
                    <div className='postMain' key={post.id}>
                        <ShowPost  key={index} post={post} profile={true}/>
                    </div>
                )
            }
        })}
        {loading &&  
            <div className='post-load-container'>
                <div className='post-load-body'>
                    <i className="fa-solid fa-spinner fa-spin userload"></i>
                </div>
            </div>}
        </>
    );




}

export default UserDashboard;