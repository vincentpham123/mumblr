//this component will be called in each new text post depending on how many enters they pressed
// depending on what opion is selected, it will rerender into a new form
// default will be text
// state variable will change depending on what is selected
// each button, onClick will change that state variable to 'photo' or 'video'
// this component will have those ready to render depending on the statevaraible
// a menu will be displayed if it is focused on
import './newpostinputs.css';
import { useState, useRef } from "react";
const NewPostInput = ({ handleKeyDown, index}) => {
    const [type, setType] = useState('text');
    const [showInputMenu, setInputMenu] = useState(true);
    const [photoIndex,setPhotoIndex] = useState(0);
    const [textIcon,setTextIcon] = useState('');
    const [photoIcon,setPhotoIcon] = useState('');
    const [videoIcon,setVideoIcon] = useState('');
    const [linkIcon,setLinkIcon] = useState('');
    const [focus,setFocus] = useState('');
    // need to pass in 4 onchange functions for each 
    const pRef = useRef(null);
    //this is for setting the menu to true, if the p tag is focused and not empty 
   
    const handleInput = (event) => {
        console.log(event.key);
        setTimeout(()=>{
            if(event.target.innerText.length>0) {       
                setInputMenu(false)
            } else setInputMenu(true);
        },0);
        
        handleKeyDown(event);

    }
    const ReturnToText =() =>{
        return(
            <div className='b2textcontainer'>
            <button className='b2textbutton' onClick={()=>setType('text')}>
                <i className='fa-solid fa-xmark'></i>
            </button>
            </div>
        )
    }
    const PhotoButton = () => {
        return (

            <div className='photo-input-container'>
                <div className='photo-input-contents'>
                <button className='photofilebutton' onClick={()=>document.getElementById('photo-input').click()}>
                <i className="fa-solid fa-image fileicon" ></i>
                <span className='filetext'>Upload Imag (Max: 4)</span>
                <input data-type={index+1} type='file' id='photo-input' ></input>
                </button>
                <ReturnToText />
                </div>

            </div>

        )
    }
    // I need a options menu that will only populate if type is text, and user has not typed anything into the innerTag
    //should i use a useRef that will track the innerText
    return (
        <>
            <div className='input-container'>
                <div className='inputBody'>
                    {type === 'text' && <p ref={pRef} key={index} data-type={index} onKeyDown={(event) => handleInput(event)} onFocus={()=>setFocus('block')} onBlur={()=>setFocus('none')} id={`paragraph-${index}`} className='contentEdit text-paragraph' contentEditable='true'></p>}
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
                            <button className='inputbuttons' onClick={() => setType('photo')}>
                                <i className={`fa-solid fa-image fa-lg inputicons ${photoIcon}`} style={{ backgroundColor: 'transparent', color: 'RGB(var(--red))' }}
                                onMouseEnter={()=>setPhotoIcon('fa-bounce')} onMouseLeave={()=>setPhotoIcon('')}></i>
                            </button>
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