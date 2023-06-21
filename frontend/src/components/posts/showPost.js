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
            <div className='postContent'>
                <article>
                    <PostHeader username={post.author.username} dateCreated={post.dateCreated} timeCreated={post.timeCreated} />
                    <h2> where a post will go </h2>
                </article>
            </div>
        </div>
        </>
    )
}

export default ShowPost;
