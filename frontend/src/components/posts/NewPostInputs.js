//this component will be called in each new text post depending on how many enters they pressed
// depending on what opion is selected, it will rerender into a new form
// default will be text
// state variable will change depending on what is selected
// each button, onClick will change that state variable to 'photo' or 'video'
// this component will have those ready to render depending on the statevaraible
// a menu will be displayed if it is focused on
import './newpostinputs.css';
import { useState, useRef } from "react";
const NewPostInput = ({ handleKeyDown, index }) => {
    const [type, setType] = useState('text');
    const [showInputMenu, , setInputMenu] = useState(false);
    const pRef = useRef(null);
    //this is for setting the menu to true, if the p tag is focused and not empty 
    const handleFocus = () => {
        setInputMenu(true);
    }

    const PhotoButton = () => {
        return (

            <div className='photo-input-container'>
                <input type='file' className='photo-input'></input>
            </div>

        )
    }
    // I need a options menu that will only populate if type is text, and user has not typed anything into the innerTag
    //should i use a useRef that will track the innerText
    return (
        <>
            <div className='input-container'>
                <div className='inputBody'>
                    {type === 'text' && <p ref={pRef} key={index} data-type={index} onKeyDown={(event) => handleKeyDown(event)} id={`paragraph-${index}`} className='contentEdit text-paragraph' contentEditable='true'></p>}
                    {type === 'photo' && <PhotoButton />}
                </div>
                <div className='inputmenucontainer'>
                    <div className='inputmenubody'>
                        <div className='inputmenucontent'>
                            {type !== 'text' && <button className='inputbuttons' onClick={() => setType('text')}>
                                <i className='fa-solid fa-a fa-lg inputicons' style={{ backgroundColor: 'transparent', color: 'RGB(var(--blue))' }}></i>
                            </button>}
                            <button className='inputbuttons' onClick={() => setType('photo')}>
                                <i className='fa-solid fa-image fa-lg inputicons' style={{ backgroundColor: 'transparent', color: 'RGB(var(--red))' }}></i>
                            </button>
                            <button className='inputbuttons' onClick={() => setType('link')}>
                                <i className='fa-solid fa-link fa-lg inputicons' style={{ backgroundColor: 'transparent', color: 'RGB(var(--green))' }}></i>
                            </button>
                            <button className='inputbuttons' onClick={() => setType('link')}>
                                <i className='fa-solid fa-video fa-lg inputicons' style={{ backgroundColor: 'transparent', color: 'RGB(var(--purple))' }}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default NewPostInput;