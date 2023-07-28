import ShowPost from "../posts/showPost";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postActions from "../../store/posts";
import * as userActions from '../../store/user'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
const SpotLightDashboard = () =>{
    const [loading,setLoading] = useState(true);
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const posts = useSelector(state=>state.posts);
    const [postsMap,setPostsMap] = useState([]);
    // can write a fetch that sorts by likes.count descending. limit 10
    // select random ones
   
    useEffect(()=>{
        dispatch(postActions.clearPosts())
        setLoading(true);
        dispatch(userActions.fetchUser(1,'spotlight'))
        .then(()=>{
            setLoading(false);
        })
        return ()=>{
            setPostsMap([]);
            dispatch(postActions.clearPosts());
        }
    },[dispatch]);
    useEffect(()=>{
        setPostsMap([...Object.values(posts)]);
        return ()=>{
            setPostsMap([]);
        }
    },[posts])
    const trendingPosts=[];
    // if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    return (
        <>
        { loading &&
            <div className='post-load-container'>
                <div className='post-load-body'>
                    <i style={{color:'white'}}className="fa-solid fa-spinner fa-spin"></i>
                </div>
        </div>}
        {postsMap.map ((post)=>{
        return (
            <div className='postMain' key={post.id}>
                <ShowPost key={post.id} post={post} profile={false}/>
            </div>
        )
        })
        }
        </>
    );




}

export default SpotLightDashboard;