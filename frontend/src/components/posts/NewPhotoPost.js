import { useSelector } from "react-redux"
import { useState, useRef,useEffect } from "react"
import { createPost } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
const NewPhotoPost = () => {
    const [bodyCheck,setBodyCheck] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [paragraphs,setParagraphs] = useState({0:''});
    const [imageFile, setImageFile] = useState([]);
    const [imageUrls,setImageUrls] = useState([]);

   

    // useEffect(()=>{
    //     console.log(paragraphs.some(paragraph=>paragraph.split(' ').length>1))
    //     if(paragraphs.some(paragraph=>paragraph.split(' ').length>1)) setBodyCheck(true);
    // },[...paragraphs]);

    const sessionUser = useSelector(state=>  state.session.user);

  
    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0];
        setImageFile(file);
       
    }

    const handleKeyDown = (event) => {
        console.log(event.key);
        console.log(event.target.innerText);
    
        if(event.key !== 'Enter'){
            setTimeout(()=>{
                const pindex = event.target.dataset.type
            
                setParagraphs({...paragraphs,[pindex]: event.target.innerText});
            },0);
        }
            console.log(paragraphs);
  
     
      
    
        if (event.key==='Enter'){
            console.log(event.key);
            event.preventDefault();
            const newIndex = Object.keys(paragraphs).length;
            setParagraphs({
                ...paragraphs,
                [newIndex]: ''
            })
            console.log(paragraphs);
            setTimeout(()=>{
                event.target.nextElementSibling.focus()
            },0);
            
        }
        
        console.log(paragraphs);
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('post[body]',Object.values(paragraphs).join('\n'));
        formData.append('post[author_id]',sessionUser.id);
        if (imageFile) {
            formData.append('post[photo]',imageFile)
        }
        dispatch(createPost(formData))
        
        history.go(-2);
    }

    const disableButton = () => {
        return bodyCheck ? '' : 'disabled'
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
                    <button className='post-options'>
                        <i className='fa-solid fa-gear'></i>
                    </button>
                </div>
            </div>
        </div>
            {/* start of the text area */}
            <div className='newtext-container'>
                <div className='photo-container'>
                    <div className="photo-body">
                        <div className='photo-contents'>
                            <input type='file' className='photo-button' onChange={handleFile}>
                                {/* className= photo-button icon */}
                            </input>
                        </div>
                    </div>
                </div>
                <div className = 'newtext-body'>
                        <div className='text-box'>
                            <div className='textbox-contents'>
                                {Object.keys(paragraphs).map((paragraph,index)=>{
                                return <p  key={index} data-type={index} onKeyDown={(event)=>handleKeyDown(event)} id={`paragraph-${index}`}  className='contentEdit text-paragraph' contentEditable='true'></p>
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
                            </div>
                        </div>
                    <div className='text-footer'>
                        {/* make this button a div to avoid clashing with the submit button */}
                        <button className='close-text' onClick={()=>history.go(-2)}>Close</button>
                        <button className='text-submit' onClick={handleSubmit}>Post Now</button>
                    </div>
                </div>

            </div>
        
    </div>
            
            
        
    </>
)

    // have an option for files, 
    //optional 
}

export default NewPhotoPost;