
// consts

import csrfFetch from "./csrf";
import { receivePost, receiveUserPosts } from "./posts";
const RECEIVE_USER = 'api/RECEIVEUSER'
const DELETE_USER = 'api/DELETEUSER'
const RECEIVE_USERS = 'api/RECEIVEUSERS'

//action types

export const receiveUser = (payload) => ({
    type: RECEIVE_USER,
    user: payload
})

export const receiveUsers = (users) =>({
    type: RECEIVE_USERS,
    users
})
export const deleteUser = (userId) => ({
    type:DELETE_USER,
    userId
});

//gett
export const getUser = id => state =>{
    return state?.users ? state.users[id] : null;
    
}
export const fetchUsers =() => async(dispatch) => {
    let response = await fetch(`/api/users`)
    if (response.ok){
        const users = await response.json();
        dispatch(receiveUsers(users));
        return users;
    }
}
export const fetchUser = (id) => async(dispatch) =>{
    // debugger
    let response = await fetch(`/api/users/${id}`)
    if (response.ok){
        const data = await response.json();
        dispatch(receiveUser(data.user));
        dispatch(receiveUserPosts(data.posts));
        return data;
    }

}

export const removeUser = (userid) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userid}`,{
        method: 'DELETE'
    });
    if (response.ok){
        //when a user deletes i will call logout and then destroy
        dispatch(deleteUser(userid))
    }
};

//users reducer

const userReducer = (state={},action) => {
    const newState={...state};
    switch (action.type) {
        case RECEIVE_USERS:
            return {...state, ...action.users}; 

        case RECEIVE_USER:
            newState[action.user.id]=action.user;
            return newState;
        case DELETE_USER:
            delete newState[action.user.username];
            return newState;
        default:
            return newState;
    }

}

export default userReducer;



