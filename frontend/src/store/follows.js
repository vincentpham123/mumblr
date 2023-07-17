import csrfFetch from "./csrf";

const RECEIVE_FOLLOWS ='/api/RECEIVEFOLLOWS'
const DELETE_FOLLOW = '/api/DELETEFOLLOW'      
const RECEIVE_FOLLOW = '/api/RECEIVEFOLLOW'

//actions

export const receiveFollows = (follows) =>({
type: RECEIVE_FOLLOWS,
follows
})

export const deleteFollow = (followid) => ({
    type: DELETE_FOLLOW,
    followid
});

export const receiveFollow = (follow) =>({
    type: RECEIVE_FOLLOW,
    follow
})


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
      return 0;
    }
  };

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