import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState,useCallback,useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as followActions from '../../store/follows';
import FollowShow from "./UserFollowShow";

const UserFollowDashboard = ({type}) =>{
    //type will determine if i grab followers or follows 
    const {userid} = useParams();
    const [usersMap,setUsersMap] = useState([]);
    const [moreUsers,setMoreUsers] = useState(true);
    const [pageNumber,setPageNumber] = useState(1);
    const [loading,setLoading]=useState(true);
    const observer = useRef();
    const dispatch = useDispatch();
    const lastUserRef = useCallback(node=>{
        if(loading) return;
        if (observer.current) observer.current.disconnect();
        if(!moreUsers) return;

        observer.current = new IntersectionObserver(entries=>{
            if (entries[0].isIntersecting && moreUsers) {
                setPageNumber(state=> state+1);
            }
        })
        if (node)observer.current.observe(node);
    })
    useEffect(()=>{
        setUsersMap([]);
        setLoading(true);
        // dispatch(followActions.clearFollow());
        if (type==='follows'){
            dispatch(followActions.getFollows(userid));
        } else {
            //fetch followers 
            dispatch(followActions.getFollowers(userid));
        }
    },[type])

    const followState = useSelector(state=> state.follows);
    useEffect(()=>{
        setLoading(true);
        setUsersMap(state=>{
          
            const existingFollowIds = state.map((follow)=>follow.id)
            const newFollows = Object.values(followState).filter(
                (follow)=> !existingFollowIds.includes(follow.id)
            )
            const newState=[];
            [...state,...newFollows].forEach((follow)=>{
                newState.push(follow)
            })
            return newState;
        })
        setLoading(false);
    },[pageNumber])
   
    
    return(
        <>
        <div className='follow-dash-container'>
            <div className='follow-dash-body'>
                {Object.values(followState).map((follow,index)=>{
                    {/* return(
                        <div ref={lastUserRef} key={follow.id} className='likeslist-container'>
                            <FollowShow id={follow.userId} type={type} />
                        </div>
                        ) */}
                    if(type==='follows' && follow.followerId==userid){
                        return(
                        <div ref={lastUserRef} key={follow.id} className='likeslist-container'>
                            <FollowShow id={follow.userId} type={type} />
                        </div>
                        )
                    } 
                    if (type==='followers' && follow.userId==userid){
                        return(
                        <div ref={lastUserRef} key={follow.id} className='likeslist-container'>
                            <FollowShow id={follow.followerId} type={type} />
                        </div>
                        )
                    }
                })
                    
                }

            </div>

        </div>
        </>
    )
}

export default UserFollowDashboard;