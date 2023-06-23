import './styling/postcircle.css';
import { useEffect,useState } from "react"
import { Link } from "react-router-dom";
const PostCircle = ({type}) =>{
    const [isHovered,setIsHovered] = useState(false);
    const [decorators,setDecorators]=useState({
        color: '',
        icon: '',
        text:''
    })
    // i need a color
    // text
    // link to
    // icon
    //need on mouseEnter and onMouseLeave functions
    // used to add animation to the icons
    useEffect(()=>{
        switch (type) {
            case "text":
                setDecorators({
                    color:'white',
                    icon: 'fa-solid fa-a fa-2xl',
                    text: 'Text'
                }
                )
                break;
            case "photo":
                setDecorators({
                    color:'rgba(var(--red)',
                    icon: 'fa-solid fa-camera-retro fa-2xl',
                    text: 'Photo'
                })
                break;
            default:
                break;
        }
    },[type])
    return(
        <div className='selection-container'>
                    <div className='selection-body'>
                    <Link className='selection-link' to={`new/${type}`}>
                        <div className='selection-button' style={{backgroundColor: decorators.color}}>
                            <i className={decorators.icon}></i>
                        </div>
                            <div className='selection-text'>{decorators.text}</div>
                    </Link>
                    </div>
        </div>
    )

}

export default PostCircle;