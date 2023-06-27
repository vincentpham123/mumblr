import csrfFetch, { storeCSRFToken } from "./csrf";

// consts 

const RECEIVE_POST = "api/RECEIVE_POST";
const RECEIVE_POSTS = "api/RECEIVE_POSTS";
const REMOVE_POST = 'api/UPDATE_POST';
const RECEIVE_USER_POST = "api/USERNAME/RECEIVE_POSTS";

// action types


const receivePost = (post) => ({
    type: RECEIVE_POST,
    post 
})

const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

const deletePost = (postId) =>({
    type: REMOVE_POST,
    postId
})

//getter

export const userPosts = (username) => (state) => {
    return state.posts ? Object.values(state.posts).filter((post)=>post.author.username===username) : null;
}

// thunk actions

export const fetchPosts = () => async(dispatch) =>{
    let response = await fetch('/api/posts');
    if (response.ok){
    const posts = await response.json();
    dispatch(receivePosts(posts));
    return posts
    }
}

export const fetchPost = (postId) => async(dispatch)=>{
    let response = await fetch(`/api/posts/${postId}`);

    if (response.ok){
    const post = await response.json();
    dispatch(receivePost(post));
    return post;
    }
} 

export const createPost = (post) => async(dispatch) =>{
    console.log(post);
    const newPost = await csrfFetch('/api/posts',{
        method:'POST',
        body: post
    });
    if (newPost.ok){
    const data = await newPost.json();
    dispatch(receivePost(data));
    return data;
    }
}

export const updatePost = post=> async(dispatch) => {
    const{title,body,author_id} = post;
    const post = await csrfFetch('/api/posts',{
        method:'PATCH',
        body: JSON.stringify({title,body,author_id})
    });
    if (post.ok){
    const data = await post.json();
    dispatch(receivePost(data));
    return data;
    }
}

export const removePost = postId => async dispatch =>{
    const post = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    if (post.ok){
        dispatch(deletePost(postId))
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
            return {...action.posts};
        case REMOVE_POST:
            delete newState[action.postId];
            return newState;
        default:
            return newState;
    }
}
export default postsReducer;

    
