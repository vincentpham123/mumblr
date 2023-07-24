import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState,useEffect } from "react";

const FollowShow = ({ id,type})=>{
    //can pull user from the state with follow id and type 
    //if follower, can pull from selector with followerid 
    //if follows, can pull from selector with userid
    // const user = type==='follows' ? useSelector(state=>state.users[follow.user_id]) : useSelector(state=>state.users[follow.follower_id]);


    const user = useSelector(state=>state.users[id]);
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
                        <button className='userFollow'>
                            {/* onClick will trigger a follow for the sessionUser */}
                            <span>Follow</span>
                        </button>

                    </div>

                </div>

            </div>
        </div>

 
)

}

export default FollowShow;