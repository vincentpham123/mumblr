import csrfFetch, { storeCSRFToken } from "./csrf";
import { receiveLikes } from "./likes";
import {receiveComments} from './comments';
import { receiveUsers } from "./user";
import { receiveFollows } from "./follows";
// consts 

const RECEIVE_POST = "api/RECEIVE_POST";
const RECEIVE_POSTS = "api/RECEIVE_POSTS";
const REMOVE_POST = 'api/UPDATE_POST';
const RECEIVE_USER_POST = "api/USERNAME/RECEIVE_POSTS";
const CLEAR_POSTS = 'api/CLEAR_POSTS';

// action types

export const receiveUserPosts = (posts) => ({
    type: RECEIVE_USER_POST,
    posts
})
export const receivePost = (post) => ({
    type: RECEIVE_POST,
    post 
})

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

export const deletePost = (postId) =>({
    type: REMOVE_POST,
    postId
})
export const clearPosts = () => ({
    type: CLEAR_POSTS
})
//getter

export const userPosts = (username) => (state) => {
    return state.posts ? Object.values(state.posts).filter((post)=>post.author.username===username) : null;
}

// thunk actions

export const fetchPosts = (pagenumber,type) => async(dispatch) =>{
    let response = await fetch(`/api/posts?page_number=${pagenumber}&type=${type}`)
    if (response.ok){
    const data = await response.json();
    dispatch(receivePosts(data.posts));
    dispatch(receiveUsers(data.users));
    dispatch(receiveFollows(data.follows));
    dispatch(receiveLikes(data.likes));
    return data
    }
}

export const fetchPost = (postId) => async(dispatch)=>{
    let response = await fetch(`/api/posts/${postId}`);

    if (response.ok){
    const data = await response.json();
    dispatch(receivePost(data.posts));
    dispatch(receiveComments(data.comments));
    dispatch(receiveLikes(data.likes));
    return data;
    }
} 

export const createPost = (post) => async(dispatch) =>{
    const newPost = await csrfFetch('/api/posts',{
        method:'POST',
        body: post
    });
    if (newPost.ok){
    const data = await newPost.json();
    dispatch(receivePost(data.posts));
    dispatch(receiveComments(data.comments));
    dispatch(receiveLikes(data.likes));
    return data;
    }
}

export const updatePost = (formData,postid)=> async(dispatch) => {
   
    const post = await csrfFetch(`/api/posts/${postid}`,{
        method:'PATCH',
        body: formData
    });
    if (post.ok){
        const data = await post.json();
        dispatch(receivePost(data));
        return data;
    } else{
        const error = await post.json();
        throw new Error(error.message)
    }
}

export const removePost = postId => async dispatch =>{
    const post = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    if (post.ok){
        dispatch(deletePost(postId))
        // dispatch(receivePosts())
    }
};

// posts reducer

const postsReducer = (state={},action)=>{
    const newState={...state};
    switch (action.type) {
        case RECEIVE_POST:
            newState[action.post.id] = action.post;
            return newState;
        case RECEIVE_POSTS:
            return {...newState,...action.posts};
        case REMOVE_POST:
            delete newState[action.postId];
            return newState;
        case RECEIVE_USER_POST:
            return {...action.posts};
        case CLEAR_POSTS:
            return {};
        default:
            return newState;
    }
}
export default postsReducer;

    
