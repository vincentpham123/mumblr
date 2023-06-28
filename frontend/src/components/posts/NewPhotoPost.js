import { useSelector } from "react-redux"
import { useState, useRef,useEffect } from "react"
import { createPost } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import NewPostInput from "./NewPostInputs";
const NewPhotoPost = () => {
    const [bodyCheck,setBodyCheck] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [paragraphs,setParagraphs] = useState({1:''});
    const [photos,setPhotos]=useState({1:null,2:null,3:null,4:null});
    const sessionUser = useSelector(state=>  state.session.user);
    

    useEffect(()=>{
        const textofpost = Object.values(paragraphs).filter((value)=> typeof value ==='string' && !value.includes('!@%^#^photo'));
        if(textofpost.some(paragraph=>paragraph.trim().length>0) ) {
            setBodyCheck('');
        } else {
            setBodyCheck(true);
        }
    },[paragraphs]);

    const handlePhotoRemove = (key,index) => {
        setPhotos({...photos,[key]:null})
        setParagraphs({...paragraphs,[index]:''})

        //need to pass this down to the children
    }
    const handleFile = (event) => {
        // need to change logic to check for null keys-value pairs

        //need data-type of the input to set paragraph to photo
        const file = event.currentTarget.files[0];
        const pindex=event.target.dataset.type;
        // need pindex to target the current paragraph 

        //need to find the keys with values null

        const nullPhotos = Object.keys(photos).filter((photonumber)=>photos[photonumber]===null);
        const photoToFill = nullPhotos[0];
        setPhotos({...photos,[photoToFill]:file});

        setParagraphs({...paragraphs,[Object.keys(paragraphs).length+1]: '',[pindex]:`!@%^#^photo${photoToFill}`});

        
       
    }
    const handleTitleKeyDown = (event) => {
        console.log(event.key);
        if (event.key==='Enter'){
            setTimeout(()=>{
                event.target.nextElementSibling.focus()
            },0);
        }
    
         setTitle(event.target.innerText);
         console.log(title);
    }
    const handleKeyDown = (event) => {
        
    
        if(event.key !== 'Enter' && event.key!=='ArrowDown' && event.key!=='ArrowUp'){
            setTimeout(()=>{
                const pindex = event.target.dataset.type
            
                setParagraphs({...paragraphs,[pindex]: event.target.innerText});
            },0);
        }
            console.log(paragraphs);
  
     
      
    
        if (event.key==='Enter'){
            console.log(event.key);
            event.preventDefault();
            const newIndex = Object.keys(paragraphs).length+1;
            setParagraphs({
                ...paragraphs,
                [newIndex]: ''
            })
            console.log(paragraphs);
            setTimeout(()=>{
                let currentElement=event.target;
                while(currentElement.parentNode && !currentElement.parentNode.matches('.textbox-contents')){
                    currentElement=currentElement.parentNode;
                }
                currentElement.nextElementSibling.querySelector('p').focus();
            },10);
            
        }
        if (event.key==='ArrowDown'){
            event.preventDefault();
            setTimeout(()=>{
                let currentElement=event.target;
                while(currentElement.parentNode && !currentElement.parentNode.matches('.textbox-contents')){
                    currentElement=currentElement.parentNode;
                }
                if(currentElement.nextElementSibling && currentElement.nextElementSibling.querySelector('p') ) {
                    const nextP = currentElement.nextElementSibling.querySelector('p');
                    nextP.focus();
                    const range = document.createRange();
                    range.selectNodeContents(nextP);
                    range.collapse(false);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                };
            },10);
            
        }
        if (event.key==='ArrowUp'){
            event.preventDefault();

            console.log('event arrow down');
            setTimeout(()=>{
                let currentElement=event.target;
                while(currentElement.parentNode && !currentElement.parentNode.matches('.textbox-contents')){
                    currentElement=currentElement.parentNode;
                }
                if (!currentElement.previousElementSibling.matches('h1') && currentElement.previousElementSibling.querySelector('p')) {
                    const prevP = currentElement.previousElementSibling.querySelector('p');
                    prevP.focus();
                    const range = document.createRange();
                    range.selectNodeContents(prevP);
                    range.collapse(false); 
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            },10);
            
        }
        console.log(paragraphs);
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('post[title]',title);
        
        const textState=Object.values(paragraphs).filter((paragraph)=>paragraph!=='');
        formData.append('post[body]',textState.join('\n'));
        formData.append('post[author_id]',sessionUser.id);
        //handle files
        Object.keys(photos).forEach((key)=>{
            let param = `post[photo${key}]`;
            
            if (photos[key]) formData.append(param,photos[key]);
        })

        dispatch(createPost(formData));
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
                    <button className='post-options'>
                        <i className='fa-solid fa-gear'></i>
                    </button>
                </div>
            </div>
        </div>
            {/* start of the text area */}
            <div className='newtext-container'>
                <div className = 'newtext-body'>
                        <div className='text-box'>
                            <div className='textbox-contents'>
                                <h1 onKeyDown={event=>handleTitleKeyDown(event)} className="contentEdit text-title" contentEditable='true'></h1>
                                {Object.keys(paragraphs).map((paragraph,index)=>{
                                if(index===0) return <NewPostInput form={'photo'} handleKeyDown={handleKeyDown} index={index} handleFile={handleFile} photoState={photos} create={true} handlePhotoRemove={handlePhotoRemove}/>
                                return <NewPostInput handleKeyDown={handleKeyDown} index={index} handleFile={handleFile} photoState={photos} create={true}/>
                                })}
                               
                            </div>
                        </div>
                    <div className='text-footer'>
                        {/* make this button a div to avoid clashing with the submit button */}
                        <button className='close-text' onClick={()=>history.go(-2)}>Close</button>
                        <button disabled={bodyCheck} className='text-submit' onClick={handleSubmit}>Post Now</button>
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