import csrfFetch from "./csrf"
import { createSelector } from "reselect"
import { receivePost } from "./posts"
const RECEIVE_COMMENT = 'api/RECEIVECOMMENT'
const DELETE_COMMENT = 'api/DELETECOMMENT'
const RECEIVE_COMMENTS= 'api/RECEIVECOMMENTS'

//actions
export const receiveComments = (comments)=>({
    type: RECEIVE_COMMENTS,
    comments
})
export const receiveComment = (comment)=>({
    type: RECEIVE_COMMENT,
    comment
})

export const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

//getter 
// export const postComments = (postid) => (state) => {
//     return state?.posts ? Object.values(state.comments).filter((comment)=> comment.postId ===postid) : null;
    
// }
const getCommentState = state=> state.comments;
export const postComments = (postid) => (state) => {
    return state?.posts ? Object.values(state.comments).filter((comment)=> comment.postId ===postid) : null;
    
}

// export const postComments = (postid) => createSelector(
//     [getCommentState],
//     (comments) => comments.filer((comment)=>comment.postId ===postid)
//     // return state?.posts ? Object.values(state.comments).filter((comment)=> comment.postId ===postid) : null;
    
// )

// export const postCommentsSelector = createSelector(
//     getCommentState,
//     (_,postId) => postId,
//     postComments
// );
//thunk actions

export const createComment = (formData) =>async dispatch=> {
    let response = await csrfFetch('/api/comments',{
        body: formData,
        method: 'POST'
    })

    if (response.ok){
        let data = await response.json();
        dispatch(receiveComment(data.comment));
        dispatch(receivePost(data.post));
        return data;
    }
}

export const updateComment = (formData,commentId) => async dispatch => {
    let response = await csrfFetch(`/api/comments/${commentId}`,{
        body: formData,
        method: 'PATCH'
    })

    if (response.ok) {
        let data = await response.json();
        dispatch(receiveComment(data.comment));
    }
}


export const removeComment = (commentId) => async dispatch =>{
    let response = await csrfFetch(`/api/comments/${commentId}`,{
    method:'DELETE'});

    if (response.ok){
        let data = await response.json();
        dispatch(deleteComment(commentId))
        dispatch(receivePost(data.post));

    }

}

const commentsReducer = (state={},action)=>{
    let newState={...state};

    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {...newState,...action.comments};

        case RECEIVE_COMMENT:
            newState[action.comment.id]=action.comment;
            return newState;
        case DELETE_COMMENT:
            delete newState[action.commentId];
            return newState
        default:
            return newState;
    }
}

export default commentsReducer;