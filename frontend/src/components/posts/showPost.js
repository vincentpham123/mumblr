import "./styling/showPost.css";
import PostHeader from "./PostHeader";
import PostText from "./PostText";
import * as postActions from '../../store/posts';
import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import UpdatePostModal from "./UpdatePostModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostFooter from "./PostFooter";
const ShowPost = ({post})=>{
const [followed,setFollowed] = useState(null);
const sessionUser = useSelector(state=>state.session.user);
useEffect(()=>{
    const fetchData = async () => {
        if (sessionUser) {
          const result = await fetch(`/api/checkfollowstatus/${post.author.id}`);
          if (result.ok) {
            const data = await result.json();
            setFollowed(data.result);
          }
        }
      };
      fetchData();
    }, []);
    if (!post){
        return (
            <p>Loading</p>
        )
    }
    return (
        <>
        <div className='postMain'>
            <div className='postContainer'>
                <article className='postContent'>
                    <div className='author-pfp'>
                        <div className='author-pfp-frame'>
                            <img src={post.author.profilepic}></img>
                        </div>
                    </div>
                        <PostHeader post={post} followed={followed} setFollowed={setFollowed} />
                    <div className='post-meat'>
                        <PostText post={post} />
                    </div>
                    <PostBlaze  post={post} />
                    {/* need to add post footer */}
                    <PostFooter post={post}/>
                </article>
            </div>
        </div>
        </>
    )
}

const PostBlaze = ({post}) => {
    const sessionUser = useSelector((state)=>state.session.user);
    const dispatch = useDispatch();
    const handleDelete =()=>{
        const postId = post.id;
        dispatch(postActions.removePost(postId));
    }

    
    return (
        <>
            <div className='post-blaze-container'>
            {/* render if it is a profile show page */}
                {sessionUser && post.author.username === sessionUser.username &&
                    <>
                    <button className='profileEdits' onClick={handleDelete}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <Link className='profileEdits' to={`/edit/${post.id}`}>
                        <i className="fa-solid fa-pencil"></i>
                    </Link>
                    </>
                
                }

            </div>
        </>
    )
}

export default ShowPost;
