import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState,useEffect } from "react";
import * as followActions from '../../store/follows';
import { useDispatch } from "react-redux";
const FollowShow = ({ id,type})=>{
    //can pull user from the state with follow id and type 
    //if follower, can pull from selector with followerid 
    //if follows, can pull from selector with userid
    // const user = type==='follows' ? useSelector(state=>state.users[follow.user_id]) : useSelector(state=>state.users[follow.follower_id]);
    // console.log(id);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const followed = useSelector(followActions.followsUser(id,sessionUser,type));
    const user = useSelector(state=>state.users[id]);
    const [errors,setErrors] = useState([]);
    const handleFollowButton = (event)=>{
        event.preventDefault();
        if(!sessionUser){
            setErrors(['Login to Follow!'])
            setTimeout(()=>{
                setErrors([])
            },5000)
        } else{
            const follow={user_id: id, follower_id: sessionUser.id}
            dispatch(followActions.createFollow(follow));
        }
    }
    const handleUnfollowButton = (event) =>{
        event.preventDefault();
        dispatch(followActions.removeFollow(followed[0].id));
    }

    if (!user) return null;
    return(
            <div className='likeslist-body'>
            <div className='likeslist-content'>
                {/* this is where i will map over the likers. will be pulled from the likes where post_id matches the post */}
                <div className='liker-container'>
                    <div className='liker-profilepic-container'>
                        <div className="liker-profilepic-body">
                            <Link className='liker-link' to={`/user/${user.id}`}>
                                <img className='liker-pic' src={user.profilepic}></img>
                            </Link>
                        </div>

                    </div>
                    <div className="liker-information">
                        <div className='liker-username'>
                            <span>{user.username}</span>
                        </div>
                        {followed.length===0 && <button onClick={(event)=>handleFollowButton(event)} className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>Follow</span></button>}
                        {followed.length>0 && <button onClick={(event)=>handleUnfollowButton(event)} className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>Unfollow</span></button>}

                    </div>

                </div>

            </div>
        </div>

 
)

}

export default FollowShow;