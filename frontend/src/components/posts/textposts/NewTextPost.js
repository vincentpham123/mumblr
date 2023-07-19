import { useSelector } from "react-redux"
import { useState, useRef,useEffect } from "react"
import { createPost } from "../../../store/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import NewPostInput from "../NewPostInputs";
import '../styling/newtextpost.css';
const NewTextPost = () => {
    const [bodyCheck,setBodyCheck] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [paragraphs,setParagraphs] = useState({1:''});
    const [photos,setPhotos]=useState({1:null,2:null,3:null,4:null});

      // each photo will hold a file that will be rendered 
      //when a user uploads a photo, 1 will be populate, then 2, then 3, then 4

      //during update, i will populate these based on the the photos in the state
      //when a user removes the photo currenly populated in the hash
      //example, if photo1 is currently being rendered in paragraph 3
      //and they remove it, i will set photo1 to null
      //if they add a photo else where, i will check for keys in the photo hash
      //with null values and then update that key to have that file
      //i will update the paragraph key to be an identifier for that photo
      // example:
      // photo1 was originally in pargraph2, users chooses to remove it and type in
      // key downs update the paragraph automatically
      // when a user removes, the photos[1] will be set to null
      //so paragraph[2] will now be strings
      // user updates a photo to paragraph[1], pragraph[1] will now contain identifier
      // handlefile will check for empty nulls, first one it identifies, it was place the file there
      // paragraph one will have something like photo1 identifer
      //when i show the text, i will check for the photo being checked in the body text and then 

    const sessionUser = useSelector(state=>  state.session.user);
    useEffect(()=>{
        const textofpost = Object.values(paragraphs).filter((value)=> typeof value ==='string');
        if(textofpost.some(paragraph=>paragraph.trim().length>0) ) {
            setBodyCheck('');
        } else {
            setBodyCheck(true);
        }
    },[paragraphs]);
    
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

        // this wil let my child component which key to pass to the handleFileRemove in my child component
        // if its an update, i can get initial index when i check the inital value;

        return photoToFill;
    }

    const handlePhotoRemove = (key,index) => {
        setPhotos({...photos,[key]:null})
        setParagraphs({...paragraphs,[index]:''})
        //need to pass this down to the children
    }
    const handleTitleKeyDown = (event) => {
        if (event.key==='Enter'){
            setTimeout(()=>{
                event.target.nextElementSibling.focus()
            },0);
        }
    
         setTitle(event.target.innerText);
    }
    const handleKeyDown = (event) => {
    
        if(event.key !== 'Enter' && event.key!=='ArrowDown' && event.key!=='ArrowUp'){
            setTimeout(()=>{
                const pindex = event.target.dataset.type
            
                setParagraphs({...paragraphs,[pindex]: event.target.innerText});
            },0);
        }
  
     
      
    
        if (event.key==='Enter'){
            event.preventDefault();
            const newIndex = Object.keys(paragraphs).length+1;
            setParagraphs({
                ...paragraphs,
                [newIndex]: ''
            })
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
            let photoIdentifier = `!@%^#^photo${key}`

            if (Object.values(paragraphs).includes(photoIdentifier)&& photos[key]) {
                formData.append(param,photos[key])
            } else if (!Object.values(paragraphs).includes(photoIdentifier)&& photos[key]){
                formData.append(param,null);
            }
            // if (photos[key]) formData.append(param,photos[key]);
        }) 
        dispatch(createPost(formData));
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
                <div className='createpost-pic'>
                    <img src={sessionUser.profilepic}>
                    </img>

                </div>
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
                                return <NewPostInput handleKeyDown={handleKeyDown} index={index+1} handleFile={handleFile} photoState={photos} create={true} handlePhotoRemove={handlePhotoRemove}/>
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

export default NewTextPost;