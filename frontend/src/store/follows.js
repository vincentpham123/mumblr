import csrfFetch from "./csrf";
import { createSelector } from "reselect";
import { receivePost } from "./posts";
import { receiveUsers } from "./user";
const RECEIVE_FOLLOWS ='/api/RECEIVEFOLLOWS'
const DELETE_FOLLOW = '/api/DELETEFOLLOW'      
const RECEIVE_FOLLOW = '/api/RECEIVEFOLLOW'

//actions

export const receiveFollows = (follows) =>({
type: RECEIVE_FOLLOWS,
follows
})

export const deleteFollow = (followId) => ({
    type: DELETE_FOLLOW,
    followId
});

export const receiveFollow = (follow) =>({
    type: RECEIVE_FOLLOW,
    follow
})

// getter 
export const userFollowed = (postAuthorid) => state => {
  return state.follows ? Object.values(state.follows).filter((follow)=> follow.userId === postAuthorid) : null;
}
// export const userFollowedSelector= createSelector(
//   (state,postAuthorid)=>()
// )
// thunk actions
export const createFollow = (follow) => async dispatch => {
    let response = await csrfFetch('/api/follows',{
        method: 'POST',
        body: JSON.stringify(follow)
    });
    if (response.ok){
        let data = await response.json();
        dispatch(receiveFollow(data));
        return data.id;
    }
}
export const removeFollow = (followId) => async dispatch => {
    let response = await csrfFetch(`/api/follows/${followId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      // let data = await response.json();
      dispatch(deleteFollow(followId));
    }
  };

  export const getFollows = (userid) => async dispatch =>{
    let response = await fetch(`/api/user/${userid}/follows`)
    if (response.ok){
      let data = await response.json();
      dispatch(receiveFollows(data.follows));
      dispatch(receiveUsers(data.users));
      return data;
    }
  }

  export const getFollowers = (userid) => async dispatch =>{
    let response = await fetch(`/api/user/${userid}/followers`)
    if (response.ok){
      let data = await response.json();
      dispatch(receiveFollows(data.follows));
      dispatch(receiveUsers(data.users));
      return data;
    }
  }



  const followsReducer = (state = {}, action) => {
    let newState = { ...state };
  
    switch (action.type) {
      case RECEIVE_FOLLOWS:
        return { ...newState, ...action.follows };
  
      case RECEIVE_FOLLOW:
        newState[action.follow.id] = action.follow;
        return newState;
  
      case DELETE_FOLLOW:
        delete newState[action.followId];
        return newState;
  
      default:
        return newState;
    }
  };
  
  export default followsReducer;