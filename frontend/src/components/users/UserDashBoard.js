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
    const [initalLoad,setInitialLoad]=useState(false)
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
        setPageNumber(1);
        dispatch(postActions.clearPosts())
        dispatch(postActions.fetchPosts(pageNumber,type,userid))
            .then(res=>{
                setPostsMap([]);

                setMorePosts(res.postsleft.postsLeft);
                // updatePostsMap(Object.values(res.posts))

            })
    },[type])
   
    const posts = useSelector(state=>state.posts);

    //will trigger a dispatch for more data when
    // pagenumber changes
    useEffect(()=>{
        setError(false);
        // dispatch(postActions.clearPosts());
        console.log(pageNumber)
        dispatch(postActions.fetchPosts(pageNumber,type,userid))
            .then((res) =>{
                setMorePosts(res.postsleft.postsLeft);
                // updatePostsMap(Object.values(res.posts))
            })
    },[pageNumber]);
    useEffect(()=>{
        // console.log('triggered');
        setLoading(true);
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
            // newState.forEach((post,index)=>{
            //     const storeIndex=Object.values(posts).findIndex((storePost)=>storePost.id===post.id)
            //     if (storeIndex===-1){
            //         newState.splice(index,1);
            //     }
            // })
            newState.sort((post1, post2) => {
                const timestamp1 = new Date(post1.dateCreated + ' ' + post1.timeCreated).getTime();
                const timestamp2 = new Date(post2.dateCreated + ' ' + post2.timeCreated).getTime();
              
                return timestamp1 < timestamp2 ? 1 : timestamp1 > timestamp2 ? -1 : 0;
              });
            newState.sort((post1,post2)=>{
                return (post1.dateCreated<post2.dateCreated && post1.timeCreated<post2.timeCreated) ? 1 : (post1.dateCreated>post2.dateCreated && post1.timeCreated>post2.timeCreated) ? -1 : 0;
            })
            return newState;
        })
        // console.log(postsMap);
        setLoading(false);
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
        {type==='likes' && loading && postsMap.length==0 &&
            <div className='noposts-message'>
                <h2>Empty :(</h2>
                <h2>Follow some Users to populate For You page!!!</h2>
                <i className="fa-solid fa-otter fa-bounce"></i>
            </div>
        }
        {type==='userposts' && loading && postsMap.length==0 &&
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

        {postsMap.map ((post,index)=>{
            if (postsMap.length === index +1 ) {
                return (
                    <div ref={lastPostElementRef} key={post.id} className='postMain'>
                    <ShowPost  post={post} profile={true}/>
                    </div>)
            } else {
                return( 
                    <div className='postMain' key={post.id}>
                        <ShowPost  post={post} profile={true}/>
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