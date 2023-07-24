import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState,useCallback,useEffect,useRef } from "react";
import { useSelector } from "react-redux";



const UserFollowDashboard = ({type}) =>{
    //type will determine if i grab followers or follows 
    const {userid} = useParams
    const [usersMap,setUsersMap] = useState([]);
    const [moreUsers,setMoreUsers] = useState(true);
    const [pageNumber,setPageNumber] = useState(1);
    const observer = useRef();


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
        if (type==='follows'){
            //fetch follows
        } else {
            //fetch followers 
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
        <div className='follow-dash-container'>
            <div className='follow-dash-body'>
                {/* here is where i will show the followers/follows */}
                {/* will map through usersMap */}
            </div>

        </div>
    )
}