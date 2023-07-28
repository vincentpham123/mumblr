import { useSelector } from "react-redux"
import { useState, useRef,useEffect, useCallback } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect,useParams } from "react-router-dom";
import { updatePost } from "../../store/posts";
import NewPostInput from "./NewPostInputs";
import { fetchUser } from "../../store/user";

const UpdatePost = () => {
    const {postid} = useParams();
    const [initialPost,setInitialPost]= useState({});
    const [bodyCheck,setBodyCheck] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [paragraphs,setParagraphs] = useState({});
    // each photo will hold a file that will be rendered 
    const [photos,setPhotos]=useState({1:null,2:null,3:null,4:null});
    const [initialTitle,setInitialTitle] = useState((''));
    const [initialTitleCheck, setInitialTitleCheck] = useState(false);
    const [currentPhotoIndex,setCurrentPhotoIndex] = useState(1);
    const [errors,setErrors]=useState([]);
    // need to fetch the post using the params id in an useeffect
    useEffect(()=>{
        dispatch(fetchUser(sessionUser.id));
    },[dispatch]);
    const sessionUser = useSelector(state=>  state.session.user);
    const post = useSelector(state=>state.posts[postid]);
    
    useEffect(()=>{
        populateFields(post);
    },[post])

  

    const populateFields = (post) => {
        if (post){
            const bodyParagraphs = post.body.split('\r\n');
            const initialParagraphs = {};
            const initialPhotos={1:post.photo1,2:post.photo2,3:post.photo3,4:post.photo4};
            bodyParagraphs.forEach((paragraph,index)=>{
                initialParagraphs[index+1]=paragraph;
            });
            setParagraphs(initialParagraphs);
            setPhotos(initialPhotos);
            
            setInitialTitle(post.title);
            setInitialTitleCheck(true);
        }
        
    }
    
    useEffect(()=>{
        if(Object.values(paragraphs).some(paragraph=>paragraph.trim().length>0) ) {
        setBodyCheck('');
        } else {
            setBodyCheck(true);
        }
    },[paragraphs]);    
if (!sessionUser) return <Redirect to="/" />;
const handlePhotoRemove = (key,index) => {
    setPhotos({...photos,[key]:'remove'})
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
        
        const nullPhotos = Object.keys(photos).filter((photonumber)=>photos[photonumber]===null || photos[photonumber]==='remove');
        const photoToFill = nullPhotos[0];
        setPhotos({...photos,[photoToFill]:file});

        setParagraphs({...paragraphs,[Object.keys(paragraphs).length+1]: '',[pindex]:`!@%^#^photo${photoToFill}`});

        return photoToFill;
    }
    const handleTitleKeyDown = (event) => {
        
    
         setTimeout(()=>{
            setTitle(event.target.innerText)
         },0);
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
            if (Object.values(paragraphs).includes(photoIdentifier)&& photos[key] instanceof File) {
                formData.append(param,photos[key])
            } 
            // else if (!Object.values(paragraphs).includes(photoIdentifier) && photos[key]){
                // formData.append(param,'remove');
            }
            // formData.append(param,photos[key]);
            // so if the new body does not paragrapg does not contain any values with
            // the identifier for the photo, i need to pass in null to the backend
            // to clear the photo attachment
        )
    


        
        
        dispatch(updatePost(formData,postid))
        .then(()=>{
                
            history.push(`/user/${sessionUser.id}/posts`);
            // history.go(-2);
        })
        .catch(async res=>{
            let data;
            try{
                data = await res.clone().json();
            } catch{
                data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        })
    }

    const disableButton = () => {
        return bodyCheck ? '' : 'disabled'
    }

    if(!sessionUser) return(
        <div className='post-load-container'>
            <div className='post-load-body'>
                <i style={{color:'white'}}className="fa-solid fa-spinner fa-spin"></i>
            </div>
        </div>
    );
return (
    <>
    <div className='text-post-container'>
        <div className='postheader-container'>
            <div className='postHeader-body'>
            {/* for the left side of the header */}
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
                                <h1 suppressContentEditableWarning={true} onKeyDown={event=>handleTitleKeyDown(event)} className="contentEdit text-title" contentEditable='true'>{initialTitle}</h1>
                                {Object.keys(paragraphs).map((paragraph,index)=>{
                                    return <NewPostInput key={index} handleKeyDown={handleKeyDown} index={index+1} handleFile={handleFile} photoState={photos} initialValue={paragraphs[paragraph]} create={false} handlePhotoRemove={handlePhotoRemove}/>
                                })}
                               
                            </div>
                        </div>
                    <div className='text-footer'>
                        {/* make this button a div to avoid clashing with the submit button */}
                        <button className='close-text' onClick={()=>history.go(-1)}>Close</button>
                        <button disabled={bodyCheck} className='text-submit' onClick={handleSubmit}>Update</button>
                    </div>
                </div>

            </div>
        
    </div>
            
            
        
    </>
)

    // have an option for files, 
    //optional 
}

export default UpdatePost;