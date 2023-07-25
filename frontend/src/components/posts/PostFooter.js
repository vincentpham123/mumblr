

//this component will contain 
// notes, a total of all likes, comments, and reblogs
//notes will be a button that opens a tab menu
// buttons for comment, reblog and like
// those will open the menu which is defaulted on comments
// comment will automatically open the menu since comment is the deafult 
// likes will trigger a like

//in the menu, there will be tabs for comments, reblogs, and likes
// comment tab will show comments, 
// reblogs will show reblogs 
// likes will show all the user likes
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import * as commentsActions from '../../store/comments';
import * as likesActions from '../../store/likes';
import * as followActions from '../../store/follows';
import './postsfooter.css'
import { fetchPost } from "../../store/posts";
import { Modal } from "../Context/Modal";

const PostFooter = ({ post }) => {
    // this is to pass down logged in status to child components
    const [loggedin, setLoggedIn] = useState(false);
    const [showTabMenu, setShowTabMenu] = useState(false);
    const [errors,setErrors] = useState(
        {
            like:'',
            follow: '',
        }
    );
    const [tabMenuSelection, setTabMenuSelection] = useState('comments');
    const [body,setBody] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const followed = useSelector(followActions.userFollowed(sessionUser,post.author.id));
    // cons [isActive, setIsActive] = useState();
    const dispatch = useDispatch();
    // will have a postid passed in from parent
    //can access the post from the state and grab data
    // const liked = useSelector(likesActions.userLike(sessionUser.id,post.id));
    // to remove any errors 

    const handleFollowButton = (event)=>{
        event.preventDefault();
        if(!sessionUser){
            setErrors(
                {
                    like:'',
                    follow: '',
                }
            )
            setErrors(state=>{
                return {...state,['follow']:'login to follow'}
            })
            setTimeout(()=>{
                setErrors( {
                    like:'',
                    follow: '',
                })
            },5000)
        } else{
            const follow={user_id: post.author.id, follower_id: sessionUser.id}
            dispatch(followActions.createFollow(follow));
        }
    }
    const handleUnfollowButton = (event) =>{
        event.preventDefault();
        dispatch(followActions.removeFollow(followed[0].id));
    }

  
    const handleNotesButtonClick = (event) => {
        if (!showTabMenu) {
            setShowTabMenu(true);
            dispatch(fetchPost(post.id));
        } else {
            setShowTabMenu(false);
        }

        
    }
   

    const comments = useSelector(commentsActions.postComments(post.id));
    const likes = useSelector(likesActions.postLikes(post.id));

    const NotesButtons = () => {
        // depending on if this was clicked or not will change what is in the button contents
        // this button is strictly for close and opening the tabs menu
        return (
            <div className='notebutton-container'>
                <span className='notebutton-body'>
                    <span className='notebutton-contents'>
                        <button className='notesbutton' onClick={() => handleNotesButtonClick()}>
                            <span className='notesbutton-body'>
                                {!showTabMenu &&
                                    <>
                                        <span className='shownotesbutton-container'>
                                            <span className='show-notes-body'>
                                                <div className='show-notes-content'>
                                                    <span className='show-notes-text'>
                                                        <span className='notes-count'>
                                                            {post.commentcount + post.likescount}
                                                        </span>
                                                        notes
                                                    </span>

                                                </div>

                                            </span>

                                        </span>
                                    </>


                                }
                                {showTabMenu && <div className='notesbutton-content'>

                                    <i className="fa-solid fa-x"></i>
                                    <span className='notesbutton-text'>Close Notes</span>
                                </div>}

                            </span>
                        </button>

                    </span>

                </span>
            </div>

        )
    }

    const FooterTabsMenu = () => {
        // this will contain the tabs for the menu
        // it will have 2 separate tabs depending on which one is clicked
        // one will render the comments from the post using the postId and gathering the comments
        // the other will render users who likes, which will be gathered from the likes in the state
        // where the post_id matches the post_id in likes state 
        return (
            <div className='tabsmenu-container'>
                <div className='tabsmenu-body'>
                    <div className='tabsmenu-navigation'>
                        <button className={'tabnavbutton'} onClick={() => setTabMenuSelection('comments')}>
                            <i className="fa-regular fa-comment"></i>
                            <span className='tabnavbutton-contents'>
                                {post.commentcount}
                            </span>
                        </button>
                        <button className='tabnavbutton' onClick={() => setTabMenuSelection('likes')}>
                            <span className='tabnavbutton-contents'>
                                <i className="fa-solid fa-heart"></i>
                                {post.likescount}
                            </span>
                        </button>


                    </div>

                </div>

            </div>
        )
    }


   

   
    return (
        <>
            <div className='postfoot-container'>
                <footer className='postfoot-body'>
                    <div className='postfootbuttons-container'>
                        {/* will contain a the buttons */}
                        <NotesButtons />
                        <FooterButtons 
                            post={post}
                            setShowTabMenu={setShowTabMenu}
                            sessionUser={sessionUser}
                        />
                    </div>
                    <div className='posttabmenu-container'>
                        <div className='postnavmenu-body'>
                            {showTabMenu && <FooterTabsMenu />}
                            
                            {showTabMenu && tabMenuSelection === 'comments' && <CommentTextArea post={post}/>}
                            {/* depending on what is clicked, will set the tab */}
                            {/* <CommentTextArea sessionUser={sessionUser}/> */}
                            {showTabMenu && tabMenuSelection === 'comments' && comments.length > 0 && (
                                <div className='comments-area'>
                                    {comments.map((comment) => (
                                        <Comments
                                            key={comment.id}
                                            username={comment.commenter.username}
                                            profilepic={comment.commenter.profilepic}
                                            body={comment.body}
                                            id={comment.commenter.id}
                                            comment_id={comment.id}
                                            postId = {post.id}
                                        />
                                    ))}
                                </div>
                            )}
                            {showTabMenu && tabMenuSelection === 'likes' &&
                                likes.map((like) => {
                                    return <Likes likerpic={like.liker.profilepic} likerusername={like.liker.username} liker_id={like.liker.id} />
                                })}
                        </div>

                    </div>
                </footer>

            </div>
        </>
    )
}
const CommentTextArea = ({post}) => {
    const dispatch = useDispatch();
    const sessionUser=useSelector(state=>state.session.user);
    const [body,setBody] = useState('');
    const [errors,setErrors] = useState('');
    useEffect(()=>{
        setTimeout(()=>{
            setErrors('')
        },3000)
    },[errors])
    const handleCommentSubmit=(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append('comment[body]', body)
        formData.append('comment[user_id]',sessionUser.id)
        formData.append('comment[post_id]',post.id);
        setErrors('');
        dispatch(commentsActions.createComment(formData))
            .catch(async (res)=>{
                let data;
                try {
                    data=await res.clone().json();
                } catch {
                    data = await res.text();
                }
                console.log(res);
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors(data);
                else setErrors(res.statusText);
            })
        setBody('');

    }
    return (
        <>
            {sessionUser && <div className='commenttext-container'>
                <div className='commenttext-body'>
                    <div className='comment-profile-pic'>
                        <div className='profilepic-frame1'>
                            <img className='reply-profilepic' src={sessionUser.profilepic}></img>
                        </div>
                    </div>
                    <div className='reply-container'>
                        <div className='textarea-container'>
                            <textarea value={body} onChange={(event)=>setBody(event.target.value)} placeholder='type here' maxLength='475' rows='1' className='reply-textarea'></textarea>
                        </div>
                        <button onClick={(event)=>handleCommentSubmit(event)} className='reply-button'>
                            <span>Reply</span>
                        </button>

                    </div>

                </div>
                {errors && 
                <div className='comment-error'> 
                    <span style={{color:'white'}}>{errors}</span>
                </div>}
            </div>}
        </>
    )
}
export default PostFooter;

const Comments = ({ comment_id, id,username, profilepic, body,postId }) => {
    const dispatch = useDispatch();
    const sessionUser=useSelector(state=> state.session.user);
    const [update,setUpdate]=useState(false);
    const [updateComment,setUpdatedComment] = useState(body);
    const [updateErrors,setUpdateErrors] = useState('');
    
    const handleCommentDelete = (event)=>{
        event.preventDefault();
        dispatch(commentsActions.removeComment(comment_id));
    }
    useEffect(()=>{
        setTimeout(()=>{
            setUpdateErrors([])
        },5000)
    },[updateErrors])
    const handleCommentUpdate =(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append('comment[body]', updateComment);
        formData.append('comment[user_id]',sessionUser.id);
        formData.append('comment[post_id]',postId);
        setUpdateErrors([]);
        dispatch(commentsActions.updateComment(formData,comment_id))
            .then(()=>{
                setUpdate(false);
            })
            .catch(async (res)=>{
                let data;
                try {
                    data=await res.clone().json();

                } catch {
                    data = await res.text();
                }
                console.log(res);
                if (data?.errors) setUpdateErrors(data.errors);
                else if (data) setUpdateErrors(data);
                else setUpdateErrors(res.statusText);
            })

    }
    // need to take in commenterusername, commenter profilepic, and comment body
    return (
        <>
            
            <div className='commentsshow-container'>
                {/* will need to map over every comment related to the post and return it */}
                {/* comment show */}
                <div className='comment-container'>
                    <div className='comment-body'>
                        <div className='comment-content'>
                            <div className='commenter-profilepic'>
                                <div className='commenter-profilepic-frame'>
                                    {/* will need to link to a user's profile, can grab grom the the comment map */}
                                    <Link to={`/user/${id}`} className='commenterlink'>
                                        <img className='commenterimage' src={profilepic}></img>
                                    </Link>
                                </div>

                            </div>
                            <div className='commenttext-container'>
                                <div className='commenter-username'>
                                    <span className='commenter-username-text'>
                                        {username}
                                        {/* fill in with commenter username from state */}
                                    </span>

                                </div>
                                
                                <div className='replies-container'>
                                    <div className='reply-body'>
                                        <div className='reply-content'>
                                            <p className='reply'> {body}</p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>

                </div>
                { sessionUser && sessionUser.id === id && 
                <>
                <div className='comment-buttons'>
                    <div>
                        <button className='comment-delete' onClick={event=> handleCommentDelete(event)}>
                            <i class="fa-solid fa-dumpster"></i>
                        </button>
                    </div>
                    <div>
                        <button className='comment-update' onClick={()=>setUpdate(true)}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </div>
                </>
                }
            </div>
            {update && (
                <Modal onClose={()=>{
                    setUpdate(false);
                    setUpdatedComment(body);
                    }}>
                <div className='commenttext-container'>
                    <div className='commenttext-body'>
                            <div className='comment-profile-pic'>
                                <div className='profilepic-frame1'>
                                    <img className='reply-profilepic' src={sessionUser.profilepic}></img>
                                </div>
                            </div>
                        <div className='reply-container'>
                            <div className='textarea-container'>
                                <textarea value={updateComment} onChange={(event)=>setUpdatedComment(event.target.value)} placeholder='type here' maxLength='475' rows='1' className='reply-textarea'></textarea>
                            </div>
                            <button onClick={(event)=>handleCommentUpdate(event)} className='update-comment-button'>
                                <span>Update</span>
                            </button>
                        </div>
                    </div>
                    {updateErrors.length>0 && 
                        <div className='update-error'> 
                            <span style={{color:'white'}}>{updateErrors[0]}</span>
                        </div>}
                </div>
                </Modal>
            )}

        </>
    )
}


const FooterButtons = ({post,setShowTabMenu,sessionUser}) => {
    // will contain 2 buttons(3 if time)
    // const liked = useSelector()
    const [errors,setErrors] = useState(
        {
            like:'',
            follow: '',
        }
    );
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state=> state.session.user);
    const userid= sessionUser ? sessionUser.id : 0;
    const liked = useSelector(likesActions.userLike(userid,post.id));
    
    useEffect(
        ()=>{
        setTimeout(()=>{
            setErrors(
                {
                    like:'',
                    follow:''
                }
            )},4000)
        }
    ,[errors])
    const handleLikeButton = (event) => {
        event.preventDefault();
        if(!sessionUser){
            setErrors(state=>{
                return {...state,like: 'Login to Like!'}
            });
            return;
        } 
            const like = { post_id: post.id, user_id: sessionUser.id }
            const likeId=dispatch(likesActions.createLike(like));
           
    }
    const handleUnlikeButton = (event) =>{
        event.preventDefault();
        dispatch(likesActions.removeLike(liked[0].id))
    }
    return (
        <div className='footerbuttons-container'>
            <div className='footbutton-container'>
                <button className='commentbutton' onClick={() => {
                    setShowTabMenu(true);
                    dispatch(fetchPost(post.id))
                    }}>
                    <i className="fa-regular fa-comment"></i>
                </button>
            </div>
            <div className='footbutton-container'>
                
                {sessionUser && liked.length>0 && <button className={`likesbutton  true`} onClick={event => handleUnlikeButton(event)}>
                    <i color='rgb(var(--red))' className="fa-solid fa-heart"></i>
                </button>
                }
                {sessionUser && liked.length===0 &&
                <button className={`likesbutton`} onClick={event => handleLikeButton(event)}>
                    <i className="fa-solid fa-heart"></i>
                </button>
                }
                {!sessionUser && 
                <button className={`likesbutton`} onClick={event => handleLikeButton(event)}>
                    <i className="fa-solid fa-heart"></i>
                </button>
                }
                
                { errors.like &&
                <div className='like-errors'>
                    <span>
                        {errors.like}
                    </span>
                </div>
                }
            </div>

        </div>
    )
}

const Likes = ({ likerpic, likerusername,liker_id }) => {
    // will have a useSelector to pull likes from the state
    //will map over the likers for the post and render
const sessionUser = useSelector(state=> state.session.user);
const followed = useSelector(followActions.userFollowed(sessionUser,liker_id));
console.log(followed);
const [errors,setErrors]=useState([]);
const dispatch = useDispatch();
const handleFollowButton = (event)=>{
    event.preventDefault();
    if(!sessionUser){
        setErrors([]);
        setErrors(['Login to Follow!']);
        setTimeout(()=>{
            setErrors([])
        },3000)
    } else{
        const follow={user_id: liker_id, follower_id: sessionUser.id}
        dispatch(followActions.createFollow(follow));
    }
}
const handleUnfollowButton = (event) =>{
    event.preventDefault();
    dispatch(followActions.removeFollow(followed[0].id));
}
    return (
        <>
        <div className='likeslist-container'>
            <div className='likeslist-body'>
                <div className='likeslist-content'>
                    {/* this is where i will map over the likers. will be pulled from the likes where post_id matches the post */}
                    <div className='liker-container'>
                        <div className='liker-profilepic-container'>
                            <div className="liker-profilepic-body">
                                <Link className='liker-link' to={`/user/${liker_id}`}>
                                    <img className='liker-pic' src={likerpic}></img>
                                </Link>
                            </div>

                        </div>
                        <div className="liker-information">
                            <div className='liker-username'>
                                <span>{likerusername}</span>
                            </div>
                            {followed.length===0 && <button onClick={(event)=>handleFollowButton(event)} className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>Follow</span></button>}
                            {followed.length>0 && <button onClick={(event)=>handleUnfollowButton(event)} className='follow-button' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}><span>Unfollow</span></button>}    

                        </div>

                    </div>

                </div>
            </div>
            { errors.length>0 &&
                    <div style={{backgroundColor:'rgb(var(--red)'}}className='follow-footer-errors'>
                            <span style={{color:'white'}}>
                                {errors[0]}
                            </span>
                    </div>
            }

        </div>
        </>
    )
}