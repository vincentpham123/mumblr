import "./showPost.css";
import PostHeader from "./PostHeader";
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
                    <p>{post.body}</p>
                </article>
            </div>
        </div>
        </>
    )
}

export default ShowPost;
