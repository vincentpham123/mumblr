import { Link } from 'react-router-dom';
import './navigation.css'

const PostButton= ()=>{
    return(
        <div>
            <Link to='/new' className='post-button'>
            <i className="fa-sharp fa-solid fa-pencil" style={{color:'#696969'}}></i>
            </Link>
        </div>
    )
}
export default PostButton;