import PostCircle from "./PostCircle";
import './postselection.css';
const PostSelection = () => {

    return(
        <div className='post-selection'>
            <PostCircle type={'text'} />
            <PostCircle type={'photo'} />
        </div>
    )

}

export default PostSelection;