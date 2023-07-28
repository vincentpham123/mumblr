import './styling/posttext.css';
import { useState } from 'react';
const PostText = ({post}) => {
    // need to check if post has a title
    // if post has a title, then that will be the first child of post-paragraph and have bigger font
    // const [photoCount,setPhotoCount]=useState(1);
    const styles = {
        fontSize: '1.625rem',
        lineHeight: 1.3077,
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: '1.5em',
        marginBottom: '15px',
      };
    // const handlePhotoCount = () => {
    //    if(photoCount<5)setPhotoCount((prevCount)=> prevCount+1);
    // }
    const breakdown = (post) => {
        const array = post.body.split('\r\n');

        return array.map((sentence,index)=>{
        
                switch (sentence) {
                    case ('!@%^#^photo1'):
                        // photoCount+=1;
                        return(
                            <div key={index} className='image-container'>
                                <figure className='image-figure'>
                                    <div className='image-box'>
                                        <img id='1' src={post.photo1} alt='' className='post-image' ></img>
                                    </div>
                                </figure>
                            </div>
                        );
                        case ('!@%^#^photo2'):
                        return(
                            <>
                            <div key={index} className='image-container'>
                                <figure className='image-figure'>
                                    <div className='image-box'>
                                        <img id='2' src={post.photo2} alt='' className='post-image' />
                                    </div>
                                </figure>
                            </div>
                            </>
                        );
                    case ('!@%^#^photo3'):
                        return(
                            <div key={index} className='image-container'>
                                <figure className='image-figure'>
                                    <div className='image-box'>
                                        <img id='3'src={post.photo3} alt='' className='post-image' />
                                    </div>
                                </figure>
                            </div>
                        );
                    case ('!@%^#^photo4'):
                        return(
                            <div key={index} className='image-container'>
                                <figure className='image-figure'>
                                    <div className='image-box'>
                                        <img id='4' src={post.photo4} alt='' className='post-image' />
                                    </div>
                                </figure>
                            </div>
                        );
                    default:
                        return(
                            <div key={index} className='post-paragraph'>
                                <p className='textStrings'>{sentence}</p>
                                <p></p>
                            </div>
                        )
                }
            })
          
    }

    return (
        <>
            <div className='posttext-body'>
            {/* <img src={post.photo1} alt='' className='post-image' /> */}
                {post.title!=='' &&
                <p className='post-paragraph'>
                    <strong style={{fontSize: '1.625rem',lineHeight: 1.3077 }}>{post.title}</strong>
                </p>
                }
                {breakdown(post)}
            </div>
        </>
    )

}

export default PostText;