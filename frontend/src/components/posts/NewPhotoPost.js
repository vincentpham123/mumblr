import { useSelector } from "react-redux"
import { useState, useRef,useEffect } from "react"
import { createPost } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import NewPostInput from "./NewPostInputs";
const NewPhotoPost = () => {
    const [bodyCheck,setBodyCheck] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [paragraphs,setParagraphs] = useState({1:''});
    const [imageFile, setImageFile] = useState([]);
    const [photo1,setPhoto1] = useState(null);
    const [photo2,setPhoto2] = useState(null);
    const [photo3,setPhoto3] = useState(null);
    const [photo4,setPhoto4] = useState(null);
    const [currentPhotoIndex,setCurrentPhotoIndex] = useState(1);
    const [photoError,setPhotoError] = useState([]);

    // useEffect(()=>{
    //     console.log(paragraphs.some(paragraph=>paragraph.split(' ').length>1))
    //     if(paragraphs.some(paragraph=>paragraph.split(' ').length>1)) setBodyCheck(true);
    // },[...paragraphs]);

    const sessionUser = useSelector(state=>  state.session.user);

  
    const handleFile = ({currentTarget}) => {
        //need data-type of the input to set paragraph to photo
        const file = currentTarget.files[0];
        // need to pass down the currentPhotoIndex to each input
        switch (currentPhotoIndex) {
            case 1:
                setPhoto1(file);
                setCurrentPhotoIndex(2);
                break;
            case 2:
                setPhoto2(file);
                setCurrentPhotoIndex(3);
                break;
            case 3: 
                setPhoto3(file);
                setCurrentPhotoIndex(4);
            case 4:
                setPhoto4(file);
                break;
            default: 
                break;
        }
        setParagraphs({...paragraphs,[currentTarget.dataset.type]: 'photo1'});
       
    }

    const handleKeyDown = (event) => {
        console.log(event.key);
        console.log(event.target.innerText);
    
        if(event.key !== 'Enter' || event.key !=='ArrowDown' || event.key !=='ArrowUp'){
            setTimeout(()=>{
                const pindex = event.target.dataset.type
            
                setParagraphs({...paragraphs,[pindex]: event.target.innerText});
            },0);
        }
    
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
                let currentElement=event.target;
                while(currentElement.parentNode && !currentElement.parentNode.matches('.textbox-contents')){
                    currentElement=currentElement.parentNode;
                }
                currentElement.nextElementSibling.querySelector('p').focus();
            },10);
            
        }
        if (event.key==='ArrowDown'){
            event.preventDefault();

            console.log('event arrow down');
            setTimeout(()=>{
                let currentElement=event.target;
                while(currentElement.parentNode && !currentElement.parentNode.matches('.textbox-contents')){
                    currentElement=currentElement.parentNode;
                }
                currentElement.nextElementSibling.querySelector('p').focus();
            },10);
            
        }
        
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        const body = Object.values(paragraphs).filter((p)=>p!=='');
        formData.append('post[body]',body.join('\n'));
        formData.append('post[author_id]',sessionUser.id);
        if (photo1) {
            formData.append('post[photo1]',photo1)
        }
        if (photo2) {
            formData.append('post[photo2]',photo2)
        }
        if (photo3) {
            formData.append('post[photo3]',photo3)
        }
        if (photo4) {
            formData.append('post[photo4]',photo4)
        }
        dispatch(createPost(formData))
        
        //when post show page is done, redirect to show page
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
                            <input data-type='1' type='file' className='photo-button' onChange={handleFile}>
                                {/* className= photo-button icon */}
                            </input>
                        </div>
                    </div>
                </div>
                <div className = 'newtext-body'>
                        <div className='text-box'>
                            <div className='textbox-contents'>
                                {Object.keys(paragraphs).map((paragraph,index)=>{
                                return <NewPostInput handleKeyDown={handleKeyDown} index={index} />})}
                               
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