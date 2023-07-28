import PostCircle from "./PostCircle";
import './styling/postselection.css';
const PostSelection = ({showSelection}) => {

    return(
        <div className='post-selection'>
            <PostCircle onClick={()=>showSelection(false)} closeModal={showSelection} type={'text'} />
            <PostCircle onClick={()=>showSelection(false)} closeModal={showSelection} type={'photo'} />
        </div>
    )

}

export default PostSelection;