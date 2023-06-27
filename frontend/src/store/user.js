
// consts

import csrfFetch from "./csrf";

const RECEIVE_USER = 'api/RECEIVEUSER'
const DELETE_USER = 'api/DELETEUSER'


//action types

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const deleteUser = (userId) => ({
    type:DELETE_USER,
    userId
});


export const fetchUser = (username) => async(dispatch) =>{
    let response = await fetch(`/api/users/${username}`)
    if (response.ok){
        const user = await response.json();
        dispatch(receiveUser(user));
        return user;
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
        case RECEIVE_USER:
            newState[action.user.username] = action.user;
            return newState;
            
        case DELETE_USER:
            delete newState[action.user.username];
            return newState;
        default:
            return newState;
    }

}

export default userReducer;



