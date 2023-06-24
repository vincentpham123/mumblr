//this component will be called in each new text post depending on how many enters they pressed
// depending on what opion is selected, it will rerender into a new form
// default will be text
// state variable will change depending on what is selected
// each button, onClick will change that state variable to 'photo' or 'video'
// this component will have those ready to render depending on the statevaraible
// a menu will be displayed if it is focused on
import './newpostinputs.css';
import { useState, useRef } from "react";
const NewPostInput = ({handleKeyDown,index}) => {
    const [type,setType] = useState('text');
    const [showInputMenu,,setInputMenu] = useState(false);
    const pRef = useRef(null);
    //this is for setting the menu to true, if the p tag is focused and not empty 
    const handleFocus =()=>{
        setInputMenu(true);
    }
    // I need a options menu that will only populate if type is text, and user has not typed anything into the innerTag
    //should i use a useRef that will track the innerText
    return (
        <>
        <div className='input-container'>
            <div className='textContainer'>
                {type==='text' && <p  ref={pRef} key={index} data-type={index} onKeyDown={(event)=>handleKeyDown(event)} id={`paragraph-${index}`}  className='contentEdit text-paragraph' contentEditable='true'></p>}
            </div>
            <div className='inputMenuContainer'>
                <div className='inputMenuBody'>
                    <div className='inputMenuContent'>
                        <button className='inputButtons'>
                            <i className='fa-solid fa-image'></i>
                        </button>
                        <h1>HI</h1>
                    </div>
                </div>
            </div>
        </div>
        </>
        )

}

export default NewPostInput;