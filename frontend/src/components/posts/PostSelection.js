import PostCircle from "./PostCircle";
import './styling/postselection.css';
const PostSelection = ({showSelection}) => {

    return(
        <div className='post-selection'>
            <PostCircle onClick={()=>showSelection(false)} type={'text'} />
            <PostCircle onClick={()=>showSelection(false)} type={'photo'} />
        </div>
    )

}

export default PostSelection;