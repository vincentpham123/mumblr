import "./showPost.css";
import PostHeader from "./PostHeader";
import PostText from "./PostText";
const ShowPost = ({post})=>{
    if (!post){
        return (
            <p>Loading</p>
        )
    }
    return (
        <>
        <div className='postMain'>
            <div className='postContainer'>
                <article className='postContent'>
                        <PostHeader username={post.author.username} dateCreated={post.dateCreated} timeCreated={post.timeCreated} />
                    <div className='post-meat'>
                        <PostText post={post} />
                    </div>
                </article>
            </div>
        </div>
        </>
    )
}

export default ShowPost;
