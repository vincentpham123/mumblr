import { Link } from 'react-router-dom';
import './navigation.css'
import { useState } from 'react';
import NewPost from '../posts/NewPost';
import NewTextModal from '../posts/textposts/NewTextPostModal';
import NewPhotoModal from '../posts/NewPhotoPostModal';
import { Route, Switch,useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const PostButton= ()=>{
    let location = useLocation();
    let background = location.state && location.state.background
    return(
        <>
        <div>
            <Link to='/new' className='post-button'>
                <i className="fa-sharp fa-solid fa-pencil" style={{color:'#696969'}}></i>
            </Link>
            
        </div>
        </>
    )
}
export default PostButton;