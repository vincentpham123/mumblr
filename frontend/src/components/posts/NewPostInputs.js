//this component will be called in each new text post depending on how many enters they pressed
// depending on what opion is selected, it will rerender into a new form
// default will be text
// state variable will change depending on what is selected
// each button, onClick will change that state variable to 'photo' or 'video'
// this component will have those ready to render depending on the statevaraible
// a menu will be displayed if it is focused on
import './newpostinputs.css';
import { useState, useRef,useEffect } from "react";
const NewPostInput = ({ form,handleKeyDown, index,handleFile, photoState,initialValue,create, handlePhotoRemove}) => {
    const [type, setType] = useState('text');
    const [showInputMenu, setInputMenu] = useState(create);
    const [textIcon,setTextIcon] = useState('');
    const [photoIcon,setPhotoIcon] = useState('');
    const [videoIcon,setVideoIcon] = useState('');
    const [linkIcon,setLinkIcon] = useState('');
    const [focus,setFocus] = useState('');
    const [photoPreview,setPhotoPreview]=useState(null);
    const [initialText,setInitialText] = useState('');
    const [initialTextset,setInitialTextset] = useState(false);
    const [photoKey, setPhotoKey] = useState(0);
    // this will let me know which key to set to null in the parent component
    // parent component will have a handleRemoveFile that will turn the passed in key value pair to null

    const pRef = useRef(null);
    //this is for setting the menu to true, if the p tag is focused and not empty 
    useEffect(()=>{
        if (form==='photo') setType('photo')
    },[])

    
    useEffect(()=>{
        if (!initialTextset){
            if (initialValue && initialValue.includes('!@%^#^photo')){
                let photoIndex=parseInt(initialValue[initialValue.length-1]); //this will grab the photo number
                console.log(photoIndex);
                console.log(photoState[1]);
                
                setType('photo');
                setPhotoPreview(photoState[photoIndex]);
                setPhotoKey(photoIndex);
                console.log(photoKey);
            } else{
                setInitialText(initialValue);
            }
        }
        setInitialTextset(true);

    },[])
    const handleInput = (event) => {
        console.log(event.key);
        setTimeout(()=>{
            if(event.target.innerText.length>0) {       
                setInputMenu(false)
            } else setInputMenu(true);
        },0);
        
        handleKeyDown(event);

    }

    // handle case if create is false
    // i know what photo is being referenced, 
    
    //


    const handleFileInput = (event)=>{
        //need to set photo preview and call the handleFile prop from parent
        const photokey = handleFile(event);
        setPhotoKey(photokey);
        const file=event.currentTarget.files[0];
        if (file){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoPreview(fileReader.result);
        } else setPhotoPreview(null);
    }
    const ReturnToText =() =>{
        return(
            <div className='b2textcontainer'>
            <button className='b2textbutton' onClick={()=>{
                setType('text')
                setInputMenu(true)}
            }>
                <i className='fa-solid fa-xmark'></i>
            </button>
            </div>
        )
    }
    const handlePreviewClose =()=>{
        handlePhotoRemove(photoKey,index);
        setPhotoPreview(null);

    }
    const PhotoButton = () => {
        let preview = null;
        if (photoPreview) preview = 
        <>
        <div className='preview-container'>

            <img className='photoPreview' src={photoPreview} sizes='360' loading='lazy' draggable='false' alt='' />
            <button className='removepreview' onClick={()=>handlePreviewClose()}>
                <i className='fa-solid fa-xmark'></i>
            </button>
        </div>
        </>
        console.log(preview);
        return (

            <div className='photo-input-container'>
                {preview}
                {!photoPreview &&
                <div className='photo-input-contents'>
                    <button className='photofilebutton' onClick={()=>document.getElementById('photo-input').click()}>
                    <i className="fa-solid fa-image fileicon" ></i>
                        <span className='filetext'>Upload Imag (Max: 4)</span>
                    <input data-type={index} type='file' id='photo-input' onChange={event=>handleFileInput(event)}></input>
                    </button>
                    <ReturnToText />
                </div>
                }

            </div>

        )
    }
    // I need a options menu that will only populate if type is text, and user has not typed anything into the innerTag
    //should i use a useRef that will track the innerText
    return (
        <>
            <div className='input-container'>
                <div className='inputBody'>
                    {type === 'text' && <p ref={pRef} key={index} data-type={index} onKeyDown={(event) => handleInput(event)} onFocus={()=>setFocus('block')} onBlur={()=>setFocus('none')} id={`paragraph-${index}`} className='contentEdit text-paragraph' contentEditable='true'>{initialText}</p>}
                    {type === 'photo' && <PhotoButton />}
                </div>
                {type ==='text' && showInputMenu &&
                <div className='inputmenucontainer'>
                    <div className='inputmenubody'>
                        <div className='inputmenucontent'>
                            {type !== 'text' && <button className='inputbuttons' onClick={() => setType('text')}>
                                <i className={`fa-solid fa-a fa-lg inputicons ${textIcon}`} style={{ backgroundColor: 'transparent', color: 'RGB(var(--blue))' }}
                                onMouseEnter={()=>setTextIcon('fa-bounce')} onMouseLeave={()=>setTextIcon('')}></i>
                            </button>}
                            {Object.values(photoState).filter((value)=>value===null).length>0 && <button className='inputbuttons' onClick={() => setType('photo')}>
                                <i className={`fa-solid fa-image fa-lg inputicons ${photoIcon}`} style={{ backgroundColor: 'transparent', color: 'RGB(var(--red))' }}
                                onMouseEnter={()=>setPhotoIcon('fa-bounce')} onMouseLeave={()=>setPhotoIcon('')}></i>
                            </button>}
                            <button className='inputbuttons' onClick={() => setType('link')}>
                                <i className= {`fa-solid fa-link fa-lg inputicons ${linkIcon}`} style={{ backgroundColor: 'transparent', color: 'RGB(var(--green))' }}
                                onMouseEnter={()=>setLinkIcon('fa-bounce')} onMouseLeave={()=>setLinkIcon('')}></i>
                            </button>
                            <button className='inputbuttons' onClick={() => setType('link')}>
                                <i className={`fa-solid fa-video fa-lg inputicons ${videoIcon}`} style={{ backgroundColor: 'transparent', color: 'RGB(var(--purple))' }}
                                onMouseEnter={()=>setVideoIcon('fa-bounce')} onMouseLeave={()=>setVideoIcon('')}></i>
                            </button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    )

}

export default NewPostInput;