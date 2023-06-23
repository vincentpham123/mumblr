import { useSelector } from "react-redux"
import { useState, useRef } from "react"
import { createPost } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import './styling/newtextpost.css';
const NewTextPost = () => {
   
    const dispatch = useDispatch();
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [paragraphs,setParagraphs] = useState(['']);

    // will increase everytime enter is pressed
    //need eventlistener for input of enter
    //which will increase rows by 1
    // will also need to increase the height of the text area
    // will have options for photos, links, possibily videos
    // need to add photos later after i get just the text creator to work

    const [rows,setRows] = useState(4);
    const sessionUser = useSelector(state=>  state.session.user);
    const handleInput = (event,index) => {
        const updatedContent = [...paragraphs];
        updatedContent[index] = event.target.innerText;
        setParagraphs(updatedContent);
    }

    const handleKeyDown = (event,index) => {
        if ( paragraphs.length<11 && event.key==='Enter'){
            event.preventDefault();
            setParagraphs([...paragraphs,''])

            setTimeout(()=>{event.target.nextElementSibling.focus()},0);
                
        }
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        
        dispatch(createPost({title,body,author_id: sessionUser.id}))
        history.go(-2);
    }
return (
    <>
    <div className='text-post-container'>
        <div className='postheader-container'>
            <div className='postHeader-body'>
            {/* for the left side of the header */}
                <div className='postheader-left'>
                    <div className="post-username">{sessionUser.username}</div>
                </div>
                {/* button for the options on the right */}
                <div className='postheader-right'>
                    <button className='postOptions'>
                        {/* on click open modal with true and false
                        if clicked set setshowoptionsmenu to true and render the modal*/}
                    </button>
                </div>
            </div>
        </div>
            {/* start of the text area */}
            <div className='newtext-container'>
                <div className = 'newtext-body'>
                        <h1 className="contentEdit text-title" contentEditable='true'></h1>
                        {paragraphs.map((paragraph,index)=>{
                           return <p  onKeyDown={(event,index)=>handleKeyDown(event,index)} className='contentEdit text-paragraph' contentEditable='true'>{paragraph}</p>
                        })}
                        {/* <div className = 'newText-inputs'>
                            <textarea 
                            className='text-title'
                            value={title}
                            onChange={(event)=>setTitle(event.target.value)}
                            placeholder='title (optional)'
                            />
                            <textarea
                            className='text-body'
                            value={body}
                            onChange={(event)=>setBody(event.target.value)}
                            placeholder='Go ahead, put anything.'
                            />
                        </div> */}
                    <div className='text-footer'>
                        {/* make this button a div to avoid clashing with the submit button */}
                        <button className='closeText' onClick={()=>history.go(-2)}>Close</button>
                        <button className='text-submit' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>

            </div>
        
    </div>
            
            
        
    </>
)

    // have an option for files, 
    //optional 
}

export default NewTextPost;