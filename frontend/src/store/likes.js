// constants
import csrfFetch from "./csrf";

import { receivePosts, receivePost } from "./posts";
import { createSelector} from "reselect";

const RECEIVE_LIKES = 'api/RECEIVELIKES';
const DELETE_LIKE = 'api/DELETELIKE';
const RECEIVE_LIKE = 'api/RECEIVELIKE';

// actions 

export const receiveLikes = (likes) =>({
    // will be called when fetching posts
    // will update likes to be contain the likes for the posts in the state

    type: RECEIVE_LIKES,
    likes
})
export const receiveLike = (like) => ({
    type: RECEIVE_LIKE,
    like
})
export const deleteLike = (likeid) => ({
    // only remove the like if sessionUser id matches the like id
    // can handle that in the frontend
    // 
    type: DELETE_LIKE,
    likeid
})
//getter
const getLikesState = (state) => state.likes;
// export const postLikes = (postid) => (state) => {
//     return state?.likes ? Object.values(state.likes).filter((like)=>like.postId ===postid) : null;
    
// }
export const postLikes = (postid) => createSelector(
    state=>state.likes,
    (likes)=>{
        return likes ? Object.values(likes).filter((like)=> like.postId===postid) : null;
    }
)
export const postLikesSelector = createSelector(
    getLikesState,
    (_,postId) => postId,
    postLikes

);
// export const userLike = (userId=0,postId) => state =>{
//     return state?.likes ? Object.values(state.likes).filter((like)=>like.userId===userId && like.postId ==postId) : null;
// }
export const userLike= (userId=0,postId) => createSelector(
    state=>state.likes,
    (likes)=>{
        return likes ? Object.values(likes).filter((like)=>like.userId===userId&&like.postId==postId) : null;
    }
)
export const userLikesSelector = createSelector(
    getLikesState,
    (_,userId=0,postId)=>({userId,postId}),
    userLike
)

//thunk actions 
//will need a createlike and deletelike thunk action
// no need for thunk action to receive likes
// can receive likes from post fetches since likes will be associated with the likes from that post 
export const fetchUserLikes = () => async dispatch => {
    let response = await fetch('/api/likes')
    
    // will fetch all likes for a user, payload will include the posts as well
    // wil need to call dispatch(receivePosts(payload.posts))

    if (response.ok){
        let data = await response.json();
        dispatch(receivePosts(data.posts))
        dispatch(receiveLikes(data.likes))
        return data
    }
}
export const removeLike = (likeid) => async dispatch => {
    let response = await csrfFetch(`/api/likes/${likeid}`,
    {method:'DELETE'})
    if (response.ok){
        //return likes with deleted user like
        let data = await response.json();
       
        dispatch(deleteLike(likeid));
        dispatch(receivePost(data.post));
        
    }
}
export const createLike = (like) => async dispatch => {
    let response = await csrfFetch('/api/likes',{
    body: JSON.stringify(like),
    method: "POST"
        });
    if (response.ok){
        let data = await response.json();
        dispatch(receiveLike(data.like));
        dispatch(receivePost(data.post));
    }

    //fetch like creation

    // if response is ok, 
    //update the state to include the new like 

}

const likesReducer = (state={},action) =>{
    const newState = {...state};

    switch (action.type) {
        case RECEIVE_LIKES:
            //will receive likes for posts currently in state
            return {...newState,...action.likes}
            
        case DELETE_LIKE:
            delete newState[action.likeid];
            return newState;
        case RECEIVE_LIKE:
            newState[action.like.id] = action.like;
            return newState
        default:
            return newState;
    }
}

export default likesReducer;



